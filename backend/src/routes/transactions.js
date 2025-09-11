const express = require('express');
const router = express.Router();
const Transaction = require('../models/transaction.js');

// @route   GET /api/transactions
// @desc    Get all transactions
router.get('/', async (req, res) => {
  try {
    const transactions = await Transaction.find();
    return res.status(200).json({
      success: true,
      count: transactions.length,
      data: transactions
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
});

// @route   POST /api/transactions
// @desc    Add new transaction
router.post('/add', async (req, res) => {
  try {
    const { title, amount, category } = req.body;
    const newTransaction = new Transaction({ title, amount, category });
    await newTransaction.save();
    return res.status(201).json({
      success: true,
      data: newTransaction
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        error: messages
      });
    } else {
      return res.status(500).json({
        success: false,
        error: 'Server Error'
      });
    }
  }
});

// @route   PUT /api/transactions/:id
// @desc    Update a transaction by ID
router.put('/:id', async (req, res) => {
  try {
    const { title, amount, category } = req.body;
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({
        success: false,
        error: 'No transaction found'
      });
    }

    transaction.title = title || transaction.title;
    transaction.amount = amount || transaction.amount;
    transaction.category = category || transaction.category;
    transaction.date = Date.now();

    const updatedTransaction = await transaction.save();

    return res.status(200).json({
      success: true,
      data: updatedTransaction
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        error: messages
      });
    } else {
      return res.status(500).json({
        success: false,
        error: 'Server Error'
      });
    }
  }
});

// @route   DELETE /api/transactions/:id
// @desc    Delete transaction by ID
router.delete('/:id', async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({
        success: false,
        error: 'No transaction found'
      });
    }

    await transaction.deleteOne();

    return res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
});

module.exports = router;