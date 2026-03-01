import React, { useState, useEffect } from 'react';
import { motion, useSpring, useTransform, useMotionValueEvent } from 'framer-motion';

const Counter = ({ value, suffix = '', duration = 2 }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const spring = useSpring(0, { 
    duration: duration * 1000, 
    bounce: 0,
    stiffness: 100,
    damping: 30
  });
  
  const rounded = useTransform(spring, (current) => Math.round(current));

  useMotionValueEvent(rounded, "change", (latest) => {
    setDisplayValue(latest);
  });

  useEffect(() => {
    spring.set(value);
  }, [value, spring]);

  return (
    <span className="font-bold text-4xl md:text-5xl tabular-nums">
      {displayValue}
      <span className="text-2xl md:text-3xl ml-1 font-medium">{suffix}</span>
    </span>
  );
};

export default Counter;
