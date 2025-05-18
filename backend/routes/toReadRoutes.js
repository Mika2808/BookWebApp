const express = require('express');
const router = express.Router();
const toReadController = require('../controllers/toReadController');
const { verifyToken, isSelfOrAdmin, isSelf } = require('../middlewares/auth');

// Add book to the to-read list (authenticated user)
router.post('/books/:id', 
    //verifyToken, 
    toReadController.addToRead);

// Get all books in user's to-read list (authenticated user)
router.get('/list/:id', 
    verifyToken, 
    //isSelfOrAdmin, 
    toReadController.getToReadList);

// Remove book from to-read list (authenticated user)
router.delete('/books/:id', 
    verifyToken, 
    //isSelf, 
    toReadController.removeFromToRead);

module.exports = router;
