import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { fadeInUp, staggerContainer } from '@/lib/animations';

const skillCategories = [
  {
    name: 'Frontend',
    color: 'from-blue-500 to-cyan-400',
    skills: [
      { name: 'React / Next.js', level: 95 },
      { name: 'TypeScript', level: 90 },
      { name: 'Redux', level: 88 },
      { name: 'Tailwind CSS', level: 90 },
      { name: 'Ant Design', level: 85 },
    ],
  },
  {
    name: 'Architecture',
    color: 'from-purple-500 to-pink-400',
    skills: [
      { name: 'Module Federation', level: 92 },
      { name: 'Microservices', level: 88 },
      { name: 'Event-Driven (Kafka)', level: 85 },
      { name: 'Micro-Frontend', level: 92 },
      { name: 'Performance', level: 88 },
    ],
  },
  {
    name: 'Backend & APIs',
    color: 'from-green-500 to-emerald-400',
    skills: [
      { name: 'Node.js / Fastify', level: 88 },
      { name: 'Spring Boot', level: 85 },
      { name: 'REST / GraphQL', level: 88 },
      { name: 'MySQL / MongoDB', level: 85 },
      { name: 'Python', level: 80 },
    ],
  },
  {
    name: 'Cloud & Security',
    color: 'from-orange-500 to-amber-400',
    skills: [
      { name: 'AWS', level: 85 },
      { name: 'Docker / Kubernetes', level: 82 },
      { name: 'Keycloak / JWT', level: 85 },
      { name: 'CI/CD (Jenkins)', level: 80 },
      { name: 'RBAC / OAuth', level: 85 },
    ],
  },
];

const SkillBar = ({ 
  skill, 
  color, 
  index, 
  isInView 
}: { 
  skill: { name: string; level: number }; 
  color: string; 
  index: number;
  isInView: boolean;
}) => {
  return (
    <div className="group">
      <div className="flex justify-between items-center mb-2">
        <span className="text-foreground font-medium text-sm">{skill.name}</span>
        <span className="text-muted-foreground text-xs">{skill.level}%</span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
          transition={{ 
            duration: 1, 
            delay: index * 0.1,
            ease: [0.22, 1, 0.36, 1]
          }}
          className={`h-full bg-gradient-to-r ${color} rounded-full relative`}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: [0, 1, 0] } : {}}
            transition={{ 
              duration: 0.6,
              delay: index * 0.1 + 0.5,
            }}
            className="absolute inset-0 bg-white/30 rounded-full"
          />
        </motion.div>
      </div>
    </div>
  );
};

const SkillCategory = ({ 
  category, 
  index 
}: { 
  category: typeof skillCategories[0]; 
  index: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.15, duration: 0.6 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="glass-card p-6 md:p-8 relative group overflow-hidden"
    >
      {/* Glow effect on hover */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 0.1 : 0 }}
        className={`absolute inset-0 bg-gradient-to-br ${category.color} pointer-events-none`}
      />

      {/* Category header */}
      <div className="flex items-center gap-3 mb-6">
        <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${category.color}`} />
        <h3 className="text-lg font-display font-bold">{category.name}</h3>
      </div>

      {/* Skills */}
      <div className="space-y-4">
        {category.skills.map((skill, i) => (
          <SkillBar 
            key={skill.name} 
            skill={skill} 
            color={category.color}
            index={i}
            isInView={isInView}
          />
        ))}
      </div>
    </motion.div>
  );
};

export const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="py-32 px-6 relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.span
            variants={fadeInUp}
            className="text-primary font-medium tracking-widest uppercase text-sm"
          >
            Expertise
          </motion.span>
          <motion.h2
            variants={fadeInUp}
            className="section-heading mt-4"
          >
            Skills & <span className="text-gradient">Technologies</span>
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-muted-foreground max-w-2xl mx-auto mt-6 text-lg"
          >
            A carefully curated toolkit refined through years of building 
            enterprise-grade applications.
          </motion.p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {skillCategories.map((category, index) => (
            <SkillCategory key={category.name} category={category} index={index} />
          ))}
        </div>

        {/* Additional Skills Tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-12 text-center"
        >
          <p className="text-muted-foreground text-sm mb-4">Also experienced with</p>
          <div className="flex flex-wrap justify-center gap-2">
            {['Java', 'Redis', 'Prisma', 'Hibernate', 'OpenShift', 'GCP', 'Git', 'Agile', 'Cursor', 'Copilot'].map((skill) => (
              <motion.span
                key={skill}
                whileHover={{ scale: 1.05, backgroundColor: 'hsl(var(--primary) / 0.2)' }}
                className="px-4 py-2 rounded-full bg-muted/50 text-muted-foreground text-sm border border-border hover:border-primary/50 transition-colors cursor-default"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
