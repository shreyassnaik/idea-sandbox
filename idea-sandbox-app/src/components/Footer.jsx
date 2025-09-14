import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from '../context/AuthContext'; // 1. Import useAuth

export default function Footer() {
  const { user } = useAuth(); // 2. Get the current user

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-logo">
            <img src="/idea-sandbox_logo2.png" alt="Idea Sandbox Logo" />
          </div>
          <div className="footer-links">
            <a href="/#features">Features</a>
            <a href="/#how-it-works">How It Works</a>
            <a href="/#testimonials">Benefits</a>
            
            {/* --- THIS IS THE MODIFIED LINE --- */}
            {/* It now only shows if the user exists AND is not an admin */}
            {user && user.role !== 'admin' && <Link to="/history">Idea History</Link>}
            
            {user?.role !== 'admin' && (
              <Link to="/submit" className="nav-cta">
                Submit Idea
              </Link>
            )}
          </div>
        </div>
        <p className="copyright">
          &copy; 2025 Idea Sandbox. All rights reserved.
        </p>
      </div>
    </footer>
  );
}