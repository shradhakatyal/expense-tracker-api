const Transaction = require('../models/Transactions');
/*
@desc  Get all transactions
@route  GET /api/v1/transactions
@access  public
*/
exports.getTransactions = async (req, res, next) => {
  try {
    const transactions = await Transaction.find();
    return res.status(200).json({
      success: 1,
      count: transactions.length,
      data: transactions,
    });
  } catch(err) {
    return res.status(500).json({
      success: 0,
      error: 'Server Error',
    });
  }

}

/*
@desc  Add a transactions
@route  POST /api/v1/transactions
@access  public
*/
exports.addTransaction = async (req, res, next) => {
  const { text, amount } = req.body;
  try {
    const transaction = await Transaction.create(req.body);
    return res.status(201).json({
      success: 1,
      data: transaction,
    });
  } catch(err) {
    if(err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map((val) => val.message);
      return res.status(400).json({
        success: 0,
        error: messages,
      });
    } else {
      return res.status(500).json({
        success: 0,
        error: 'Server Error',
      });
    }
  }
}

/*
@desc  Delete transactions
@route  DELETE /api/v1/transactions/:id
@access  public
*/
exports.deleteTransaction = async (req, res, next) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    if(!transaction) {
      res.status(404).json({
        success: 0,
        error: 'No transaction found'
      });
    }
    await transaction.remove();
    res.status(200).json({
      success: 1,
      data: {},
    });
  } catch(err) {
    return res.status(500).json({
      success: 0,
      error: 'Server Error',
    });
  }
}