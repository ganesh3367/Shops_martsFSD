import React, { useState } from 'react';
import api from '../api/axiosConfig';
import { toast } from 'react-hot-toast';
import { Plus, Trash2, Edit } from 'lucide-react';

const Admin = () => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: 'Chairs',
    description: '',
    image: '',
    stock: 10
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/products', formData);
      toast.success('Product added successfully!');
      setFormData({ name: '', price: '', category: 'Chairs', description: '', image: '', stock: 10 });
    } catch (error) {
      toast.error('Error adding product: ' + error.message);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight">Admin Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="bg-white p-8 border border-gray-100 shadow-sm">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Plus size={20} /> Add New Product
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Product Name</label>
              <input 
                type="text" 
                required
                className="w-full px-4 py-3 bg-gray-50 border border-transparent focus:bg-white focus:border-accent outline-none transition-all"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Price ($)</label>
                <input 
                  type="number" 
                  required
                  className="w-full px-4 py-3 bg-gray-50 border border-transparent focus:bg-white focus:border-accent outline-none transition-all"
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Category</label>
                <select 
                  className="w-full px-4 py-3 bg-gray-50 border border-transparent focus:bg-white focus:border-accent outline-none transition-all"
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                >
                  <option>Chairs</option>
                  <option>Sofas</option>
                  <option>Tables</option>
                  <option>Lighting</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Image URL</label>
              <input 
                type="text" 
                required
                className="w-full px-4 py-3 bg-gray-50 border border-transparent focus:bg-white focus:border-accent outline-none transition-all"
                value={formData.image}
                onChange={(e) => setFormData({...formData, image: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Description</label>
              <textarea 
                rows="4"
                className="w-full px-4 py-3 bg-gray-50 border border-transparent focus:bg-white focus:border-accent outline-none transition-all"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              ></textarea>
            </div>
            <button 
              type="submit"
              className="w-full bg-primary text-white py-4 font-bold hover:bg-gray-800 transition-all uppercase tracking-widest text-sm"
            >
              Save Product
            </button>
          </form>
        </div>

        <div className="bg-secondary p-8">
          <h2 className="text-xl font-bold mb-6">Recent Activities</h2>
          <div className="space-y-4">
            <div className="bg-white p-4 text-sm border-l-4 border-accent">
              <p className="font-bold text-gray-900">System Ready</p>
              <p className="text-gray-500 mt-1">Firebase is connected. You can now manage your inventory.</p>
            </div>
            <div className="bg-white p-4 text-sm border-l-4 border-gray-200">
              <p className="font-bold text-gray-900">New Order #4201</p>
              <p className="text-gray-500 mt-1">A customer just purchased a 'Minimalist Oak Chair'.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
