const express = require('express');
const { database } = require('./config/database');
const userRoutes = require('./routes/userRoutes');

const port = 1234;

const app = express();

// Middleware to parse incoming JSON requests
app.use(express.json());

// Use the user routes
app.use('/users', userRoutes); // All user routes will be prefixed with /api/users

// A simple route for testing
app.get('/', (req, res) => {
  res.send('Hello, Book Review Web App!');
});

// Listening to the port
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// Test database connection
database.raw('SELECT 1+1 AS result')  // Simple query to test connection
  .then(() => {
    console.log('Database connected successfully!');
  })
  .catch((err) => {
    console.log('Error connecting to the database:', err);
  });
