# Book Review Web App

## Stage 1 – Backend (Complete)

### Overview
A RESTful API for a book-focused web application inspired by platforms like Empik. Users can register, browse books by category, review them, and manage a personal "To Read" list. Admins have extended permissions for managing content.

### Implemented Features

#### User Authentication & Security
- User registration and login with:
  - Hashed passwords using **bcrypt**
  - Unique `email` and `nick` validation
- JWT-based **authentication and role-based authorization**
  - Admin users can manage all content
  - Regular users can only edit their own data
- Middleware for token verification and access control

#### Book Management
- Database schema for books with fields:
  - Title, Author, Price, Category, Cover Image
- CRUD operations for books
  - **Only admins** can create, update, or delete books
- Browse books by:
  - All books
  - Category
  - Random (Book Roulette)

#### Reviews System
- Users can:
  - Add a review (rating + comment)
  - Edit or delete their own reviews
- Admins can delete any review
- API paths structured as `/books/:id/reviews`

#### "To Read" List
- Users can:
  - Add books to their personal list
  - View their saved books
  - Remove books from the list
- API paths structured for both book-level and user-level access

#### Data Validation
- Server-side input validation for:
  - Unique nicknames and emails
  - Proper email format
  - Presence of required fields

---

## Stage 2 – Client (Coming Next)

### Goals
- Build a **Progressive Web App (PWA)** using Vite + React
- Implement all backend functionalities via frontend
- Add client-side validation before submitting to backend
- Cache content for offline use
- Use at least one native feature (e.g., notifications or geolocation)