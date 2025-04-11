const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config(); // Load environment variables for JWT secret

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'; // Use a strong, environment-specific secret

// Middleware to hash the password before saving a new user
exports.hashPassword = async (req, res, next) => {
  try {
    if (req.body.password) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      req.body.password = hashedPassword;
    }
    next();
  } catch (error) {
    return res.status(500).json({ message: 'Error hashing password' });
  }
};

// Middleware to compare provided password with the stored hash during login
exports.comparePassword = async (req, res, next) => {
  try {
    const user = res.locals.user;
    if (!user || !req.body.password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    next();
  } catch (error) {
    return res.status(500).json({ message: 'Error comparing passwords' });
  }
};

// Function to generate a JWT token
exports.generateToken = (userId, username, email) => {
  return jwt.sign({ userId, username, email }, JWT_SECRET, { expiresIn: '1h' }); // Token expires in 1 hour
};

// Middleware to verify the JWT token
exports.verifyToken = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};