import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useLogin from '../hooks/useLogin';

const LoginPage = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login, loading, error } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = await login(username, password);
    if (user) {
      setIsAuthenticated(true);
      navigate('/');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
      <div style={{ width: '100%', maxWidth: 420, padding: '2rem', border: '1px solid #ddd', borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.06)', background: '#fff' }}>
        <h2 style={{ marginBottom: '1rem', textAlign: 'center' }}>Login</h2>
        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '0.75rem' }}>
          <div style={{ display: 'grid', gap: '0.35rem' }}>
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="Enter your username"
              style={{ padding: '0.6rem 0.7rem', border: '1px solid #ccc', borderRadius: 6 }}
            />
          </div>

          <div style={{ display: 'grid', gap: '0.35rem' }}>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
              style={{ padding: '0.6rem 0.7rem', border: '1px solid #ccc', borderRadius: 6 }}
            />
          </div>

          {error && (
            <div role="alert" style={{ color: '#b00020', background: '#fdecec', border: '1px solid #f6c7c7', borderRadius: 6, padding: '0.5rem 0.75rem' }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              padding: '0.7rem 0.9rem',
              borderRadius: 6,
              border: 'none',
              background: '#2563eb',
              color: '#fff',
              cursor: loading ? 'not-allowed' : 'pointer',
            }}
          >
            {loading ? 'Logging in…' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
