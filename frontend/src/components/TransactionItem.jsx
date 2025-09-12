import React from 'react';
import { Link } from 'react-router-dom';

const TransactionItem = ({ transaction, onDelete }) => {
  const amountColor = transaction.amount >= 0 ? 'text-green-500' : 'text-red-500';

  return (
    <li className={`flex justify-between items-center p-4 mb-3 bg-white shadow rounded-lg border-r-4 ${transaction.amount >= 0 ? 'border-green-500' : 'border-red-500'}`}>
      <div className="flex-1">
        <span className="font-semibold text-lg">{transaction.title}</span>
        <span className="block text-sm text-gray-500">{transaction.category}</span>
      </div>
      <div className="text-right">
        <span className={`font-bold ${amountColor}`}>${Math.abs(transaction.amount).toFixed(2)}</span>
        <span className="block text-sm text-gray-400">
          {transaction.date ? new Date(transaction.date).toLocaleDateString() : 'N/A'}
        </span>
      </div>
      <div className="flex gap-2 ml-4">
        <Link to={`/${transaction._id}/edit`} className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-600">
          Edit
        </Link>
        <button onClick={() => onDelete(transaction._id)} className="bg-red-500 text-white px-3 py-1 rounded-md text-sm hover:bg-red-600">
          Delete
        </button>
      </div>
    </li>
  );
};

export default TransactionItem;