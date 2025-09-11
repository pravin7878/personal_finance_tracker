import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AddTransactionPage from './pages/AddTransactionPage';
import EditTransactionPage from './pages/EditTransactionPage';
import Header from './components/Header';
import './App.css';

function App() {
  return (
    <div className="container">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/add" element={<AddTransactionPage />} />
        <Route path="/:id/edit" element={<EditTransactionPage />} />
      </Routes>
    </div>
  );
}

export default App;