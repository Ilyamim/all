import React from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

interface ModalProps {
  open: boolean;
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}

export const Modal: React.FC<ModalProps> = ({ open, title, children, onClose }) => {
  const reduced = useReducedMotion();
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="w-full max-w-lg rounded-xl bg-card p-6 shadow-soft"
            initial={reduced ? { opacity: 0 } : { scale: 0.96, opacity: 0 }}
            animate={reduced ? { opacity: 1 } : { scale: 1, opacity: 1 }}
            exit={reduced ? { opacity: 0 } : { scale: 0.96, opacity: 0 }}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">{title}</h3>
              <button className="text-sm text-muted" onClick={onClose}>
                Close
              </button>
            </div>
            <div className="mt-4">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
