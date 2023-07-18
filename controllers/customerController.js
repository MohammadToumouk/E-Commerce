const Customer = require('../models/customer');

// Get all customers
const getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get a specific customer by ID
const getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    res.json(customer);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Create a new customer
const createCustomer = async (req, res) => {
  try {
    const { firstname,lastname, email, phone, address } = req.body;
    const customer = new Customer({
      firstname,
      lastname,
      email,
      phone,
      address
    });
    const savedCustomer = await customer.save();
    res.status(201).json(savedCustomer);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update a customer by ID
const updateCustomer = async (req, res) => {
  try {
    const { firstname,lastname, email, phone, address } = req.body;
    const updatedCustomer = await Customer.findByIdAndUpdate(
      req.params.id,
      {
        firstname,
        lastname,
        email,
        phone,
        address
      },
      { new: true }
    );
    if (!updatedCustomer) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    res.json(updatedCustomer);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete a customer by ID
const deleteCustomer = async (req, res) => {
  try {
    const deletedCustomer = await Customer.findByIdAndRemove(req.params.id);
    if (!deletedCustomer) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    res.json(deletedCustomer);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getAllCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer
};
