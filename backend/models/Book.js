const { bookshelfInstance } = require('../config/database');

const Book = bookshelfInstance.model('Book', {
  tableName: 'books',
  hasTimestamps: true, 

  toReadEntries() {
    return this.hasMany('ToRead', 'book_id');
  }
});

module.exports = Book;
