import Order from "../models/orderModel.js";
import { Cart } from "../models/cartModel.js";
import stripePackage from "stripe";
import dotenv from "dotenv";

dotenv.config("/src/.env");

// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret =
  "whsec_1fbf8ae94285d4cb0f4aaffaec840952fc1c612cdda4a759d65ee20d5f2cec0f";

const stripe = stripePackage(
  "sk_test_51P12CTSEgQluV2glcsj5QjkedOxL35QqsmBzzqUNAUiBhcy2KQg4uRAy6WEqJTeL1nukOGmO33D4u67c5kXYmWX200q4E2zaqv"
);

export const getAllOrders = async (req, res) => {
  try {
    // Retrieve userId from request
    const { userId } = req.user;

    // Find orders belonging to the user
    const orders = await Order.find({ user: userId })
      .populate("cart")
      .populate("user");

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

    // console.log(userId, cart._id);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: process.env.PAYMENT_SUCCESS,
      cancel_url: process.env.PAYMENT_FAILED,
      metadata: {
        cartId: cart._id.toString(),
        userId: userId.toString(),
      },
    });

    res.status(201).json({ id: session.id });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createOrder = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  // console.log("CREATE ORDER", req.body);

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    // console.log("WEBHOOK VERIFIED", event);
  } catch (err) {
    console.error(err);
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  switch (event.type) {
    case "checkout.session.completed":
      const paymentIntentSucceeded = event.data.object;

      console.log("CART ID", event.data.object.metadata.cartId);

      const cart = await Cart.findById(
        event.data.object.metadata.cartId
      ).populate("products.product", "title price image");

      const newOrder = new Order({
        cart: cart,
        user: event.data.object.metadata.userId,
        address: JSON.stringify(event.data.object.customer_details.address),
        total: event.data.object.amount_total,
      });

      const savedOrder = await newOrder.save();

      return res.status(201).json(savedOrder);

    // break;

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.send();
};
