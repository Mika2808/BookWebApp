const { database } = require('../config/database');

// Create a new review
exports.createReview = async (req, res) => {
  const { bookId } = req.params;
  const { review } = req.body;
  const userId = req.user.id; 
  const rating = 5;

  try {
    // Insert review into the database
    const newReview = await database('reviews').insert({
      user_id: userId,
      book_id: bookId,
      review,
      rating
    }).returning('*');

    res.status(201).json(newReview[0]);
  } catch (err) {
    console.error('Error creating review:', err);
    res.status(500).json({ error: 'Failed to create review' });
  }
};

// Get all reviews for a specific book
exports.getReviewsForBook = async (req, res) => {
  const { bookId } = req.params;

  try {
    const reviews = await database('reviews')
      .where('book_id', bookId)
      .join('users', 'users.id', '=', 'reviews.user_id')
      .select('reviews.id', 'reviews.review', 'reviews.rating', 'users.nick', 'reviews.created_at');

    res.status(200).json(reviews);
  } catch (err) {
    console.error('Error getting reviews:', err);
    res.status(500).json({ error: 'Failed to get reviews' });
  }
};

// Update a review
exports.updateReview = async (req, res) => {
  const { bookId, reviewId } = req.params;
  const { review, rating } = req.body;
  const userId = req.user.id; 

  try {
    const reviewToUpdate = await database('reviews')
      .where({ id: reviewId, book_id: bookId, user_id: userId })
      .first();

    if (!reviewToUpdate) {
      return res.status(404).json({ error: 'Review not found or unauthorized' });
    }

    // Update the review
    await database('reviews')
      .where({ id: reviewId })
      .update({ review, rating });

    res.status(200).json({ message: 'Review updated successfully' });
  } catch (err) {
    console.error('Error updating review:', err);
    res.status(500).json({ error: 'Failed to update review' });
  }
};

// Delete a review
exports.deleteReview = async (req, res) => {
  const { bookId, reviewId } = req.params;
  const userId = req.user.id;
  const userRole = req.user.role; // Assuming role is available in user object

  try {
    const reviewToDelete = await database('reviews')
      .where({ id: reviewId, book_id: bookId })
      .first();

    if (!reviewToDelete) {
      return res.status(404).json({ error: 'Review not found' });
    }

    // Delete the review
    await database('reviews').where({ id: reviewId }).del();

    res.status(200).json({ message: 'Review deleted successfully' });
  } catch (err) {
    console.error('Error deleting review:', err);
    res.status(500).json({ error: 'Failed to delete review' });
  }
};
