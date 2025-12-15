import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../contexts/AuthContext';
import { Eye, EyeOff, Package } from 'lucide-react';
import { cn } from '../utils/cn';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const result = await login(data.email, data.password);
      if (result.success) {
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-green-50 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-700">
      <div className="w-full max-w-md mx-auto rounded-2xl shadow-xl bg-white/80 backdrop-blur-md p-8 animate-fade-in">
        <div className="flex flex-col items-center mb-6">
          <div className="h-16 w-16 flex items-center justify-center rounded-full bg-gradient-to-tr from-blue-400 to-green-500 shadow-lg animate-bounce-slow">
            <Package className="h-10 w-10 text-white" />
          </div>
          <h2 className="mt-4 text-center text-3xl font-extrabold text-gray-900 tracking-tight animate-slide-in">Sign in to your account</h2>
          <p className="mt-2 text-center text-sm text-gray-600 animate-fade-in-delay">Inventory Management System</p>
        </div>
        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address',
                  },
                })}
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                className={cn(
                  "input-modern py-2 px-3 w-full",
                  errors.email && "border-red-400 focus:ring-red-400"
                )}
                placeholder="Enter your email address"
              />
              {errors.email && (
                <p className="text-xs text-red-600 animate-shake">{errors.email.message}</p>
              )}
            </div>
            <div className="relative">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters',
                  },
                })}
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                className={cn(
                  "input-modern py-2 px-3 w-full pr-10",
                  errors.password && "border-red-400 focus:ring-red-400"
                )}
                placeholder="Enter your password"
              />
              <button
                type="button"
                className="absolute top-1/2 right-2 -translate-y-1/2 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={0}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400" />
                )}
              </button>
              {errors.password && (
                <p className="text-xs text-red-600 animate-shake">{errors.password.message}</p>
              )}
            </div>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className={cn(
              "w-full py-2 px-4 mt-2 rounded-lg bg-gradient-to-r from-green-400 to-blue-500 text-white font-semibold shadow-md hover:from-blue-500 hover:to-green-400 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 flex items-center justify-center gap-2",
              isLoading && "opacity-60 cursor-not-allowed"
            )}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span>
                Signing in...
              </span>
            ) : (
              <span>Sign in</span>
            )}
          </button>
          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              Don&apos;t have an account?{' '}
              <a href="/register" className="text-blue-600 hover:text-blue-800 font-medium transition-colors">Sign up</a>
            </p>
          </div>
        </form>
      </div>
      <style>{`
        .animate-fade-in { animation: fadeIn 1s ease; }
        .animate-fade-in-delay { animation: fadeIn 1.5s ease; }
        .animate-slide-in { animation: slideIn 0.7s cubic-bezier(.68,-0.55,.27,1.55); }
        .animate-bounce-slow { animation: bounce 2s infinite; }
        .animate-shake { animation: shake 0.4s; }
        .input-modern {
          @apply appearance-none rounded-lg block w-full border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 bg-white/80 shadow-sm transition-all duration-300;
        }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideIn { from { transform: translateY(-30px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        @keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        @keyframes shake { 0% { transform: translateX(0); } 25% { transform: translateX(-4px); } 50% { transform: translateX(4px); } 75% { transform: translateX(-4px); } 100% { transform: translateX(0); } }
      `}</style>
    </div>
  );
};

export default Login; 