const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const { verifyToken, isAdmin, isSelfOrAdmin } = require('../middlewares/auth');

// GET all books
router.get('/', verifyToken, bookController.getAllBooks);

// GET random book ("Book Roulette")
router.get('/roulette', verifyToken, bookController.getRandomBook);

// GET a book by ID
router.get('/:id', verifyToken, bookController.getBookById);

// POST a new book
router.post('/', verifyToken, isAdmin, bookController.createBook);

// PUT (update) a book by ID
router.put('/:id', verifyToken, isAdmin, bookController.updateBook);

// DELETE a book by ID
router.delete('/:id', verifyToken, isAdmin, bookController.deleteBook);

// GET books by category
router.get('/category/:category', verifyToken, bookController.getBooksByCategory);


module.exports = router;
