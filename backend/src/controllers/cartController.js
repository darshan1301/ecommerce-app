import { Cart } from "../models/cartModel.js";

export const getCart = async (req, res) => {
  try {
    const userId = req.user.userId;
    console.log("GET CART API");

    // Find the user's cart
    const cart = await Cart.findOne({ user: userId }).populate(
      "products.product",
      "title price image"
    );
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.status(200).json(cart);
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;
    const userId = req.user.userId;

    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = new Cart({ user: userId, products: [] });
    }

    const existingItem = cart.products.find(
      (item) => item.product.toString() === productId
    );
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.products.push({ product: productId, quantity });
    }

    await cart.save();

    res.status(200).json(cart);
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateCart = async (req, res) => {
  try {
    const productId = req.params.productId;
    const userId = req.user.userId;

    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const item = cart.products.find(
      (item) => item.product.toString() === productId
    );
    if (!item) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    if (item.quantity > 1) {
      item.quantity -= 1;
    } else {
      // Optional: Remove the item from the cart if quantity is 1
      cart.products = cart.products.filter(
        (item) => item.product.toString() !== productId
      );
    }

    // Save the updated cart
    await cart.save();

    res.status(200).json(cart);
  } catch (error) {
    console.error("Error decreasing product quantity:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteFromCart = async (req, res) => {
  try {
    const productId = req.params.productId;
    const userId = req.user.userId; // Assuming user is authenticated and user ID is available in the request

    // Find the user's cart
    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Remove the item from the cart
    cart.products = cart.products.filter(
      (item) => item.product.toString() !== productId
    );

    // Save the updated cart
    await cart.save();

    res.status(200).json(cart);
  } catch (error) {
    console.error("Error deleting from cart:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
