const Customer = require("../models/customer");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const registercustomer = async (req, res) => {
  try {
    // Extract customer information from the request body
    const { name, email, password, firstname, lastname, phone } = req.body;

    // Check if the customer with the given email already exists
    const existingcustomer = await Customer.findOne({ email });
    if (existingcustomer) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Create a new customer instance and sign it into customer(important for the cookies auth)
    const newCustomer = new Customer({
      name,
      email,
      password,
      firstname,
      lastname,
      phone,
    });
    const customer = newCustomer;

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    newCustomer.password = await bcrypt.hash(newCustomer.password, salt);

    // Save the customer to the database
    await newCustomer.save();

    // Generate JWT token
    const token = jwt.sign({ customer }, process.env.JWT_Secret);
    // Return a success response
    res
      .status(201)
      .cookie("access_token", token, { maxAge: 15 * 60 * 1000, httponly: true })
      .json({ message: "customer registered successfully", newCustomer });
  } catch (error) {
    // Handle any errors
    console.log(req.body);
    res.status(500).json({ message: "An error occurred", error });
  }
};

// customer login
const logincustomer = async (req, res) => {
  try {
    // Extract customer credentials from the request body
    const { email, password } = req.body;

    // Check if the customer with the given email exists
    const customer = await Customer.findOne({ email }).select("+password");
    if (!customer) {
      return res.status(404).json({ message: "customer not found" });
    }

    // Validate the password
    const isPasswordValid = await bcrypt.compare(password, customer.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Generate JWT token
    const token = jwt.sign({ customer }, process.env.JWT_Secret, {
      expiresIn: "500m",
    });

    // Return the customer information
    // console.log("Customer ID is : " + req.user.customer._id)
    res.status(200).cookie("access_token", token, {maxAge: 4 * 60 * 60 * 1000,httponly: true,SameSite: 'None'}).json({ customer });
    console.log(customer)
  } catch (error) {
    // Handle any errors
    
    console.log(req.body)
    console.log(error)
    res.status(500).json({ message: 'An error occurred', error });
    console.log(error)
  }
};

// Get all customers
const getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};



// Get customer profile
const getCustomerProfile = async (req, res) => {
  try {
    // Get the user ID from the request object
    const id = req.user.customer._id;
    //ask besslan why it is double user (only one user get undefined)
    console.log(req);

    // Find the user by ID
    const customer = await Customer.findById(id);

    // Return the user profile
    res.status(200).json({ customer });
  } catch (error) {
    // Handle any errors
    res.status(500).json({ message: "An error occurred", error });
    console.log(error)
    
  }
};

// Create a new customer
const createCustomer = async (req, res) => {
  try {
    const { firstname, lastname, email, phone, address } = req.body;
    const customer = new Customer({
      firstname,
      lastname,
      email,
      phone,
      address,
    });
    const savedCustomer = await customer.save();
    res.status(201).json(savedCustomer);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update a customer by ID
const updateCustomer = async (req, res) => {
  try {
    const { firstname, lastname, email, phone, address } = req.body;
    const updatedCustomer = await Customer.findByIdAndUpdate(
      req.params.id,
      {
        firstname,
        lastname,
        email,
        phone,
        address,
      },
      { new: true }
    );
    if (!updatedCustomer) {
      return res.status(404).json({ error: "Customer not found" });
    }
    res.json(updatedCustomer);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete a customer by ID
const deleteCustomer = async (req, res) => {
  try {
    const deletedCustomer = await Customer.findByIdAndRemove(req.params.id);
    if (!deletedCustomer) {
      return res.status(404).json({ error: "Customer not found" });
    }
    res.json(deletedCustomer);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};
// Logout 
const logoutCustomer = (req, res) => {
  try {
    res.cookie("access_token", "",{maxAge: 0 }).end();
  } catch (error) {
    next(error)
  }
  res.status(200).json({ message: 'User logged out successfully' });
};

module.exports = {
  registercustomer,
  logincustomer,
  getAllCustomers,
  getCustomerProfile,
  createCustomer,
  updateCustomer,
  deleteCustomer,
  logoutCustomer
};
