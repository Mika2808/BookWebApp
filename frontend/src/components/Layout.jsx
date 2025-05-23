import { Link, Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <>
      <nav>
        <ul>
          <li><Link to="/">Welcome page</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/register">Register</Link></li>
        </ul>
      </nav>
      <main>
        <Outlet />
      </main>
    </>
  );
}
