import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AddTransactionPage from './pages/AddTransactionPage';
import EditTransactionPage from './pages/EditTransactionPage';
import Header from './components/Header';
import './index.css'; // Keep this for Tailwind directives

function App() {
  return (
    <div className="container mx-auto p-4 max-w-2xl">
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