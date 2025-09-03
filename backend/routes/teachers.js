import express from 'express';
import { createTeacher, getTeachers, getTeacher, registerTeacher } from '../controllers/teacherController.js';
import { protect } from '../middleware/auth.js';
import { validateTeacherInput } from '../middleware/validation.js';

const router = express.Router();

router.post('/', protect, validateTeacherInput, createTeacher);
router.get('/', protect, getTeachers);
router.get('/profile', protect, getTeacher);
router.post('/register',registerTeacher)

export default router;