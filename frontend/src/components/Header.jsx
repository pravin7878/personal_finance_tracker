import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="flex justify-between items-center py-4 border-b border-gray-200 mb-6">
      <h1 className="text-2xl font-bold text-gray-800">Personal Finance Tracker</h1>
      <nav className="flex gap-4">
        <Link to="/" className="text-green-500 font-semibold hover:text-green-600">Dashboard</Link>
        <Link to="/add" className="text-green-500 font-semibold hover:text-green-600">Add New</Link>
      </nav>
    </header>
  );
};

export default Header;