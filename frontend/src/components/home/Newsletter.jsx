import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle2, Mail } from 'lucide-react';
import AnimatedSection from '../AnimatedSection';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
    setEmail('');
  };

  return (
    <section className="py-24 bg-accent relative overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/5 rounded-full" />
        <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-black/5 rounded-full" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 mb-6">
            <Mail size={20} className="text-white" />
          </div>

          <span className="text-white/60 text-[11px] font-bold tracking-widest uppercase">
            Stay Updated
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-white mt-3 leading-tight">
            Design Inspiration,
            <br />Delivered Weekly.
          </h2>
          <p className="text-white/70 mt-4 text-sm sm:text-base leading-relaxed">
            Get early access to new collections, exclusive member offers, and curated interior design tips from our experts.
          </p>

          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="mt-10 flex items-center justify-center gap-3 bg-white/20 border border-white/30 px-8 py-4 text-white font-semibold text-sm"
              >
                <CheckCircle2 size={18} />
                You're on the list! Welcome to Furnit.
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="mt-10 flex flex-col sm:flex-row gap-3"
              >
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-white/20 text-white placeholder-white/50 border border-white/30 px-5 py-4 text-sm outline-none focus:border-white focus:bg-white/25 transition-all"
                />
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  type="submit"
                  className="group inline-flex items-center justify-center gap-2 bg-white text-accent-dark px-8 py-4 text-sm font-bold tracking-wide hover:bg-primary hover:text-white transition-all duration-300 whitespace-nowrap"
                >
                  Subscribe
                  <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>

          <p className="text-white/40 text-xs mt-4">
            No spam, ever. Unsubscribe anytime in one click.
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default Newsletter;
