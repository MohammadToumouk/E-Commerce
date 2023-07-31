const express = require("express");
const cartRouter = express.Router();
const cartController = require("../controllers/cartController");
const authMiddleware = require("../middleware/authMiddleware");
const verificationMiddleware = require("../middleware/verfiyToken");

// Add item to the cart
cartRouter.post("/add",verificationMiddleware, cartController.addItemToCart);

// Remove item from the cart
cartRouter.delete(
  "/remove/:productId",
  verificationMiddleware,
  cartController.removeItemFromCart
);

// Get customer's cart
cartRouter.get("/", verificationMiddleware, cartController.getCustomerCart);

module.exports = cartRouter;
