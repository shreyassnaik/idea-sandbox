import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useAuth } from '../context/AuthContext';

export default function IdeaHistory() {
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const fetchIdeas = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/ideas?userId=${user.id}`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch ideas. Is the mock API server running?');
        }
        const data = await response.json();
        setIdeas(data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)));
      } catch (err) {
        setError(err.message);
        console.error("Error fetching ideas:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchIdeas();
  }, [user]);

  const handleDelete = async (ideaId) => {
    const originalIdeas = [...ideas];
    setIdeas(ideas.filter((idea) => idea.id !== ideaId));
    try {
      const response = await fetch(`http://localhost:5000/ideas/${ideaId}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error('Failed to delete');
    } catch (error) {
      alert('Could not delete the idea. Reverting.');
      setIdeas(originalIdeas);
    }
  };
  
  return (
    <>
      <Header />
      <section className="section-padding" style={{ minHeight: '60vh' }}>
        <div className="container">
          <h2 className="section-title">
            {user?.role === 'admin' ? 'Admin View: My Submissions' : 'My Past Submissions'}
          </h2>

          {loading && <p className="text-center">Loading your ideas...</p>}
          
          {error && <p className="text-center" style={{ color: '#e0002f' }}>Error: {error}</p>}
          
          {!loading && !error && ideas.length === 0 && (
            <p className="text-center" style={{ color: "var(--text-muted)" }}>
              You haven't submitted any ideas yet.
            </p>
          )}

          {!loading && !error && ideas.length > 0 && (
            <div className="idea-history-grid">
              {ideas.map((idea) => (
                <div key={idea.id} className="feature-card">
                  <h3>{idea.title}</h3>
                  <p>{idea.description}</p>
                  <div className="idea-tags" style={{ marginTop: '15px' }}>
                    {(idea.tags || []).map((tag, index) => tag && <span key={index} className="tag">{tag}</span>)}
                  </div>
                  <div className="idea-status-display">
                    <span className={`status-badge status-${(idea.status || 'submitted').toLowerCase().replace(' ', '-')}`}>
                      {idea.status || 'Submitted'}
                    </span>
                  </div>
                  <p className="idea-timestamp" style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '15px' }}>
                    Submitted on:{" "}
                    {idea.timestamp ? new Date(idea.timestamp).toLocaleDateString() : "N/A"}
                  </p>
                  <button onClick={() => handleDelete(idea.id)} className="btn-delete">
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
}