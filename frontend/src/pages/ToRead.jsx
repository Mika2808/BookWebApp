import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';

function ToReadPage() {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  
  const userId = localStorage.getItem('id');
  const token = localStorage.getItem('token');

  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const toggleSidebar = () => {
    setSidebarExpanded(prev => !prev);
  };
  
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
    <div className="layout">
      <aside className={`sidebar ${sidebarExpanded ? 'expanded' : 'collapsed'}`}>
        <ul className="feature-list">
          <li>
            <a href="/home" className="feature-link">
              <img src="src/img/house.svg" alt="Home" className="feature-icon" />
              {sidebarExpanded && <span>Home</span>}
            </a>
          </li>
          <li>
            <a href="/books" className="feature-link">
              <img src="src/img/search.svg" alt="Search Book Image" className="feature-icon" />
              {sidebarExpanded && <span>Search Book</span>}
            </a>
          </li>
          <li>
            <a href="/to-read" className="feature-link">
              <img src="src/img/list.svg" alt="To-Read List Image" className="feature-icon" />
              {sidebarExpanded && <span>To-Read List</span>}
            </a>
          </li>
          <li>
            <a href="/random-book" className="feature-link">
              <img src="src/img/dice.svg" alt="Book Roulette Image" className="feature-icon" />
              {sidebarExpanded && <span>Book Roulette</span>}
            </a>
          </li>
        </ul>
        <button className="toggle-btn" onClick={toggleSidebar}>
          {sidebarExpanded ? '<' : '>'}
        </button>
      </aside>

      <main className="main-content">
        <div className="feature-header" style={{ height: '10vh' }}>
          <h1>To-Read List</h1>
          <div>
            <button onClick={handleLogout} className="logout-btn" title="Log out">
              <img src="src/img/exit.svg" alt="Log out" className="logout-icon" />
            </button>
          </div>
        </div>

        <div className="feature-body" style={{ height: '80vh' }}>
          
          <div style={{ marginTop: '2rem' }}>
            {books.length === 0 ? (
              <p>No books available.</p>
            ) : (
              <ul>
                {books.map((entry) => (
                  <li key={entry.id} style={{ marginBottom: '1rem' }}>
                    <strong>{entry.book.title}</strong> by <em>{entry.book.author}</em>
                    <button
                      onClick={() => handleDelete(entry.book.id)}
                      style={{ marginLeft: '1rem' }}
                    >
                      ❌
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="page-footer" style={{ height: '10vh' }}>
          <footer>© 2025 Web Technologies Project</footer>
        </div>
      </main>
    </div>
  );
}

export default ToReadPage;
