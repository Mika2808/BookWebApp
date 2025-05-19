const express = require('express');
const router = express.Router();
const reviewsController = require('../controllers/reviewController');
const { verifyToken, isNotAdmin, isSelfOrAdmin, isSelf } = require('../middlewares/auth');

// Route to create a review for a specific book
router.post('/:bookId/reviews', 
    //isNotAdmin, 
    verifyToken, reviewsController.createReview);

// Route to get all reviews for a specific book
router.get('/:bookId/reviews', 
    verifyToken, 
    reviewsController.getReviewsForBook);

// Route to update a specific review (only for the user who created it)
router.put('/:bookId/reviews/:reviewId', 
    //isSelf, 
    verifyToken,
    reviewsController.updateReview);

// Route to delete a specific review (only for the user who created it or an admin)
router.delete('/:bookId/reviews/:reviewId', verifyToken, isSelfOrAdmin, reviewsController.deleteReview);

module.exports = router;
