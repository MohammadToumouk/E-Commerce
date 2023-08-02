const Cart = require("../models/cart");
const Product = require("../models/product");
const Customer = require("../models/customer");
const customerRouter = require("../routes/customerRoutes");

// Add item to the cart
const addItemToCart = async (req, res) => {
  try {
    const {
      productId,
      quantity,
      brand,
      name,
      images,
      price,
      category,
      description,
      size,
      color,
    } = req.body;
    const customerId = req.user.customer._id;

    const product = await Product.findById(productId);

    if (!product) {
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
      cart.items.push({
        product: productId,
        brand,
        name,
        images,
        quantity,
        price,
        category,
        description,
        size,
        color,
      });
    }

    // Save the updated cart to the database
    await cart.save();

    res.status(200).json({ message: "Item added to cart successfully", cart });
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
    console.log(error);
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
