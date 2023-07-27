const Customer = require('../models/customer');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const registercustomer = async (req, res) => {
  try {
    // Extract customer information from the request body
    const { name, email, password, firstname, lastname, phone } = req.body;

    // Check if the customer with the given email already exists
    const existingcustomer = await Customer.findOne({ email });
    if (existingcustomer) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Create a new customer instance and sign it into customer(important for the cookies auth)
    const newCustomer = new Customer({ name, email, password, firstname, lastname, phone });
    const customer = newCustomer;

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    newCustomer.password = await bcrypt.hash(newCustomer.password, salt);

    // Save the customer to the database
    await newCustomer.save();

    // Generate JWT token
    const token = jwt.sign({ customer }, process.env.JWT_Secret)
    // Return a success response
    res.status(201).cookie("access_token", token,{ maxAge: 15*60*1000 , httponly:true}).json({ message: 'customer registered successfully', newCustomer});
  } catch (error) {
    // Handle any errors
    console.log(req.body)
    res.status(500).json({ message: 'An error occurred', error });
  }
};

// customer login
const logincustomer = async (req, res) => {
  try {
    // Extract customer credentials from the request body
    const { email, password } = req.body;
    

    // Check if the customer with the given email exists
    const customer = await Customer.findOne({ email }).select("+password")
    if (!customer) {
      return res.status(404).json({ message: 'customer not found' });
    }

    // Validate the password
    const isPasswordValid = await bcrypt.compare(password, customer.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Generate JWT token
    const token = jwt.sign( { customer } , process.env.JWT_Secret, {expiresIn:'500m'}
    );

    // Return the customer information
    // console.log("Customer ID is : " + req.user.customer._id)
    res.status(200).cookie("access_token", token, {maxAge: 4 * 60 * 60 * 1000,httponly: true,SameSite: 'None'}).json({ customer });
  } catch (error) {
    // Handle any errors
    
    console.log(req.body)
    console.log(error)
    res.status(500).json({ message: 'An error occurred', error });
  }
};

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
  registercustomer,
  logincustomer,
  getAllCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer
};
