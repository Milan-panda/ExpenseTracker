const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  category: {
    type: String,
    enum: ["food&drinks", "shopping", "transportation", "grocery", "others"],
    required: true,
  },
  paymentMode: {
    type: String,
    enum: ["credit-card", "debit-card", "cash", "online-payment", "others"],
    required: true,
  },
  description: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  expenseType: {
    type: String,
    enum: ["expense", "income"],
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Expense", expenseSchema);
