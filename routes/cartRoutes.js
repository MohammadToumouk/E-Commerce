const express = require('express');
const cartRouter = express.Router();
const cartController = require('../controllers/cartController');
const authMiddleware = require('../middleware/authMiddleware');

// Add item to the cart
cartRouter.post('/add', cartController.addItemToCart);

// Remove item from the cart
cartRouter.delete('/remove/:productId', cartController.removeItemFromCart);

// Get customer's cart
cartRouter.get('/', cartController.getCustomerCart);

module.exports = cartRouter;
