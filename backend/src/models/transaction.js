const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please add a title"],
    trim: true
  },
  amount: {
    type: Number,
    required: [true, "Please add an amount"]
  },
  type: {
    type: String,
    enum: ["credit", "debit"],
    required: [true, "Please select transaction type"]
  },
  category: {
    type: String,
    required: [true, "Please add a category"],
    trim: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model("Transaction", transactionSchema);
