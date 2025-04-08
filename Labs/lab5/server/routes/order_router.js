const express = require('express');
const router = express.Router();
const orderController = require('../Controllers/order_controller');

// POST a new order
router.post('/orders', orderController.createOrder);

// GET orders for a specific user
router.get('/users/:userId/orders', orderController.getOrdersByUser);

// GET a specific order by ID
router.get('/orders/:id', orderController.getOrderById);

module.exports = router;