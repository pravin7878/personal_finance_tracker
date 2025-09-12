import React from 'react';

export default function BalanceCard({ balance }) {
  const formatted = new Intl.NumberFormat('en-IN', { maximumFractionDigits: 2 }).format(balance || 0);
  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 text-center">
      <h3 className="text-sm text-gray-500">Current Balance</h3>
      <div className="mt-3 flex items-center justify-center gap-3">
        <span className={`text-3xl font-bold ${balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          ₹{formatted}
        </span>
      </div>
    </div>
  );
}
