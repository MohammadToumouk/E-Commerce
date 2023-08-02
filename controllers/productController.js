const Product = require("../models/product");
const cloudinary = require("../utils/cloudinary");

// Create a new product
const createProduct = async (req, res) => {
  try {
    const {
      name,
      brand,
      images,
      description,
      price,
      category,
      quantity,
      color,
      sizes,
    } = req.body;

    // const image = await cloudinary.uploader.upload(req.file.path);

    // // Access the URL and other information of the uploaded file from the Cloudinary response
    // const imageUrl = image.secure_url;
    // const publicId = image.public_id;

    const newProduct = new Product({
      name,
      brand,
      description,
      price,
      category,
      quantity,
      images,
      color,
      sizes,
    });

    const savedProduct = await newProduct.save();

    res.status(201).json({ product: savedProduct });
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
};

// Get all products
const getAllProducts = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit); // Get the limit from the query parameter as an integer

    let products;
    if (!Number.isNaN(limit) && limit > 0) {
      // If a valid limit is provided, use the limit option in the Product.find() method
      products = await Product.find().limit(limit);
    } else {
      // If limit is not provided or is invalid, return all products
      products = await Product.find();
    }

    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
};

// Get a specific product by ID
const getProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ product });
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
};

// Update a specific product
const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const { name, description, price, category, quantity, images } = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      {
        name,
        description,
        price,
        category,
        quantity,
        images,
      },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ product: updatedProduct });
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
};

// Delete a specific product
const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
    console.log(error);
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
