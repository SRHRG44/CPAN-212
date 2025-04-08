const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  orderDate: { type: Date, default: Date.now },
  mealsPerDay: { type: Number, required: true, enum: [1, 2] },
  durationWeeks: { type: Number, required: true },
  totalMeals: { type: Number, required: true },
  selectedRecipes: [
    {
      recipeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe', required: true },
      quantity: { type: Number, required: true, min: 1 },
    },
  ],
  // You might want to add a status field (e.g., 'pending', 'processing', 'completed')
});

const Order = mongoose.model('Order', orderSchema, 'orders'); // Collection name 'orders'

module.exports = Order;