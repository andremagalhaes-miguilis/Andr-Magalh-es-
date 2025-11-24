import React, { useState } from 'react';
import { Product } from '../types';
import { Edit, Plus, Search } from 'lucide-react';

interface ProductsProps {
  products: Product[];
  onAddProduct: (p: Product) => void;
}

export const Products: React.FC<ProductsProps> = ({ products, onAddProduct }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    category: 'Coffee',
    price: 0,
    stock: 0
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newProduct.name && newProduct.price) {
      onAddProduct({
        id: Date.now().toString(),
        name: newProduct.name,
        category: newProduct.category || 'Coffee',
        price: Number(newProduct.price),
        stock: Number(newProduct.stock),
        description: newProduct.description || '',
        image: `https://picsum.photos/200/200?random=${Date.now()}`
      } as Product);
      setIsOpen(false);
      setNewProduct({ category: 'Coffee', price: 0, stock: 0 });
    }
  };

  return (
    <div className="p-6 h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-heading font-bold text-coffee-900">Menu Management</h2>
        <button onClick={() => setIsOpen(true)} className="bg-coffee-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-coffee-700 transition-colors">
          <Plus size={18} /> Add Product
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 flex-1 overflow-hidden flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input type="text" placeholder="Search products..." className="w-full pl-9 pr-4 py-2 rounded-lg border border-gray-200 text-sm focus:ring-1 focus:ring-coffee-500 outline-none" />
          </div>
        </div>
        
        <div className="overflow-auto flex-1">
          <table className="w-full text-left border-collapse">
            <thead className="bg-coffee-50 sticky top-0">
              <tr>
                <th className="p-4 text-xs font-semibold text-gray-500 uppercase">Product</th>
                <th className="p-4 text-xs font-semibold text-gray-500 uppercase">Category</th>
                <th className="p-4 text-xs font-semibold text-gray-500 uppercase">Price</th>
                <th className="p-4 text-xs font-semibold text-gray-500 uppercase">Stock</th>
                <th className="p-4 text-xs font-semibold text-gray-500 uppercase">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {products.map(p => (
                <tr key={p.id} className="hover:bg-gray-50/50">
                  <td className="p-4 flex items-center gap-3">
                    <img src={p.image} alt="" className="w-10 h-10 rounded-lg object-cover bg-gray-200" />
                    <span className="font-medium text-gray-800">{p.name}</span>
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-xs font-medium">{p.category}</span>
                  </td>
                  <td className="p-4 font-medium text-gray-900">${p.price.toFixed(2)}</td>
                  <td className="p-4 text-gray-600">{p.stock}</td>
                  <td className="p-4">
                    <button className="p-1.5 text-gray-500 hover:text-coffee-600 hover:bg-coffee-50 rounded-lg transition-colors">
                      <Edit size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-2xl">
            <h3 className="text-xl font-bold mb-4">Add New Product</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input 
                className="w-full border p-2 rounded-lg" 
                placeholder="Name" 
                value={newProduct.name || ''}
                onChange={e => setNewProduct({...newProduct, name: e.target.value})}
              />
              <select 
                className="w-full border p-2 rounded-lg"
                value={newProduct.category}
                onChange={e => setNewProduct({...newProduct, category: e.target.value})}
              >
                <option>Coffee</option>
                <option>Tea</option>
                <option>Pastry</option>
                <option>Food</option>
              </select>
              <div className="flex gap-4">
                 <input 
                  type="number"
                  className="w-full border p-2 rounded-lg" 
                  placeholder="Price" 
                  step="0.01"
                  value={newProduct.price || ''}
                  onChange={e => setNewProduct({...newProduct, price: Number(e.target.value)})}
                />
                 <input 
                  type="number"
                  className="w-full border p-2 rounded-lg" 
                  placeholder="Stock" 
                  value={newProduct.stock || ''}
                  onChange={e => setNewProduct({...newProduct, stock: Number(e.target.value)})}
                />
              </div>
               <textarea 
                  className="w-full border p-2 rounded-lg" 
                  placeholder="Description" 
                  value={newProduct.description || ''}
                  onChange={e => setNewProduct({...newProduct, description: e.target.value})}
                />
              <div className="flex justify-end gap-2 pt-4">
                <button type="button" onClick={() => setIsOpen(false)} className="px-4 py-2 text-gray-600">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-coffee-600 text-white rounded-lg">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};