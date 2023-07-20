const express = require('express');
const orderRouter = express.Router();
const orderController = require('../controllers/orderController');

// Create a new order
orderRouter.post('/', orderController.createOrder);

// Get all orders
orderRouter.get('/', orderController.getAllOrders);

// Get OrdersByDate
orderRouter.get('/sort', orderController.getOrderByDate);

// Get a specific order
orderRouter.get('/:id', orderController.getOrderById);

// Update a specific order
orderRouter.put('/:id', orderController.updateOrder);

// Delete a specific order
orderRouter.delete('/:id', orderController.deleteOrder);




module.exports = orderRouter;
