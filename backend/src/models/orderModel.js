import mongoose from "mongoose";

const { Schema } = mongoose;

// Order Schema
const orderSchema = new Schema({
  cart: {
    type: Object,
    ref: "Cart",
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  total: {
    type: Number,
  },
  address: {
    type: String,
    required: true,
  },
  updated: Date,
  created: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    default: "Processing",
    enum: ["Processing", "Shipped", "Delivered"],
  },
});

const Order = mongoose.model("Order", orderSchema);

export default Order;
