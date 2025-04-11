const User = require('../models/user');
const { hashPassword, comparePassword, generateToken } = require('../middlewares/auth');

exports.registerUser = async (req, res) => {
  console.log('registerUser function called!');
  console.log('req.body:', req.body);
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(409).json({ message: 'Username or email already exists' });
    }

    // Hash the password using the middleware
    // req.body.password = await hashPassword(null, null, () => {});

    const newUser = new User({
      username,
      email,
      password: req.body.password,
    });

    const savedUser = await newUser.save();
    const token = generateToken(savedUser._id, savedUser.username, savedUser.email);
    res.status(201).json({ token, userId: savedUser._id, username: savedUser.username, email: savedUser.email }); // Send token on registration
  } catch (err) {
    console.error('Error in registerUser:', err);
    res.status(400).json({ message: err.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Attach user to res.locals for comparePassword middleware
    res.locals.user = user;

    // Compare the password using the middleware
    await comparePassword(req, res, () => {}); // Simulate middleware call

    if (res.statusCode === 401) return; // If comparePassword failed

    const token = generateToken(user._id, user.username, user.email);
    res.json({ token, userId: user._id, username: user.username, email: user.email, message: 'Login successful' }); // Send token on login
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};