const jwt = require('jsonwebtoken');

const authMiddleware = (requiredRoles) => {
  return (req, res, next) => {
    // Get the token from the request header
    const token = req.cookies.access_token;
    
    
    if (!token) {
      return res.status(401).json({ message: 'No token provided.' });
    }

    try {
      // Verify and decode the token
      const decoded = jwt.verify(token, process.env.JWT_Secret);
      req.user = decoded;
      console.log(decoded.user.role)
      // Check if the user has one of the required roles
      if (!requiredRoles.includes(decoded.user.role)) {
        return res.status(403).json({ message: 'Access denied. you have no permission for this page :/' });
      }

      next();
    } catch (error) {
      return res.status(401).json({ message: 'Invalid token.' });
    }
  };
};

module.exports = authMiddleware;
