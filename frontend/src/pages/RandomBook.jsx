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
    <div>
      <h2>Book roulette</h2>
      
      <div>
        <button onClick={() => navigate('/home')}>Back to home</button>
        <button onClick={handleLogout}>Log out</button>
      </div>
      
      <div>
        <button onClick={handleRoulette} disabled={isSubmitting}>
              {isSubmitting ? '.......' : 'Book Roulette'}</button>
      </div>
      
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {randomBook && (
        <div style={{ marginTop: '20px' }}>
          <h3>{randomBook.title}</h3>
          <p><strong>Author:</strong> {randomBook.author}</p>
          <p><strong>Category:</strong> {randomBook.category}</p>
  
          <button onClick={handleAddToRead} disabled={addStatus === 'adding'}>
            {addStatus === 'adding' ? 'Adding...' : 'Add to To-Read List'}
            {addStatus === 'error' && <span style={{ color: 'red', marginLeft: '8px' }}>Failed to add book.</span>}
            {addStatus === 'added' && <span style={{ color: 'green', marginLeft: '8px' }}>Book added!</span>}
          </button>
  
        </div>
      )}

      <footer>© 2025 Web Technologies Project</footer>
    </div>
  );
}

export default RandomBookPage;
