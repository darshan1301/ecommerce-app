import Product from "../models/productModel.js";
import {
  deleteFromCloudinary,
  extractPublicId,
  uploadCloudinary,
} from "../utils/cloudinary.js";
import { v4 as uuidv4 } from "uuid";

export const editProduct = async (req, res) => {
  try {
    const productId = req.params.productId;
    const { title, price, description, category } = req.body;
    // console.log("EDIT PRODUCT", req.body);

    // Check if the product exists
    const existingProduct = await Product.findById(productId);
    if (!existingProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (req.file) {
      existingProduct.image = await uploadCloudinary(req.file.path);
    }

    // Update the product fields
    existingProduct.title = title;
    existingProduct.price = price;
    existingProduct.description = description;
    existingProduct.category = category;
    existingProduct.image = existingProduct.image;

    // Save the updated product
    const updatedProduct = await existingProduct.save();

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error("Error editing product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const addProduct = async (req, res) => {
  try {
    const { title, price, description, category } = req.body;
    const file = req.file;

    const image = await uploadCloudinary(file.path);

    // Create a new product instance
    const newProduct = new Product({
      id: uuidv4(),
      title,
      price,
      description,
      category,
      image,
    });

    // Save the new product to the database
    const savedProduct = await newProduct.save();

    res.status(201).json(savedProduct);
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.productId;
    console.log("productId", productId);

    const deletedProduct = await Product.findByIdAndDelete(String(productId));

    const publicId = extractPublicId(deletedProduct?.image);
    if (publicId) {
      await deleteFromCloudinary(publicId);
    }

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
