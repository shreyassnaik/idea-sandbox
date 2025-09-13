import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function AdminRoute({ children }) {
  const { user } = useAuth();

  // If the user is not logged in OR is not an admin, redirect to the homepage.
  if (!user || user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  // If the user is an admin, show the page.
  return children;
}