import React, { useState, useEffect } from 'react';
import { FaArrowDown, FaArrowUp, FaWallet } from 'react-icons/fa';

const Wallet = () => {
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    // Simulate fetching wallet data
    setBalance(1500); // Fake balance

    setTransactions([
      { id: 1, type: 'credit', amount: 500, reason: 'Wallet Top-up', date: '2025-08-01' },
      { id: 2, type: 'debit', amount: 200, reason: 'Order #1021', date: '2025-08-01' },
      { id: 3, type: 'debit', amount: 300, reason: 'Order #1008', date: '2025-07-29' },
      { id: 4, type: 'credit', amount: 1000, reason: 'Wallet Top-up', date: '2025-07-25' },
    ]);
  }, []);

  return (
    <div className="p-6 bg-gradient-to-r from-green-100 via-gray-200 to-gray-100">
      <div className="bg-gray-100 rounded-2xl shadow-md p-6 mb-6 flex items-center gap-4">
        <FaWallet className="text-green-700 text-4xl" />
        <div>
          <h2 className="text-xl font-bold text-green-800">My Wallet</h2>
          <p className="text-3xl font-semibold text-green-900">₹{balance}</p>
        </div>
      </div>

      <div className="bg-white shadow rounded-xl p-4">
        <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>
        <ul className="divide-y divide-gray-200">
          {transactions.map(tx => (
            <li key={tx.id} className="py-3 flex justify-between items-center">
              <div>
                <p className="font-medium">{tx.reason}</p>
                <p className="text-sm text-gray-500">{tx.date}</p>
              </div>
              <div className={`flex items-center gap-1 text-lg font-semibold ${tx.type === 'credit' ? 'text-green-600' : 'text-red-500'}`}>
                {tx.type === 'credit' ? <FaArrowDown /> : <FaArrowUp />}
                ₹{tx.amount}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Wallet;
