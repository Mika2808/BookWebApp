import { Link } from 'react-router-dom';

function Welcome() {
  return (
    <div>
      <h1>Welcome to Book Review App</h1>
      <p>Discover new reads, write reviews, and keep track of books you want to read.</p>
      <div>
        <Link to="/login"><button>Login</button></Link>
        <Link to="/register"><button>Register</button></Link>
      </div>
      <footer>© 2025 Web Technologies Project</footer>
    </div>
  );
}

export default Welcome;
