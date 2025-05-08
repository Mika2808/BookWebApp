const { bookshelfInstance } = require('../config/database');

const User = bookshelfInstance.model('User', {
  tableName: 'users',
  hasTimestamps: true // optional, adds created_at and updated_at
});

module.exports = User;
