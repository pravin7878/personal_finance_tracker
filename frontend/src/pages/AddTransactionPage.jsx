import React from 'react';
import TransactionForm from '../components/TransactionForm';
import { createTransaction } from '../utills/api';
import { useNavigate } from 'react-router-dom';

export default function AddTransaction() {
  const navigate = useNavigate();

  const handleCreate = async (payload) => {
    await createTransaction(payload);
    // after success, go to dashboard
    navigate('/dashboard');
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Add Transaction</h2>
      <TransactionForm onSubmit={handleCreate} />
    </div>
  );
}
