import { useNavigate } from 'react-router-dom';

function BooksPage() {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('nick');
    localStorage.removeItem('id');
    navigate('/');
  };

  return (
    <div>
      <h2>Books page</h2>
    
      <div>
        <button onClick={() => navigate('/home')}>Back to home</button>
        <button onClick={handleLogout}>Log out</button>
      </div>
    
      <footer>© 2025 Web Technologies Project</footer>
    </div>
  );
}

export default BooksPage;
