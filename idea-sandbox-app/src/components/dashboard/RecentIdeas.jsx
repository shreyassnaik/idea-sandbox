import React from 'react';
import { Link } from 'react-router-dom';

export default function RecentIdeas({ userIdeas }) {
  // Get the 3 most recent ideas
  const recentIdeas = userIdeas.slice(0, 3);

  return (
    <div className="recent-ideas-card">
      <div className="widget-header">
        <h3 className="widget-title">My Recent Ideas</h3>
        <Link to="/history" className="widget-link">View All</Link>
      </div>
      <ul className="recent-ideas-list">
        {recentIdeas.length > 0 ? (
          recentIdeas.map(idea => (
            <li key={idea.id}>
              <span className="idea-title">{idea.title}</span>
              <span className={`status-badge status-${(idea.status || 'submitted').toLowerCase().replace(' ', '-')}`}>
                {idea.status || 'Submitted'}
              </span>
            </li>
          ))
        ) : (
          <p className="no-ideas-message">You haven't submitted any ideas yet.</p>
        )}
      </ul>
    </div>
  );
}