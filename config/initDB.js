const { database } = require('../config/database');
const bcrypt = require('bcrypt');

(async () => {
  try {
    await database.schema.dropTableIfExists('users');
    console.log('Users table dropped');

    await database.schema.createTable('users', (table) => {
      table.increments('id').primary();
      table.string('nick').unique().notNullable();
      table.string('email').unique().notNullable();
      table.string('password').notNullable();
      table.string('picture'); // optional
      table.string('role').defaultTo('user'); // 'user' or 'admin'
      table.timestamps(true, true);
    });

    console.log('Users table created successfully');
    
    const hashedPassword = await bcrypt.hash('admin', 10);    

    await database('users').insert({
      nick: 'admin',
      email: 'admin@example.com',
      password: hashedPassword,
      picture: null,
      role: 'admin'
    }).then(() => {
      console.log('Admin user created');
    }).catch(err => {
      console.error('Error inserting admin user:', err);
    });
    
    process.exit(0);
  } catch (err) {
    console.error('Error resetting users table:', err);
    process.exit(1);
  }
})();