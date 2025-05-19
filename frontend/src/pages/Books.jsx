import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';

function BooksPage() {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const booksPerPage = 5;
  const totalPages = Math.ceil(books.length / booksPerPage);
  const paginatedBooks = books.slice((page - 1) * booksPerPage, page * booksPerPage);
  
  const token = localStorage.getItem('token');
  const [addStatusMap, setAddStatusMap] = useState({});
  
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

  const addToRead = async (bookId) => {
      try {
        setAddStatusMap((prev) => ({ ...prev, [bookId]: 'adding' }));
        await axios.post(`/to-read/books/${bookId}`, null, {
          headers: { Authorization: `Bearer ${token}` },
        });
        //alert('Added to your To-Read list!');
        setAddStatusMap((prev) => ({ ...prev, [bookId]: 'added' }));

        // Clear message after 3 seconds
        setTimeout(() => {
          setAddStatusMap((prev) => {
            const updated = { ...prev };
            delete updated[bookId];
            return updated;
          });
        }, 3000);

      } catch (err) {
        console.error('Error adding book:', err);
        //alert('Failed to add book to To-Read list.');
        setAddStatusMap((prev) => ({ ...prev, [bookId]: 'error' }));

        // Clear message after 3 seconds
        setTimeout(() => {
          setAddStatusMap((prev) => {
            const updated = { ...prev };
            delete updated[bookId];
            return updated;
          });
        }, 3000);
      }
    };

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get('/books', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBooks(res.data);
      } catch (err) {
        console.error('Error fetching books:', err);
      }
    };
    fetchBooks();
  }, []);

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
              <img src="src/img/search.svg" alt="Search Book" className="feature-icon" />
              {sidebarExpanded && <span>Search Book</span>}
            </a>
          </li>
          <li>
            <a href="/to-read" className="feature-link">
              <img src="src/img/list.svg" alt="To-Read List" className="feature-icon" />
              {sidebarExpanded && <span>To-Read List</span>}
            </a>
          </li>
          <li>
            <a href="/random-book" className="feature-link">
              <img src="src/img/dice.svg" alt="Book Roulette" className="feature-icon" />
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
          <h1>Books Page</h1>
          <div>
            <button onClick={handleLogout} className="logout-btn" title="Log out">
              <img src="src/img/exit.svg" alt="Log out" className="logout-icon" />
            </button>
          </div>
        </div>

        <div className="feature-body" style={{ height: '80vh', overflowY: 'auto' }}>
          {paginatedBooks.map((book) => (
            <div key={book.id} className='book-page'>
              <div className='book-image-body'>
                {book.cover ? (
                  <img
                    src={book.cover}
                    alt={book.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    No Image
                  </div>
                )}
              </div>

              <div style={{ flexGrow: 1, margin: '2em' }}>
                <strong style={{ fontSize: '1.2em' }}>{book.title}</strong>
                <br />
                by <em>{book.author}</em>

                <div style={{ margin: '2em' }}>
                  <button onClick={() => navigate(`/books/${book.id}`)}>See more</button>
                </div>
              </div>

            </div>
          ))}

          <div style={{ marginTop: '2em' }}>
            <button disabled={page === 1} onClick={() => setPage(page - 1)}>
              {"<"}
            </button>
            <span style={{ margin: '0 1em' }}>
              Page {page} of {totalPages}
            </span>
            <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>
              {">"}
            </button>
          </div>
        </div>

        <div className="page-footer" style={{ height: '10vh' }}>
          <footer>© 2025 Web Technologies Project</footer>
        </div>
      </main>
    </div>
  );
}

export default BooksPage;
