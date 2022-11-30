const mongoose = require("mongoose");

const billSchema = new mongoose.Schema({
  dueDate: {
    type: Date,
    required: true,

  },
  category: {
    type: String,
    required: true,
  },
  description: { type: String, required: true },
  amount: { type: Number, required: true },
  email: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Bill", billSchema);
