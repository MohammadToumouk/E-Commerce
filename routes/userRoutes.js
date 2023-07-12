const express = require('express');
const userRouter = express.Router();
const userController = require('../controllers/userController');

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

module.exports = userRouter;
