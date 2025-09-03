import express from 'express';
import { register, login, getProfile, logout } from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';
import { validateRegisterInput } from '../middleware/validation.js';

const router = express.Router();
router.post('/register', validateRegisterInput, register);
router.post('/login', login);
router.get('/profile', protect, getProfile);
router.post('/logout', logout);

export default router;