const { bookshelfInstance } = require('../config/database');

const ToRead = bookshelfInstance.model('to_read', {
  tableName: 'to_read',
  hasTimestamps: true
});

module.exports = ToRead;