import React, { useState } from 'react';
import { Coffee, ShieldCheck } from 'lucide-react';
import { User, Role } from '../types';

interface LoginProps {
  onLogin: (user: User) => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = () => {
    setLoading(true);
    // Simulate API delay
    setTimeout(() => {
      const mockUser: User = {
        id: 'g_123',
        name: 'Demo Admin',
        email: 'admin@espressoflow.com',
        role: Role.ADMIN,
        avatar: 'https://picsum.photos/100/100?random=99'
      };
      onLogin(mockUser);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[url('https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=2071&auto=format&fit=crop')] bg-cover bg-center relative">
      {/* Overlay */}
      <div className="absolute inset-0 bg-coffee-900/60 backdrop-blur-sm"></div>

      <div className="relative z-10 bg-white/95 p-8 rounded-2xl shadow-2xl w-full max-w-md border border-coffee-200">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-coffee-600 p-4 rounded-full mb-4 shadow-lg">
            <Coffee size={40} className="text-white" />
          </div>
          <h1 className="text-3xl font-heading font-bold text-coffee-900">Espresso Flow</h1>
          <p className="text-coffee-600 mt-2">Management System</p>
        </div>

        <div className="space-y-4">
          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 bg-white border-2 border-gray-200 text-gray-700 font-semibold py-3 px-4 rounded-xl hover:bg-gray-50 transition-all transform hover:scale-[1.02] active:scale-95"
          >
            {loading ? (
               <span className="animate-spin h-5 w-5 border-2 border-gray-400 border-t-coffee-600 rounded-full"></span>
            ) : (
              <>
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                <span>Continue with Google</span>
              </>
            )}
          </button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or sign in with email</span>
            </div>
          </div>

          <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
             <div>
               <input type="email" placeholder="Email" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-coffee-500 focus:border-transparent outline-none" />
             </div>
             <div>
               <input type="password" placeholder="Password" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-coffee-500 focus:border-transparent outline-none" />
             </div>
             <button className="w-full bg-coffee-600 text-white font-bold py-3 px-4 rounded-xl hover:bg-coffee-700 transition-colors shadow-lg shadow-coffee-600/30">
               Sign In
             </button>
          </form>
        </div>

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-400 flex items-center justify-center gap-1">
            <ShieldCheck size={12} />
            Secure Enterprise Login
          </p>
        </div>
      </div>
    </div>
  );
};