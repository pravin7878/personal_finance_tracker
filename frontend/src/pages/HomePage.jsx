import React, { useEffect, useState, useContext } from 'react';
import BalanceCard from '../components/BalanceCard';
import TransactionList from '../components/TransactionList';
import { fetchBalance, fetchTransactions, deleteTransaction } from '../utills/api';
import { AuthContext } from '../App';

export default function Home() {
  const { user } = useContext(AuthContext);
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(true);
console.log("user")

  const load = async () => {
    if (!user) return; // ⬅️ stop if not logged in
    setLoading(true);
    try {
      const [txs, balRes] = await Promise.all([
        fetchTransactions(),
        fetchBalance()
      ]);
      setTransactions(txs);
      setBalance(balRes.balance ?? 0);
    } catch (err) {
      console.error(err);
      // don’t spam alerts if it’s just missing token
      if (!err.message.toLowerCase().includes('token')) {
        alert(err.message || 'Failed to load data');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [user]); // ⬅️ only refetch when user changes

  const handleDelete = async (id) => {
    try {
      await deleteTransaction(id);
      await load();
    } catch (err) {
      console.error(err);
      alert(err.message || 'Delete failed');
    }
  };

  if (!user) {
    return <div className="p-6 bg-white rounded-2xl shadow">Please log in to view your dashboard.</div>;
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <div className="space-y-6">
          <BalanceCard balance={balance} />
        </div>
        <div className="md:col-span-2">
          <h1 className="text-2xl font-bold mb-3">Dashboard</h1>
          {loading ? (
            <div className="p-6 bg-white rounded-2xl shadow">Loading...</div>
          ) : (
            <TransactionList transactions={transactions} onDelete={handleDelete} />
          )}
        </div>
       
      </div>
    </div>
  );
}
