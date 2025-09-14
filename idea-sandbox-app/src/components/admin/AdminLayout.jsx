import React, { useEffect } from 'react'; // 1. Import useEffect
import { Outlet, Link, NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function AdminLayout() {
  const { logout } = useAuth();

  // 2. This effect adds a class to the <body> tag when the component mounts
  //    and removes it when it unmounts.
  useEffect(() => {
    document.body.classList.add('admin-body');
    return () => {
      document.body.classList.remove('admin-body');
    };
  }, []); // The empty array ensures this runs only once on mount and unmount

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