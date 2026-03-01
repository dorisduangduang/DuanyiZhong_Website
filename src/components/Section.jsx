import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../utils/cn';

const Section = ({ 
  children, 
  className, 
  id, 
  title, 
  subtitle,
  delay = 0 
}) => {
  return (
    <section id={id} className={cn("section-padding", className)}>
      <div className="container-wide">
        {(title || subtitle) && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay }}
            className="mb-12 md:mb-16"
          >
            {title && <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>}
            {subtitle && <p className="text-slate-500 max-w-2xl text-lg">{subtitle}</p>}
          </motion.div>
        )}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: delay + 0.1 }}
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
};

export default Section;
