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
userRouter.get('/profile',verifyToken,authMiddleware(['admin','manger','employee']), userController.getUserProfile);

// Update user profile
userRouter.put('/:id'/* ,authMiddleware(['admin','manger']) */, userController.updateUserProfile);

// Get all users
userRouter.get('/',verifyToken,authMiddleware(['admin']), userController.getAllUsers);


// Logout user
userRouter.post('/logout', userController.logoutUser);




module.exports = userRouter;
