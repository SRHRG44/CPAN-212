const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables
const recipeRouter = require('./routes/recipe_router');
const userRouter = require('./routes/user_router');
const orderRouter = require('./routes/order_router');
const feedbackRouter = require('./routes/feedback_router');

const app = express();

// Enable CORS for all routes (simplest for development)
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json()); // Parse JSON request bodies

// MongoDB Connection
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/lab5'; // Default to lab5 if URI is not in .env

if (!process.env.MONGODB_URI) {
  console.warn('MongoDB connection string not found in .env file. Using default: mongodb://localhost:27017/lab5');
}

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB (lab5)');
})
.catch((err) => {
  console.error('Error connecting to MongoDB:', err);
  process.exit(1); // Exit the process if MongoDB connection fails
});

// Use your routers
app.use('/api', recipeRouter);
app.use('/api', userRouter);
app.use('/api', orderRouter);
app.use('/api', feedbackRouter);

// Basic error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Your API port
const port = 8001;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});