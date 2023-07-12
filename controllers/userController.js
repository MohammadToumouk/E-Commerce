const User = require('../Models/user');

// Register a new user
const registerUser = async (req, res) => {
  try {
    // Extract user information from the request body
    const { name, email, password } = req.body;

    // Check if the user with the given email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Create a new user instance
    const newUser = new User({ name, email, password });

    // Save the user to the database
    await newUser.save();

    // Return a success response
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    // Handle any errors
    res.status(500).json({ message: 'An error occurred', error });
  }
};

// User login
const loginUser = async (req, res) => {
  try {
    // Extract user credentials from the request body
    const { email, password } = req.body;

    // Check if the user with the given email exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Validate the password
    const isPasswordValid = await user.validatePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Return the user information
    res.status(200).json({ user });
  } catch (error) {
    // Handle any errors
    res.status(500).json({ message: 'An error occurred', error });
  }
};

// Get user profile
const getUserProfile = async (req, res) => {
  try {
    // Get the user ID from the request object (assuming authentication middleware sets req.user)
    const userId = req.user._id;

    // Find the user by ID
    const user = await User.findById(userId);

    // Return the user profile
    res.status(200).json({ user });
  } catch (error) {
    // Handle any errors
    res.status(500).json({ message: 'An error occurred', error });
  }
};

// Update user profile
const updateUserProfile = async (req, res) => {
  try {
    // Get the user ID from the request object (assuming authentication middleware sets req.user)
    const userId = req.user._id;

    // Find the user by ID and update the profile
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: req.body },
      { new: true }
    );

    // Return the updated user profile
    res.status(200).json({ user: updatedUser });
  } catch (error) {
    // Handle any errors
    res.status(500).json({ message: 'An error occurred', error });
  }
};

// Get all users
const getAllUsers = async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json({ users });
    } catch (error) {
      res.status(500).json({ message: 'An error occurred', error });
    }
  };

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  getAllUsers,
};
