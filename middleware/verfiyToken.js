const jwt = require('jsonwebtoken');

const verificationMiddleware = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    return res.status(401).json({ message: 'No token provided.' });
    
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_Secret);
    req.user = decoded; 
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token.' }); 
  }
};

module.exports = verificationMiddleware;
