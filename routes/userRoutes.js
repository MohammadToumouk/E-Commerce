const express = require('express');
const userRouter = express.Router();
const userController = require('../controllers/userController');

const authMiddleware = require('../middleware/authMiddleware')



// User registration
userRouter.post('/register', userController.registerUser);

// User login
userRouter.post('/login', userController.loginUser);

// Get user profile

userRouter.get('/profile',authMiddleware(['admin','manger','employee']), userController.getUserProfile);

// Update user profile
userRouter.put('/profile',authMiddleware(['admin','manger']), userController.updateUserProfile);

// Get all users
userRouter.get('/',authMiddleware(['admin']), userController.getAllUsers);


// Logout user
userRouter.post('/logout', userController.logoutUser);

module.exports = userRouter;
