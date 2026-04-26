import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { SkeletonGrid } from '../components/SkeletonCard';

const allProducts = [
  { id: 1, name: 'Minimalist Oak Chair', price: 24817, category: 'Chairs', image: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&q=80&w=600' },
  { id: 2, name: 'Velvet Emerald Sofa', price: 74617, category: 'Sofas', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=600' },
  { id: 3, name: 'Marble Coffee Table', price: 37350, category: 'Tables', image: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&q=80&w=600' },
  { id: 4, name: 'Scandi Desk Lamp', price: 7387, category: 'Lighting', image: 'https://images.unsplash.com/photo-1507473884658-c70b5b5f0962?auto=format&fit=crop&q=80&w=600' },
  { id: 5, name: 'Oak Dining Table', price: 99600, category: 'Tables', image: 'https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&q=80&w=600' },
  { id: 6, name: 'Woven Rattan Armchair', price: 32287, category: 'Chairs', image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&q=80&w=600' },
  { id: 7, name: 'Linen Accent Chair', price: 28967, category: 'Chairs', image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&q=80&w=600' },
  { id: 8, name: 'Walnut Bookshelf', price: 49717, category: 'Storage', image: 'https://images.unsplash.com/photo-1594484208280-efa00f96fc21?auto=format&fit=crop&q=80&w=600' },
];

const categories = ['All', 'Chairs', 'Sofas', 'Tables', 'Lighting', 'Storage'];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Products = () => {
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  // Simulate initial load
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(t);
  }, []);

  const filtered = allProducts.filter((p) => {
    const matchesCat = activeCategory === 'All' || p.category === activeCategory;
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">

      {/* Page header */}
      <div className="mb-12">
        <span className="text-accent text-[11px] font-bold tracking-widest uppercase">
          Our Collection
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-primary mt-2 leading-tight">
          All Products
        </h1>
        <p className="text-stone-500 mt-3 text-sm">
          {filtered.length} piece{filtered.length !== 1 ? 's' : ''} found
        </p>
      </div>

      {/* Filters bar */}
      <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center mb-10">
        {/* Category pills */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 text-xs font-semibold tracking-wide transition-all duration-200 ${
                activeCategory === cat
                  ? 'bg-primary text-white'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full lg:w-72 shrink-0">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-stone-200 bg-white text-sm text-primary outline-none focus:border-accent transition-colors placeholder-stone-400"
          />
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <SkeletonGrid count={8} cols={4} />
      ) : (
        <AnimatePresence mode="wait">
          {filtered.length > 0 ? (
            <motion.div
              key="grid"
              variants={container}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8"
            >
              {filtered.map((product) => (
                <motion.div key={product.id} variants={item}>
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-24"
            >
              <SlidersHorizontal size={32} className="text-stone-300 mx-auto mb-4" />
              <p className="text-stone-400 text-lg font-serif">No products match your criteria.</p>
              <button
                onClick={() => { setSearch(''); setActiveCategory('All'); }}
                className="mt-4 text-sm text-accent font-semibold hover:underline"
              >
                Clear filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
};

export default Products;
