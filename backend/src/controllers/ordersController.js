import Order from "../models/orderModel.js";
import { Cart } from "../models/cartModel.js";

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("cart").populate("user");

    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createOrder = async (req, res) => {
  try {
    const { userId, cartId, address } = req.body;

    const cart = await Cart.findById(cartId);
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    let totalCost = 0;
    cart.products.forEach((item) => {
      totalCost += item.totalPrice;
    });

    const newOrder = new Order({
      user: userId,
      cart: cartId,
      total: totalCost,
      address: address,
    });

    const savedOrder = await newOrder.save();

    res.status(201).json(savedOrder);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
