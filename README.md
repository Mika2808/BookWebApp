# Book Review Web App

## Stage 1

### Overview
The project aims to create a web app similar to the Empik store in Poland, with a focus on books. Users will be able to browse books in different categories, check prices, add books to a "To Read" list, and leave reviews. Additionally, there will be a "Book Roulette" feature where users can discover a randomly selected book.

The backend will handle:
- Full REST service
- User core functionality (user database, encrypted passwords, authorization, validating user input)
- Books database (storing all books, CRUD operations for user reviews)

### Objectives

#### 1. User Authentication
- Create a database for users to store `nick`, `password`, `email`, and `picture`.
- Implement secure user registration and login.
- Implement a system for validating user input (e.g., email format, password strength, and nick availability).
- Implement **role-based access control**: Only admins can perform certain actions, such as adding, deleting, or updating books.

#### 2. Book Management
- Create a database for books to store details such as:
  - Title
  - Author
  - Price
  - Category
  - Book cover image URL
- Admin-only CRUD operations:
  - **Adding new books** to the database.
  - **Deleting books** from the database.
  - **Updating books** in the database.

#### 3. User Review System
- Implement a review system where users can leave reviews for books, including:
  - A **star rating** (scale 0-5 stars).
  - A **comment section** for detailed feedback.
- CRUD operations for reviews:
  - **POST**: Add a review for a book.
  - **PUT**: Update a review.
  - **DELETE**: Delete a review.

#### 4. "To Read" List Management
- Implement a feature that allows users to save chosen books to their "To Read" list in the user database.

#### 5. Book Roulette (Random Book Feature)
- Implement a feature to select a random book from the book database and display it to the user.
