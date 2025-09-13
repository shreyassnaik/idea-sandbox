import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function Header() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleHomeClick = () => {
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Effect to close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownRef]);

  return (
    <header className="header">
      <div className="container">
        <div className="logo">
          <Link to="/">
            <div className="logo-container">
              <img src="/idea-sandbox_logo.png" alt="Idea Sandbox Logo" />
            </div>
          </Link>
        </div>
        <nav className="nav">
          <ul className="nav-list">
            <li><Link to="/" onClick={handleHomeClick}>Home</Link></li>
            <li><a href="/#features">Features</a></li>
            <li><a href="/#how-it-works">How It Works</a></li>

            {user ? (
              // --- Dropdown for Logged-in Users ---
              <>
                <li className="profile-dropdown" ref={dropdownRef}>
                  <button onClick={() => setDropdownOpen(!dropdownOpen)} className="profile-btn">
                    {user.name}
                    <span className={`arrow ${dropdownOpen ? 'up' : 'down'}`}></span>
                  </button>
                  {dropdownOpen && (
                    <ul className="dropdown-menu">
                      {/* --- ADD THIS NEW LINK FOR ADMINS --- */}
                      {user.role === 'admin' && (
                        <li><Link to="/admin" onClick={() => setDropdownOpen(false)}>Admin Panel</Link></li>
                      )}
                      <li><Link to="/profile" onClick={() => setDropdownOpen(false)}>My Profile</Link></li>
                      <li><Link to="/history" onClick={() => setDropdownOpen(false)}>My Ideas</Link></li>
                      <li><hr/></li>
                      <li><button onClick={logout} className="dropdown-logout">Log Out</button></li>
                    </ul>
                  )}
                </li>
                <li><Link to="/submit" className="nav-cta">Submit Idea</Link></li>
              </>
            ) : (
              // --- Links for Logged-out Users ---
              <>
                <li><Link to="/login" className="nav-auth-btn">Log In</Link></li>
                <li><Link to="/signup" className="nav-auth-btn">Sign Up</Link></li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}