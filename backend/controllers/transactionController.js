const StockTransaction = require('../models/StockTransaction');
const Product = require('../models/Product');

// @desc    Get all transactions
// @route   GET /api/transactions
// @access  Private
const getTransactions = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const { type, product, startDate, endDate } = req.query;

    // Build filter object
    const filter = {};

    if (type) {
      filter.type = type;
    }

    if (product) {
      filter.product = product;
    }

    if (startDate || endDate) {
      filter.date = {};
      if (startDate) filter.date.$gte = new Date(startDate);
      if (endDate) filter.date.$lte = new Date(endDate);
    }

    const transactions = await StockTransaction.find(filter)
      .populate('product', 'name sku')
      .populate('performedBy', 'firstName lastName')
      .sort({ date: -1 })
      .skip(skip)
      .limit(limit);

    const total = await StockTransaction.countDocuments(filter);

    res.json({
      success: true,
      data: transactions,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get transactions error:', error);
    res.status(500).json({ 
      message: 'Server error getting transactions' 
    });
  }
};

// @desc    Get single transaction
// @route   GET /api/transactions/:id
// @access  Private
const getTransaction = async (req, res) => {
  try {
    const transaction = await StockTransaction.findById(req.params.id)
      .populate('product', 'name sku')
      .populate('performedBy', 'firstName lastName');

    if (!transaction) {
      return res.status(404).json({ 
        message: 'Transaction not found' 
      });
    }

    res.json({
      success: true,
      data: transaction
    });
  } catch (error) {
    console.error('Get transaction error:', error);
    res.status(500).json({ 
      message: 'Server error getting transaction' 
    });
  }
};

// @desc    Create transaction
// @route   POST /api/transactions
// @access  Private
const createTransaction = async (req, res) => {
  try {
    const { productId, type, quantity, unitPrice, notes, reference, supplier, customer, location } = req.body;

    // Find product
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ 
        message: 'Product not found' 
      });
    }

    const previousQuantity = product.quantity;
    let newQuantity = previousQuantity;

    // Calculate new quantity based on transaction type
    switch (type) {
      case 'purchase':
      case 'return':
        newQuantity = previousQuantity + quantity;
        break;
      case 'sale':
        if (previousQuantity < quantity) {
          return res.status(400).json({ 
            message: 'Insufficient stock' 
          });
        }
        newQuantity = previousQuantity - quantity;
        break;
      case 'adjustment':
        newQuantity = quantity; // Direct adjustment
        break;
      default:
        return res.status(400).json({ 
          message: 'Invalid transaction type' 
        });
    }

    // Update product quantity
    product.quantity = newQuantity;
    await product.save();

    // Create transaction
    const transactionData = {
      product: productId,
      type,
      quantity,
      previousQuantity,
      newQuantity,
      unitPrice,
      totalAmount: quantity * unitPrice,
      notes,
      reference,
      supplier,
      customer,
      location,
      performedBy: req.user._id
    };

    const transaction = await StockTransaction.create(transactionData);

    const populatedTransaction = await StockTransaction.findById(transaction._id)
      .populate('product', 'name sku')
      .populate('performedBy', 'firstName lastName');

    res.status(201).json({
      success: true,
      data: populatedTransaction
    });
  } catch (error) {
    console.error('Create transaction error:', error);
    res.status(500).json({ 
      message: 'Server error creating transaction' 
    });
  }
};

// @desc    Get transaction statistics
// @route   GET /api/transactions/stats
// @access  Private
const getTransactionStats = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    const filter = {};
    if (startDate || endDate) {
      filter.date = {};
      if (startDate) filter.date.$gte = new Date(startDate);
      if (endDate) filter.date.$lte = new Date(endDate);
    }

    const stats = await StockTransaction.aggregate([
      { $match: filter },
      {
        $group: {
          _id: '$type',
          count: { $sum: 1 },
          totalQuantity: { $sum: '$quantity' },
          totalAmount: { $sum: '$totalAmount' }
        }
      }
    ]);

    const totalTransactions = await StockTransaction.countDocuments(filter);
    const totalValue = await StockTransaction.aggregate([
      { $match: filter },
      {
        $group: {
          _id: null,
          totalValue: { $sum: '$totalAmount' }
        }
      }
    ]);

    res.json({
      success: true,
      data: {
        stats,
        totalTransactions,
        totalValue: totalValue[0]?.totalValue || 0
      }
    });
  } catch (error) {
    console.error('Get transaction stats error:', error);
    res.status(500).json({ 
      message: 'Server error getting transaction statistics' 
    });
  }
};

// @desc    Get recent transactions
// @route   GET /api/transactions/recent
// @access  Private
const getRecentTransactions = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 5;

    const transactions = await StockTransaction.find()
      .populate('product', 'name sku')
      .populate('performedBy', 'firstName lastName')
      .sort({ date: -1 })
      .limit(limit);

    res.json({
      success: true,
      data: transactions
    });
  } catch (error) {
    console.error('Get recent transactions error:', error);
    res.status(500).json({ 
      message: 'Server error getting recent transactions' 
    });
  }
};

// @desc    Get transactions by product
// @route   GET /api/transactions/product/:productId
// @access  Private
const getTransactionsByProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const transactions = await StockTransaction.find({ product: productId })
      .populate('performedBy', 'firstName lastName')
      .sort({ date: -1 })
      .skip(skip)
      .limit(limit);

    const total = await StockTransaction.countDocuments({ product: productId });

    res.json({
      success: true,
      data: transactions,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get transactions by product error:', error);
    res.status(500).json({ 
      message: 'Server error getting product transactions' 
    });
  }
};

module.exports = {
  getTransactions,
  getTransaction,
  createTransaction,
  getTransactionStats,
  getRecentTransactions,
  getTransactionsByProduct
}; 