import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

const register = async (req, res) => {
  try {
    const { email, first_name, last_name, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({
      email,
      first_name,
      last_name,
      password,
    });

    if (user) {
      const token = generateToken(user._id);
      
      // Set token in HTTP-only cookie
      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      });

      res.status(201).json({
        _id: user._id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      const token = generateToken(user._id);
      
      // Set token in HTTP-only cookie
      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      });

      res.json({
        _id: user._id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// const getProfile = async (req, res) => {
//   try {
//     const user = await User.findById(req.user._id);
//     if (user) {
//       res.json({
//         _id: user._id,
//         email: user.email,
//         first_name: user.first_name,
//         last_name: user.last_name,
//       });
//     } else {
//       res.status(404).json({ message: 'User not found' });
//     }
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };


const getProfile = async (req, res) => {
  try {
    // This will only be called if protect middleware passes (user is authenticated)
    const user = await User.findById(req.user._id);
    if (user) {
      res.json({
        _id: user._id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const logout = (req, res) => {
  res.cookie('token', '', {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: 'Logged out successfully' });
};

export { register, login, getProfile, logout };