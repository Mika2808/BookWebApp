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
    <div>
      <h1>Books page</h1>
    
      <div>
        <button onClick={() => navigate('/home')}>Back to home</button>
        <button onClick={handleLogout}>Log out</button>
      </div>

      {paginatedBooks.map((book) => (
        <div key={book.id} style={{ display: 'flex', marginBottom: '1em' }}>
          
          <div style={{ width: 100, height: 150, backgroundColor: '#ccc', marginRight: '1em' }}>
            {book.cover ? (
              <img src={book.cover} alt={book.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                No Image
              </div>
            )}
          </div>

          <div>
            <strong style={{ fontSize: '1.2em' }}>{book.title}</strong><br />
            by <strong>{book.author}</strong><br />
            in <em>{book.category}</em><br />
            <span style={{ fontSize: '1.1em', fontWeight: 'bold' }}>${book.price}</span>
          </div>

          <button onClick={() => addToRead(book.id)} disabled={addStatusMap[book.id] === 'adding'}>
            {addStatusMap[book.id] === 'adding' ? 'Adding...' : 'Add to To-Read List'}
            {addStatusMap[book.id] === 'error' && (
              <span style={{ color: 'red', marginLeft: '8px' }}>Failed to add book.</span>
            )}
            {addStatusMap[book.id] === 'added' && (
              <span style={{ color: 'green', marginLeft: '8px' }}>Book added!</span>
            )}
          </button>
          
        </div>
      ))}

      <div>
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>Previous</button>
        <span> Page {page} of {totalPages} </span>
        <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>Next</button>
      </div>

      <footer>© 2025 Web Technologies Project</footer>
    </div>
  );
}

export default BooksPage;
