const { bookshelfInstance } = require('../config/database');

const ToRead = bookshelfInstance.model('to_read', {
  tableName: 'to_read',
  hasTimestamps: true,
  
  book() {
    return this.belongsTo('Book', 'book_id');
  }
});

module.exports = ToRead;