import { motion, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';

interface GlassPanelProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  heavy?: boolean;
}

export default function GlassPanel({ children, className = '', delay = 0, heavy = false }: GlassPanelProps) {
  const panelVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
        delay: delay,
      },
    },
  };

  return (
    <motion.div
      variants={panelVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className={`${heavy ? 'glass-panel-heavy' : 'glass-panel'} rounded-3xl p-8 ${className}`}
    >
      {children}
    </motion.div>
  );
}
