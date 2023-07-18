const express = require('express');
const customerRouter = express.Router();
const customerController = require('../controllers/customerController');

// GET all customers
customerRouter.get('/', customerController.getAllCustomers);

// GET a specific customer by ID
customerRouter.get('/:id', customerController.getCustomerById);

// POST a new customer
customerRouter.post('/', customerController.createCustomer);

// PUT/UPDATE a customer by ID
customerRouter.put('/:id', customerController.updateCustomer);

// DELETE a customer by ID
customerRouter.delete('/:id', customerController.deleteCustomer);

module.exports = customerRouter;
