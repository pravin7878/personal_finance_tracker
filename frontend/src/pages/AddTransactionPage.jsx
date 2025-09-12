import React from 'react';
import TransactionForm from '../components/TransactionForm';

const AddTransactionPage = () => {
  return (
    <div>
      <TransactionForm isEditing={false} />
    </div>
  );
};

export default AddTransactionPage;