# Inventory Management System - Frontend

A modern React-based frontend for the Inventory Management System with a beautiful UI, responsive design, and comprehensive functionality.

## Features

- **Modern UI/UX**: Clean, responsive design built with Tailwind CSS
- **Authentication**: Secure login/logout with JWT token management
- **Role-Based Access**: Admin and staff user roles with different permissions
- **Product Management**: Complete CRUD operations for inventory items
- **Stock Transactions**: Track purchases, sales, adjustments, returns, and transfers
- **User Management**: Admin-only user administration
- **Search & Filtering**: Advanced search and filtering capabilities
- **Real-time Updates**: Toast notifications and real-time feedback
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Form Validation**: Comprehensive client-side validation using react-hook-form

## Tech Stack

- **Framework**: React 19 with Vite
- **Routing**: React Router DOM v6
- **Styling**: Tailwind CSS v4
- **State Management**: React Context API
- **HTTP Client**: Axios with interceptors
- **Forms**: React Hook Form with validation
- **Icons**: Lucide React
- **Notifications**: React Hot Toast
- **Date Handling**: date-fns
- **Charts**: Recharts (for future analytics)

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Backend API running (see backend README)

## Installation

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the frontend directory:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   └── Layout.jsx              # Main layout with sidebar and header
│   ├── contexts/
│   │   └── AuthContext.jsx         # Authentication context
│   ├── pages/
│   │   ├── Dashboard.jsx           # Main dashboard with stats
│   │   ├── Login.jsx               # Authentication page
│   │   ├── Products.jsx            # Product listing and management
│   │   ├── ProductForm.jsx         # Add/edit product form
│   │   ├── Transactions.jsx        # Transaction listing and creation
│   │   └── Users.jsx               # User management (admin only)
│   ├── services/
│   │   └── api.js                  # API service functions
│   ├── utils/
│   │   └── cn.js                   # Utility functions
│   ├── App.jsx                     # Main app component with routing
│   ├── main.jsx                    # App entry point
│   └── index.css                   # Global styles
├── public/                         # Static assets
├── package.json                    # Dependencies and scripts
└── README.md                      # This file
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Pages & Features

### Authentication
- **Login Page**: Secure authentication with email/password
- **Protected Routes**: Role-based access control
- **Token Management**: Automatic token refresh and logout

### Dashboard
- **Statistics Cards**: Overview of key metrics
- **Recent Activity**: Latest products and transactions
- **Quick Actions**: Fast access to common tasks
- **Real-time Data**: Live updates from the API

### Products
- **Product Listing**: Grid view with search and filters
- **Product Form**: Comprehensive add/edit form
- **Stock Status**: Visual indicators for stock levels
- **Categories**: Dynamic category management
- **Pagination**: Efficient handling of large datasets

### Transactions
- **Transaction History**: Complete audit trail
- **Transaction Creation**: Modal form for new transactions
- **Type Filtering**: Filter by transaction type
- **Date Range**: Filter by date ranges
- **Product Linking**: Direct links to related products

### Users (Admin Only)
- **User Management**: Create, edit, and delete users
- **Role Assignment**: Assign admin or staff roles
- **Status Control**: Activate/deactivate users
- **User Statistics**: Overview of user activity

## API Integration

The frontend communicates with the backend through a centralized API service:

```javascript
// Example API usage
import { productsAPI } from '../services/api';

// Get all products
const products = await productsAPI.getAll({ page: 1, limit: 10 });

// Create a product
const newProduct = await productsAPI.create(productData);

// Update a product
const updatedProduct = await productsAPI.update(id, productData);
```

## Authentication Flow

1. **Login**: User enters credentials
2. **Token Storage**: JWT token stored in localStorage
3. **API Headers**: Token automatically added to API requests
4. **Route Protection**: Protected routes check authentication
5. **Token Refresh**: Automatic token validation on app start
6. **Logout**: Token removal and redirect to login

## State Management

The app uses React Context API for global state management:

- **AuthContext**: User authentication and profile data
- **Local State**: Component-specific state with useState
- **Form State**: React Hook Form for form management

## Styling

- **Tailwind CSS**: Utility-first CSS framework
- **Responsive Design**: Mobile-first approach
- **Custom Components**: Reusable styled components
- **Dark Mode Ready**: Easy theme switching capability

## Form Validation

All forms use React Hook Form with comprehensive validation:

```javascript
const { register, handleSubmit, formState: { errors } } = useForm();

// Validation rules
{...register('email', {
  required: 'Email is required',
  pattern: {
    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    message: 'Invalid email address'
  }
})}
```

## Error Handling

- **API Errors**: Centralized error handling with toast notifications
- **Form Errors**: Real-time validation feedback
- **Network Errors**: Graceful fallbacks and retry mechanisms
- **User Feedback**: Clear error messages and loading states

## Performance Optimizations

- **Code Splitting**: Route-based code splitting
- **Lazy Loading**: Components loaded on demand
- **Memoization**: React.memo for expensive components
- **Debounced Search**: Optimized search input handling
- **Pagination**: Efficient data loading

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Development Guidelines

### Code Style
- Use functional components with hooks
- Follow React best practices
- Use TypeScript for better type safety (future enhancement)
- Maintain consistent naming conventions

### Component Structure
```javascript
// Component template
import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const ComponentName = () => {
  // Hooks
  const { user } = useAuth();
  
  // State
  const [data, setData] = useState([]);
  
  // Effects
  useEffect(() => {
    // Side effects
  }, []);
  
  // Handlers
  const handleAction = () => {
    // Action logic
  };
  
  // Render
  return (
    <div>
      {/* JSX */}
    </div>
  );
};

export default ComponentName;
```

### API Integration
- Use the centralized API service
- Handle loading and error states
- Provide user feedback with toast notifications
- Implement proper error boundaries

## Deployment

### Build for Production
```bash
npm run build
```

### Environment Variables
Set the following environment variables for production:
```env
VITE_API_URL=https://your-api-domain.com/api
```

### Static Hosting
The built files can be deployed to any static hosting service:
- Vercel
- Netlify
- AWS S3
- GitHub Pages

## Contributing

1. Follow the existing code style
2. Add proper error handling
3. Include form validation
4. Test on multiple devices
5. Update documentation

## Future Enhancements

- **Real-time Updates**: WebSocket integration
- **Advanced Analytics**: Charts and reporting
- **Barcode Scanning**: Mobile barcode support
- **Offline Support**: Service worker implementation
- **Multi-language**: Internationalization support
- **Advanced Filters**: More sophisticated search options
- **Bulk Operations**: Mass import/export functionality
- **Print Support**: Receipt and label printing

## License

This project is licensed under the ISC License.
