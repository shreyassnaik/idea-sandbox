import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from '../context/AuthContext'; // 1. Import useAuth

export default function CTA() {
  const { user } = useAuth(); // 2. Get the current user

  return (
    <section className="cta">
      <div className="container cta-container">
        <br></br><br></br>
        <h2 className="section-title cta-title">Ready to Transform Your Workplace?</h2>
        <p className="cta-description">
          Submit your best ideas and see them transform into actionable projects.
        </p>
        
        {/* 3. This button is now hidden for admins */}
        {user?.role !== 'admin' && (
          <Link to={user ? "/submit" : "/login"} className="btn btn-primary btn-lg">
            Submit Idea
          </Link>
          
        )}
        <br></br><br></br>
      </div>
    </section>
  );
}