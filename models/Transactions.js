const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  text: {
    type: String,
    trim: true,
    required: [true, 'Please add transaction name']
  },
  amount: {
    type: Number,
    required: [true, 'Please enter the amount']
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model('Transaction', TransactionSchema);