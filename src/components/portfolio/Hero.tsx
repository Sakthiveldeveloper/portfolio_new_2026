import { motion } from 'framer-motion';
import { useMousePosition } from '@/hooks/useMousePosition';
import { fadeInUp, staggerContainer, letterAnimation } from '@/lib/animations';
import { Download, ArrowDown } from 'lucide-react';
import { ParticleField } from '@/components/ui/ParticleField';
import { MagneticButton } from '@/components/ui/MagneticButton';

const roles = [
  "Senior Full Stack Engineer",
  "Senior Frontend Engineer",
  "Microfrontend Architect", 
  "Problem Solver"
];

const AnimatedName = ({ name }: { name: string }) => {
  const letters = name.split('');
  
  return (
    <motion.span className="inline-flex overflow-hidden">
      {letters.map((letter, i) => (
        <motion.span
          key={i}
          custom={i}
          variants={letterAnimation}
          initial="hidden"
          animate="visible"
          className={letter === ' ' ? 'w-4' : ''}
        >
          {letter}
        </motion.span>
      ))}
    </motion.span>
  );
};

const RoleCarousel = () => {
  return (
    <div className="h-8 md:h-10 overflow-hidden relative">
      <motion.div
        animate={{ y: ['0%', '-75%'] }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
          times: [0, 0.25, 0.5, 0.75, 1],
        }}
        className="flex flex-col"
      >
        {[...roles, roles[0]].map((role, i) => (
          <motion.span
            key={i}
            className="h-8 md:h-10 flex items-center text-xl md:text-2xl text-gradient font-medium"
          >
            {role}
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
};

export const Hero = () => {
  const mouse = useMousePosition();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6">
      {/* Animated Background */}
      <ParticleField />
      
      <div className="absolute inset-0 -z-10 bg-gradient-radial from-transparent to-background" />

      {/* Mouse-following spotlight */}
      <motion.div
        className="pointer-events-none fixed inset-0 -z-5 opacity-50"
        style={{
          background: `radial-gradient(600px circle at ${mouse.x}px ${mouse.y}px, hsl(var(--primary) / 0.1), transparent 40%)`,
        }}
      />

      {/* Content */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="text-center max-w-5xl mx-auto"
      >
        {/* Pre-title */}
        <motion.p
          variants={fadeInUp}
          className="text-muted-foreground text-sm md:text-base tracking-widest uppercase mb-6"
        >
          Hello, I'm
        </motion.p>

        {/* Name */}
        <motion.h1
          variants={fadeInUp}
          className="text-5xl md:text-7xl lg:text-8xl font-display font-bold mb-4 glow-text"
        >
          <AnimatedName name="Sakthivel A" />
        </motion.h1>

        {/* Role Carousel */}
        <motion.div variants={fadeInUp} className="mb-8">
          <RoleCarousel />
        </motion.div>

        {/* Tagline */}
        <motion.p
          variants={fadeInUp}
          className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          I build <span className="text-foreground font-medium">scalable systems</span>, 
          not just screens. Architecting enterprise-grade applications that handle 
          complexity with elegance.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={fadeInUp}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <MagneticButton href="#projects" className="group">
            <span className="glass-button flex items-center gap-2">
              View My Work
              <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
            </span>
          </MagneticButton>
          
          <MagneticButton href="#contact">
             <span className="glass-button-secondary flex items-center gap-2">
              <Download className="w-4 h-4" />
              Download Resume
            </span>
          </MagneticButton>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-2"
          >
            <motion.div
              animate={{ opacity: [0.3, 1, 0.3], y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-2 bg-primary rounded-full"
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};
