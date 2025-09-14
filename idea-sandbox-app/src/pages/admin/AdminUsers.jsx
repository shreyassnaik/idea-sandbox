import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const { user, deleteUser } = useAuth(); // We will add deleteUser to the context later

  useEffect(() => {
    const usersData = JSON.parse(localStorage.getItem('idea-sandbox-users') || '[]');
    setUsers(usersData);
  }, []);

  const handleDelete = (userIdToDelete) => {
    if (userIdToDelete === user.id) {
      alert("You cannot delete your own account.");
      return;
    }
    if (window.confirm("Are you sure you want to permanently delete this user and all their ideas? This cannot be undone.")) {
      deleteUser(userIdToDelete);
      // Refresh the list after deletion
      setUsers(prevUsers => prevUsers.filter(u => u.id !== userIdToDelete));
    }
  };

  return (
    <div className="admin-page">
      <h1 className="admin-page-title">User Management</h1>
      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
            <tbody>
            {users.map(u => (
                <tr key={u.id}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>
                    <span className={`status-badge status-${u.role}`}>
                    {u.role}
                    </span>
                </td>
                <td>
                    {/* --- This condition hides the button for other admins --- */}
                    {u.role !== 'admin' && (
                    <button onClick={() => handleDelete(u.id)} className="btn-delete-user">
                        Delete Account
                    </button>
                    )}
                </td>
                </tr>
            ))}
            </tbody>
        </table>
      </div>
    </div>
  );
}