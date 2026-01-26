import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import { Building2, Calendar, MapPin, ChevronRight } from 'lucide-react';

const experiences = [
  {
    company: 'Photon Interactive',
    role: 'Senior Software Engineer',
    period: 'Sep 2025 - Present',
    location: 'Bengaluru, India',
    type: 'Full-time',
    description: 'Leading end-to-end development of Tenetic, a B2B AI-powered admin platform. Owning both frontend and backend architecture with a focus on consumers behavior tracking.',
    responsibilities: [
      'Designed and implemented a scalable 3-layer backend architecture',
      'Integrated AWS S3 for AI generated PPT storage and FusionAuth for authentication',
      'Built a hybrid data strategy using MongoDB (AI data) and MySQL (Transactional)',
      'Resolved critical development and release-time issues across FE & BE',
      'Coordinated with cross-functional teams to ensure stable deployments',
    ],
    technologies: ['React', 'Node.js', 'AWS S3', 'MongoDB', 'MySQL', 'Databricks'],
    achievements: [
      { metric: '100%', description: 'On-time delivery' },
      { metric: 'AI', description: 'Powered Workflow' },
    ],
  },
  {
    company: 'Kaaylabs',
    role: 'Associate Software Engineer',
    period: 'May 2022 - Aug 2025',
    location: 'Chennai, India',
    type: 'Full-time',
    description: 'Developed and maintained large-scale web applications for stock market platforms and data collection workflows. Focused on migration and performance.',
    responsibilities: [
      'Migrated applications from Ant Design v3 to v8',
      'Resolved critical production issues in microfrontend architecture',
      'Addressed module federation challenges minimizing disruptions',
      'Collaborated with senior team to manage production incidents',
      'Ensured cross-module compatibility in complex systems',
    ],
    technologies: ['React', 'Ant Design', 'Module Federation', 'Microfrontends'],
    achievements: [
      { metric: 'Migration', description: 'AntD v3 to v8' },
      { metric: 'fed', description: 'Module Federation' },
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
      {/* Timeline line */}
      {/* Timeline line - Data Stream Effect */}
      <div className="absolute left-0 top-0 bottom-0 w-[2px] overflow-hidden">
        <div className="absolute inset-0 bg-muted/20" />
        <motion.div 
          className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-transparent via-primary to-transparent blur-sm"
          animate={{ y: ['-100%', '200%'] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
      </div>
      
      {/* Timeline dot */}
      <motion.div
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ delay: index * 0.2 + 0.3, type: 'spring' }}
        className="absolute left-0 top-2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background"
      />

      {/* Card */}
      <div className="glass-card p-6 md:p-8 ml-4">
        {/* Header */}
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

        {/* Description */}
        <p className="text-muted-foreground mb-6">{experience.description}</p>

        {/* Responsibilities */}
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

        {/* Technologies */}
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

        {/* Achievements */}
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
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  return (
    <section id="experience" ref={containerRef} className="py-32 px-6 relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -translate-x-1/2" />

      <div className="max-w-4xl mx-auto">
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
            A journey of growth, learning, and delivering impactful solutions 
            at scale.
          </motion.p>
        </motion.div>

        {/* Timeline */}
        <div className="space-y-12">
          {experiences.map((experience, index) => (
            <ExperienceCard key={experience.company} experience={experience} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
