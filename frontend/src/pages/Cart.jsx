import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Trash2, Minus, Plus, ArrowLeft } from 'lucide-react';
import { removeFromCart, updateQuantity } from '../store/cartSlice';
import { motion } from 'framer-motion';

const Cart = () => {
  const { items } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-3xl font-bold">Your cart is empty</h2>
        <p className="text-gray-500 mt-4">Look like you haven't added anything to your cart yet.</p>
        <Link to="/products" className="inline-block mt-8 bg-primary text-white px-8 py-4 hover:bg-gray-800 transition-colors">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold tracking-tight mb-12">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
          {items.map((item) => (
            <motion.div 
              key={item.id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex gap-6 pb-8 border-b border-gray-100"
            >
              <div className="w-24 h-32 bg-gray-100 flex-shrink-0">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-grow flex flex-col justify-between">
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">{item.category}</p>
                  </div>
                  <p className="font-bold">${item.price}</p>
                </div>
                <div className="flex justify-between items-end">
                  <div className="flex items-center border border-gray-200">
                    <button 
                      onClick={() => dispatch(updateQuantity({ id: item.id, quantity: Math.max(1, item.quantity - 1) }))}
                      className="p-2 hover:bg-gray-50"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="px-4 text-sm font-medium">{item.quantity}</span>
                    <button 
                      onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
                      className="p-2 hover:bg-gray-50"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  <button 
                    onClick={() => dispatch(removeFromCart(item.id))}
                    className="text-gray-400 hover:text-red-500 transition-colors flex items-center gap-1 text-sm"
                  >
                    <Trash2 size={16} />
                    Remove
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
          <Link to="/products" className="inline-flex items-center text-sm font-medium text-accent hover:underline">
            <ArrowLeft size={16} className="mr-2" />
            Continue Shopping
          </Link>
        </div>

        <div className="bg-secondary p-8 h-fit sticky top-24">
          <h2 className="text-xl font-bold mb-6">Order Summary</h2>
          <div className="space-y-4 text-sm">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Shipping</span>
              <span>Calculated at checkout</span>
            </div>
            <div className="pt-4 border-t border-gray-200 flex justify-between text-lg font-bold">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
          <button className="w-full mt-8 bg-primary text-white py-4 font-bold hover:bg-gray-800 transition-all uppercase tracking-widest text-sm">
            Checkout
          </button>
          <p className="text-xs text-gray-500 text-center mt-4 italic">
            Free shipping on orders over $1000.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Cart;
