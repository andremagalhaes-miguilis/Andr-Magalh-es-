import React, { useState, useEffect } from 'react';
import { LayoutDashboard, Coffee, Users, ShoppingCart, FileText, LogOut, Package } from 'lucide-react';
import { Login } from './components/Login';
import { Dashboard } from './components/Dashboard';
import { POS } from './components/POS';
import { Products } from './components/Products';
import { Reports } from './components/Reports';
import { User, Role, Product, Sale, CartItem } from './types';
import { MOCK_PRODUCTS, MOCK_SALES, MOCK_SUPPLIES, MOCK_CLIENTS } from './constants';

type View = 'dashboard' | 'pos' | 'products' | 'supplies' | 'clients' | 'reports';

const App = () => {
  const [user, setUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState<View>('dashboard');
  
  // App State
  const [products, setProducts] = useState(MOCK_PRODUCTS);
  const [sales, setSales] = useState(MOCK_SALES);
  
  // Persist login simulation
  useEffect(() => {
      const saved = localStorage.getItem('coffee_user');
      if (saved) setUser(JSON.parse(saved));
  }, []);

  const handleLogin = (u: User) => {
    setUser(u);
    localStorage.setItem('coffee_user', JSON.stringify(u));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('coffee_user');
  };

  const handleSaleComplete = (cartItems: CartItem[], total: number, method: 'Cash' | 'Card' | 'Digital') => {
    const newSale: Sale = {
      id: `t${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      total,
      paymentMethod: method,
      items: cartItems.reduce((acc, item) => acc + item.quantity, 0)
    };
    setSales(prev => [newSale, ...prev]);
    
    // Update Mock Stock
    const newProducts = products.map(p => {
      const inCart = cartItems.find(c => c.id === p.id);
      if (inCart) {
        return { ...p, stock: Math.max(0, p.stock - inCart.quantity) };
      }
      return p;
    });
    setProducts(newProducts);
  };

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="flex h-screen bg-coffee-50 font-sans text-gray-800">
      {/* Sidebar */}
      <aside className="w-20 lg:w-64 bg-coffee-900 text-coffee-100 flex flex-col transition-all duration-300 shadow-2xl">
        <div className="h-20 flex items-center justify-center lg:justify-start lg:px-6 border-b border-coffee-800">
           <div className="bg-coffee-700 p-2 rounded-lg">
             <Coffee className="text-amber-400" size={24} />
           </div>
           <span className="hidden lg:block ml-3 font-heading font-bold text-xl text-white tracking-wide">Espresso Flow</span>
        </div>

        <nav className="flex-1 py-6 space-y-2 px-3">
          <SidebarItem 
            icon={<LayoutDashboard size={20} />} 
            label="Dashboard" 
            active={currentView === 'dashboard'} 
            onClick={() => setCurrentView('dashboard')} 
          />
          <SidebarItem 
            icon={<ShoppingCart size={20} />} 
            label="POS System" 
            active={currentView === 'pos'} 
            onClick={() => setCurrentView('pos')} 
          />
          <div className="pt-4 pb-2">
            <p className="hidden lg:block text-xs font-bold text-coffee-400 px-4 uppercase tracking-wider">Management</p>
          </div>
          <SidebarItem 
            icon={<Coffee size={20} />} 
            label="Products" 
            active={currentView === 'products'} 
            onClick={() => setCurrentView('products')} 
          />
          <SidebarItem 
            icon={<Package size={20} />} 
            label="Supplies" 
            active={currentView === 'supplies'} 
            onClick={() => setCurrentView('supplies')} 
          />
           <SidebarItem 
            icon={<Users size={20} />} 
            label="Clients" 
            active={currentView === 'clients'} 
            onClick={() => setCurrentView('clients')} 
          />
          <SidebarItem 
            icon={<FileText size={20} />} 
            label="Reports" 
            active={currentView === 'reports'} 
            onClick={() => setCurrentView('reports')} 
          />
        </nav>

        <div className="p-4 border-t border-coffee-800">
          <button onClick={handleLogout} className="flex items-center gap-3 w-full p-2 rounded-lg text-coffee-300 hover:bg-coffee-800 hover:text-white transition-colors">
            <LogOut size={20} />
            <span className="hidden lg:block text-sm font-medium">Sign Out</span>
          </button>
          <div className="mt-4 flex items-center gap-3 hidden lg:flex">
             <img src={user.avatar} alt="User" className="w-8 h-8 rounded-full border border-coffee-600" />
             <div className="overflow-hidden">
               <p className="text-sm font-medium text-white truncate">{user.name}</p>
               <p className="text-xs text-coffee-400 truncate">{user.role}</p>
             </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden bg-coffee-50/50">
        <header className="h-16 bg-white border-b border-coffee-100 flex items-center justify-between px-6 shadow-sm lg:hidden">
           <span className="font-heading font-bold text-lg text-coffee-900">Espresso Flow</span>
           <div className="w-8 h-8 bg-coffee-200 rounded-full overflow-hidden">
             <img src={user.avatar} alt="" />
           </div>
        </header>
        
        <div className="flex-1 overflow-hidden relative">
          {currentView === 'dashboard' && (
            <Dashboard sales={sales} products={products} supplies={MOCK_SUPPLIES} />
          )}
          {currentView === 'pos' && (
            <POS products={products} onCompleteSale={handleSaleComplete} />
          )}
          {currentView === 'products' && (
            <Products products={products} onAddProduct={(p) => setProducts([...products, p])} />
          )}
          {currentView === 'reports' && (
            <Reports sales={sales} products={products} supplies={MOCK_SUPPLIES} clients={MOCK_CLIENTS} />
          )}
          {/* Placeholders for other views to save space but maintain structure */}
          {currentView === 'supplies' && (
            <div className="p-8 text-center text-gray-500">Supply Management Module (Mock Placeholder)</div>
          )}
          {currentView === 'clients' && (
            <div className="p-8 text-center text-gray-500">Client CRM Module (Mock Placeholder)</div>
          )}
        </div>
      </main>
    </div>
  );
};

const SidebarItem = ({ icon, label, active, onClick }: any) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group ${
      active 
      ? 'bg-amber-500 text-coffee-900 font-semibold shadow-lg shadow-amber-500/20' 
      : 'text-coffee-200 hover:bg-coffee-800 hover:text-white'
    }`}
  >
    <span className={active ? 'text-coffee-900' : 'text-coffee-400 group-hover:text-white'}>{icon}</span>
    <span className="hidden lg:block text-sm">{label}</span>
  </button>
);

export default App;