const express = require("express");
const router = express.Router();
const Transaction = require("../models/transaction.js");
const { protect } = require("../middelware/authMiddleware.js");

// Get all transactions for logged-in user
router.get("/", protect, async (req, res) => {
  const transactions = await Transaction.find({ userId: req.user._id });
  res.json(transactions);
});

// Get single transaction
router.get("/:id", protect, async (req, res) => {
  const transaction = await Transaction.findOne({ _id: req.params.id, userId: req.user._id });
  if (!transaction) return res.status(404).json({ message: "Transaction not found" });
  res.json(transaction);
});

// Add transaction
router.post("/", protect, async (req, res) => {
  const { title, amount, type, category } = req.body;

  const finalAmount = type === "debit" ? -Math.abs(amount) : Math.abs(amount);

  const newTransaction = await Transaction.create({
    title,
    amount: finalAmount,
    type,
    category,
    userId: req.user._id
  });

  res.status(201).json(newTransaction);
});

// Update transaction
router.put("/:id", protect, async (req, res) => {
  const transaction = await Transaction.findOne({ _id: req.params.id, userId: req.user._id });
  if (!transaction) return res.status(404).json({ message: "Transaction not found" });

  const { title, amount, type, category } = req.body;
  transaction.title = title || transaction.title;
  transaction.amount = type === "debit" ? -Math.abs(amount) : Math.abs(amount);
  transaction.type = type || transaction.type;
  transaction.category = category || transaction.category;

  const updated = await transaction.save();
  res.json(updated);
});

// Delete transaction
router.delete("/:id", protect, async (req, res) => {
  const transaction = await Transaction.findOne({ _id: req.params.id, userId: req.user._id });
  if (!transaction) return res.status(404).json({ message: "Transaction not found" });

  await transaction.deleteOne();
  res.json({ message: "Transaction removed" });
});

// Get balance
router.get("/balance/total", protect, async (req, res) => {
  const transactions = await Transaction.find({ userId: req.user._id });
  const balance = transactions.reduce((acc, t) => acc + t.amount, 0);
  res.json({ balance });
});

module.exports = router;
