const Cart = require("../models/cart");
const Product = require("../models/product");
const Customer = require("../models/customer");

// Add item to the cart
const addItemToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const customerId = req.user.customer._id;

    const product = await Product.findById(productId);
    console.log(req.body);
    console.log(product);

    if (!product) {
      console.log(req.user);
      return res.status(404).json({ message: "Product not found" });
    }

    let cart = await Cart.findOne({ customer: customerId });
    if (!cart) {
      cart = new Cart({ customer: customerId, items: [] });
    }

    // Check if the item already exists in the cart
    const existingItem = cart.items.find(
      (item) => item.product.toString() === productId
    );
    if (existingItem) {
      // If it exists, update the quantity
      existingItem.quantity += quantity;
    } else {
      // If it doesn't exist, add a new item to the cart
      cart.items.push({ product: productId, quantity });
    }

    // Save the cart to the database
    await cart.save();

    res.status(200).json({ message: "Item added to cart successfully", cart });
  } catch (error) {
    console.log(req);
    res.status(500).json({ message: "An error occurred", error });
    res.status(401).json({ message: "An 401 error occurred", error });
    console.log("401", error);
  }
};

// Remove item from the cart
const removeItemFromCart = async (req, res) => {
  try {
    const { productId } = req.params;
    const customerId = req.user.customer._id;

    // Get the customer's cart
    const cart = await Cart.findOne({ customer: customerId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Check if the item exists in the cart
    const existingItem = cart.items.find(
      (item) => item.product.toString() === productId
    );
    if (!existingItem) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    // Remove the item from the cart
    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId
    );

    // Save the updated cart to the database
    await cart.save();

    res
      .status(200)
      .json({ message: "Item removed from cart successfully", cart });
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
};

// Get customer's cart
const getCustomerCart = async (req, res) => {
  try {
    const customerId = req.user.customer._id;

    // Get the customer's cart
    const cart = await Cart.findOne({ customer: customerId }).populate(
      "items.product",
      "name price"
    );

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.status(200).json({ cart });
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
};

module.exports = {
  addItemToCart,
  removeItemFromCart,
  getCustomerCart,
};
