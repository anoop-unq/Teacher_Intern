import Teacher from '../models/Teacher.js';
import User from '../models/User.js';

const createTeacher = async (req, res) => {
  try {
    const { university_name, gender, year_joined, department, specialization } = req.body;

    // Check if teacher profile already exists for this user
    const existingTeacher = await Teacher.findOne({ user_id: req.user._id });
    if (existingTeacher) {
      return res.status(400).json({ message: 'Teacher profile already exists for this user' });
    }

    const teacher = await Teacher.create({
      user_id: req.user._id,
      university_name,
      gender,
      year_joined,
      department,
      specialization, // Now properly extracted
    });

    res.status(201).json(teacher);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const registerTeacher = async (req, res) => {
  try {
    const { email, first_name, last_name, password, university_name, gender, year_joined, department, specialization } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    // Create user
    const user = await User.create({
      email,
      first_name,
      last_name,
      password
    });

    // Create teacher profile
    const teacher = await Teacher.create({
      user_id: user._id,
      university_name,
      gender,
      year_joined,
      department,
      specialization
    });

    // Populate the teacher data with user info for response
    const populatedTeacher = await Teacher.findById(teacher._id).populate('user_id', 'email first_name last_name');

    res.status(201).json(populatedTeacher);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find().populate('user_id', 'email first_name last_name');
    res.json(teachers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findOne({ user_id: req.user._id }).populate('user_id', 'email first_name last_name');
    
    if (teacher) {
      res.json(teacher);
    } else {
      res.status(404).json({ message: 'Teacher profile not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { createTeacher, getTeachers, getTeacher,registerTeacher };