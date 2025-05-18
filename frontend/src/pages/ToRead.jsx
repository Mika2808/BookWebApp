import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';

function ToReadPage() {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  
  const userId = localStorage.getItem('id');
  const token = localStorage.getItem('token');

  
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('nick');
    localStorage.removeItem('id');
    
    navigate('/');
  };

  // Upload all books in list
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get(`/to-read/list/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        //console.log('Response data:', res.data);  // <-- Add this
        setBooks(res.data);
      } catch (err) {
        console.error('Error fetching books:', err);
      }
    };

    fetchBooks();
  }, []);

  // Delete book from list
  const handleDelete = async (bookId) => {
      try {
        await axios.delete(`/to-read/books/${bookId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // Update UI by removing deleted book
        setBooks((prevBooks) => prevBooks.filter((entry) => entry.book.id !== bookId));
      } catch (err) {
        console.error('Error deleting book:', err);
      }
    };

  return (
    <div>
      <h2>To Read page with list of your favourite books</h2>

      <div>
        <button onClick={() => navigate('/home')}>Back to home</button>
        <button onClick={handleLogout}>Log out</button>
      </div>

      <div>
        {books.length === 0 ? (
          <p>No books available.</p>
        ) : (
          <ul>
            {books.map((entry) => (
              <li key={entry.id}>
                <strong>{entry.book.title}</strong> by <em>{entry.book.author}</em>
                <button onClick={() => handleDelete(entry.book.id)}>Delete</button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <footer>© 2025 Web Technologies Project</footer>
    </div>
  );
}

export default ToReadPage;
