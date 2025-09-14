import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import StatsCard from '../components/dashboard/StatsCard';
import RecentIdeas from '../components/dashboard/RecentIdeas';
import Leaderboard from '../components/dashboard/Leaderboard';

// Helper function to get the mock user database from localStorage
const getUserDatabase = () => {
  const users = localStorage.getItem('idea-sandbox-users');
  return users ? JSON.parse(users) : [];
};

export default function UserDashboard() {
  const { user } = useAuth();
  const [allIdeas, setAllIdeas] = useState([]);
  const [userIdeas, setUserIdeas] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchDashboardData = async () => {
      try {
        const ideasResponse = await fetch('http://localhost:5000/ideas');
        const ideasData = await ideasResponse.json();
        const usersData = getUserDatabase();

        const currentUserIdeas = ideasData
          .filter(idea => idea.userId === user.id)
          .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        
        setAllIdeas(ideasData);
        setUserIdeas(currentUserIdeas);
        setAllUsers(usersData);

      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, [user]);

  if (loading) {
    return (
      <>
        <Header />
        <main className="container section-padding"><h1 className="dashboard-title">Loading Dashboard...</h1></main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="container section-padding">
        <h1 className="dashboard-title">Welcome back, {user?.name || 'Innovator'}!</h1>
        
        <StatsCard userIdeas={userIdeas} />
        
        <div className="dashboard-layout">
          <div className="dashboard-main-col">
            <RecentIdeas userIdeas={userIdeas} />
          </div>
          <div className="dashboard-side-col">
            <Leaderboard users={allUsers} ideas={allIdeas} currentUser={user} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}