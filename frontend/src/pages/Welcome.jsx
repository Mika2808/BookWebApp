import { Link } from 'react-router-dom';

function Welcome() {
  return (
    <div>
      <div className="page-welcome">
        <div style={{ height: '40vh'}}>
          <h1>Shelfmate</h1>
        </div>
        
        <div style={{ height: '20vh'}}>
          <p><em>Discover new reads, write reviews, and keep track of books you want to read.</em></p>
        </div>

        <div style={{ height: '30vh'}}>
          <Link to="/login"><button>Login</button></Link>
          <Link to="/register"><button>Register</button></Link>
        </div>

        <div style={{ height: '10vh'}} className="page-footer">
          <footer>© 2025 Web Technologies Project</footer>
        </div>

      </div>
    </div>
  );
}

export default Welcome;
