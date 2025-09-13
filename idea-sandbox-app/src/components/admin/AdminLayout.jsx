import React from 'react';
import { Outlet, Link, NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function AdminLayout() {
  const { logout } = useAuth();

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="sidebar-header">
          <Link to="/admin">
            <img src="/idea-sandbox_logo2.png" alt="Logo" className="sidebar-logo" />
            <span className="sidebar-title">Admin Panel</span>
          </Link>
        </div>
        <nav className="admin-nav">
          <ul>
            <li><NavLink to="/admin" end>Dashboard</NavLink></li>
            <li><NavLink to="/admin/ideas">Idea Management</NavLink></li>
            <li><NavLink to="/admin/users">User Management</NavLink></li>
          </ul>
        </nav>
        <div className="sidebar-footer">
          <Link to="/" className="sidebar-link">← Back to Site</Link>
          <button onClick={logout} className="sidebar-logout">Log Out</button>
        </div>
      </aside>
      <main className="admin-main-content">
        <Outlet />
      </main>
    </div>
  );
}