import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const TransactionForm = ({ isEditing }) => {
const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  // Fetch transaction data if in edit mode
  useEffect(() => {
    if (isEditing && id) {
      const fetchTransaction = async () => {
        try {
          const res = await axios.get(`http://localhost:8080/api/transactions/${id}`);
          const transaction = res.data.data;
          setTitle(transaction.title);
          setAmount(transaction.amount);
          setCategory(transaction.category);
        } catch (err) {
          console.error('Error fetching transaction:', err);
        }
      };
      fetchTransaction();
    }
  }, [isEditing, id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTransaction = {
      title,
      amount: parseFloat(amount),
      category,
    };

    try {
      if (isEditing) {
        // Update an existing transaction
        await axios.put(`http://localhost:8080/api/transactions/${id}`, newTransaction);
      } else {
        // Add a new transaction
        await axios.post('http://localhost:8080/api/transactions/add', newTransaction);
      }
      navigate('/'); // Navigate back to the homepage after successful submission
    } catch (err) {
      console.error('Error submitting form:', err);
    }
  };


  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">{isEditing ? 'Edit Transaction' : 'Add New Transaction'}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title..."
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">Amount (+income, -expense)</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount..."
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <input
            type="text"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Enter category..."
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <button type="submit" className="w-full py-2 bg-green-500 text-white font-bold rounded-md hover:bg-green-600 transition duration-300">
          {isEditing ? 'Update Transaction' : 'Add Transaction'}
        </button>
      </form>
    </div>
  );
};

export default TransactionForm;