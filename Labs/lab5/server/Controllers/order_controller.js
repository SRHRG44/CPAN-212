const Order = require('../models/order');

// POST a new order
exports.createOrder = async (req, res) => {
  try {
    const { userId, mealsPerDay, durationWeeks, selectedRecipes } = req.body;
    const totalMeals = mealsPerDay * durationWeeks * 7; // Calculate total meals

    const newOrder = new Order({
      userId,
      mealsPerDay,
      durationWeeks,
      totalMeals,
      selectedRecipes,
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// GET orders for a specific user
exports.getOrdersByUser = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId }).populate('selectedRecipes.recipeId', 'name'); // Populate recipe name
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET a specific order by ID
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('selectedRecipes.recipeId', 'name');
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// You might want to add more order-related controllers (e.g., updating order status - but based on your initial request, creation and retrieval are key)