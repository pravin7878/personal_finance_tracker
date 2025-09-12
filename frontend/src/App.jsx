import React, { createContext, useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Header';
import Home from './pages/HomePage';
import AddTransaction from './pages/AddTransactionPage';
import EditTransaction from './pages/EditTransactionPage';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute';
import LandingPage from './pages/LandingPage';

export const AuthContext = createContext({
  user: null,
  setUser: () => { }
});

export default function App() {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('user')) || null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (user) localStorage.setItem('user', JSON.stringify(user));
    else localStorage.removeItem('user');
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, setUser }}>

      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-6">
          <Routes>
           <Route path="/" element={<LandingPage />} />
            <Route path="/dashboard" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="/add" element={<ProtectedRoute><AddTransaction /></ProtectedRoute>} />
            <Route path="/:id/edit" element={<ProtectedRoute><EditTransaction /></ProtectedRoute>} />

            {/* Auth pages (no ProtectedRoute here) */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>

        </main>
      </div>
    </AuthContext.Provider>
  );
}
