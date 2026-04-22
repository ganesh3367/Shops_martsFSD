import React from 'react';
import { Star, Quote } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedSection from '../AnimatedSection';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Mitchell',
    role: 'Interior Designer, London',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100&h=100',
    rating: 5,
    text: "The quality of these pieces is exceptional. I've been sourcing furniture for clients for 12 years and Furnit consistently delivers above and beyond every expectation.",
    product: 'Minimalist Oak Chair',
  },
  {
    id: 2,
    name: 'James Okafor',
    role: 'Homeowner, New York',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100&h=100',
    rating: 5,
    text: "Our living room was completely transformed. The velvet sofa is even more beautiful in person — exactly the centerpiece we'd been searching for. Worth every penny.",
    product: 'Velvet Emerald Sofa',
  },
  {
    id: 3,
    name: 'Priya Anand',
    role: 'Architect, Singapore',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100&h=100',
    rating: 5,
    text: "From the seamless ordering experience to the white-glove delivery, every touchpoint reflects a brand that genuinely cares about the customer experience.",
    product: 'Marble Coffee Table',
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const Testimonials = () => (
  <section className="py-24 bg-secondary">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      <AnimatedSection className="text-center mb-16">
        <span className="text-accent text-[11px] font-bold tracking-widest uppercase">Testimonials</span>
        <h2 className="font-serif text-4xl sm:text-5xl font-bold text-primary mt-3">
          Loved by Thousands
        </h2>
        <p className="text-stone-500 mt-3 text-sm max-w-md mx-auto leading-relaxed">
          Don't just take our word for it — here's what our customers have to say.
        </p>
      </AnimatedSection>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
      >
        {testimonials.map((t) => (
          <motion.div
            key={t.id}
            variants={item}
            className="bg-white p-8 relative hover:shadow-xl transition-shadow duration-300"
          >
            {/* Large quote */}
            <Quote size={30} className="text-accent/20 mb-5" fill="currentColor" />

            {/* Stars */}
            <div className="flex gap-1 mb-5">
              {Array.from({ length: t.rating }).map((_, i) => (
                <Star key={i} size={13} fill="#d4a373" strokeWidth={0} />
              ))}
            </div>

            <p className="text-stone-600 text-sm leading-relaxed italic">
              "{t.text}"
            </p>

            <p className="text-[10px] text-accent font-bold tracking-widest uppercase mt-5 mb-4">
              Re: {t.product}
            </p>

            <div className="flex items-center gap-3 pt-5 border-t border-stone-100">
              <img
                src={t.avatar}
                alt={t.name}
                className="w-10 h-10 rounded-full object-cover"
                loading="lazy"
              />
              <div>
                <p className="text-sm font-semibold text-primary">{t.name}</p>
                <p className="text-xs text-stone-400">{t.role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default Testimonials;
