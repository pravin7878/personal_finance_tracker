import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TransactionItem from './TransactionItem';

const TransactionList = () => {
 const [transactions, setTransactions] = useState([]);

  const fetchTransactions = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/transactions');
      setTransactions(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/transactions/${id}`);
      fetchTransactions(); // Refresh the list after deletion
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4 text-center">Transaction History</h2>
      {transactions.length > 0 ? (
        <ul className="space-y-4">
          {transactions.map((transaction) => (
            <TransactionItem key={transaction._id} transaction={transaction} onDelete={handleDelete} />
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500">No transactions to display.</p>
      )}
    </div>
  );
};

export default TransactionList;