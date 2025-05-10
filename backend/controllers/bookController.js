const Book = require('../models/Book');

// Get all books
exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.fetchAll();
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch books' });
  }
};

// Get a book by ID
exports.getBookById = async (req, res) => {
  try {
    const book = await Book.where('id', req.params.id).fetch({ require: false });
    if (!book) return res.status(404).json({ error: 'Book not found' });
    res.json(book);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch book' });
  }
};

// Create a new book
exports.createBook = async (req, res) => {
  const { title, author, price, category, cover } = req.body;
  try {
    const newBook = await new Book({ title, author, price, category, cover }).save();
    res.status(201).json(newBook);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create book' });
  }
};

// Update a book
exports.updateBook = async (req, res) => {
  const { id } = req.params;
  const { title, author, price, category, cover } = req.body;
  try {
    const book = await Book.where({ id }).fetch({ require: false });
    if (!book) return res.status(404).json({ error: 'Book not found' });

    await book.save({ title, author, price, category, cover }, { patch: true });
    res.json(book);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update book' });
  }
};

// Delete a book
exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.where('id', req.params.id).fetch({ require: false });
    if (!book) return res.status(404).json({ error: 'Book not found' });

    await book.destroy();
    res.json({ message: 'Book deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete book' });
  }
};

// Get books by category 
exports.getBooksByCategory = async (req, res) => {
  const { category } = req.params;

  try {
    const books = await Book.where('category', category).fetchAll();
    res.json(books);
  } catch (err) {
    console.error('Error fetching books by category:', err);
    res.status(500).json({ error: 'Failed to fetch books by category' });
  }
};

// Get random book
exports.getRandomBook = async (req, res) => {
  try {
    const books = await Book.find();
    if (books.length === 0) {
      return res.status(404).json({ message: 'No books available' });
    }
    const randomBook = books[Math.floor(Math.random() * books.length)];
    res.json(randomBook);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch random book' });
  }
};

