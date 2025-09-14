import React from 'react';
import { useAuth } from '../context/AuthContext';
import StaticHomePage from './StaticHomePage';
import UserDashboard from './UserDashboard';

export default function Home() {
  const { user } = useAuth();

  // If a user is logged in, show the dashboard.
  // Otherwise, show the static landing page.
  return user ? <UserDashboard /> : <StaticHomePage />;
}