'use client';

import { motion, useTransform } from 'framer-motion';

export default function ReadingProgress({ progress }) {
  // Transform progress to percentage
  const scaleX = useTransform(progress, [0, 1], ["0%", "100%"]);

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-50 h-1"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      <motion.div
        className="h-full bg-gradient-to-r from-[#FF7A7A] via-[#FFA07A] to-[#6FCF97] shadow-lg"
        style={{ width: scaleX }}
      />
    </motion.div>
  );
}

