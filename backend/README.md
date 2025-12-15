# Inventory Management System - Backend

A robust Node.js/Express backend for the Inventory Management System with MongoDB, JWT authentication, and role-based access control.

## Features

- **Authentication & Authorization**: JWT-based authentication with role-based access (admin/staff)
- **Product Management**: CRUD operations for products with inventory tracking
- **Stock Transactions**: Track purchases, sales, adjustments, returns, and transfers
- **User Management**: Admin-only user management with role assignment
- **Search & Filtering**: Advanced search and filtering capabilities
- **Pagination**: Efficient pagination for large datasets
- **Validation**: Comprehensive input validation using express-validator
- **Error Handling**: Centralized error handling with proper HTTP status codes
- **Security**: Helmet.js for security headers, CORS configuration

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **Validation**: express-validator
- **Security**: helmet, cors
- **Logging**: morgan

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

## Installation

1. **Clone the repository and navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the backend directory:
   ```env
   # Server Configuration
   PORT=5000
   NODE_ENV=development

   # MongoDB Configuration
   MONGODB_URI=mongodb://localhost:27017/inventory_management

   # JWT Configuration
   JWT_SECRET=your_jwt_secret_key_here
   JWT_EXPIRE=24h

   # CORS Configuration
   CORS_ORIGIN=http://localhost:5173
   ```

4. **Start the server**
   ```bash
   # Development mode
   npm run dev

   # Production mode
   npm start
   ```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user profile
- `PUT /api/auth/profile` - Update user profile
- `PUT /api/auth/change-password` - Change password

### Products
- `GET /api/products` - Get all products (with pagination, search, filters)
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create new product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product (soft delete)
- `GET /api/products/categories` - Get all product categories
- `GET /api/products/low-stock` - Get low stock products
- `GET /api/products/stats` - Get product statistics

### Transactions
- `GET /api/transactions` - Get all transactions (with pagination, filters)
- `GET /api/transactions/:id` - Get single transaction
- `POST /api/transactions` - Create new transaction
- `GET /api/transactions/stats` - Get transaction statistics
- `GET /api/transactions/recent` - Get recent transactions
- `GET /api/transactions/product/:productId` - Get transactions by product

### Users (Admin Only)
- `GET /api/users` - Get all users (with pagination, search, filters)
- `GET /api/users/:id` - Get single user
- `POST /api/users` - Create new user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user (soft delete)
- `GET /api/users/stats` - Get user statistics
- `PUT /api/users/:id/reset-password` - Reset user password

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## Role-Based Access Control

- **Admin**: Full access to all endpoints
- **Staff**: Access to products and transactions, limited user management

## Database Models

### User
- Authentication fields (username, email, password)
- Personal information (firstName, lastName)
- Role-based access (admin/staff)
- Account status and timestamps

### Product
- Product details (name, SKU, description, category, brand)
- Pricing (price, costPrice)
- Inventory (quantity, minQuantity, maxQuantity, unit)
- Supplier information
- Location and tags
- Audit trail (createdBy, timestamps)

### StockTransaction
- Transaction details (type, quantity, unitPrice, totalAmount)
- Inventory tracking (previousQuantity, newQuantity)
- References and notes
- Supplier/customer information
- Location tracking
- Audit trail (performedBy, date)

## Error Handling

The API returns consistent error responses:

```json
{
  "success": false,
  "error": "Error message",
  "stack": "Error stack trace (development only)"
}
```

## Validation

All endpoints include comprehensive input validation using express-validator with custom error messages.

## Security Features

- Password hashing with bcryptjs
- JWT token authentication
- Role-based access control
- Security headers with helmet
- CORS configuration
- Input validation and sanitization

## Development

### Project Structure
```
backend/
├── config/
│   └── db.js              # Database configuration
├── controllers/
│   ├── authController.js   # Authentication logic
│   ├── productController.js # Product management
│   ├── transactionController.js # Stock transactions
│   └── userController.js   # User management
├── middlewares/
│   ├── authMiddleware.js   # Authentication middleware
│   └── errorMiddleware.js  # Error handling
├── models/
│   ├── User.js            # User model
│   ├── Product.js         # Product model
│   └── StockTransaction.js # Transaction model
├── routes/
│   ├── authRoutes.js      # Authentication routes
│   ├── productRoutes.js   # Product routes
│   ├── transactionRoutes.js # Transaction routes
│   └── userRoutes.js      # User routes
├── index.js               # Main server file
├── package.json           # Dependencies
└── README.md             # This file
```

### Scripts
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon

## Deployment

1. Set environment variables for production
2. Ensure MongoDB connection string is configured
3. Set appropriate CORS origins
4. Use a strong JWT secret
5. Enable HTTPS in production

## Contributing

1. Follow the existing code style
2. Add proper error handling
3. Include input validation
4. Write comprehensive tests
5. Update documentation

## License

This project is licensed under the ISC License.
