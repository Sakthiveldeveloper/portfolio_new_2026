export interface Teammate {
  name: string;
  role: string;
  category: 'Leadership' | 'Core Engineering' | 'Agile & People';
  linkedinUrl?: string;
  shoutout: string;
}

export interface CompanyLinks {
  websiteUrl?: string;
  linkedinUrl?: string;
}

export interface ExperienceStory {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  tagline: string;
  badge: string;
  gradient: string;
  companyLinks: CompanyLinks;
  selectionStory: {
    headline: string;
    narrative: string[];
    interviewHighlight: string;
  };
  engineeringBattles: {
    headline: string;
    challenge: string;
    solution: string;
    impact: string;
    techHighlights: string[];
  };
  peopleAndCulture: {
    headline: string;
    cultureSummary: string;
    teammates: Teammate[];
  };
  officeLifeAndMemories: {
    headline: string;
    highlights: {
      title: string;
      story: string;
      emoji: string;
    }[];
  };
  keyTakeaways: string[];
}

export const experienceStories: Record<string, ExperienceStory> = {
  'Photon Interactive': {
    id: 'photon-interactive',
    company: 'Photon Interactive',
    role: 'Senior Software Engineer',
    period: 'Sep 2025 - Jun 2026',
    location: 'Bangalore, India',
    tagline: 'Leading an 8-member cross-functional team and crushing 450 production bugs to zero.',
    badge: 'AI-Driven Platform & Team Leadership',
    gradient: 'from-emerald-500/20 via-teal-500/20 to-cyan-500/20',
    companyLinks: {
      websiteUrl: 'https://www.photon.com/',
      linkedinUrl: 'https://www.linkedin.com/company/photon-interactive/posts/',
    },
    selectionStory: {
      headline: 'The Selection: Recruited to Lead Tenetic',
      narrative: [
        'Photon reached out for a critical leadership opportunity: they needed a Senior Engineer who could take full ownership of "Tenetic" — a cutting-edge advertisement planning platform driven by geography and Python AI models.',
        'The technical rounds tested my ability to bridge frontend Next.js architecture with high-speed Fastify backend APIs and coordinate with dedicated Python data science squads.',
        'I joined ready to take accountability not just for code, but for team velocity and platform stability.',
      ],
      interviewHighlight: 'Deep-dive into designing modular micro-frontend layouts that interface with streaming AI recommendation feeds.',
    },
    engineeringBattles: {
      headline: 'The Battle of 450 Bugs: Transforming Instability into Excellence',
      challenge: 'Upon taking charge, the platform suffered from 450 open issues ranging from state synchronization glitches to race conditions in geographical ad-rendering.',
      solution: 'Instilled strict PR linting rules, standardized Fastify caching pipelines, isolated asynchronous Python inference calls, and established a daily bug triage rhythm.',
      impact: 'Drove open production defects from 450 down to a clean 0 within two quarters, boosting client trust and platform uptime to record highs.',
      techHighlights: ['Next.js', 'Fastify / Node.js', 'Python AI Integration', 'MySQL', 'MongoDB', 'AWS S3'],
    },
    peopleAndCulture: {
      headline: 'The 8-Member Squad: High Ownership & True Camaraderie',
      cultureSummary: 'Leading this team was one of the most rewarding chapters of my career. We had developers, QA engineers, Business Analysts, and Scrum Masters working as a single unified family.',
      teammates: [
        {
          name: 'Mandanna T M',
          role: 'Engineering Manager',
          category: 'Leadership',
          linkedinUrl: 'https://www.linkedin.com/in/mandanna-t-m-7183a26/',
          shoutout: 'Exceptional manager who placed complete trust in our engineering direction. Empowered me to take full technical ownership and shielded the team from noise.',
        },
        {
          name: 'Maharshi',
          role: 'Tech Lead (TL)',
          category: 'Leadership',
          linkedinUrl: 'https://www.linkedin.com/in/maharshi49/',
          shoutout: 'Brilliant technical lead and sparring partner. We collaborated closely on backend architecture, API contract designs, and high-throughput Fastify services.',
        },
        {
          name: 'Harini Elango',
          role: 'Software Engineer',
          category: 'Core Engineering',
          linkedinUrl: 'https://www.linkedin.com/in/harini-elango-9b0b5a192/',
          shoutout: 'Key pillar in our core UI/frontend delivery. Consistent, high attention to detail, and a fantastic teammate who always delivered under sprint pressure.',
        },
        {
          name: 'Pushparaj P',
          role: 'Software Engineer',
          category: 'Core Engineering',
          linkedinUrl: 'https://www.linkedin.com/in/pushparaj-p-1400a5183/',
          shoutout: 'Instrumental in squashing critical defects and collaborating on state management, asynchronous data flows, and API integrations.',
        },
        {
          name: 'Nirmal Kumar S',
          role: 'Software Engineer',
          category: 'Core Engineering',
          linkedinUrl: 'https://www.linkedin.com/in/nirmal-kumar-s-1892b6190/',
          shoutout: 'Dedicated engineer who contributed significantly across sprints, helping push our bug count to zero with great persistence.',
        },
        {
          name: 'Kasthuri Subramani',
          role: 'Scrum Master / Agile Lead',
          category: 'Agile & People',
          linkedinUrl: 'https://www.linkedin.com/in/kasthuri-subramani-22381aa9/',
          shoutout: 'The heartbeat of our sprint cadence. Ran flawless standups, cleared organizational blockers, and kept team spirits high through every crunch phase.',
        },
        {
          name: 'People & HR Team',
          role: 'Human Resources Partner',
          category: 'Agile & People',
          linkedinUrl: '',
          shoutout: 'Supported our team onboarding, employee recognition, and positive work culture throughout our journey at Photon.',
        },
      ],
    },
    officeLifeAndMemories: {
      headline: 'Office Life: Crunch Times, Celebration Pizzas & Milestones',
      highlights: [
        {
          emoji: '🎯',
          title: 'The "Zero Bugs" Milestone Celebration',
          story: 'When the Jira defect count officially reached zero, the whole 8-member team went out for an unforgettable team dinner.',
        },
        {
          emoji: '🧠',
          title: 'Whiteboard Architecture Jam Sessions',
          story: 'Spending hours around the office whiteboard drawing the data flow between Fastify, AWS S3, and Python workers.',
        },
        {
          emoji: '🎉',
          title: 'Sprint Demo Triumphs',
          story: 'Demonstrating the new geography-based ad planner live to stakeholders and receiving glowing client appreciation.',
        },
      ],
    },
    keyTakeaways: [
      'Leadership is about enabling others and removing blockers, not just writing code.',
      'No codebase is beyond repair if you implement discipline, automated tests, and team pride.',
      'Cross-functional clarity between Product, AI, and Engineering prevents 80% of bugs.',
    ],
  },

  'BT Group': {
    id: 'bt-group',
    company: 'BT Group',
    role: 'Senior Software Engineer',
    period: 'Aug 2026 - Present',
    location: 'Bangalore, India',
    tagline: 'Driving enterprise modernization across distributed global teams in the UK & India.',
    badge: 'Enterprise Telecommunications Scale',
    gradient: 'from-purple-500/20 via-indigo-500/20 to-blue-500/20',
    companyLinks: {
      websiteUrl: 'https://www.bt.com/',
      linkedinUrl: 'https://www.linkedin.com/company/bt/',
    },
    selectionStory: {
      headline: 'The Selection: Stepping onto the Global Stage',
      narrative: [
        'Joining BT Group marked my transition into massive, distributed enterprise systems operating across international borders and regulatory domains.',
        'The interview process was rigorous: deep rounds focusing on high-concurrency Spring Boot microservices, resilient Node.js architecture, and real-time AWS CloudWatch tracing under high traffic.',
        'What stood out to the hiring panel was my hands-on experience solving production bottlenecks and modernizing legacy multi-tenant architectures without downtime.',
      ],
      interviewHighlight: 'Architectural case study on migrating enterprise services with zero customer impact.',
    },
    engineeringBattles: {
      headline: 'The Modernization Challenge: Migrating 6-Year-Old Spring Boot Modules',
      challenge: '5 core modules in BT International were running on legacy Spring Boot 3.x for over 6 years. Upgrading directly to 4.x posed severe breaking changes across security filters, database drivers, and multi-region AWS endpoints.',
      solution: 'Formulated a staged rollout plan using AI-assisted test suite generation, ping-pong canary deployments, and PingFederate SSO integration with strict RBAC token validation.',
      impact: 'Successfully migrated all 5 modules with zero customer downtime, reducing API latency and clearing long-standing technical debt.',
      techHighlights: ['Spring Boot 4', 'PingFederate SSO', 'AWS Lambda & CloudWatch', 'PostgreSQL', 'RBAC JWT'],
    },
    peopleAndCulture: {
      headline: 'The People: Global Collaboration Across Timezones',
      cultureSummary: 'Working at BT means syncing daily with brilliant minds across Bangalore, London, and international delivery hubs. True engineering maturity is shown in clear async documentation and mutual respect.',
      teammates: [
        {
          name: 'Engineering Manager',
          role: 'Engineering Delivery Manager',
          category: 'Leadership',
          linkedinUrl: '',
          shoutout: 'Fosters an autonomous engineering culture, driving high standards on platform reliability and cross-region delivery.',
        },
        {
          name: 'Technical Lead',
          role: 'Principal Solutions Architect',
          category: 'Leadership',
          linkedinUrl: '',
          shoutout: 'Exceptional mentor on distributed system resilience, PingFederate authentication patterns, and AWS scalability.',
        },
        {
          name: 'Core Platform Developers',
          role: 'Senior Software Engineers',
          category: 'Core Engineering',
          linkedinUrl: '',
          shoutout: 'Collaborative peers who co-engineered the Spring Boot 4.x upgrade and unified our Node.js microservices.',
        },
        {
          name: 'Scrum Master',
          role: 'Agile Delivery Lead',
          category: 'Agile & People',
          linkedinUrl: '',
          shoutout: 'Facilitates seamless sprint ceremonies across international timezones, keeping epics clear and actionable.',
        },
        {
          name: 'People & HR Partner',
          role: 'Talent & HR Business Partner',
          category: 'Agile & People',
          linkedinUrl: '',
          shoutout: 'Champion of workplace engagement, professional development, and community culture across BT Bangalore.',
        },
      ],
    },
    officeLifeAndMemories: {
      headline: 'Office Life: Tech Park Energy & Global Synergy',
      highlights: [
        {
          emoji: '☕',
          title: 'The Morning Standup & Coffee Culture',
          story: 'Morning syncs at the Bangalore campus, breaking down complex cross-border Jira epics over hot filter coffee.',
        },
        {
          emoji: '🚀',
          title: 'The Spring Boot 4.x Release War Room',
          story: 'Monitoring real-time traffic spikes during the migration weekend with zero alerts — the best feeling in engineering.',
        },
        {
          emoji: '🤝',
          title: 'Cross-Cultural Knowledge Exchanges',
          story: 'Pair programming sessions with UK colleagues bridging timezones to solve complex IAM PingFederate challenges.',
        },
      ],
    },
    keyTakeaways: [
      'Scale demands disciplined architecture and observability, not quick hacks.',
      'Trust across international teams is built through consistent, reliable execution.',
      'Legacy modernizations require deep patience and thorough automated verification.',
    ],
  },

  'Kaay Labs': {
    id: 'kaay-labs',
    company: 'Kaay Labs',
    role: 'Associate Software Engineer',
    period: 'May 2022 - Aug 2025',
    location: 'Chennai, India',
    tagline: 'Where my engineering foundation was forged: Module Federation, 100K+ datasets, and lifelong mentors.',
    badge: 'Foundational Growth & Micro-Frontends',
    gradient: 'from-amber-500/20 via-orange-500/20 to-rose-500/20',
    companyLinks: {
      websiteUrl: 'https://kaaylabs.com/',
      linkedinUrl: 'https://www.linkedin.com/company/kaay-labs/',
    },
    selectionStory: {
      headline: 'The Selection: The Beginning of the Journey',
      narrative: [
        'Kaay Labs was where my career truly took flight. During the technical evaluations, my curiosity for foundational data structures and deep interest in modern web frameworks caught the attention of the engineering leadership.',
        'They gave me the space to learn rapidly, transition into enterprise client deliveries, and step into high-responsibility architectural decisions early in my career.',
      ],
      interviewHighlight: 'Demonstrated rapid problem-solving on complex array transformations and state lifecycle manipulation.',
    },
    engineeringBattles: {
      headline: 'Pioneering Module Federation & 100K-Row Data Engines',
      challenge: 'Enterprise admin platforms like Mouser Electronics and Pie Factory struggled under massive dataset rendering (100K+ rows) and monolithic frontend codebases that slowed down 15 concurrent developers.',
      solution: 'Architected Module Federation micro-frontends allowing sub-teams to deploy independently. Implemented virtualized DOM rendering and chunked streaming endpoints for large spreadsheet exports.',
      impact: 'Prevented browser freezes on 100K-row imports, reduced build times by 60%, and established the company standard for micro-frontends.',
      techHighlights: ['React', 'Module Federation', 'Spring Boot', 'Kafka', 'Keycloak', 'Ant Design Migration'],
    },
    peopleAndCulture: {
      headline: 'The 15-Member Micro-Frontend Crew & Mentors',
      cultureSummary: 'The Chennai team had a unique start-up hunger combined with enterprise discipline. Late nights were powered by tea, passion, and intense technical debates about design patterns.',
      teammates: [
        {
          name: 'Engineering Director / Manager',
          role: 'Engineering Leadership',
          category: 'Leadership',
          linkedinUrl: '',
          shoutout: 'Believed in my potential early on and entrusted me with critical client projects like Mouser Electronics.',
        },
        {
          name: 'Senior Architect / Tech Lead',
          role: 'Lead Architect',
          category: 'Leadership',
          linkedinUrl: '',
          shoutout: 'Taught me distributed system principles, design patterns, Kafka queues, and clean code hygiene.',
        },
        {
          name: 'Pie Factory POC Team',
          role: 'Core Frontend Engineers',
          category: 'Core Engineering',
          linkedinUrl: '',
          shoutout: 'Together we built chart engines, dynamic data grid exporters, and custom components from the ground up.',
        },
        {
          name: 'Agile Delivery & Scrum Lead',
          role: 'Scrum Master',
          category: 'Agile & People',
          linkedinUrl: '',
          shoutout: 'Kept our client deliverables on track with clarity, realistic sprint sizing, and great empathy.',
        },
        {
          name: 'HR & People Operations',
          role: 'Human Resources Partner',
          category: 'Agile & People',
          linkedinUrl: '',
          shoutout: 'Created a supportive, family-like office environment that made coming to work every day enjoyable.',
        },
      ],
    },
    officeLifeAndMemories: {
      headline: 'Office Life: Chai Breaks, Late-Night Brainstorms & Growth',
      highlights: [
        {
          emoji: '☕',
          title: 'The Iconic Chennai Chai Stall Discussions',
          story: 'Stepping out for evening tea where our best architectural breakthroughs were scribbled on paper napkins.',
        },
        {
          emoji: '💻',
          title: 'My First Production Release Night',
          story: 'The rush of deploying Module Federation to production for the first time and watching teams deploy independently.',
        },
        {
          emoji: '🏆',
          title: 'From Junior to Team Escalation Point',
          story: 'Graduating from asking questions to becoming the primary escalation lead trusted with resolving critical production tickets.',
        },
      ],
    },
    keyTakeaways: [
      'Early mentorship shapes your engineering ethos for the rest of your life.',
      'Understanding the fundamentals (memory, event loops, DOM performance) always outlives framework fads.',
      'Celebrate team wins — the friendships you make in the trenches stay with you forever.',
    ],
  },
};
