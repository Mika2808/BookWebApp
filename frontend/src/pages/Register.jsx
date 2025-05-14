import { useState } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [nick, setNick] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);  // for disabling submit while submitting
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear any previous errors

    // Simple client-side validation
    if (!nick || !email || !password) {
      setError('All fields are required');
      return;
    }
    
    setIsSubmitting(true);  // Disable submit button while sending request

    try {
      console.log('Submitting:', { nick, email, password});
      await axios.post('/users/register', { nick, email, password });
      alert('Registered successfully!');

      try {
      const res = await axios.post('/users/login', { email, password });
      localStorage.setItem('token', res.data.token);
      alert('Login successful');
      navigate('/home');
      } catch (err) {
        setError(err.response?.data?.error || 'Login failed.');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed.');
    } finally {
      setIsSubmitting(false);  // Re-enable submit button
    }
  };

  return (
    <div>
      <div>
        <h2>Register</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              placeholder="Nick"
              value={nick}
              onChange={(e) => setNick(e.target.value)}
              required
            />
          </div>
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
              {isSubmitting ? 'Registering...' : 'Register'}
            </button>
          </div>
        </form>

        <p> Already have an account?{' '}
          <a href="/login">Login here</a>
        </p>

        <div>
          <button onClick={() => navigate('/')}>Back to home</button>
        </div>
      </div>
      <footer>© 2025 Web Technologies Project</footer>
    </div>
  );
}
