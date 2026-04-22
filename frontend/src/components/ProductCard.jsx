import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { addToCart } from '../store/cartSlice';
import { toggleWishlist } from '../store/wishlistSlice';
import { toast } from 'react-hot-toast';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist.items);
  const isInWishlist = wishlist.some((item) => item.id === product.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToCart(product));
    toast.success(`${product.name} added to cart`);
  };

  const handleToggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(toggleWishlist(product));
    toast.success(isInWishlist ? 'Removed from wishlist' : 'Added to wishlist');
  };

  return (
    <Link to={`/products/${product.id}`} className="group block">
      {/* Image */}
      <div className="relative aspect-[3/4] bg-stone-100 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          loading="lazy"
        />

        {/* Subtle hover tint */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />

        {/* Action icons — slide in from right on hover */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 translate-x-10 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleToggleWishlist}
            className={`w-9 h-9 bg-white shadow-md flex items-center justify-center transition-colors ${
              isInWishlist ? 'text-red-500' : 'text-stone-400 hover:text-red-500'
            }`}
          >
            <Heart size={15} fill={isInWishlist ? 'currentColor' : 'none'} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleAddToCart}
            className="w-9 h-9 bg-white shadow-md flex items-center justify-center text-stone-400 hover:text-accent transition-colors"
          >
            <ShoppingCart size={15} />
          </motion.button>
        </div>

        {/* Quick add bar — slides up on hover */}
        <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button
            onClick={handleAddToCart}
            className="w-full bg-primary text-white py-3.5 text-[11px] font-bold tracking-widest uppercase hover:bg-accent transition-colors duration-200"
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="mt-4 px-0.5 flex justify-between items-start gap-2">
        <div className="min-w-0">
          <h3 className="text-sm font-semibold text-primary group-hover:text-accent transition-colors truncate leading-snug">
            {product.name}
          </h3>
          <p className="text-xs text-stone-400 mt-0.5 uppercase tracking-wide">{product.category}</p>
        </div>
        <p className="text-sm font-bold text-primary shrink-0">${product.price}</p>
      </div>
    </Link>
  );
};

export default ProductCard;
