import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);  // for disabling submit while submitting
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    // Simple front-end validation
    if (!email || !password) {
      setError('Both fields are required');
      return;
    }

    try {
      const res = await axios.post('http://localhost:1234/users/login', { email, password });
      localStorage.setItem('token', res.data.token);
      alert('Login successful');
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed.');
    }
  };

  return (
    <div>
      <div>
        <h2>Login</h2>
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

        <p>Don't have an account?{' '}
          <a href="/register">Register here</a>
        </p>

        <div>
          <button onClick={() => navigate('/')}>Back to home</button>
        </div>
      </div>
    </div>
  );
}
