import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ShoppingCart } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../store/cartSlice';
import { toast } from 'react-hot-toast';
import AnimatedSection from '../AnimatedSection';

const featured = [
  {
    id: 1,
    name: 'Minimalist Oak Chair',
    price: 24817,
    category: 'Chairs',
    tag: 'Bestseller',
    image: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 2,
    name: 'Velvet Emerald Sofa',
    price: 74617,
    category: 'Sofas',
    tag: 'New Arrival',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 3,
    name: 'Marble Coffee Table',
    price: 37350,
    category: 'Tables',
    tag: 'Popular',
    image: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 4,
    name: 'Woven Rattan Armchair',
    price: 32287,
    category: 'Chairs',
    tag: null,
    image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&q=80&w=600',
  },
];

const tagStyles = {
  Bestseller: 'bg-primary text-white',
  'New Arrival': 'bg-accent text-white',
  Popular: 'bg-stone-100 text-stone-700',
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const FeaturedProducts = () => {
  const dispatch = useDispatch();

  const handleAddToCart = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToCart(product));
    toast.success('Added to cart!');
  };

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <AnimatedSection className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-14 gap-4">
          <div>
            <span className="text-accent text-[11px] font-bold tracking-widest uppercase">
              Curated for You
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-primary mt-3 leading-tight">
              Featured Pieces
            </h2>
            <p className="text-stone-500 mt-3 max-w-md text-sm leading-relaxed">
              Each piece is thoughtfully designed and rigorously tested for quality and comfort.
            </p>
          </div>
          <Link
            to="/products"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-primary border-b-2 border-primary pb-0.5 hover:text-accent hover:border-accent transition-colors whitespace-nowrap shrink-0"
          >
            View All Products
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </AnimatedSection>

        {/* Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
        >
          {featured.map((product) => (
            <motion.div key={product.id} variants={item}>
              <Link to={`/products/${product.id}`} className="group block">

                {/* Image */}
                <div className="relative aspect-[3/4] bg-stone-100 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />

                  {/* Tag */}
                  {product.tag && (
                    <span
                      className={`absolute top-3 left-3 text-[10px] font-bold tracking-widest uppercase px-3 py-1 ${tagStyles[product.tag] ?? 'bg-white text-primary'}`}
                    >
                      {product.tag}
                    </span>
                  )}

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/8 transition-colors duration-300" />

                  {/* Quick add bar */}
                  <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <button
                      onClick={(e) => handleAddToCart(e, product)}
                      className="w-full bg-white text-primary py-3.5 text-[11px] font-bold tracking-widest uppercase hover:bg-accent hover:text-white transition-colors duration-200 flex items-center justify-center gap-2"
                    >
                      <ShoppingCart size={13} />
                      Quick Add
                    </button>
                  </div>
                </div>

                {/* Info */}
                <div className="mt-4 px-0.5 flex justify-between items-start gap-2">
                  <div className="min-w-0">
                    <h3 className="text-sm font-semibold text-primary group-hover:text-accent transition-colors truncate">
                      {product.name}
                    </h3>
                    <p className="text-xs text-stone-400 mt-0.5 uppercase tracking-wide">
                      {product.category}
                    </p>
                  </div>
                  <p className="text-sm font-bold text-primary shrink-0">₹{product.price}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
