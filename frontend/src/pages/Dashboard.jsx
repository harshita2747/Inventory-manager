import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { 
  Package, 
  TrendingUp, 
  AlertTriangle, 
  DollarSign,
  Plus,
  Eye,
  ShoppingCart,
  Users
} from 'lucide-react';

import { productsAPI, transactionsAPI } from '../services/api';
import { cn } from '../utils/cn';

const Dashboard = () => {
  const [stats, setStats] = useState({
    products: {},
    transactions: {}
  });
  const [recentProducts, setRecentProducts] = useState([]);
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [productStats, transactionStats, products, transactions] = await Promise.all([
          productsAPI.getStats(),
          transactionsAPI.getStats(),
          productsAPI.getAll({ limit: 5 }),
          transactionsAPI.getRecent({ limit: 5 })
        ]);

        setStats({
          products: productStats.data.data,
          transactions: transactionStats.data.data
        }); 
        setRecentProducts(products.data.data);
        setRecentTransactions(transactions.data.data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const statCards = [
    {
      name: 'Total Products',
      value: stats.products.totalProducts || 0,
      icon: Package,
      color: 'bg-blue-500',
      href: '/products'
    },
    {
      name: 'Low Stock Items',
      value: stats.products.lowStockProducts || 0,
      icon: AlertTriangle,
      color: 'bg-yellow-500',
      href: '/products?lowStock=true'
    },
    {
      name: 'Total Value',
      value: `$${(stats.products.totalValue || 0).toLocaleString()}`,
      icon: DollarSign,
      color: 'bg-green-500',
      href: '/products'
    },
    {
      name: 'Recent Transactions',
      value: stats.transactions.totalTransactions || 0,
      icon: TrendingUp,
      color: 'bg-purple-500',
      href: '/transactions'
    }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h1 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-green-600 tracking-tight whitespace-nowrap pl-1">Dashboard</h1>
        <div className="flex flex-col gap-2 sm:flex-row sm:space-x-3 w-full sm:w-auto">
          <Link
            to="/products/new"
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 w-full sm:w-auto"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Product
          </Link>
          <Link
            to="/transactions"
            className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 w-full sm:w-auto"
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            New Transaction
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => (
          <Link
            key={stat.name}
            to={stat.href}
            className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className={cn("flex items-center justify-center h-8 w-8 rounded-md", stat.color)}>
                    <stat.icon className="h-5 w-5 text-white" />
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      {stat.name}
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {stat.value}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Products */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Recent Products
              </h3>
              <Link
                to="/products"
                className="text-sm text-blue-600 hover:text-blue-500"
              >
                View all
              </Link>
            </div>
            <div className="space-y-4">
              {recentProducts.length > 0 ? (
                recentProducts.map((product) => (
                  <div key={product._id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <Package className="h-8 w-8 text-gray-400" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {product.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          SKU: {product.sku} • Qty: {product.quantity}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-gray-900">
                        ${product.price}
                      </span>
                      <Link
                        to={`/products/${product._id}/edit`}
                        className="text-blue-600 hover:text-blue-500"
                      >
                        <Eye className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">No products found</p>
              )}
            </div>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Recent Transactions
              </h3>
              <Link
                to="/transactions"
                className="text-sm text-blue-600 hover:text-blue-500"
              >
                View all
              </Link>
            </div>
            <div className="space-y-4">
              {recentTransactions.length > 0 ? (
                recentTransactions.map((transaction) => (
                  <div key={transaction._id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <ShoppingCart className="h-8 w-8 text-gray-400" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {transaction.product?.name || 'Unknown Product'}
                        </div>
                        <div className="text-sm text-gray-500">
                          {transaction.type} • {transaction.quantity} units
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={cn(
                        "text-sm font-medium",
                        transaction.type === 'sale' ? 'text-green-600' : 'text-blue-600'
                      )}>
                        ${transaction.totalAmount}
                      </span>
                      <span className={cn(
                        "inline-flex items-center px-2 py-0.5 rounded text-xs font-medium",
                        transaction.type === 'purchase' && "bg-blue-100 text-blue-800",
                        transaction.type === 'sale' && "bg-green-100 text-green-800",
                        transaction.type === 'adjustment' && "bg-yellow-100 text-yellow-800",
                        transaction.type === 'return' && "bg-purple-100 text-purple-800"
                      )}>
                        {transaction.type}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">No transactions found</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
            Quick Actions
          </h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Link
              to="/products/new"
              className="relative rounded-lg border border-gray-300 bg-white px-4 py-4 sm:px-6 sm:py-5 shadow-sm flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
            >
              <div className="flex-shrink-0">
                <Plus className="h-6 w-6 text-blue-600" />
              </div>
              <div className="flex-1 min-w-0 text-center sm:text-left">
                <span className="absolute inset-0" aria-hidden="true" />
                <p className="text-sm font-medium text-gray-900">
                  Add Product
                </p>
                <p className="text-sm text-gray-500">
                  Create new product
                </p>
              </div>
            </Link>

            <Link
              to="/transactions"
              className="relative rounded-lg border border-gray-300 bg-white px-4 py-4 sm:px-6 sm:py-5 shadow-sm flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
            >
              <div className="flex-shrink-0">
                <ShoppingCart className="h-6 w-6 text-green-600" />
              </div>
              <div className="flex-1 min-w-0 text-center sm:text-left">
                <span className="absolute inset-0" aria-hidden="true" />
                <p className="text-sm font-medium text-gray-900">
                  New Transaction
                </p>
                <p className="text-sm text-gray-500">
                  Record stock movement
                </p>
              </div>
            </Link>

            <Link
              to="/products?lowStock=true"
              className="relative rounded-lg border border-gray-300 bg-white px-4 py-4 sm:px-6 sm:py-5 shadow-sm flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
            >
              <div className="flex-shrink-0">
                <AlertTriangle className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="flex-1 min-w-0 text-center sm:text-left">
                <span className="absolute inset-0" aria-hidden="true" />
                <p className="text-sm font-medium text-gray-900">
                  Low Stock Alert
                </p>
                <p className="text-sm text-gray-500">
                  Check inventory levels
                </p>
              </div>
            </Link>

            <Link
              to="/products"
              className="relative rounded-lg border border-gray-300 bg-white px-4 py-4 sm:px-6 sm:py-5 shadow-sm flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
            >
              <div className="flex-shrink-0">
                <Package className="h-6 w-6 text-purple-600" />
              </div>
              <div className="flex-1 min-w-0 text-center sm:text-left">
                <span className="absolute inset-0" aria-hidden="true" />
                <p className="text-sm font-medium text-gray-900">
                  View Products
                </p>
                <p className="text-sm text-gray-500">
                  Manage inventory
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 