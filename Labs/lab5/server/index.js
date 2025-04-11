const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const recipeRouter = require('./routes/recipe_router');
const userRouter = require('./routes/user_router');
const orderRouter = require('./routes/order_router');
const feedbackRouter = require('./routes/feedback_router');

const app = express();

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

// Log every incoming request
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

app.use('/api', recipeRouter);
app.use('/api', userRouter);
app.use('/api', orderRouter);
app.use('/api', feedbackRouter);

// Basic error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const port = 8001;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
  console.log('Connected to MongoDB (lab5)');
});

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/lab5', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connection successful (again)!'))
.catch((err) => console.error('Error connecting to MongoDB:', err));