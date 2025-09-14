import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import Leaderboard from '../../components/dashboard/Leaderboard';

// Helper function to get the mock user database from localStorage
const getUserDatabase = () => {
  const users = localStorage.getItem('idea-sandbox-users');
  return users ? JSON.parse(users) : [];
};

export default function AdminDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({ ideaCount: 0, userCount: 0 });
  const [allUsers, setAllUsers] = useState([]);
  const [allIdeas, setAllIdeas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const ideasResponse = await fetch('http://localhost:5000/ideas');
        const ideasData = await ideasResponse.json();
        const usersData = getUserDatabase();

        setStats({
          ideaCount: ideasData.length,
          userCount: usersData.length,
        });
        setAllIdeas(ideasData);
        setAllUsers(usersData);

      } catch (error) {
        console.error("Failed to fetch stats:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="admin-page">
      <h1 className="admin-page-title">Dashboard</h1>
      
      <div className="dashboard-stats-grid">
        <div className="stat-card">
          <h3 className="stat-card-title">Total Users</h3>
          <p className="stat-card-value">{loading ? '...' : stats.userCount}</p>
        </div>
        <div className="stat-card">
          <h3 className="stat-card-title">Total Ideas</h3>
          <p className="stat-card-value">{loading ? '...' : stats.ideaCount}</p>
        </div>
      </div>

      <div className="admin-leaderboard-section">
        {loading ? (
          <p>Loading leaderboard...</p>
        ) : (
          <Leaderboard users={allUsers} ideas={allIdeas} currentUser={user} />
        )}
      </div>
    </div>
  );
}