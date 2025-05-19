import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const [quote, setQuote] = useState('');
  const nick = localStorage.getItem('nick');
  const navigate = useNavigate();
  
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const toggleSidebar = () => {
    setSidebarExpanded(prev => !prev);
  };

  const quotes = [
    "\"\"A room without books is like a body without a soul.\" – Cicero",
    "\"So many books, so little time.\" – Frank Zappa",
    "\"The only thing you absolutely have to know is the location of the library.\" – Albert Einstein",
    "\"Reading is essential for those who seek to rise above the ordinary.\" – Jim Rohn",
    "\"Today a reader, tomorrow a leader.\" – Margaret Fuller",
    "\"Books are a uniquely portable magic.\" – Stephen King",
    "\"You can never get a cup of tea large enough or a book long enough to suit me.\" – C.S. Lewis",
    "\"We read to know we're not alone.\" – William Nicholson",
    "\"Once you learn to read, you will be forever free.\" – Frederick Douglass",
    "\"Reading gives us someplace to go when we have to stay where we are.\" – Mason Cooley"
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
            <img src="/src/img/dice.svg" alt="Book Roulette Image" className="feature-icon" />
            {sidebarExpanded && <span>Book Roulette</span>}
          </a>
        </li>
      </ul>
      <button className="toggle-btn" onClick={toggleSidebar}>
        {sidebarExpanded ? '<' : '>'}
      </button>
    </aside>

    <main className="main-content">
      
      <div className="feature-header" style={{ height: '10vh'}}>
        <h1>Welcome, {nick}!</h1>
        <button onClick={handleLogout} className="logout-btn">
          <img src="/src/img/exit.svg" alt="Log out" className="logout-icon" />
        </button>
      </div>

      <div className="feature-body" style={{ height: '80vh'}}>
        <p><em>{quote}</em></p>
      </div>

      <div className="page-footer" style={{ height: '10vh'}}>
        <footer>© 2025 Web Technologies Project</footer>
      </div>
    </main>
  </div>
  );
}

export default HomePage;