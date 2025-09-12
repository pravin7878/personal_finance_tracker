import React from 'react';
import { Link } from 'react-router-dom';

export default function TransactionList({ transactions = [], onDelete }) {
  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Transactions</h3>
      {transactions.length === 0 ? (
        <p className="text-gray-500">No transactions yet — add your first one.</p>
      ) : (
        <ul className="divide-y">
          {transactions.map((t) => (
            <li key={t._id} className="py-3 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: t.type === 'credit' ? '#16a34a' : '#dc2626' }} />
                  <div>
                    <div className="font-medium">{t.title}</div>
                    <div className="text-xs text-gray-500">{t.category} • {new Date(t.date).toLocaleDateString()}</div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className={`${t.type === 'credit' ? 'text-green-600' : 'text-red-600'} font-semibold`}>
                  {t.type === 'credit' ? '+' : '-'}₹{Math.abs(t.amount)}
                </div>

                <Link to={`/${t._id}/edit`} className="text-indigo-600 hover:underline text-sm">Edit</Link>
                <button onClick={() => {
                  if (confirm('Delete this transaction?')) onDelete(t._id);
                }} className="text-sm text-red-600 hover:underline">Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
