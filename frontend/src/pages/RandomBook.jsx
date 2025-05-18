import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from '../api/axios';

function RandomBookPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [randomBook, setRandomBook] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

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
      const token = localStorage.getItem('token');

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
        </div>
      )}

      <footer>© 2025 Web Technologies Project</footer>
    </div>
  );
}

export default RandomBookPage;
