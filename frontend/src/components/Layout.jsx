import { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  Menu, 
  X, 
  LogOut,
  User,
  Settings
} from 'lucide-react';
import { cn } from '../utils/cn';

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout, isAdmin } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Products', href: '/products', icon: Package },
    { name: 'Transactions', href: '/transactions', icon: ShoppingCart },
    ...(isAdmin ? [{ name: 'Users', href: '/users', icon: Users }] : []),
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (href) => {
    return location.pathname === href || location.pathname.startsWith(href + '/');
  };

  const getUserName = () => user?.fullName || '';

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Mobile sidebar */}
      <div className={cn(
        "fixed inset-0 z-50 lg:hidden",
        sidebarOpen ? "block" : "hidden"
      )}
      
      >
        <div className="fixed inset-0 bg-gray-700 bg-opacity-60 backdrop-blur-sm" onClick={() => setSidebarOpen(false)}  />
        <div className="fixed inset-y-0 left-0 flex flex-col bg-white/90 backdrop-blur-lg rounded-none shadow-2xl" style={{
          width: "300px"
        }}>
          <div className="flex h-16 items-center justify-between px-6 border-b border-gray-200">
            <h1 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-green-400 tracking-tight whitespace-nowrap pl-1">Inventory Manager</h1>
            <button
              onClick={() => setSidebarOpen(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <nav className="flex-1 space-y-1 px-4 py-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "group flex items-center px-3 py-2 text-base font-medium rounded-lg transition-all duration-200",
                  isActive(item.href)
                    ? "bg-gradient-to-r from-blue-100 to-green-100 text-blue-900 shadow"
                    : "text-gray-600 hover:bg-gray-100 hover:text-blue-700"
                )}
                onClick={() => setSidebarOpen(false)}
              >
                <item.icon className="mr-4 h-5 w-5 text-blue-400 group-hover:text-blue-600 transition-colors" />
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col flex-grow bg-white/80 backdrop-blur-lg border-r border-gray-200 rounded-none shadow-2xl">
          <div className="flex h-16 items-center px-6 border-b border-gray-200">
            <h1 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-green-400 tracking-tight whitespace-nowrap pl-1">Inventory Manager</h1>
          </div>
          <nav className="flex-1 space-y-1 px-4 py-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "group flex items-center px-3 py-2 text-base font-medium rounded-lg transition-all duration-200",
                  isActive(item.href)
                    ? "bg-gradient-to-r from-blue-100 to-green-100 text-blue-900 shadow"
                    : "text-gray-600 hover:bg-gray-100 hover:text-blue-700"
                )}
              >
                <item.icon className="mr-4 h-5 w-5 text-blue-400 group-hover:text-blue-600 transition-colors" />
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top header */}
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white/80 backdrop-blur-md px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
          <button
            type="button"
            className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>

          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <div className="flex flex-1" />
            <div className="flex items-center gap-x-4 lg:gap-x-6">
              {/* User menu */}
              <div className="relative">
                <div className="flex items-center gap-x-3">
                  <div className="flex items-center gap-x-2 bg-white/70 px-3 py-1 rounded-lg shadow-sm">
                    <User className="h-5 w-5 text-blue-400" />
                    <span className="text-sm font-semibold text-gray-900">
                      {getUserName()}
                    </span>
                    <span className="text-xs text-gray-500 capitalize">
                      ({user?.role})
                    </span>
                  </div>
                  <div className="flex items-center gap-x-2">
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-x-1 text-sm text-gray-600 hover:text-blue-700 transition-colors"
                    >
                      <LogOut className="h-4 w-4" />
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="py-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout; 