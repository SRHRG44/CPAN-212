const express = require('express');
const router = express.Router();
const userController = require('../Controllers/user_controller');
const { hashPassword } = require('../middlewares/auth');

router.post('/register', hashPassword, userController.registerUser);

router.post('/login', userController.loginUser);

// GET user by ID (example of a protected route using verifyToken - implement verifyToken)
// const { verifyToken } = require('../middlewares/auth');
// router.get('/users/:id', verifyToken, userController.getUserById);

router.get('/users/:id', userController.getUserById);

module.exports = router;