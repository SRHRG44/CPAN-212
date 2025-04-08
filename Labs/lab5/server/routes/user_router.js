const express = require('express');
const router = express.Router();
const userController = require('../Controllers/user_controller');
const { hashPassword } = require('../middlewares/auth');

// POST register a new user (apply hashPassword middleware)
router.post('/register', hashPassword, userController.registerUser);

// POST login user (password comparison is done in the controller for now)
router.post('/login', userController.loginUser);

// GET user by ID (example of a protected route using verifyToken - implement verifyToken)
// const { verifyToken } = require('../middlewares/auth');
// router.get('/users/:id', verifyToken, userController.getUserById);

router.get('/users/:id', userController.getUserById); // Leaving unprotected for now

module.exports = router;