import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../api/axios';

function BookDetailsPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const token = localStorage.getItem('token');

  const [book, setBook] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [addStatus, setAddStatus] = useState('');

  const toggleSidebar = () => setSidebarExpanded((prev) => !prev);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('nick');
    localStorage.removeItem('id');
    navigate('/');
  };

  const fetchBook = async () => {
    try {
      const res = await axios.get(`/books/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBook(res.data);
    } catch (err) {
      console.error('Error fetching book:', err);
    }
  };

  const fetchComments = async () => {
    try {
      const res = await axios.get(`/books/${id}/reviews`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setComments(res.data);
    } catch (err) {
      console.error('Error fetching comments:', err);
    }
  };

  const submitComment = async () => {
    try {
      await axios.post(
        `/books/${id}/reviews`,
        { review: newComment },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNewComment('');
      fetchComments();
    } catch (err) {
      console.error('Error submitting comment:', err);
    }
  };

  const handleAddToRead = async () => {
    try {
      setAddStatus('adding');
      await axios.post(`/to-read/books/${id}`, null, {
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

  useEffect(() => {
    fetchBook();
    fetchComments();
  }, [id]);

  if (!book) return <div>Loading...</div>;

  return (
    <div className="layout">
      <aside className={`sidebar ${sidebarExpanded ? 'expanded' : 'collapsed'}`}>
        <ul className="feature-list">
          <li>
            <a href="/home" className="feature-link">
              <img src="/src/img/house.svg" alt="Home" className="feature-icon" />
              {sidebarExpanded && <span>Home</span>}
            </a>
          </li>
          <li>
            <a href="/books" className="feature-link">
              <img src="/src/img/search.svg" alt="Search Book" className="feature-icon" />
              {sidebarExpanded && <span>Search Book</span>}
            </a>
          </li>
          <li>
            <a href="/to-read" className="feature-link">
              <img src="/src/img/list.svg" alt="To-Read List" className="feature-icon" />
              {sidebarExpanded && <span>To-Read List</span>}
            </a>
          </li>
          <li>
            <a href="/random-book" className="feature-link">
              <img src="/src/img/dice.svg" alt="Book Roulette" className="feature-icon" />
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
          <h1>Book</h1>
          <button onClick={handleLogout} className="logout-btn">
            <img src="/src/img/exit.svg" alt="Log out" className="logout-icon" />
          </button>
        </div>

        <div className="feature-body" style={{ height: '80vh', overflowY: 'auto' }}>
          <div style={{ display: 'flex', padding: '2em', height:'50vh', minHeight: '500px'}}>
            <div className='book-image-detailed'>
              <img
                src={book.cover}
                alt={book.title}
                style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
              />
            </div>
            <div style={{ flexGrow: 1, margin: '4vh' }}>
              <h2>{book.title}</h2>
              <p><strong>Author:</strong> {book.author}</p>
              <p><strong>Category:</strong> {book.category}</p>
              <p><strong>Price:</strong> ${book.price}</p>
              <button onClick={handleAddToRead}>
                {addStatus === 'adding' ? 'Adding...' : 'Add to To-Read List'}
                {addStatus === 'error' && <p style={{ color: 'red' }}>❌ Failed to add book.</p>}
                {addStatus === 'added' && <p style={{ color: 'green' }}>✅ Book added!</p>}
              </button>
            </div>
          </div>

          <div style={{ padding: '2em', borderTop: '1px solid #ccc', height:'80vh'}}>
            <div style={{minHeight: '250px', marginBottom:'3rem'}}>
                <h2>Comments</h2>
                <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                rows="3"
                style={{ width: '100%', marginBottom: '1em', fontSize: '1.2rem' }}
                placeholder="Add your comment..."
                />
                <button onClick={submitComment}>Submit</button>
            </div>
            
            <div style={{ padding: '1em', borderTop: '1px solid #ccc', marginBottom:'1rem'}}>
                <h2>Other comments</h2>             
                {comments.map((comment) => (
                    <div key={comment.id} className='comment-page'>
                        <div style={{ flexGrow: 1, margin: '1em' }}>
                            <strong style={{ fontSize: '1.5rem', textAlign:'left'}}>{comment.nick}</strong>
                            <p><em>{comment.review}</em></p>
                        </div>
                    </div>
                ))}
            </div>
          </div>
        </div>

        <div className="page-footer" style={{ height: '10vh' }}>
          <footer>© 2025 Web Technologies Project</footer>
        </div>
      </main>
    </div>
  );
}

export default BookDetailsPage;