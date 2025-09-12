import React, { useState } from 'react';

export default function TransactionForm({ initial = null, onSubmit, submitLabel = 'Save Transaction' }) {
  const [form, setForm] = useState({
    title: initial?.title || '',
    amount: initial ? Math.abs(initial.amount) : '',
    type: initial?.type || 'credit',
    category: initial?.category || ''
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit({
        title: form.title.trim(),
        amount: Number(form.amount),
        type: form.type,
        category: form.category.trim()
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow space-y-4">
      <div>
        <label className="text-sm text-gray-600">Title</label>
        <input name="title" value={form.title} onChange={handleChange} required
          className="mt-1 w-full border rounded-lg p-3" placeholder="e.g., Salary / Groceries" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-sm text-gray-600">Amount</label>
          <input name="amount" type="number" value={form.amount} onChange={handleChange} required min="0.01" step="0.01"
            className="mt-1 w-full border rounded-lg p-3" placeholder="1000" />
        </div>

        <div>
          <label className="text-sm text-gray-600">Type</label>
          <select name="type" value={form.type} onChange={handleChange} className="mt-1 w-full border rounded-lg p-3">
            <option value="credit">Credit (+)</option>
            <option value="debit">Debit (-)</option>
          </select>
        </div>
      </div>

      <div>
        <label className="text-sm text-gray-600">Category</label>
        <input name="category" value={form.category} onChange={handleChange} required
          className="mt-1 w-full border rounded-lg p-3" placeholder="Food, Rent, Salary..." />
      </div>

      <button type="submit" disabled={loading}
        className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700">
        {loading ? 'Saving...' : submitLabel}
      </button>
    </form>
  );
}
