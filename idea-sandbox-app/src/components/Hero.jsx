import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from '../context/AuthContext'; // 1. Import useAuth

export default function Hero() {
  const { user } = useAuth(); // 2. Get the current user

  return (
    <section className="hero">
      <div className="container hero-container">
        <div className="animate-scale-in delay-200">
          <h1 className="animate-fade-in-up">Welcome to the Idea Sandbox!</h1>
          <br></br>
          <h2 className="hero-subheading animate-fade-in-up delay-200">
            Turn Ideas into Real Innovation
          </h2>
          <p className="hero-description animate-fade-in-up delay-400">
            The Idea Sandbox is a dynamic and collaborative platform designed to replace the traditional, static suggestion box with a living space for company-wide innovation.
          </p>
          <div className="cta-buttons animate-fade-in-up delay-600">
            {/* 3. This button is now hidden for admins */}
            {user?.role !== 'admin' && (
              <Link to="/submit" className="btn btn-primary">
                Submit Your Idea
              </Link>
            )}
            <a href="#how-it-works" className="btn btn-secondary">
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}