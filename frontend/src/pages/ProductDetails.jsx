import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { ShoppingBag, Heart, Shield, Truck, RotateCcw } from 'lucide-react';
import { addToCart } from '../store/cartSlice';
import { toast } from 'react-hot-toast';

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

  // Mock data for now
  const product = {
    id,
    name: 'Minimalist Oak Chair',
    price: 299,
    category: 'Chairs',
    description: 'The Oak Chair combines timeless Scandinavian design with premium comfort. Crafted from solid white oak with a durable matte finish, it features a contoured seat and backrest that provide excellent support for long hours of seating. Perfect for dining rooms, home offices, or as an accent piece in your living space.',
    images: [
      'https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&q=80&w=800'
    ],
    details: [
      { label: 'Material', value: 'Solid White Oak' },
      { label: 'Finish', value: 'Matte Varnish' },
      { label: 'Dimensions', value: 'W 50cm x D 55cm x H 80cm' },
      { label: 'Weight', value: '6.5 kg' }
    ]
  };

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, quantity, image: product.images[0] }));
    toast.success(`${product.name} added to cart`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col lg:flex-row gap-16">
        {/* Images */}
        <div className="lg:w-1/2 space-y-4">
          <div className="aspect-[4/5] bg-gray-100 overflow-hidden">
            <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            {product.images.slice(1).map((img, i) => (
              <div key={i} className="aspect-square bg-gray-100 overflow-hidden">
                <img src={img} alt={`${product.name} ${i}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="lg:w-1/2 space-y-8">
          <div>
            <nav className="flex mb-4 text-xs font-medium text-gray-400 uppercase tracking-widest">
              <Link to="/" className="hover:text-black">Home</Link>
              <span className="mx-2">/</span>
              <Link to="/products" className="hover:text-black">Collection</Link>
              <span className="mx-2">/</span>
              <span className="text-black">{product.name}</span>
            </nav>
            <h1 className="text-4xl font-bold tracking-tight">{product.name}</h1>
            <p className="mt-4 text-2xl font-bold text-accent">${product.price}</p>
          </div>

          <p className="text-gray-600 leading-relaxed">
            {product.description}
          </p>

          <div className="space-y-4 pt-4 border-t border-gray-100">
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-gray-200">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-3 hover:bg-gray-50">-</button>
                <span className="px-6 font-medium">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="p-3 hover:bg-gray-50">+</button>
              </div>
              <button 
                onClick={handleAddToCart}
                className="flex-grow bg-primary text-white py-4 font-bold hover:bg-gray-800 transition-all uppercase tracking-widest text-sm flex items-center justify-center gap-2"
              >
                <ShoppingBag size={18} />
                Add to Cart
              </button>
              <button className="p-4 border border-gray-200 hover:bg-gray-50 transition-colors">
                <Heart size={20} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
            <div className="flex flex-col items-center text-center p-4 bg-secondary rounded-sm">
              <Truck size={24} className="mb-2" />
              <span className="text-xs font-bold uppercase tracking-tighter">Free Shipping</span>
            </div>
            <div className="flex flex-col items-center text-center p-4 bg-secondary rounded-sm">
              <RotateCcw size={24} className="mb-2" />
              <span className="text-xs font-bold uppercase tracking-tighter">30 Day Return</span>
            </div>
            <div className="flex flex-col items-center text-center p-4 bg-secondary rounded-sm">
              <Shield size={24} className="mb-2" />
              <span className="text-xs font-bold uppercase tracking-tighter">2 Year Warranty</span>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-100">
            <h3 className="text-sm font-bold uppercase tracking-widest mb-4">Product Details</h3>
            <dl className="grid grid-cols-2 gap-y-4 gap-x-8">
              {product.details.map((detail, i) => (
                <div key={i}>
                  <dt className="text-xs text-gray-500 uppercase">{detail.label}</dt>
                  <dd className="text-sm font-medium mt-1">{detail.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
