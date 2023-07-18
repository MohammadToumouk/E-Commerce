const User = require('../Models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Register a new user
const registerUser = async (req, res) => {
  try {
    // Extract user information from the request body
    const { name, email, password, role } = req.body;

    // Check if the user with the given email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Create a new user instance and sign it into user(important for the cookies auth)
    const newUser = new User({ name, email, password, role });
    const user = newUser;

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(newUser.password, salt);

    // Save the user to the database
    await newUser.save();

    // Generate JWT token
    const token = jwt.sign({ user }, process.env.JWT_Secret)
    // Return a success response
    res.status(201).cookie("access_token", token,{ maxAge: 15*60*1000 , httponly:true}).json({ message: 'User registered successfully', newUser});
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
    const user = await User.findOne({ email }).select("+password")
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Validate the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Generate JWT token
    const token = jwt.sign( {user} , process.env.JWT_Secret, {expiresIn:'500m'}
    );

    // Return the user information
    res.status(200).cookie("access_token", token, {maxAge:15 * 60 * 1000,httponly: true}).json({  user });
  } catch (error) {
    // Handle any errors
    res.status(500).json({ message: 'An error occurred', error });
  }
};

// Get user profile
const getUserProfile = async(req, res) => {
  try {
    // Get the user ID from the request object
    const id = req.user.user._id;
    //ask besslan why it is double user (only one user get undefined)
    console.log(req.user.user._id)
    
    // Find the user by ID
    const user = await User.findById(id);

    // Return the user profile
    res.status(200).json({user});
    
  } catch (error) {
    // Handle any errors
    res.status(500).json({ message: 'An error occurred', error });
    
  }
};

// Update user profile
const updateUserProfile = async (req, res) => {
  try {
    // Get the user ID from the request object 
    const id = req.user._id;

    // Find the user by ID and update the profile
    const updatedUser = await User.findByIdAndUpdate(
      id,
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

const logoutUser = (req, res) => {
  try {
    res.cookie("access_token", "",{maxAge: 0 }).end();
  } catch (error) {
    next(error)
  }
  res.status(200).json({ message: 'User logged out successfully' });
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
  logoutUser
};
