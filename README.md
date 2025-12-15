# Inventory Management System

A full-stack MERN (MongoDB, Express, React, Node.js) Inventory Management System with modern UI, comprehensive features, and role-based access control.

## 🚀 Features

### Backend (Node.js/Express)
- **RESTful API**: Complete CRUD operations for all entities
- **Authentication**: JWT-based authentication with role-based access
- **Database**: MongoDB with Mongoose ODM
- **Validation**: Comprehensive input validation with express-validator
- **Security**: Password hashing, CORS, Helmet.js
- **Error Handling**: Centralized error handling middleware
- **Logging**: Morgan HTTP request logger

### Frontend (React)
- **Modern UI**: Clean, responsive design with Tailwind CSS
- **Authentication**: Secure login/logout with protected routes
- **Role-Based Access**: Admin and staff user roles
- **Real-time Updates**: Toast notifications and live feedback
- **Form Validation**: Client-side validation with react-hook-form
- **Search & Filtering**: Advanced search and filtering capabilities
- **Pagination**: Efficient data handling for large datasets

### Core Functionality
- **Product Management**: Complete inventory item management
- **Stock Transactions**: Track purchases, sales, adjustments, returns, transfers
- **User Management**: Admin-only user administration
- **Dashboard**: Real-time statistics and overview
- **Audit Trail**: Complete transaction history
- **Low Stock Alerts**: Automatic stock level monitoring

## 🛠 Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **Validation**: express-validator
- **Security**: helmet, cors
- **Logging**: morgan

### Frontend
- **Framework**: React 19 with Vite
- **Routing**: React Router DOM v6
- **Styling**: Tailwind CSS v4
- **State Management**: React Context API
- **HTTP Client**: Axios with interceptors
- **Forms**: React Hook Form
- **Icons**: Lucide React
- **Notifications**: React Hot Toast

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone <repository-url>
cd inventory-management
```

### 2. Backend Setup
```bash
cd backend
npm install
```

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

Start the backend server:
```bash
npm run dev
```

### 3. Frontend Setup
```bash
cd frontend
npm install
```

Create a `.env` file in the frontend directory:
```env
VITE_API_URL=http://localhost:5000/api
```

Start the frontend development server:
```bash
npm run dev
```

### 4. Access the Application
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## 👥 User Roles

### Admin
- Full access to all features
- User management (create, edit, delete users)
- System configuration
- All product and transaction operations

### Staff
- Product management (view, create, edit, delete)
- Transaction management (create and view)
- Limited access to user features
- Dashboard access

## 🔐 Authentication

### Demo Credentials
- **Admin**: admin@example.com / password123
- **Staff**: staff@example.com / password123

### JWT Token Flow
1. User logs in with credentials
2. Server validates and returns JWT token
3. Token stored in localStorage
4. Token automatically included in API requests
5. Protected routes check token validity
6. Automatic logout on token expiration

## 📊 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update profile
- `PUT /api/auth/change-password` - Change password

### Products
- `GET /api/products` - Get all products (with pagination, search, filters)
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create new product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product
- `GET /api/products/categories` - Get categories
- `GET /api/products/low-stock` - Get low stock products
- `GET /api/products/stats` - Get product statistics

### Transactions
- `GET /api/transactions` - Get all transactions
- `GET /api/transactions/:id` - Get single transaction
- `POST /api/transactions` - Create new transaction
- `GET /api/transactions/stats` - Get transaction statistics
- `GET /api/transactions/recent` - Get recent transactions

### Users (Admin Only)
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get single user
- `POST /api/users` - Create new user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user
- `GET /api/users/stats` - Get user statistics

## 🏗 Project Structure

```
inventory-management/
├── backend/
│   ├── config/
│   │   └── db.js              # Database configuration
│   ├── controllers/
│   │   ├── authController.js   # Authentication logic
│   │   ├── productController.js # Product management
│   │   ├── transactionController.js # Stock transactions
│   │   └── userController.js   # User management
│   ├── middlewares/
│   │   ├── authMiddleware.js   # Authentication middleware
│   │   └── errorMiddleware.js  # Error handling
│   ├── models/
│   │   ├── User.js            # User model
│   │   ├── Product.js         # Product model
│   │   └── StockTransaction.js # Transaction model
│   ├── routes/
│   │   ├── authRoutes.js      # Authentication routes
│   │   ├── productRoutes.js   # Product routes
│   │   ├── transactionRoutes.js # Transaction routes
│   │   └── userRoutes.js      # User routes
│   ├── index.js               # Main server file
│   ├── package.json           # Dependencies
│   └── README.md             # Backend documentation
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── Layout.jsx      # Main layout
│   │   ├── contexts/
│   │   │   └── AuthContext.jsx # Authentication context
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx   # Dashboard page
│   │   │   ├── Login.jsx       # Login page
│   │   │   ├── Products.jsx    # Products page
│   │   │   ├── ProductForm.jsx # Product form
│   │   │   ├── Transactions.jsx # Transactions page
│   │   │   └── Users.jsx       # Users page
│   │   ├── services/
│   │   │   └── api.js          # API service
│   │   ├── utils/
│   │   │   └── cn.js           # Utility functions
│   │   ├── App.jsx             # Main app component
│   │   └── main.jsx            # App entry point
│   ├── package.json            # Dependencies
│   └── README.md              # Frontend documentation
└── README.md                  # This file
```

## 🔧 Development

### Backend Development
```bash
cd backend
npm run dev  # Start with nodemon
npm start    # Start production server
```

### Frontend Development
```bash
cd frontend
npm run dev   # Start development server
npm run build # Build for production
npm run preview # Preview production build
```

### Database Setup
1. Install MongoDB locally or use MongoDB Atlas
2. Create a database named `inventory_management`
3. Update the `MONGODB_URI` in backend `.env` file
4. The application will automatically create collections and indexes

## 🚀 Deployment

### Backend Deployment
1. Set production environment variables
2. Use a process manager like PM2
3. Set up reverse proxy (Nginx)
4. Enable HTTPS
5. Configure MongoDB connection

### Frontend Deployment
1. Build the application: `npm run build`
2. Deploy to static hosting (Vercel, Netlify, etc.)
3. Set production API URL
4. Configure CORS on backend

### Environment Variables

#### Backend (.env)
```env
PORT=5000
NODE_ENV=production
MONGODB_URI=mongodb://your-mongodb-uri
JWT_SECRET=your-secure-jwt-secret
JWT_EXPIRE=24h
CORS_ORIGIN=https://your-frontend-domain.com
```

#### Frontend (.env)
```env
VITE_API_URL=https://your-backend-domain.com/api
```

## 🔒 Security Features

- **Password Hashing**: bcryptjs for secure password storage
- **JWT Authentication**: Secure token-based authentication
- **Input Validation**: Server-side validation with express-validator
- **CORS Protection**: Configured CORS for security
- **Helmet.js**: Security headers
- **Role-Based Access**: Granular permission system
- **SQL Injection Protection**: Mongoose ODM protection
- **XSS Protection**: Input sanitization

## 📈 Performance Optimizations

### Backend
- Database indexing for faster queries
- Pagination for large datasets
- Efficient aggregation pipelines
- Connection pooling
- Response caching (future enhancement)

### Frontend
- Code splitting and lazy loading
- Optimized bundle size
- Debounced search inputs
- Efficient re-rendering
- Image optimization

## 🧪 Testing

### Backend Testing
```bash
cd backend
npm test  # Run tests (when implemented)
```

### Frontend Testing
```bash
cd frontend
npm test  # Run tests (when implemented)
```

## 📝 API Documentation

The API follows RESTful conventions with consistent response formats:

### Success Response
```json
{
  "success": true,
  "data": { ... },
  "pagination": { ... } // if applicable
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error message"
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

### Development Guidelines
- Follow existing code style
- Add proper error handling
- Include input validation
- Write comprehensive tests
- Update documentation

## 📄 License

This project is licensed under the ISC License.

## 🆘 Support

For support and questions:
1. Check the documentation in each directory
2. Review the API endpoints
3. Check the console for error messages
4. Verify environment variables
5. Ensure MongoDB is running

## 🔮 Future Enhancements

- **Real-time Updates**: WebSocket integration
- **Advanced Analytics**: Charts and reporting
- **Barcode Scanning**: Mobile barcode support
- **Offline Support**: Service worker implementation
- **Multi-language**: Internationalization support
- **Advanced Filters**: More sophisticated search options
- **Bulk Operations**: Mass import/export functionality
- **Print Support**: Receipt and label printing
- **Email Notifications**: Low stock alerts
- **Mobile App**: React Native version
- **API Rate Limiting**: Request throttling
- **Audit Logging**: Comprehensive activity logs

## 🎯 Getting Started Checklist

- [ ] Install Node.js and MongoDB
- [ ] Clone the repository
- [ ] Set up backend environment variables
- [ ] Install backend dependencies
- [ ] Start backend server
- [ ] Set up frontend environment variables
- [ ] Install frontend dependencies
- [ ] Start frontend development server
- [ ] Create initial admin user
- [ ] Test all features
- [ ] Deploy to production (optional)

---

**Happy Coding! 🚀** 