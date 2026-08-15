import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { fadeInUp, staggerContainer, slideInLeft, slideInRight } from '@/lib/animations';
import { Briefcase, GraduationCap, Award, Code2 } from 'lucide-react';

const timeline = [
  {
    year: '2019',
    title: 'Anna University',
    subtitle: 'B.E. Computer Science',
    description: 'Graduated with a Bachelor of Engineering in CSE, building the foundation for full stack enterprise development.',
    icon: GraduationCap,
  },
  {
    year: '2022',
    title: 'Kaay Labs',
    subtitle: 'Associate Software Engineer',
    description: 'Led teams on Pie Factory and Mouser Electronics — Module Federation, Ant Design migrations, and 100K+ row data handling.',
    icon: Code2,
  },
  {
    year: '2025',
    title: 'Photon Interactive',
    subtitle: 'Senior Software Engineer',
    description: 'Leading an 8-member team on Tenetic — geography-based ad planning with Node.js, Python AI, and AWS.',
    icon: Briefcase,
  },
  {
    year: 'Now',
    title: 'Scaling Impact',
    subtitle: 'Full Stack Leadership',
    description: 'Delivering greenfield products to production — micro-frontends, microservices, and AI-driven platforms for global teams.',
    icon: Award,
  },
];

const stats = [
  { value: '4+', label: 'Years Experience' },
  { value: '450→0', label: 'Prod Bugs Fixed' },
  { value: '100K+', label: 'Row Datasets' },
  { value: '8', label: 'Team Members Led' },
];

const TimelineItem = ({ 
  item, 
  index 
}: { 
  item: typeof timeline[0]; 
  index: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const isLeft = index % 2 === 0;
  const Icon = item.icon;

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={`flex items-center gap-8 ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}
    >
      {/* Content Card */}
      <motion.div
        variants={isLeft ? slideInLeft : slideInRight}
        className="flex-1 glass-card p-6 md:p-8"
      >
        <span className="text-primary font-display text-sm font-bold tracking-wider">
          {item.year}
        </span>
        <h3 className="text-xl md:text-2xl font-display font-bold mt-2 mb-1">
          {item.title}
        </h3>
        <p className="text-accent font-medium text-sm mb-3">{item.subtitle}</p>
        <p className="text-muted-foreground leading-relaxed">{item.description}</p>
      </motion.div>

      {/* Timeline connector */}
      <div className="relative flex flex-col items-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : { scale: 0 }}
          transition={{ delay: 0.3, type: 'spring' }}
          className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center z-10"
        >
          <Icon className="w-5 h-5 text-primary-foreground" />
        </motion.div>
        {index < timeline.length - 1 && (
          <motion.div
            initial={{ height: 0 }}
            animate={isInView ? { height: '100px' } : { height: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="w-px bg-gradient-to-b from-primary to-transparent"
          />
        )}
      </div>

      {/* Spacer for alignment */}
      <div className="flex-1 hidden md:block" />
    </motion.div>
  );
};

const StatCard = ({ stat, index }: { stat: typeof stats[0]; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
      className="glass-card p-6 text-center group hover:border-primary/50 transition-colors relative overflow-hidden"
    >
      {/* Starlight Effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
        <motion.div 
            className="absolute top-2 left-10 w-1 h-1 bg-white rounded-full blur-[1px]"
            animate={{ opacity: [0, 1, 0] }} 
            transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
        />
        <motion.div 
            className="absolute bottom-4 right-12 w-1 h-1 bg-accent rounded-full blur-[1px]"
            animate={{ opacity: [0, 1, 0], scale: [0, 1.5, 0] }} 
            transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
        />
        <motion.div 
            className="absolute top-1/2 right-4 w-px h-8 bg-gradient-to-b from-transparent via-white to-transparent opacity-20"
            animate={{ y: [-20, 20], opacity: [0, 0.5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
        />
      </div>

      <motion.span
        initial={{ scale: 0.5 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ delay: index * 0.1 + 0.2, type: 'spring' }}
        className="text-4xl md:text-5xl font-display font-bold text-gradient block mb-2"
      >
        {stat.value}
      </motion.span>
      <span className="text-muted-foreground text-sm">{stat.label}</span>
    </motion.div>
  );
};

export const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-32 px-6 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2" />
      
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-20"
        >
          <motion.span
            variants={fadeInUp}
            className="text-primary font-medium tracking-widest uppercase text-sm"
          >
            About Me
          </motion.span>
          <motion.h2
            variants={fadeInUp}
            className="section-heading mt-4"
          >
            My <span className="text-gradient">Journey</span>
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-muted-foreground max-w-2xl mx-auto mt-6 text-lg"
          >
            From Anna University graduate to senior engineer — building enterprise platforms 
            across Java/Spring Boot and MERN with global teams.
          </motion.p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
          {stats.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} />
          ))}
        </div>

        {/* Timeline */}
        <div className="space-y-8 md:space-y-0">
          {timeline.map((item, index) => (
            <TimelineItem key={item.year} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
