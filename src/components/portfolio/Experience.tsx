import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import { Building2, Calendar, MapPin, ChevronRight } from 'lucide-react';

const experiences = [
  {
    company: 'Photon Interactive',
    role: 'Senior Software Engineer',
    period: 'Sep 2025 - Present',
    location: 'Bangalore, India',
    type: 'Full-time',
    description: 'Lead an 8-member cross-functional team building Tenetic — a geography-based advertisement planning platform with AI-driven recommendations.',
    responsibilities: [
      'Own frontend architecture; reduced open production bugs from 450 to 0',
      'Build Node.js/Fastify APIs with MySQL and MongoDB; integrate Python recommendation logic',
      'Implement AWS S3 for secure storage and data pipeline ingestion',
      'Collaborate with QA, BA, Scrum Master, and LLM/Python AI team on sprint delivery',
    ],
    technologies: ['Next.js', 'Node.js', 'Fastify', 'Python', 'MySQL', 'MongoDB', 'AWS'],
    achievements: [
      { metric: '450→0', description: 'Production bugs' },
      { metric: '8', description: 'Team members led' },
    ],
  },
  {
    company: 'Kaay Labs',
    role: 'Associate Software Engineer',
    period: 'May 2022 - Aug 2025',
    location: 'Chennai, India',
    type: 'Full-time',
    description: 'Led development on enterprise admin platforms — Pie Factory and Mouser Electronics — across pricing, data processing, and workflow management.',
    responsibilities: [
      'Architected Module Federation micro-frontends with a 15-member cross-functional team',
      'Led 5-member team on Pie Factory POC with dynamic charts and export functionality',
      'Optimized API performance for 100K+ row Excel datasets in production',
      'Migrated legacy UI from Ant Design v3 to v8; primary escalation for production support',
    ],
    technologies: ['React', 'Spring Boot', 'Module Federation', 'Kafka', 'Keycloak', 'Ant Design'],
    achievements: [
      { metric: '100K+', description: 'Row datasets' },
      { metric: 'MFE', description: 'Module Federation' },
    ],
  },
];

const ExperienceCard = ({ 
  experience, 
  index 
}: { 
  experience: typeof experiences[0]; 
  index: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="relative pl-8 md:pl-12"
    >
      <div className="absolute left-0 top-0 bottom-0 w-[2px] overflow-hidden">
        <div className="absolute inset-0 bg-muted/20" />
        <motion.div 
          className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-transparent via-primary to-transparent blur-sm"
          animate={{ y: ['-100%', '200%'] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
      </div>
      
      <motion.div
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ delay: index * 0.2 + 0.3, type: 'spring' }}
        className="absolute left-0 top-2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background"
      />

      <div className="glass-card p-6 md:p-8 ml-4">
        <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
          <div>
            <h3 className="text-2xl font-display font-bold">{experience.role}</h3>
            <div className="flex items-center gap-2 text-primary mt-1">
              <Building2 className="w-4 h-4" />
              <span className="font-medium">{experience.company}</span>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{experience.period}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>{experience.location}</span>
            </div>
          </div>
        </div>

        <p className="text-muted-foreground mb-6">{experience.description}</p>

        <div className="mb-6">
          <h4 className="text-sm font-medium text-foreground mb-3">Key Responsibilities</h4>
          <ul className="space-y-2">
            {experience.responsibilities.map((resp, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: index * 0.2 + 0.4 + i * 0.1 }}
                className="flex items-start gap-2 text-muted-foreground text-sm"
              >
                <ChevronRight className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span>{resp}</span>
              </motion.li>
            ))}
          </ul>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {experience.technologies.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
          {experience.achievements.map((achievement, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.2 + 0.8 + i * 0.1 }}
              className="text-center"
            >
              <span className="text-2xl font-display font-bold text-gradient">{achievement.metric}</span>
              <p className="text-muted-foreground text-xs mt-1">{achievement.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export const Experience = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const containerRef = useRef(null);

  return (
    <section id="experience" ref={containerRef} className="py-32 px-6 relative overflow-hidden">
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -translate-x-1/2" />

      <div className="max-w-4xl mx-auto">
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
            Career Path
          </motion.span>
          <motion.h2
            variants={fadeInUp}
            className="section-heading mt-4"
          >
            Work <span className="text-gradient">Experience</span>
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-muted-foreground max-w-2xl mx-auto mt-6 text-lg"
          >
            Delivering enterprise platforms from greenfield to production 
            with global cross-functional teams.
          </motion.p>
        </motion.div>

        <div className="space-y-12">
          {experiences.map((experience, index) => (
            <ExperienceCard key={experience.company} experience={experience} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
