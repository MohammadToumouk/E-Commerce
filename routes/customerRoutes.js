const express = require("express");
const customerRouter = express.Router();
const customerController = require("../controllers/customerController");
const authMiddleware = require("../middleware/authMiddleware");
const verificationMiddleware = require("../middleware/verfiyToken");

// Register
customerRouter.post("/register", customerController.registercustomer);

// Login
customerRouter.post("/login", customerController.logincustomer);

// Logout
customerRouter.post("/logout", customerController.logoutCustomer)

// GET all customers
customerRouter.get("/", customerController.getAllCustomers);

// GET a specific customer by ID

customerRouter.get(
  "/profile",
  verificationMiddleware,
  customerController.getCustomerProfile
);


// POST a new customer
customerRouter.post("/", customerController.createCustomer);

// PUT/UPDATE a customer by ID
customerRouter.put("/:id", customerController.updateCustomer);

// DELETE a customer by ID
customerRouter.delete("/:id", customerController.deleteCustomer);

module.exports = customerRouter;
