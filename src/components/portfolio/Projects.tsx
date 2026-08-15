import { motion, useInView, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { useRef } from 'react';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import { ExternalLink, Github, Zap, Shield, Layers, Database } from 'lucide-react';

const projects = [
  {
    id: 'tenetic',
    title: 'Tenetic',
    subtitle: 'Geography-Based Ad Planning',
    description: 'Built a platform recommending optimal ad timing and placement by U.S. state, demographic, holiday, and product — with Python AI logic integrated into a Node.js/Fastify backend.',
    problem: 'Clients needed data-driven ad placement recommendations across complex U.S. geography and demographics.',
    solution: 'MVC backend with MySQL for campaign data, MongoDB for flexible inputs, and Next.js dashboards with Redux.',
    tech: ['Next.js', 'Node.js', 'Fastify', 'Python', 'MySQL', 'MongoDB', 'AWS', 'Redux'],
    metrics: [
      { value: '450→0', label: 'Prod Bugs' },
      { value: 'AI', label: 'Recommendations' },
      { value: 'E2E', label: 'Ownership' },
    ],
    icon: Layers,
    gradient: 'from-blue-600 to-cyan-500',
  },
  {
    id: 'mouser',
    title: 'Mouser Electronics',
    subtitle: 'Enterprise Admin & Pricing',
    description: 'Designed admin portals on Java Spring Boot microservices with Module Federation micro-frontends, Kafka event streaming, and Keycloak security.',
    problem: 'Complex pricing tools required decoupled microservices with independent frontend deployment.',
    solution: 'Module Federation MFE architecture with Kafka-based async updates and Docker/Kubernetes on OpenShift.',
    tech: ['Java', 'Spring Boot', 'React', 'Kafka', 'Keycloak', 'Module Federation', 'OpenShift'],
    metrics: [
      { value: '15', label: 'Team Members' },
      { value: 'MFE', label: 'Architecture' },
      { value: '100K+', label: 'Row Datasets' },
    ],
    icon: Zap,
    gradient: 'from-orange-500 to-amber-400',
  },
  {
    id: 'piefactory',
    title: 'Pie Factory',
    subtitle: 'Admin Portal & Analytics',
    description: 'Built admin and client portal with real-time analytics dashboards, report generation, and JWT-based RBAC across admin and client user types.',
    problem: 'Enterprise clients needed unified analytics with efficient data fetching for large historical datasets.',
    solution: 'React/Next.js frontend with GraphQL APIs, Prisma ORM on MySQL, deployed on AWS.',
    tech: ['React', 'Next.js', 'Node.js', 'GraphQL', 'Prisma', 'MySQL', 'JWT', 'AWS'],
    metrics: [
      { value: '5', label: 'Team Led' },
      { value: 'POC', label: 'Delivered' },
      { value: 'RBAC', label: 'Auth Model' },
    ],
    icon: Shield,
    gradient: 'from-purple-500 to-pink-400',
  },
  {
    id: 'databp',
    title: 'DataBP',
    subtitle: 'Multi-Tenant Admin Panel',
    description: 'Scalable multi-tenant admin system to manage client orders, track progress, and control order lifecycles with Keycloak-secured data isolation.',
    problem: 'Enterprise clients needed isolated tenant environments with flexible configuration per client.',
    solution: 'React/Node.js with Knex for MySQL, MongoDB for client configs, and Keycloak RBAC.',
    tech: ['React', 'Node.js', 'MongoDB', 'MySQL', 'Knex', 'Keycloak', 'AWS'],
    metrics: [
      { value: 'Multi', label: 'Tenant' },
      { value: 'RBAC', label: 'Keycloak' },
      { value: 'Scale', label: 'Enterprise' },
    ],
    icon: Database,
    gradient: 'from-green-500 to-emerald-400',
  },
];

const ProjectCard = ({ 
  project, 
  index 
}: { 
  project: typeof projects[0]; 
  index: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const Icon = project.icon;

  // 3D Tilt Effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["7.5deg", "-7.5deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-7.5deg", "7.5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center py-16 border-b border-border last:border-b-0"
    >
      {/* Visual / Icon Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: index * 0.2 + 0.3 }}
        className={`perspective-1000 order-1 ${index % 2 === 1 ? 'lg:order-2' : ''}`}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <motion.div
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            className={`aspect-video rounded-2xl bg-gradient-to-br ${project.gradient} p-[1px] shadow-xl`}
        >
            <div className="w-full h-full bg-background rounded-2xl flex items-center justify-center relative overflow-hidden group transform-style-3d">
            {/* Animated background */}
            <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-10 group-hover:opacity-20 transition-opacity`} />
            
            {/* Icon */}
            <motion.div
                whileHover={{ scale: 1.1, rotate: 5, z: 50 }}
                className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${project.gradient} flex items-center justify-center transform-style-3d`}
            >
                <Icon className="w-10 h-10 text-white" />
            </motion.div>

            {/* Floating elements with depth */}
            <motion.div
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 4, repeat: Infinity }}
                style={{ z: 20 }}
                className="absolute top-6 right-6 w-3 h-3 rounded-full bg-primary/50"
            />
            <motion.div
                animate={{ y: [5, -5, 5] }}
                transition={{ duration: 3, repeat: Infinity }}
                style={{ z: 30 }}
                className="absolute bottom-6 left-6 w-2 h-2 rounded-full bg-accent/50"
            />
            </div>
        </motion.div>
      </motion.div>

      {/* Content Section */}
      <div className={`order-2 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
        <motion.span
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: index * 0.2 + 0.1 }}
          className="text-primary font-medium text-sm tracking-wider uppercase"
        >
          {project.subtitle}
        </motion.span>
        
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: index * 0.2 + 0.2 }}
          className="text-3xl md:text-4xl font-display font-bold mt-2 mb-4"
        >
          {project.title}
        </motion.h3>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: index * 0.2 + 0.3 }}
          className="text-muted-foreground leading-relaxed mb-6"
        >
          {project.description}
        </motion.p>

        {/* Problem & Solution */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: index * 0.2 + 0.4 }}
          className="space-y-3 mb-6"
        >
          <div className="flex gap-3">
            <span className="text-destructive font-medium text-sm shrink-0">Problem:</span>
            <span className="text-muted-foreground text-sm">{project.problem}</span>
          </div>
          <div className="flex gap-3">
            <span className="text-green-500 font-medium text-sm shrink-0">Solution:</span>
            <span className="text-muted-foreground text-sm">{project.solution}</span>
          </div>
        </motion.div>

        {/* Tech Stack */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: index * 0.2 + 0.5 }}
          className="flex flex-wrap gap-2 mb-6"
        >
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 rounded-full bg-muted text-muted-foreground text-xs font-medium"
            >
              {tech}
            </span>
          ))}
        </motion.div>

        {/* Metrics */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: index * 0.2 + 0.6 }}
          className="grid grid-cols-3 gap-4"
        >
          {project.metrics.map((metric, i) => (
            <div key={metric.label} className="text-center">
              <motion.span
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ delay: index * 0.2 + 0.7 + i * 0.1, type: 'spring' }}
                className={`text-2xl font-display font-bold bg-gradient-to-r ${project.gradient} bg-clip-text text-transparent`}
              >
                {metric.value}
              </motion.span>
              <p className="text-muted-foreground text-xs mt-1">{metric.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section id="projects" ref={containerRef} className="py-32 px-6 relative overflow-hidden">
      {/* Parallax background element */}
      <motion.div
        style={{ y }}
        className="absolute -left-40 top-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl"
      />
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], [-100, 100]) }}
        className="absolute -right-40 top-3/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl"
      />

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
            Featured Work
          </motion.span>
          <motion.h2
            variants={fadeInUp}
            className="section-heading mt-4"
          >
            Case <span className="text-gradient">Studies</span>
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-muted-foreground max-w-2xl mx-auto mt-6 text-lg"
          >
            Deep dives into projects where I architected solutions, 
            solved complex problems, and delivered measurable impact.
          </motion.p>
        </motion.div>

        {/* Project Cards */}
        <div className="space-y-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
