import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

export const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 z-[100] origin-left"
      style={{ scaleX }}
    >
      {/* Beam Core */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary to-accent shadow-[0_0_20px_rgba(147,51,234,0.5)]" />
      
      {/* Leading Tip */}
      <motion.div 
        className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full blur-[2px] shadow-[0_0_10px_white,0_0_20px_white]"
        style={{ opacity: useTransform(scaleX, [0, 0.05], [0, 1]) }}
      />
    </motion.div>
  );
};
