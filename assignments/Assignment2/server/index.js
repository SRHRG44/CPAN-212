
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables
const recipeRouter = require('./routes/recipe_router'); // Import your recipe router

const app = express();

// Enable CORS for all routes (simplest for development)
app.use(cors());

// Or, enable CORS for specific origins (more secure - for production)
app.use(cors({
  origin: 'http://localhost:3000', // Allow requests from your Next.js app
}));

app.use(express.json()); // Parse JSON request bodies

// MongoDB Connection
const connectionString = process.env.MONGODB_URI;

if (!connectionString) {
  console.error('MongoDB connection string not found in .env file.');
  process.exit(1);
}

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB (assignment2)');
})
.catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});

// Use your recipe router
app.use('/', recipeRouter);

// Basic error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const port = 8001; // Your API port
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});