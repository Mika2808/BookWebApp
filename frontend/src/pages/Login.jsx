import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);  // for disabling submit while submitting
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors
    setIsSubmitting(true);

    // Simple front-end validation
    if (!email || !password) {
      setError('Both fields are required');
      return;
    }

    try {
      const res = await axios.post('/users/login', { email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('nick', res.data.nick);
      localStorage.setItem('id', res.data.id);
      //alert('Login successful');
      navigate('/home');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <div className='page-welcome'>
        <div style={{ height: '30vh'}}>
          <h1>Login</h1>
        </div>
        
        <div style={{ height: '40vh'}}>
          <form onSubmit={handleSubmit}>
            <div>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div>
              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Logging in...' : 'Login'}
              </button>
            </div>
          </form>
        </div>
        
        <div style={{ height: '20vh'}}>
          <div>
            <p><em>Don't have an account?{' '}
              <a href="/register">Register here</a>
            </em></p>

          </div>

          <div>
            <button onClick={() => navigate('/')}>Back to home</button>
          </div>
        </div>
        
        <div className='page-footer' style={{ height: '10vh'}}>
          <footer>© 2025 Web Technologies Project</footer>
        </div>
      </div>
    </div>
  );
}
