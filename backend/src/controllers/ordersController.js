import Order from "../models/orderModel.js";
import { Cart } from "../models/cartModel.js";
import stripePackage from "stripe";
import dotenv from "dotenv";

dotenv.config();

const stripe = stripePackage(
  "sk_test_51P12CTSEgQluV2glcsj5QjkedOxL35QqsmBzzqUNAUiBhcy2KQg4uRAy6WEqJTeL1nukOGmO33D4u67c5kXYmWX200q4E2zaqv"
);

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("cart").populate("user");

    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createPayment = async (req, res) => {
  try {
    const { address } = req.body;
    const userId = req.user.userId;

    const cart = await Cart.findById(req.body._id).populate(
      "products.product",
      "title price image"
    );
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const lineItems = cart.products.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.product.title,
          images: [item.product.image],
        },
        unit_amount: Math.round(item.product.price * 100),
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `https://ecommerce-app-sfgf-git-main-darshan1301s-projects.vercel.app/success`,
      cancel_url:
        "https://ecommerce-app-sfgf-git-main-darshan1301s-projects.vercel.app/failed",
    });

    res.status(201).json({ id: session.id });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createOrder = async (req, res) => {
  try {
    const { cartId, sessionId } = req.body;
    const { userId } = req.user;
    console.log("CREATE ORDER");

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (!cartId || !userId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const updatedSession = await stripe.checkout.sessions.retrieve(sessionId);

    if (updatedSession.payment_status === "paid") {
      const newOrder = new Order({
        cart: cartId,
        user: userId,
        address: updatedSession.customer_details.address,
        total: updatedSession.amount_total,
        sessionId: sessionId,
      });

      const savedOrder = await newOrder.save();

      await Cart.findByIdAndDelete(cartId);

      res.status(201).json(savedOrder);
    } else {
      return res.status(500).json({ message: "Payment has not been made." });
    }
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
