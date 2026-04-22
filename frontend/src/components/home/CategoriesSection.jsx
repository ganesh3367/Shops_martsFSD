import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import AnimatedSection from '../AnimatedSection';

const categories = [
  {
    id: 1,
    name: 'Living Room',
    count: '120+ pieces',
    image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=900',
    link: '/products?category=living',
    span: 'col-span-2 lg:col-span-1 row-span-1 lg:row-span-2',
    height: 'h-64 lg:h-full min-h-[280px]',
  },
  {
    id: 2,
    name: 'Bedroom',
    count: '85+ pieces',
    image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&q=80&w=700',
    link: '/products?category=bedroom',
    span: '',
    height: 'h-52 lg:h-60',
  },
  {
    id: 3,
    name: 'Dining',
    count: '60+ pieces',
    image: 'https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&q=80&w=700',
    link: '/products?category=dining',
    span: '',
    height: 'h-52 lg:h-60',
  },
  {
    id: 4,
    name: 'Office',
    count: '45+ pieces',
    image: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?auto=format&fit=crop&q=80&w=700',
    link: '/products?category=office',
    span: '',
    height: 'h-52 lg:h-60',
  },
  {
    id: 5,
    name: 'Outdoor',
    count: '30+ pieces',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=700',
    link: '/products?category=outdoor',
    span: '',
    height: 'h-52 lg:h-60',
  },
];

const CategoryCard = ({ cat }) => (
  <Link
    to={cat.link}
    className={`group relative overflow-hidden block w-full ${cat.height}`}
  >
    <img
      src={cat.image}
      alt={cat.name}
      className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
      loading="lazy"
    />
    {/* Gradient */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />

    {/* Content */}
    <div className="absolute bottom-0 left-0 right-0 p-5 lg:p-6">
      <p className="text-white/60 text-[10px] uppercase tracking-widest font-semibold mb-1">
        {cat.count}
      </p>
      <h3 className="text-white font-serif text-xl lg:text-2xl font-bold">{cat.name}</h3>
      <span className="mt-2 inline-flex items-center gap-1.5 text-white/70 text-xs font-medium opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
        Explore <ArrowRight size={11} />
      </span>
    </div>
  </Link>
);

const CategoriesSection = () => (
  <section id="categories" className="py-24 bg-stone-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      <AnimatedSection className="text-center mb-14">
        <span className="text-accent text-[11px] font-bold tracking-widest uppercase">Explore</span>
        <h2 className="font-serif text-4xl sm:text-5xl font-bold text-primary mt-3">
          Shop by Room
        </h2>
        <p className="text-stone-500 mt-3 max-w-lg mx-auto text-sm leading-relaxed">
          Every space tells a story. Find the perfect pieces to complete yours.
        </p>
      </AnimatedSection>

      {/* Asymmetric grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5 lg:grid-rows-2">
        {categories.map((cat, idx) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: idx * 0.07 }}
            className={cat.span}
          >
            <CategoryCard cat={cat} />
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default CategoriesSection;
