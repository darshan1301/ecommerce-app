import Product from "../models/productModel.js";

export const editProduct = async (req, res) => {
  try {
    const productId = req.params.productId;
    const { title, price, description, category, image, rating } = req.body;

    // Check if the product exists
    const existingProduct = await Product.findById(productId);
    if (!existingProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Update the product fields
    existingProduct.title = title;
    existingProduct.price = price;
    existingProduct.description = description;
    existingProduct.category = category;
    existingProduct.image = image;
    existingProduct.rating = rating;

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
    const { title, price, description, category, image, rating } = req.body;

    // Create a new product instance
    const newProduct = new Product({
      title,
      price,
      description,
      category,
      image,
      rating,
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

    // Find the product by ID and delete it
    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
