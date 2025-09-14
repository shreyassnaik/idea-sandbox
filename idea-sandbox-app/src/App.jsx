import React from 'react';
import { Routes, Route } from 'react-router-dom';

// User-facing pages
import Home from "./pages/Home";
import UserDashboard from './pages/UserDashboard';
import SubmitIdea from "./pages/SubmitIdea";
import Success from './pages/Success';
import IdeaHistory from './pages/IdeaHistory';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ProfilePage from './pages/ProfilePage';
import ProtectedRoute from './auth/ProtectedRoute';
import BackgroundParticles from './components/BackgroundParticles.jsx';

// Admin-facing pages and layout
import AdminRoute from './auth/AdminRoute';
import AdminLayout from './components/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminIdeas from './pages/admin/AdminIdeas';
import AdminUsers from './pages/admin/AdminUsers';

export default function App() {
  return (
    <>
      <BackgroundParticles count={600} />
      <Routes>
        {/* User Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/success" element={<Success />} />
        
        {/* Protected Routes */}
        <Route path="/dashboard" element={<ProtectedRoute><UserDashboard /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
        <Route path="/submit" element={<ProtectedRoute><SubmitIdea /></ProtectedRoute>} />
        <Route path="/history" element={<ProtectedRoute><IdeaHistory /></ProtectedRoute>} />
        
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminRoute><AdminLayout /></AdminRoute>}>
          <Route index element={<AdminDashboard />} />
          <Route path="ideas" element={<AdminIdeas />} />
          <Route path="users" element={<AdminUsers />} />
        </Route>
      </Routes>
    </>
  );
}