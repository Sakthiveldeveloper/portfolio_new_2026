import { Navbar } from '@/components/portfolio/Navbar';
import { Hero } from '@/components/portfolio/Hero';
import { About } from '@/components/portfolio/About';
import { Skills } from '@/components/portfolio/Skills';
import { Projects } from '@/components/portfolio/Projects';
import { Experience } from '@/components/portfolio/Experience';
import { Contact } from '@/components/portfolio/Contact';
import { Footer } from '@/components/portfolio/Footer';
import { ScrollProgress } from '@/components/portfolio/ScrollProgress';
import { DynamicBackground } from '@/components/ui/DynamicBackground';
import { BackgroundThemeSwitcher } from '@/components/ui/BackgroundThemeSwitcher';

const Index = () => {
  return (
    <div className="relative">
      {/* Configurable Dynamic Background System */}
      <DynamicBackground />
      
      {/* Live Interactive Background Theme Switcher */}
      <BackgroundThemeSwitcher />
      
      {/* Scroll Progress Bar */}
      <ScrollProgress />
      
      {/* Noise overlay for texture */}
      <div className="noise-overlay" />
      
      {/* Navigation */}
      <Navbar />
      
      {/* Main Content */}
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
