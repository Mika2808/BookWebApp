const { database } = require('../config/database');
const bcrypt = require('bcrypt');

// Function to create users table
const createUsersTable = async () => {
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
  } catch (error) {
    console.error('Error creating users table:', error);
    throw error;
  }
};

// Function to insert admin user into the users table
const createSampleUsers = async () => {
  try {
    const hashedPasswordAdmin = await bcrypt.hash('admin', 10);
    const hashedPasswordUser1 = await bcrypt.hash('mari', 10);
    const hashedPasswordUser2 = await bcrypt.hash('bor', 10);
    const hashedPasswordUser3 = await bcrypt.hash('nick', 10);

    await database('users').insert([
      {
        nick: 'admin',
        email: 'admin@example.com',
        password: hashedPasswordAdmin,
        picture: null,
        role: 'admin'
      },
      {
        nick: 'mari',
        email: 'mari@example.com',
        password: hashedPasswordUser1,
        picture: null,
        role: 'user'
      },
      {
        nick: 'bor',
        email: 'bor@example.com',
        password: hashedPasswordUser2,
        picture: null,
        role: 'user'
      },
      {
        nick: 'nick',
        email: 'nick@example.com',
        password: hashedPasswordUser3,
        picture: null,
        role: 'user'
      },
      {
        nick: 'admin2',
        email: 'admin2@example.com',
        password: hashedPasswordAdmin,
        picture: null,
        role: 'admin'
      }
    ]);

    console.log('Admin user created');
  } catch (error) {
    console.error('Error inserting admin user:', error);
    throw error;
  }
};

// Function to create books table
const createBooksTable = async () => {
  try {
    await database.schema.dropTableIfExists('books');
    console.log('Books table dropped');

    await database.schema.createTable('books', (table) => {
      table.increments('id').primary();
      table.string('title').notNullable();
      table.string('author').notNullable();
      table.decimal('price', 10, 2).notNullable();
      table.string('category').notNullable();
      table.string('cover'); // optional - can be URL to an image
      table.timestamps(true, true);
    });

    console.log('Books table created successfully');
  } catch (error) {
    console.error('Error creating books table:', error);
    throw error;
  }
};

// Function to insert sample books into the books table
const insertSampleBooks = async () => {
  try {
    await database('books').insert([
      {
        title: '1984',
        author: 'George Orwell',
        price: 29.99,
        category: 'Dystopian',
        cover: null
      },
      {
        title: 'To Kill a Mockingbird',
        author: 'Harper Lee',
        price: 24.99,
        category: 'Classic',
        cover: null
      },
      {
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        price: 19.99,
        category: 'Classic',
        cover: null
      },
      {
        title: 'The Hobbit',
        author: 'J.R.R. Tolkien',
        price: 34.50,
        category: 'Fantasy',
        cover: null
      },
      {
        title: 'Pride and Prejudice',
        author: 'Jane Austen',
        price: 22.00,
        category: 'Romance',
        cover: null
      },
      {
        title: 'Sapiens',
        author: 'Yuval Noah Harari',
        price: 39.90,
        category: 'History',
        cover: null
      },
      {
        title: 'The Catcher in the Rye',
        author: 'J.D. Salinger',
        price: 18.50,
        category: 'Coming-of-age',
        cover: null
      },
      {
        title: 'The Alchemist',
        author: 'Paulo Coelho',
        price: 21.00,
        category: 'Fiction',
        cover: null
      },
      {
        title: 'Atomic Habits',
        author: 'James Clear',
        price: 27.00,
        category: 'Self-help',
        cover: null
      },
      {
        title: 'Harry Potter and the Sorcerer\'s Stone',
        author: 'J.K. Rowling',
        price: 35.00,
        category: 'Fantasy',
        cover: null
      }
    ]);

    console.log('Sample books inserted successfully');
  } catch (error) {
    console.error('Error inserting sample books:', error);
    throw error;
  }
};

// Function to create reviews table
const createReviewsTable = async () => {
  try {
    await database.schema.dropTableIfExists('reviews');
    console.log('Reviews table dropped');

    await database.schema.createTable('reviews', (table) => {
      table.increments('id').primary();
      table.integer('user_id').unsigned().notNullable();
      table.integer('book_id').unsigned().notNullable();
      table.text('review').notNullable();
      table.integer('rating').unsigned().notNullable();
      table.timestamps(true, true); // created_at and updated_at
    });

    // Add foreign key constraints for user_id and book_id
    await database.schema.table('reviews', (table) => {
      table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE');
      table.foreign('book_id').references('id').inTable('books').onDelete('CASCADE');
    });

    console.log('Reviews table created successfully');
  } catch (error) {
    console.error('Error creating reviews table:', error);
    throw error;
  }
};

// Function to insert sample reviews
const insertSampleReviews = async () => {
  try {
    await database('reviews').insert([
      {
        user_id: 2,  // Mari
        book_id: 1,  // Review for "1984"
        review: 'A chilling dystopian vision of the future. Must-read!',
        rating: 5
      },
      {
        user_id: 2,  // Mari
        book_id: 2,  // Review for "To Kill a Mockingbird"
        review: 'A beautifully written novel about justice and racism.',
        rating: 4
      },
      {
        user_id: 3,  // Bor
        book_id: 3,  // Review for "The Great Gatsby"
        review: 'A compelling story of the American Dream and its corruption.',
        rating: 4
      },
      {
        user_id: 4,  // Nick
        book_id: 4,  // Review for "The Hobbit"
        review: 'An adventurous and charming tale of courage.',
        rating: 5
      },
      {
        user_id: 4,  // Nick
        book_id: 5,  // Review for "Pride and Prejudice"
        review: 'A witty and insightful look at love and social expectations.',
        rating: 5
      }
    ]);

    console.log('Sample reviews inserted successfully');
  } catch (error) {
    console.error('Error inserting sample reviews:', error);
    throw error;
  }
};

// Function to create To-read table
async function createToReadTable() {
  await database.schema.dropTableIfExists('to_read');
    console.log('Reviews table dropped');

  await database.schema.createTable('to_read', (table) => {
    table.increments('id').primary();
    table.integer('user_id').unsigned().notNullable()
      .references('id').inTable('users')
      .onDelete('CASCADE');
    table.integer('book_id').unsigned().notNullable()
      .references('id').inTable('books')
      .onDelete('CASCADE');
    table.timestamps(true, true);
    table.unique(['user_id', 'book_id']);
  });
  console.log('To-Read table created');
}

// Main function to reset and populate the database
const resetDatabase = async () => {
  try {
    await createUsersTable();
    await createSampleUsers();
    await createBooksTable();
    await insertSampleBooks();
    await createReviewsTable();
    await insertSampleReviews();
    await createToReadTable();
    
    console.log('Database reset and populated successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error resetting database:', error);
    process.exit(1);
  }
};

resetDatabase();