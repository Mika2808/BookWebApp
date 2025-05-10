const { bookshelfInstance } = require('../config/database');

const Book = bookshelfInstance.model('Book', {
  tableName: 'books',
  hasTimestamps: true
});

module.exports = Book;
