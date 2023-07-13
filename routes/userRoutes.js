const express = require('express');
const userRouter = express.Router();
const userController = require('../controllers/userController');
const authentication = require('../middleware/authMiddleware')

// User registration
userRouter.post('/register', userController.registerUser);

// User login
userRouter.post('/login', userController.loginUser);

// Get user profile
userRouter.get('/profile', userController.getUserProfile);

// Update user profile
userRouter.put('/profile', userController.updateUserProfile);

// Get all users
userRouter.get('/', userController.getAllUsers);

// Logout user
userRouter.post('/logout', authentication, userController.logoutUser);

module.exports = userRouter;
