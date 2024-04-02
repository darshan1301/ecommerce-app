import mongoose from "mongoose";

const { Schema } = mongoose;

// Cart Item Schema
const CartItemSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product",
  },
  quantity: Number,
  purchasePrice: {
    type: Number,
  },
  totalPrice: {
    type: Number,
  },
  status: {
    type: String,
    default: "Processing",
    enum: ["Processing", "Shipped", "Delivered"],
  },
});

export const CartItem = mongoose.model("CartItem", CartItemSchema);

// Cart Schema
const cartSchema = new Schema({
  products: [CartItemSchema],
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  updated: Date,
  created: {
    type: Date,
    default: Date.now,
  },
});

export const Cart = mongoose.model("Cart", cartSchema);
