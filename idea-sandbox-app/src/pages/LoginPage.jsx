import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // State for error messages
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    const result = login(email, password);
    if (result.success) {
      // --- NEW REDIRECT LOGIC ---
      // Check the user's role from the login result
      if (result.user.role === 'admin') {
        navigate('/admin'); // Redirect admins to the admin dashboard
      } else {
        navigate('/'); // Redirect regular users to the homepage
      }
    } else {
      setError(result.message);
    }
  };
  
  return (
    <>
      <Header />
      <section className="auth-form-page section-padding">
        <div className="container">
          <div className="glass-card">
            <h2 className="section-title">Log In</h2>
            <form onSubmit={handleSubmit} className="auth-form-container">
              {/* Display error message if it exists */}
              {error && <p style={{ color: '#e0002f', textAlign: 'center' }}>{error}</p>}
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary form-submit-btn">
                Log In
              </button>
              <div className="auth-switch-link">
                <p>Haven't created an account? <Link to="/signup">Sign Up</Link></p>
              </div>
            </form>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}