import React from 'react';

export default function IdeaCard({ idea }) {
  // A simple fallback for ideas without a submitter name
  const authorName = idea.userId ? idea.userId.replace('user_', '').replace('_', ' ') : 'Anonymous';

  return (
    <div className="idea-card">
      <div className="idea-card-header">
        <h3 className="idea-card-title">{idea.title}</h3>
        <span className={`status-badge status-${(idea.status || 'submitted').toLowerCase().replace(' ', '-')}`}>
          {idea.status || 'Submitted'}
        </span>
      </div>
      <p className="idea-card-description">{idea.description}</p>
      <div className="idea-card-footer">
        <span className="idea-card-author">by {authorName}</span>
        {/* Placeholders for future features */}
        <div className="idea-card-actions">
          <span>▲ Upvote (0)</span>
          <span>💬 Comment (0)</span>
        </div>
      </div>
    </div>
  );
}