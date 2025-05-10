const ToRead = require('../models/ToRead');
const Book = require('../models/Book');

// Add book to user's to-read list
exports.addToRead = async (req, res) => {
  const userId = req.user.id;
  const bookId = req.params.id;

  try {
    // Check if already added
    const existing = await ToRead.where({ user_id: userId, book_id: bookId }).fetch({ require: false });
    if (existing) {
      return res.status(400).json({ message: 'Book already in to-read list' });
    }

    const entry = await new ToRead({ user_id: userId, book_id: bookId }).save();
    res.status(201).json(entry);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error adding to to-read list' });
  }
};

// Get user's full to-read list
exports.getToReadList = async (req, res) => {
  const userId = req.user.id;

  try {
    const list = await ToRead.where({ user_id: userId }).fetchAll({ withRelated: ['book'] });
    res.status(200).json(list);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error retrieving to-read list' });
  }
};

// Remove a book from the list
exports.removeFromToRead = async (req, res) => {
  const userId = req.user.id;
  const bookId = req.params.id;

  try {
    const entry = await ToRead.where({ user_id: userId, book_id: bookId }).fetch({ require: false });

    if (!entry) {
      return res.status(404).json({ message: 'Book not found in your to-read list' });
    }

    await entry.destroy();
    res.status(200).json({ message: 'Removed from to-read list' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error removing from to-read list' });
  }
};
