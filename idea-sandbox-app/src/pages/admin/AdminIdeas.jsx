import React, { useState, useEffect } from 'react';
import Header from '../../components/Header'; // Note: Path updated
import Footer from '../../components/Footer'; // Note: Path updated

export default function AdminIdeas() { // Renamed component
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllIdeas = async () => {
      try {
        const response = await fetch(`http://localhost:5000/ideas`);
        if (!response.ok) throw new Error('Failed to fetch ideas.');
        const data = await response.json();
        setIdeas(data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAllIdeas();
  }, []);

  const handleStatusChange = async (ideaId, newStatus) => {
    const originalIdeas = [...ideas];
    setIdeas(ideas.map(idea => 
      idea.id === ideaId ? { ...idea, status: newStatus } : idea
    ));

    try {
      const response = await fetch(`http://localhost:5000/ideas/${ideaId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!response.ok) throw new Error('Failed to update status.');
    } catch (error) {
      console.error("Update failed:", error);
      setIdeas(originalIdeas);
      alert('Failed to update idea status.');
    }
  };

  return (
    <div className="admin-page">
      <h1 className="admin-page-title">Idea Management</h1>
      
      {loading && <p className="text-center">Loading all ideas...</p>}
      {error && <p className="text-center" style={{ color: '#e0002f' }}>Error: {error}</p>}

      {!loading && !error && (
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Submitted By</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {ideas.map(idea => (
                <tr key={idea.id}>
                  <td>{idea.title}</td>
                  <td>{idea.userId.replace('user_', '')}</td>
                  <td>{new Date(idea.timestamp).toLocaleDateString()}</td>
                  <td>
                    <span className={`status-badge status-${(idea.status || 'submitted').toLowerCase().replace(' ', '-')}`}>
                      {idea.status || 'Submitted'}
                    </span>
                  </td>
                  <td>
                    <select 
                      className="status-select"
                      value={idea.status || 'Submitted'} 
                      onChange={(e) => handleStatusChange(idea.id, e.target.value)}
                    >
                      <option value="Submitted">Submitted</option>
                      <option value="Under Review">Under Review</option>
                      <option value="Accepted">Accepted</option>
                      <option value="Declined">Declined</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}