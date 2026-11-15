import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Building2,
  Calendar,
  MapPin,
  Sparkles,
  Users,
  Coffee,
  Code2,
  Trophy,
  ArrowRight,
  Compass,
  CheckCircle2,
  Heart,
  ChevronRight,
  Globe,
  Linkedin,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';
import { experienceStories, ExperienceStory, Teammate } from '@/data/experienceStories';

interface ExperienceStoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCompany: string;
  onSelectCompany: (company: string) => void;
}

type TabType = 'selection' | 'battles' | 'people' | 'life';

export const ExperienceStoryModal = ({
  isOpen,
  onClose,
  selectedCompany,
  onSelectCompany,
}: ExperienceStoryModalProps) => {
  const [activeTab, setActiveTab] = useState<TabType>('selection');

  const story: ExperienceStory =
    experienceStories[selectedCompany] || experienceStories['BT Group'];

  const companies = Object.keys(experienceStories);

  // Group teammates by category
  const categories: Array<Teammate['category']> = [
    'Leadership',
    'Core Engineering',
    'Agile & People',
  ];

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl w-[95vw] max-h-[90vh] bg-[#0c0d14]/95 backdrop-blur-2xl border border-white/10 text-foreground rounded-2xl shadow-2xl p-0 overflow-hidden flex flex-col">
        {/* Top Header Banner with Gradient */}
        <div className={`relative px-6 pt-6 pb-5 border-b border-white/10 bg-gradient-to-r ${story.gradient}`}>
          <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-white backdrop-blur-md border border-white/20">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              {story.badge}
            </span>

            {/* Quick Switcher Between Companies */}
            <div className="flex items-center gap-1 bg-black/40 p-1 rounded-xl border border-white/10">
              {companies.map((comp) => (
                <button
                  key={comp}
                  onClick={() => {
                    onSelectCompany(comp);
                    setActiveTab('selection');
                  }}
                  className={`px-2.5 py-1 text-xs rounded-lg font-medium transition-all ${
                    selectedCompany === comp
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {comp}
                </button>
              ))}
            </div>
          </div>

          <DialogHeader className="text-left space-y-1">
            <DialogTitle className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight flex items-center gap-2">
              <span>{story.role}</span>
              <span className="text-white/60 font-light">@</span>
              <span className="text-gradient">{story.company}</span>
            </DialogTitle>
            <p className="text-sm text-white/80 max-w-2xl leading-relaxed">
              {story.tagline}
            </p>

            {/* Metadata & Company Links */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3">
              <div className="flex flex-wrap items-center gap-4 text-xs text-white/70">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-primary" />
                  <span>{story.period}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-primary" />
                  <span>{story.location}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-primary" />
                  <span>Full-time Enterprise</span>
                </div>
              </div>

              {/* Company Website & LinkedIn Links */}
              <div className="flex items-center gap-2">
                {story.companyLinks?.websiteUrl && (
                  <a
                    href={story.companyLinks.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium bg-black/40 hover:bg-black/60 text-white/90 border border-white/20 transition backdrop-blur-sm"
                  >
                    <Globe className="w-3.5 h-3.5 text-primary" />
                    <span>Website</span>
                    <ExternalLink className="w-3 h-3 text-white/50" />
                  </a>
                )}
                {story.companyLinks?.linkedinUrl && (
                  <a
                    href={story.companyLinks.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 border border-blue-500/30 transition backdrop-blur-sm"
                  >
                    <Linkedin className="w-3.5 h-3.5" />
                    <span>Company LinkedIn</span>
                    <ExternalLink className="w-3 h-3 text-blue-300/50" />
                  </a>
                )}
              </div>
            </div>
          </DialogHeader>
        </div>

        {/* Story Chapter Tabs */}
        <div className="flex items-center gap-1 px-6 py-2.5 bg-black/30 border-b border-white/5 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('selection')}
            className={`flex items-center gap-2 px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg whitespace-nowrap transition-all ${
              activeTab === 'selection'
                ? 'bg-primary/20 text-primary border border-primary/30 shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            1. Selection Story
          </button>

          <button
            onClick={() => setActiveTab('battles')}
            className={`flex items-center gap-2 px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg whitespace-nowrap transition-all ${
              activeTab === 'battles'
                ? 'bg-primary/20 text-primary border border-primary/30 shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            2. Tech & Architecture Battles
          </button>

          <button
            onClick={() => setActiveTab('people')}
            className={`flex items-center gap-2 px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg whitespace-nowrap transition-all ${
              activeTab === 'people'
                ? 'bg-primary/20 text-primary border border-primary/30 shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            3. The People & Mentors
          </button>

          <button
            onClick={() => setActiveTab('life')}
            className={`flex items-center gap-2 px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg whitespace-nowrap transition-all ${
              activeTab === 'life'
                ? 'bg-primary/20 text-primary border border-primary/30 shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Coffee className="w-3.5 h-3.5" />
            4. Office Life & Memories
          </button>
        </div>

        {/* Scrollable Story Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <AnimatePresence mode="wait">
            {/* CHAPTER 1: SELECTION STORY */}
            {activeTab === 'selection' && (
              <motion.div
                key="selection"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-wider mb-1">
                    <Compass className="w-4 h-4" />
                    Chapter 1: The Origin Story
                  </div>
                  <h3 className="text-xl sm:text-2xl font-display font-bold text-foreground">
                    {story.selectionStory.headline}
                  </h3>
                </div>

                <div className="space-y-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
                  {story.selectionStory.narrative.map((para, i) => (
                    <p key={i} className="glass-card p-4 border border-white/5 rounded-xl">
                      {para}
                    </p>
                  ))}
                </div>

                <div className="p-4 rounded-xl bg-primary/10 border border-primary/20 flex items-start gap-3">
                  <Trophy className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-sm font-semibold text-foreground">Key Selection Factor</h5>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                      {story.selectionStory.interviewHighlight}
                    </p>
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    onClick={() => setActiveTab('battles')}
                    className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-primary hover:text-primary/80 transition"
                  >
                    <span>Read about the Tech Battles</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* CHAPTER 2: TECH & ARCHITECTURE BATTLES */}
            {activeTab === 'battles' && (
              <motion.div
                key="battles"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-wider mb-1">
                    <Code2 className="w-4 h-4" />
                    Chapter 2: Engineering Under Fire
                  </div>
                  <h3 className="text-xl sm:text-2xl font-display font-bold text-foreground">
                    {story.engineeringBattles.headline}
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="glass-card p-5 rounded-xl border border-red-500/20 bg-red-500/[0.03]">
                    <h4 className="text-sm font-bold text-red-400 mb-2 flex items-center gap-2">
                      <span>⚠️ The Problem & Risk</span>
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {story.engineeringBattles.challenge}
                    </p>
                  </div>

                  <div className="glass-card p-5 rounded-xl border border-emerald-500/20 bg-emerald-500/[0.03]">
                    <h4 className="text-sm font-bold text-emerald-400 mb-2 flex items-center gap-2">
                      <span>💡 The Solution & Architecture</span>
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {story.engineeringBattles.solution}
                    </p>
                  </div>
                </div>

                <div className="glass-card p-5 rounded-xl border border-primary/20 bg-primary/[0.04]">
                  <h4 className="text-sm font-bold text-foreground mb-1.5 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    <span>Business & Architectural Impact</span>
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {story.engineeringBattles.impact}
                  </p>
                </div>

                <div>
                  <h5 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-2.5">
                    Core Technologies Deployed
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {story.engineeringBattles.techHighlights.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 rounded-lg text-xs font-medium bg-white/5 border border-white/10 text-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    onClick={() => setActiveTab('people')}
                    className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-primary hover:text-primary/80 transition"
                  >
                    <span>Meet the Team & People</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* CHAPTER 3: THE PEOPLE & MENTORS */}
            {activeTab === 'people' && (
              <motion.div
                key="people"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
                className="space-y-8"
              >
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-wider mb-1">
                    <Users className="w-4 h-4" />
                    Chapter 3: Teammates & Mentors
                  </div>
                  <h3 className="text-xl sm:text-2xl font-display font-bold text-foreground">
                    {story.peopleAndCulture.headline}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                    {story.peopleAndCulture.cultureSummary}
                  </p>
                </div>

                {/* Grouped by Categories: Leadership, Engineering, Agile & People */}
                {categories.map((category) => {
                  const members = story.peopleAndCulture.teammates.filter(
                    (t) => t.category === category
                  );
                  if (members.length === 0) return null;

                  return (
                    <div key={category} className="space-y-3">
                      <div className="flex items-center gap-2 text-xs font-semibold text-foreground/80 uppercase tracking-wider">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                        <span>{category}</span>
                        <span className="text-muted-foreground/60 font-normal">
                          ({members.length})
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {members.map((teammate, i) => (
                          <div
                            key={i}
                            className="glass-card p-5 rounded-xl border border-white/10 flex flex-col justify-between hover:border-primary/40 transition-all group"
                          >
                            <div>
                              <div className="flex items-center justify-between gap-2 mb-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-accent flex items-center justify-center font-bold text-sm text-white shadow-md">
                                  {teammate.name.slice(0, 2).toUpperCase()}
                                </div>
                                <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-muted-foreground font-medium">
                                  {teammate.category}
                                </span>
                              </div>

                              <h4 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors">
                                {teammate.name}
                              </h4>
                              <p className="text-xs text-primary/90 font-medium mt-0.5 mb-2.5">
                                {teammate.role}
                              </p>
                              <p className="text-xs text-muted-foreground leading-relaxed">
                                "{teammate.shoutout}"
                              </p>
                            </div>

                            <div className="pt-3 mt-3 border-t border-white/5 flex items-center justify-between gap-2">
                              {teammate.linkedinUrl ? (
                                <a
                                  href={teammate.linkedinUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/30 transition shadow-sm"
                                >
                                  <Linkedin className="w-3.5 h-3.5" />
                                  <span>LinkedIn</span>
                                  <ExternalLink className="w-3 h-3 text-blue-400/60" />
                                </a>
                              ) : (
                                <span className="text-[11px] text-muted-foreground/50 italic">
                                  Profile link pending
                                </span>
                              )}

                              <div className="flex items-center gap-1 text-[11px] text-muted-foreground/80">
                                <Heart className="w-3 h-3 text-rose-400" />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}

                <div className="flex justify-end pt-2">
                  <button
                    onClick={() => setActiveTab('life')}
                    className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-primary hover:text-primary/80 transition"
                  >
                    <span>Explore Office Life & Memories</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* CHAPTER 4: OFFICE LIFE & MEMORIES */}
            {activeTab === 'life' && (
              <motion.div
                key="life"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-wider mb-1">
                    <Coffee className="w-4 h-4" />
                    Chapter 4: Beyond the Code
                  </div>
                  <h3 className="text-xl sm:text-2xl font-display font-bold text-foreground">
                    {story.officeLifeAndMemories.headline}
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {story.officeLifeAndMemories.highlights.map((memory, i) => (
                    <div
                      key={i}
                      className="glass-card p-5 rounded-xl border border-white/10 hover:border-white/20 transition-all"
                    >
                      <div className="text-3xl mb-3">{memory.emoji}</div>
                      <h4 className="text-base font-semibold text-foreground mb-2">
                        {memory.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                        {memory.story}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Key Takeaways */}
                <div className="glass-card p-5 rounded-xl border border-white/10 bg-black/40">
                  <h4 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>What This Experience Taught Me (My Principles)</span>
                  </h4>
                  <ul className="space-y-2">
                    {story.keyTakeaways.map((takeaway, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-muted-foreground">
                        <ChevronRight className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span>{takeaway}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Modal Bottom Footer Navigation */}
        <div className="px-6 py-3 border-t border-white/10 bg-black/50 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-muted-foreground">
            <span>Viewing:</span>
            <span className="font-semibold text-foreground">{story.company}</span>
            <span>({story.period})</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-medium text-muted-foreground hover:text-foreground bg-white/5 hover:bg-white/10 border border-white/10 transition"
            >
              Close Story
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
