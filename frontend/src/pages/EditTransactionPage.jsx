import React from 'react';
import TransactionForm from '../components/TransactionForm';

const EditTransactionPage = () => {
  return (
    <div>
      <TransactionForm isEditing={true} />
    </div>
  );
};

export default EditTransactionPage;