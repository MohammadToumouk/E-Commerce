
const authMiddleware = (requiredRoles) => {
  
    return (req, res, next) => {
      //console.log(req.user.user.role)
      if (!requiredRoles.includes(req.user.user.role)) {
        return res.status(403).json({ message: 'Access denied. You have no permission for this page :/' });
        
      }
      
      next();
    };
  };
  
module.exports = authMiddleware;
