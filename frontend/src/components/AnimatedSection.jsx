import React from 'react';
import { motion } from 'framer-motion';

const directionMap = {
  up:    { hidden: { opacity: 0, y: 40 },  show: { opacity: 1, y: 0 } },
  down:  { hidden: { opacity: 0, y: -40 }, show: { opacity: 1, y: 0 } },
  left:  { hidden: { opacity: 0, x: -40 }, show: { opacity: 1, x: 0 } },
  right: { hidden: { opacity: 0, x: 40 },  show: { opacity: 1, x: 0 } },
  fade:  { hidden: { opacity: 0 },          show: { opacity: 1 } },
};

const AnimatedSection = ({ children, delay = 0, direction = 'up', className = '' }) => {
  const { hidden, show } = directionMap[direction] ?? directionMap.up;

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-80px' }}
      variants={{
        hidden,
        show: {
          ...show,
          transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94], delay },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection;
