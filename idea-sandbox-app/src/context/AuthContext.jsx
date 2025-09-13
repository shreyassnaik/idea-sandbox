import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext(null);

// Helper function to get the mock user database from localStorage
const getUserDatabase = () => {
  const users = localStorage.getItem('idea-sandbox-users');
  return users ? JSON.parse(users) : [];
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('idea-sandbox-user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const signup = (name, email, password) => {
    const users = getUserDatabase();
    const userExists = users.find(u => u.email === email);

    if (userExists) {
      return { success: false, message: 'A user with this email already exists.' };
    }

    const uniqueId = 'user_' + email.split('@')[0].replace(/\./g, '_');
    
    // Check if the email is the special admin email and assign role accordingly.
    const role = email.toLowerCase() === 'admin@example.com' ? 'admin' : 'user';

    const newUser = { id: uniqueId, name, email, password, role: role };

    users.push(newUser);
    localStorage.setItem('idea-sandbox-users', JSON.stringify(users));
    
    // Automatically log the new user in
    localStorage.setItem('idea-sandbox-user', JSON.stringify(newUser));
    setUser(newUser);
    console.log("AuthContext: Signed up and logged in user:", newUser);
    return { success: true };
  };

  const login = (email, password) => {
    const users = getUserDatabase();
    const foundUser = users.find(u => u.email === email);

    if (!foundUser) {
      return { success: false, message: 'Invalid email or password.' };
    }

    if (foundUser.password !== password) {
      return { success: false, message: 'Invalid email or password.' };
    }

    // Passwords match, log the user in
    localStorage.setItem('idea-sandbox-user', JSON.stringify(foundUser));
    setUser(foundUser);
    console.log("AuthContext: Logged in user:", foundUser);
    return { success: true, user: foundUser }; // Return the user object
  };

  const logout = () => {
    console.log("AuthContext: Logging out user.");
    localStorage.removeItem('idea-sandbox-user');
    setUser(null);
  };

  const deleteUser = (userIdToDelete) => {
    let users = getUserDatabase();
    users = users.filter(u => u.id !== userIdToDelete);
    localStorage.setItem('idea-sandbox-users', JSON.stringify(users));

    // Also delete their ideas from the mock server
    fetch(`http://localhost:5000/ideas?userId=${userIdToDelete}`)
      .then(res => res.json())
      .then(ideas => {
        ideas.forEach(idea => {
          fetch(`http://localhost:5000/ideas/${idea.id}`, { method: 'DELETE' });
        });
      });
    
    console.log("AuthContext: Deleted user:", userIdToDelete);
  };

  const value = { user, login, logout, signup, deleteUser };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}