const knex = require('knex');
const bookshelf = require('bookshelf');

const database = knex({
  client: 'sqlite3',
  connection: {
    filename:'./data/mydb.sqlite'
  },
  useNullAsDefault: true,
});

const bookshelfInstance = bookshelf(database);

module.exports = {
  database,
  bookshelfInstance
};