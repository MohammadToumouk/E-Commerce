const express = require('express');
const userRouter = express.Router();
const userController = require('../controllers/userController');

const authMiddleware = require('../middleware/authMiddleware')
const verifyToken = require('../middleware/verfiyToken')



// User registration
userRouter.post('/register', userController.registerUser);

// User login
userRouter.post('/login', userController.loginUser);

// Get user profile
<<<<<<< HEAD
userRouter.get('/profile',verifyToken,authMiddleware(['admin','manger','employee']), userController.getUserProfile);
=======

userRouter.get('/profile',authMiddleware(['admin','manger','employee']), userController.getUserProfile);
>>>>>>> 3cafd4ccd021ad642baf7ae3134ac6b6874c4da1

// Update user profile
userRouter.put('/profile',authMiddleware(['admin','manger']), userController.updateUserProfile);

// Get all users
userRouter.get('/',verifyToken,authMiddleware(['admin']), userController.getAllUsers);


// Logout user
userRouter.post('/logout', userController.logoutUser);

module.exports = userRouter;
