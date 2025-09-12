import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../App';

export default function Navbar() {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  return (
    <nav className="bg-gray-900 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/dashboard" className="flex items-center gap-3">
          <div className="bg-indigo-600 rounded-full p-2">
            <span role="img" aria-label="money">💰</span>
          </div>
          <div className="text-lg font-semibold tracking-wide">Finance Tracker</div>
        </Link>

        <div className="flex items-center gap-4">
          {user ? (
            <>
              <span className="hidden sm:inline-block text-sm text-gray-300">
                Hi, <strong className="text-white">{user.name}</strong>
              </span>
              <Link 
                to="/add" 
                className="bg-indigo-600 hover:bg-indigo-700 px-3 py-2 rounded-md transition"
              >
                Add
              </Link>
              <button 
                onClick={logout} 
                className="bg-red-600 hover:bg-red-700 px-3 py-2 rounded-md transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link 
                to="/login" 
                className="px-3 py-2 hover:bg-indigo-700 rounded-md transition"
              >
                Login
              </Link>
              <Link 
                to="/register" 
                className="px-3 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-md transition"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
