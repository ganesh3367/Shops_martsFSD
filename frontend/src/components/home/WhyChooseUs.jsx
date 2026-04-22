import React from 'react';
import { Truck, Shield, Award, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedSection from '../AnimatedSection';

const benefits = [
  {
    Icon: Truck,
    title: 'Free White-Glove Delivery',
    desc: 'Complimentary in-home delivery and assembly on all orders over $500. We handle everything.',
  },
  {
    Icon: Shield,
    title: '5-Year Warranty',
    desc: 'Every piece is backed by our comprehensive warranty. Quality craftsmanship you can count on.',
  },
  {
    Icon: Award,
    title: 'Premium Materials',
    desc: 'Sustainably sourced solid woods, premium fabrics, and ethically manufactured hardware.',
  },
  {
    Icon: RefreshCw,
    title: '30-Day Returns',
    desc: 'Not completely in love? Return within 30 days — no questions asked, full refund guaranteed.',
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const WhyChooseUs = () => (
  <section className="py-24 bg-primary text-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      <AnimatedSection className="text-center mb-16">
        <span className="text-accent text-[11px] font-bold tracking-widest uppercase">Why Furnit</span>
        <h2 className="font-serif text-4xl sm:text-5xl font-bold text-white mt-3">
          Crafted with Purpose
        </h2>
        <p className="text-stone-400 mt-4 max-w-lg mx-auto text-sm leading-relaxed">
          We believe great furniture is more than objects — it's the backdrop to your life's best moments.
        </p>
      </AnimatedSection>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-14"
      >
        {benefits.map(({ Icon, title, desc }) => (
          <motion.div
            key={title}
            variants={item}
            className="group text-center lg:text-left"
          >
            <div className="inline-flex items-center justify-center w-12 h-12 border border-accent/30 text-accent mb-6 group-hover:bg-accent group-hover:border-accent group-hover:text-white transition-all duration-300">
              <Icon size={20} strokeWidth={1.5} />
            </div>
            <h3 className="font-semibold text-white text-[15px] leading-snug mb-2.5">{title}</h3>
            <p className="text-stone-400 text-sm leading-relaxed">{desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default WhyChooseUs;
