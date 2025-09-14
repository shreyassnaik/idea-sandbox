import React from 'react';

export default function StatsCard({ userIdeas }) {
  const acceptedCount = userIdeas.filter(idea => idea.status === 'Accepted').length;
  // Placeholder for rank
  const rank = '#1'; 

  return (
    <div className="dashboard-stats-grid">
      <div className="stat-card">
        <h3 className="stat-card-title">Ideas Submitted</h3>
        <p className="stat-card-value">{userIdeas.length}</p>
      </div>
      <div className="stat-card">
        <h3 className="stat-card-title">Ideas Accepted</h3>
        <p className="stat-card-value">{acceptedCount}</p>
      </div>
      <div className="stat-card">
        <h3 className="stat-card-title">Leaderboard Rank</h3>
        <p className="stat-card-value">{rank}</p>
      </div>
    </div>
  );
}