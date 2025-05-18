import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const [quote, setQuote] = useState('');
  const nick = localStorage.getItem('nick');
  const navigate = useNavigate();

  const quotes = [
    "A room without books is like a body without a soul. – Cicero",
    "So many books, so little time. – Frank Zappa",
    "The only thing you absolutely have to know is the location of the library. – Albert Einstein",
    "Reading is essential for those who seek to rise above the ordinary. – Jim Rohn",
    "Today a reader, tomorrow a leader. – Margaret Fuller",
    "Books are a uniquely portable magic. – Stephen King",
    "You can never get a cup of tea large enough or a book long enough to suit me. – C.S. Lewis",
    "We read to know we're not alone. – William Nicholson",
    "Once you learn to read, you will be forever free. – Frederick Douglass",
    "Reading gives us someplace to go when we have to stay where we are. – Mason Cooley"
  ];
  
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setQuote(quotes[randomIndex]);
  }, []);
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('nick');
    localStorage.removeItem('id');
    navigate('/');
  };

  return (
    <div>
      <h2>Welcome, {nick}!</h2>
      
      <ul>
        <li><a href="/books">🔍 Search Books</a></li>
        <li><a href="/to-read">📚 ToRead List</a></li>
        <li><a href="/random-book">🎲 Random Book</a></li>
      </ul>

      <button onClick={handleLogout}>Log out</button>

      <p><em>{quote}</em></p>

      <footer>© 2025 Web Technologies Project</footer>
    </div>
  );
}

export default HomePage;
