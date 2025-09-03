// import jwt from 'jsonwebtoken';
// import User from '../models/User.js';

// const protect = async (req, res, next) => {
//   try {
//     // Get token from cookies
//     const token = req.cookies.token;
    
//     if (!token) {
//       return res.status(401).json({ message: 'Not authorized, no token' });
//     }

//     // Verify token
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
//     // Get user from the token
//     req.user = await User.findById(decoded.id).select('-password');
    
//     if (!req.user) {
//       return res.status(401).json({ message: 'Not authorized, user not found' });
//     }
    
//     next();
//   } catch (error) {
//     console.error(error);
//     return res.status(401).json({ message: 'Not authorized, token failed' });
//   }
// };

// export { protect };



import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const protect = async (req, res, next) => {
  try {
    // Get token from cookies
    const token = req.cookies.token;
    
    if (!token) {
      return res.status(401).json({ message: 'Not authorized, no token' });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Get user from the token
    req.user = await User.findById(decoded.id).select('-password');
    
    if (!req.user) {
      return res.status(401).json({ message: 'Not authorized, user not found' });
    }
    
    next();
  } catch (error) {
    console.error('Auth error:', error);
    return res.status(401).json({ message: 'Not authorized, token failed' });
  }
};

export { protect };