import { Navbar } from '@/components/portfolio/Navbar';
import { Hero } from '@/components/portfolio/Hero';
import { About } from '@/components/portfolio/About';
import { Skills } from '@/components/portfolio/Skills';
import { Projects } from '@/components/portfolio/Projects';
import { Experience } from '@/components/portfolio/Experience';
import { Contact } from '@/components/portfolio/Contact';
import { Footer } from '@/components/portfolio/Footer';
import { ScrollProgress } from '@/components/portfolio/ScrollProgress';
import { StarField } from '@/components/ui/StarField';

const Index = () => {
  return (
    <div className="relative">
      {/* Background System */}
      <StarField />
      <div className="fixed inset-0 -z-30 bg-[#05050A]" /> {/* Deep space base */}
      
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
