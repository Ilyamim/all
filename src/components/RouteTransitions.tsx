import React from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

export const RouteTransitions: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const reduced = useReducedMotion();
  const variants = {
    initial: { opacity: 0, y: reduced ? 0 : 12 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: reduced ? 0 : -12 },
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        variants={variants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.25 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};
