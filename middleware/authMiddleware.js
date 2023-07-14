    const { response } = require('express');
const jwt = require('jsonwebtoken')
   

    const authMiddleware = (req, res, next) => {
        const token = req.headers.authorization; 
    
        if (!token) {
        return res.status(401).json({ message: 'No token provided' });
        }
    
        try {
        const decoded = jwt.verify(token, process.env.JWT_Secret);
        req.user = { _id: decoded.userId };
        console.log(req.user._id)
        next();
        } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
        }
    };
    module.exports = authMiddleware;