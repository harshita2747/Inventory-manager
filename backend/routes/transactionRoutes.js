const express = require('express');
const { body } = require('express-validator');
const {
  getTransactions,
  getTransaction,
  createTransaction,
  getTransactionStats,
  getRecentTransactions,
  getTransactionsByProduct
} = require('../controllers/transactionController');
const { protect, isStaffOrAdmin } = require('../middlewares/authMiddleware');

const router = express.Router();

// Validation middleware
const transactionValidation = [
  body('productId')
    .notEmpty()
    .withMessage('Product ID is required')
    .isMongoId()
    .withMessage('Invalid product ID'),
  body('type')
    .isIn(['purchase', 'sale', 'adjustment', 'return', 'transfer'])
    .withMessage('Invalid transaction type'),
  body('quantity')
    .isFloat({ min: 0.01 })
    .withMessage('Quantity must be a positive number'),
  body('unitPrice')
    .isFloat({ min: 0 })
    .withMessage('Unit price must be a non-negative number'),
  body('notes')
    .optional()
    .isLength({ max: 500 })
    .withMessage('Notes cannot exceed 500 characters'),
  body('reference')
    .optional()
    .isLength({ max: 100 })
    .withMessage('Reference cannot exceed 100 characters')
];

// Apply authentication middleware to all routes
router.use(protect);
router.use(isStaffOrAdmin);

// Routes
router.get('/', getTransactions);
router.get('/stats', getTransactionStats);
router.get('/recent', getRecentTransactions);
router.get('/product/:productId', getTransactionsByProduct);
router.get('/:id', getTransaction);

router.post('/', transactionValidation, createTransaction);

module.exports = router; 