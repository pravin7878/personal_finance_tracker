import React, { useEffect, useState } from 'react';
import TransactionForm from '../components/TransactionForm';
import { fetchTransactionById, updateTransaction } from '../utills/api';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditTransaction() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initial, setInitial] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const tx = await fetchTransactionById(id);
        setInitial(tx);
      } catch (err) {
        alert(err.message || 'Failed to load');
      }
    })();
  }, [id]);

  const handleUpdate = async (payload) => {
    await updateTransaction(id, payload);
    navigate('/');
  };

  if (!initial) return <div className="p-6 bg-white rounded-2xl shadow">Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Edit Transaction</h2>
      <TransactionForm initial={initial} onSubmit={handleUpdate} submitLabel="Update Transaction" />
    </div>
  );
}
