const express = require('express');
const productRouter = express.Router();
const productController = require('../controllers/productController');

// Create a new product
productRouter.post('/', productController.createProduct);

// Get all products
productRouter.get('/', productController.getAllProducts);

// Get a specific product
productRouter.get('/:id', productController.getProductById);

// Update a specific product
productRouter.put('/:id', productController.updateProduct);

// Delete a specific product
productRouter.delete('/:id', productController.deleteProduct);

module.exports = productRouter;
