# Book Review Web App

## Stage 1 – Backend (Complete)

### Overview
A RESTful API for a book-focused web application inspired by platforms like Empik. Users can register, browse books by category, review them, and manage a personal "To Read" list. Admins have extended permissions for managing content.

### Implemented Features

#### User Authentication & Security
- Secure registration and login:
  - Passwords hashed with bcrypt
  - Unique `email` and `nick` constraints
- JWT-based authentication and role-based authorization:
  - Admin users can manage all data
  - Regular users can modify only their own content
- Middleware for token verification and role access control

#### Book Management
- Full CRUD operations for books:
  - Fields include: Title, Author, Price, Category, Cover Image
- Browse books by:
  - All books
  - Category
  - Random selection ("Book Roulette")
- Only admins can add, update, or delete books

#### Review System
- Users can:
  - Add, edit, and delete their own reviews (rating + comment)
- Admins can delete any review
- API routes follow the structure `/books/:id/reviews`

#### "To Read" List
- Users can:
  - Add and remove books from their personal list
  - View saved books
- Separate endpoints for user-level and book-level operations

#### Validation
- Server-side validation for:
  - Unique emails and nicknames
  - Valid email format
  - Required field presence

---

## Stage 2 – Frontend (Complete)

### Overview
A modern web client built with React and Vite. All backend functionality is implemented in a responsive and interactive user interface.

### Implemented Features

#### User Interface
- Clean, minimal UI with navigation and status messages
- Public and authenticated routes
- Role-based UI control (admin vs regular user)

#### Book Browsing
- Paginated book listings
- Individual book pages with:
  - Description
  - Cover
  - Reviews

#### Review System
- Authenticated users can add new reviews
- Reviews are displayed on book detail pages

#### Authentication
- Token-based login with JWT stored in localStorage
- Login and registration forms with validation
- Auto-logout and protected route support

#### "To Read" List
- Users can:
  - Add books to a personal reading list
  - Remove books from the list
  - View their saved books

#### Styling and Layout
- Custom CSS styling including:
  - Colored header with white text
  - Rounded layout containers
  - Dark buttons with white/gray text
  - Responsive and centered forms with styled inputs and padding

---

## Tech Stack

- Backend: Node.js, Express, PostgreSQL
- Authentication: JWT and bcrypt
- Frontend: React, Vite
- Styling: Custom CSS (with responsive design)
