import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from '../api/axios';

function RandomBookPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [randomBook, setRandomBook] = useState('');
  const [error, setError] = useState('');
  const [addStatus, setAddStatus] = useState('');
  const navigate = useNavigate();
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

  const handleRoulette = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors
    setIsSubmitting(true);
    setAddStatus('');

    try {
      const res = await axios.get('/books/roulette',{
        headers: {
          Authorization: 'Bearer ${token}', 
        }
      });
      setRandomBook(res.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Cannot perform roulette.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleAddToRead = async () => {
    if (!randomBook) return;

    try {
      setAddStatus('adding');
      await axios.post(`/to-read/books/${randomBook.id}`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      setAddStatus('added');

      // Clear message after 3 seconds
      setTimeout(() => setAddStatus(''), 3000);

      //alert(`"${randomBook.title}" added to your To-Read list!`);
    } catch (err) {
      console.error(err);
      //alert('Failed to add book to To-Read list.');
      setAddStatus('error');

      // Clear message after 3 seconds
      setTimeout(() => setAddStatus(''), 3000);

    }
  };

  return (
    <div className="layout">
      <aside className={`sidebar ${sidebarExpanded ? 'expanded' : 'collapsed'}`}>
        <ul className="feature-list">
          <li>
              <a href="/home" className="feature-link">
                <img src="src/img/house.svg" alt="Home" className="feature-icon"/>
                {sidebarExpanded && <span>Home</span>}
              </a>
          </li>
          <li>
            <a href="/books" className="feature-link">
              <img src="src/img/search.svg" alt="Search Book Image" className="feature-icon"/>
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
          <h1>Book Roulette</h1>
          <div>
            <button onClick={handleLogout} className="logout-btn" title="Log out">
              <img src="src/img/exit.svg" alt="Log out" className="logout-icon" />
            </button>
          </div>
        </div>

        <div className="feature-body" style={{ height: '80vh' }}>

          <div style={{ marginTop: '40px', height: '20vh' }}>
            <button onClick={handleRoulette} disabled={isSubmitting}>
              {isSubmitting ? '.......' : '🎲 Book Roulette'}
            </button>
          </div>

          {error && <p style={{ color: 'red' }}>{error}</p>}

          {randomBook && (
            <div>
              <div style={{ height: '30vh' }}>
                <h2>{randomBook.title}</h2>
                <p><strong>Author:</strong> {randomBook.author}</p>
                <p><strong>Category:</strong> {randomBook.category}</p>
              </div>

              <div style={{ marginBottom: '40px', height: '20vh' }}>
                <button onClick={handleAddToRead} disabled={addStatus === 'adding'}>
                  {addStatus === 'adding' ? 'Adding...' : 'Add to To-Read List'}
                  {addStatus === 'error' && <p style={{ color: 'red' }}>❌ Failed to add book.</p>}
                  {addStatus === 'added' && <p style={{ color: 'green' }}>✅ Book added!</p>}
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="page-footer" style={{ height: '10vh' }}>
          <footer>© 2025 Web Technologies Project</footer>
        </div>
      </main>
    </div>
  );
}

export default RandomBookPage;
