import React from 'react';

export default function Leaderboard({ users, ideas, currentUser }) {
  if (!users.length || !ideas.length) {
    return <div className="leaderboard-card"><h3>Leaderboard</h3><p>Not enough data to display.</p></div>;
  }

  // Calculate scores and sort users
  const scoredUsers = users
    .map(user => {
      const ideaCount = ideas.filter(idea => idea.userId === user.id).length;
      return { ...user, ideaCount };
    })
    .filter(user => user.ideaCount > 0)
    .sort((a, b) => b.ideaCount - a.ideaCount)
    .slice(0, 5); // Show top 5

  const topScore = scoredUsers.length > 0 ? scoredUsers[0].ideaCount : 0;

  return (
    <div className="leaderboard-card">
      <h3 className="widget-title">Top Innovators</h3>
      <ul className="leaderboard-list">
        {scoredUsers.map((user, index) => {
          const barWidth = topScore > 0 ? (user.ideaCount / topScore) * 100 : 0;
          const isCurrentUser = user.id === currentUser.id;

          return (
            <li key={user.id} className={isCurrentUser ? 'current-user' : ''}>
              <span className="leaderboard-rank">#{index + 1}</span>
              <span className="leaderboard-name">{user.name}</span>
              <div className="leaderboard-bar-container">
                <div className="leaderboard-bar" style={{ width: `${barWidth}%` }}></div>
              </div>
              <span className="leaderboard-score">{user.ideaCount}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}