import React, { useState, useMemo } from 'react';
import { Product, CartItem } from '../types';
import { Search, Plus, Minus, Trash2, CreditCard, Banknote, Smartphone, Receipt } from 'lucide-react';

interface POSProps {
  products: Product[];
  onCompleteSale: (items: CartItem[], total: number, method: 'Cash' | 'Card' | 'Digital') => void;
}

export const POS: React.FC<POSProps> = ({ products, onCompleteSale }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);

  const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))];

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchTerm, selectedCategory]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(0, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  const handlePayment = (method: 'Cash' | 'Card' | 'Digital') => {
    onCompleteSale(cart, total, method);
    setCart([]);
    setIsCheckoutModalOpen(false);
  };

  return (
    <div className="flex h-full overflow-hidden bg-gray-50">
      {/* Left Side: Products Grid */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Search & Filter Bar */}
        <div className="p-4 bg-white border-b border-gray-200 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search menu..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-coffee-500"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === cat 
                    ? 'bg-coffee-600 text-white shadow-md' 
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredProducts.map(product => (
              <div 
                key={product.id}
                onClick={() => addToCart(product)}
                className="group bg-white rounded-xl p-3 shadow-sm hover:shadow-md border border-gray-100 cursor-pointer transition-all active:scale-95 flex flex-col"
              >
                <div className="relative aspect-square rounded-lg overflow-hidden mb-3 bg-gray-100">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                  <div className="absolute bottom-0 right-0 bg-coffee-600 text-white px-2 py-1 rounded-tl-lg text-sm font-bold">
                    ${product.price.toFixed(2)}
                  </div>
                </div>
                <h3 className="font-heading font-semibold text-gray-800 truncate">{product.name}</h3>
                <p className="text-xs text-gray-500 truncate">{product.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side: Cart */}
      <div className="w-96 bg-white border-l border-gray-200 flex flex-col shadow-xl z-10">
        <div className="p-5 border-b border-gray-200 bg-coffee-50">
          <h2 className="text-xl font-heading font-bold text-coffee-900 flex items-center gap-2">
            <Receipt size={20} />
            Current Order
          </h2>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-400 opacity-60">
              <Receipt size={64} className="mb-4" />
              <p>Order is empty</p>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.id} className="flex items-center justify-between bg-white p-3 rounded-lg border border-gray-100 shadow-sm">
                <div className="flex-1 min-w-0 mr-3">
                  <h4 className="font-medium text-gray-800 truncate">{item.name}</h4>
                  <p className="text-sm text-coffee-600">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
                <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-1">
                  <button onClick={() => updateQuantity(item.id, -1)} className="p-1 hover:bg-white rounded-md transition-colors text-gray-600">
                    {item.quantity === 1 ? <Trash2 size={16} className="text-red-500" /> : <Minus size={16} />}
                  </button>
                  <span className="font-medium w-4 text-center">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, 1)} className="p-1 hover:bg-white rounded-md transition-colors text-gray-600">
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-5 bg-white border-t border-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
          <div className="space-y-2 mb-4 text-sm">
            <div className="flex justify-between text-gray-500">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-500">
              <span>Tax (8%)</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-xl font-bold text-coffee-900 pt-2 border-t border-dashed border-gray-200">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
          <button
            onClick={() => setIsCheckoutModalOpen(true)}
            disabled={cart.length === 0}
            className="w-full bg-coffee-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-coffee-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all shadow-lg shadow-coffee-600/20 active:scale-95"
          >
            Checkout
          </button>
        </div>
      </div>

      {/* Checkout Modal */}
      {isCheckoutModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-scale-up">
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-2xl font-heading font-bold text-center text-coffee-900">Complete Payment</h3>
              <p className="text-center text-gray-500 mt-1">Total to pay: <span className="font-bold text-coffee-700">${total.toFixed(2)}</span></p>
            </div>
            <div className="p-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <PaymentMethodButton icon={<Banknote size={32} />} label="Cash" onClick={() => handlePayment('Cash')} />
              <PaymentMethodButton icon={<CreditCard size={32} />} label="Card" onClick={() => handlePayment('Card')} />
              <PaymentMethodButton icon={<Smartphone size={32} />} label="Digital" onClick={() => handlePayment('Digital')} />
            </div>
            <div className="p-4 bg-gray-50 text-center">
              <button onClick={() => setIsCheckoutModalOpen(false)} className="text-gray-500 hover:text-gray-800 text-sm font-medium underline">
                Cancel Transaction
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const PaymentMethodButton = ({ icon, label, onClick }: any) => (
  <button 
    onClick={onClick}
    className="flex flex-col items-center justify-center p-6 bg-white border-2 border-gray-100 rounded-xl hover:border-coffee-500 hover:bg-coffee-50 transition-all gap-3 group"
  >
    <div className="text-gray-400 group-hover:text-coffee-600 transition-colors">{icon}</div>
    <span className="font-medium text-gray-700 group-hover:text-coffee-800">{label}</span>
  </button>
);