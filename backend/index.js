const express = require('express');
const userRoutes = require('./routes/userRoutes');
const bookRoutes = require('./routes/bookRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const toReadRoutes = require('./routes/toReadRoutes');
const cors = require('cors');
const port = 1234;

const app = express();

app.use(cors({
  origin: 'http://localhost:5173-', // Your frontend URL
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'], // Include 'Authorization' if you're using a token
  credentials: true // Allow credentials such as cookies and authorization headers
}));

// Middleware to parse incoming JSON requests
app.use(express.json());

// Use the user routes
app.use('/users', userRoutes); // All user routes will be prefixed with /api/users

// Use the books routes
app.use('/books', bookRoutes);

// Use the books reviews routes
app.use('/books', reviewRoutes);

// Use the toRead routes
app.use('/to-read', toReadRoutes);

// A simple route for testing
app.get('/', (req, res) => {
  res.send('Hello, Book Review Web App!');
});

// Listening to the port
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});