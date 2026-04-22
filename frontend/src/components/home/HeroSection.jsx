import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Star } from 'lucide-react';

const stats = [
  { value: '10K+', label: 'Happy Customers' },
  { value: '500+', label: 'Products' },
  { value: '15yrs', label: 'Craftsmanship' },
];

const HeroSection = () => (
  <section className="relative min-h-[calc(100vh-4rem)] bg-secondary overflow-hidden flex items-center">
    {/* Background geometry */}
    <div className="absolute inset-0 pointer-events-none select-none">
      <div className="absolute right-0 top-0 w-1/2 h-full bg-stone-100/70" />
      <div className="absolute -bottom-24 left-1/3 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute top-20 -left-12 w-48 h-48 bg-accent/5 rounded-full blur-2xl" />
    </div>

    <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-0">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

        {/* ── Left: Text ── */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="order-2 lg:order-1"
        >
          {/* Badge */}
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-accent/10 text-accent-dark px-4 py-1.5 rounded-full text-[11px] font-bold tracking-widest uppercase mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            New Collection 2026
          </motion.span>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="font-serif text-5xl sm:text-6xl xl:text-[5.5rem] font-bold leading-[1.08] tracking-tight text-primary"
          >
            Craft Your
            <em className="block not-italic text-accent"> Perfect</em>
            Living Space.
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="mt-7 text-stone-500 text-base sm:text-lg leading-relaxed max-w-[440px]"
          >
            Discover handcrafted furniture that blends timeless Scandinavian
            design with modern functionality — built to last generations.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.7 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <Link
              to="/products"
              className="group inline-flex items-center gap-3 bg-primary text-white px-8 py-4 text-sm font-semibold tracking-wide hover:bg-accent transition-all duration-300"
            >
              Shop Collection
              <ArrowRight size={17} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="#categories"
              className="inline-flex items-center gap-2 border border-stone-300 text-primary px-8 py-4 text-sm font-semibold hover:bg-stone-100 hover:border-stone-400 transition-all duration-300"
            >
              Browse Rooms
            </a>
          </motion.div>

          {/* Stats strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.85, duration: 0.8 }}
            className="mt-14 pt-8 border-t border-stone-200 grid grid-cols-3 gap-6"
          >
            {stats.map((s) => (
              <div key={s.label}>
                <p className="font-serif text-2xl sm:text-3xl font-bold text-primary">{s.value}</p>
                <p className="text-xs text-stone-400 mt-1 font-medium tracking-wide">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* ── Right: Image ── */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.15 }}
          className="order-1 lg:order-2 relative"
        >
          {/* Geometric accent frames */}
          <div className="absolute -top-5 -right-3 lg:-right-7 w-28 h-28 border-2 border-accent/25" />
          <div className="absolute -bottom-4 -left-3 lg:-left-7 w-20 h-20 bg-stone-200" />

          {/* Main image */}
          <div className="relative aspect-[4/5] overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=85&w=900"
              alt="Premium emerald velvet sofa — Furnit 2026 Collection"
              className="w-full h-full object-cover"
              loading="eager"
            />

            {/* Rating chip */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.6 }}
              className="absolute bottom-8 -left-4 lg:-left-7 bg-white shadow-2xl p-4 min-w-[180px]"
            >
              <div className="flex gap-0.5 mb-1.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={11} fill="#d4a373" strokeWidth={0} />
                ))}
              </div>
              <p className="text-xs font-bold text-primary">4.9 / 5 Rating</p>
              <p className="text-[10px] text-stone-400 mt-0.5">From 2,400+ verified reviews</p>
            </motion.div>

            {/* Price badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2, duration: 0.5 }}
              className="absolute top-8 right-0 bg-accent text-white px-4 py-2.5"
            >
              <p className="text-[9px] tracking-widest uppercase font-semibold opacity-80">From</p>
              <p className="text-xl font-bold leading-tight">$299</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>

    {/* Scroll cue */}
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2 }}
      className="hidden lg:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2"
    >
      <span className="text-[10px] text-stone-400 tracking-[0.2em] uppercase">Scroll</span>
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
        className="w-px h-10 bg-gradient-to-b from-stone-400 to-transparent"
      />
    </motion.div>
  </section>
);

export default HeroSection;
