import validator from 'validator';

export const validateRegisterInput = (req, res, next) => {
  const { email, first_name, last_name, password } = req.body;

  if (!email || !first_name || !last_name || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  if (!validator.isEmail(email)) {
    return res.status(400).json({ message: 'Invalid email format' });
  }

  if (password.length < 6) {
    return res.status(400).json({ message: 'Password must be at least 6 characters' });
  }

  if (first_name.trim().length < 2) {
    return res.status(400).json({ message: 'First name must be at least 2 characters' });
  }

  if (last_name.trim().length < 2) {
    return res.status(400).json({ message: 'Last name must be at least 2 characters' });
  }

  next();
};

export const validateTeacherInput = (req, res, next) => {
  const { university_name, gender, year_joined, department, specialization } = req.body;

  if (!university_name || !gender || !year_joined || !department || !specialization) {
    return res.status(400).json({ message: 'All teacher fields are required' });
  }

  if (university_name.trim().length < 2) {
    return res.status(400).json({ message: 'University name must be at least 2 characters' });
  }

  const validGenders = ['Male', 'Female', 'Other'];
  if (!validGenders.includes(gender)) {
    return res.status(400).json({ message: 'Gender must be Male, Female, or Other' });
  }

  const currentYear = new Date().getFullYear();
  if (year_joined < 1950 || year_joined > currentYear) {
    return res.status(400).json({ 
      message: `Year joined must be between 1950 and ${currentYear}` 
    });
  }

  if (department.trim().length < 2) {
    return res.status(400).json({ message: 'Department must be at least 2 characters' });
  }

  if (specialization.trim().length < 2) {
    return res.status(400).json({ message: 'Specialization must be at least 2 characters' });
  }

  next();
};