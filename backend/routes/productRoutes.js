const express = require('express');
const { body } = require('express-validator');
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getCategories,
  getLowStockProducts,
  getProductStats
} = require('../controllers/productController');
const { protect, isStaffOrAdmin } = require('../middlewares/authMiddleware');

const router = express.Router();

// Validation middleware
const productValidation = [
  body('name')
    .notEmpty()
    .withMessage('Product name is required')
    .isLength({ max: 100 })
    .withMessage('Product name cannot exceed 100 characters'),
  body('sku')
    .notEmpty()
    .withMessage('SKU is required')
    .isLength({ max: 50 })
    .withMessage('SKU cannot exceed 50 characters'),
  body('category')
    .notEmpty()
    .withMessage('Category is required'),
  body('price')
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number'),
  body('quantity')
    .isInt({ min: 0 })
    .withMessage('Quantity must be a non-negative integer'),
  body('unit')
    .notEmpty()
    .withMessage('Unit is required'),
  body('minQuantity')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Minimum quantity must be a non-negative integer'),
  body('maxQuantity')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Maximum quantity must be a non-negative integer'),
  body('costPrice')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Cost price must be a positive number')
];

const updateProductValidation = [
  body('name')
    .optional()
    .notEmpty()
    .withMessage('Product name cannot be empty')
    .isLength({ max: 100 })
    .withMessage('Product name cannot exceed 100 characters'),
  body('sku')
    .optional()
    .notEmpty()
    .withMessage('SKU cannot be empty')
    .isLength({ max: 50 })
    .withMessage('SKU cannot exceed 50 characters'),
  body('price')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number'),
  body('quantity')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Quantity must be a non-negative integer'),
  body('minQuantity')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Minimum quantity must be a non-negative integer'),
  body('maxQuantity')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Maximum quantity must be a non-negative integer'),
  body('costPrice')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Cost price must be a positive number')
];

// Apply authentication middleware to all routes
router.use(protect);
router.use(isStaffOrAdmin);

// Routes
router.get('/', getProducts);
router.get('/categories', getCategories);
router.get('/low-stock', getLowStockProducts);
router.get('/stats', getProductStats);
router.get('/:id', getProduct);

router.post('/', productValidation, createProduct);
router.put('/:id', updateProductValidation, updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router; 