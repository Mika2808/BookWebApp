const express = require('express');
const app = express();
const port = 1234;

// A simple route for testing
app.get('/', (req, res) => {
  res.send('Hello, Book Review Web App!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
