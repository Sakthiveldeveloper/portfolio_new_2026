import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import { Send, Github, Linkedin, Twitter, Mail, CheckCircle, Loader2, Phone, MapPin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { MagneticButton } from '@/components/ui/MagneticButton';

const socialLinks = [
  { name: 'GitHub', icon: Github, href: 'https://github.com', color: 'hover:text-white' },
  { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com', color: 'hover:text-blue-400' },
  { name: 'Twitter', icon: Twitter, href: 'https://twitter.com', color: 'hover:text-sky-400' },
  { name: 'Email', icon: Mail, href: 'mailto:sakthivel24498@gmail.com', color: 'hover:text-primary' },
];

const contactDetails = [
  { 
    icon: Phone, 
    label: 'Phone', 
    value: '+91 6380350108', 
    href: 'tel:+916380350108',
    color: 'text-emerald-400'
  },
  { 
    icon: MapPin, 
    label: 'Location', 
    value: 'Chennai, India', 
    href: 'https://maps.google.com/?q=Chennai,India',
    color: 'text-purple-400'
  },
];

export const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    toast({
      title: "Message sent!",
      description: "Thanks for reaching out with a supernova speed!",
    });

    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section id="contact" className="py-32 px-6 relative overflow-hidden">
      {/* Background */}
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-radial from-primary/10 to-transparent rounded-full translate-x-1/2 translate-y-1/2" />

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
            Get In Touch
          </motion.span>
          <motion.h2
            variants={fadeInUp}
            className="section-heading mt-4"
          >
            Let's Build Something <span className="text-gradient">Supernova</span>
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-muted-foreground max-w-xl mx-auto mt-6 text-lg"
          >
            Looking for a Senior Full Stack Engineer to scale your next big idea?
            Let's connect and make it happen.
          </motion.p>
        </motion.div>

        <div className="flex flex-col gap-12 items-center">
          {/* Contact Info & Socials - Centered Top */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="w-full max-w-2xl space-y-8"
          >
            {/* Contact Details Grid */}
            <div className="grid md:grid-cols-2 gap-6">
                {contactDetails.map((detail, index) => {
                  const Icon = detail.icon;
                  return (
                    <motion.a
                      key={detail.label}
                      href={detail.href}
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      className="glass-card p-6 border-t border-white/5 flex items-center gap-4 group hover:border-primary/30 transition-all"
                    >
                      <div className={`w-12 h-12 rounded-full bg-muted/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 ${detail.color}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{detail.label}</p>
                        <p className="text-foreground font-medium group-hover:text-primary transition-colors">{detail.value}</p>
                      </div>
                    </motion.a>
                  );
                })}
            </div>

            {/* Social Profiles */}
            {/* <div className="flex justify-center gap-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <MagneticButton key={social.name} href={social.href}>
                    <div
                      className={`w-12 h-12 rounded-xl bg-muted/50 border border-border flex items-center justify-center text-muted-foreground transition-colors ${social.color}`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                  </MagneticButton>
                );
              })}
            </div> */}
          </motion.div>

          {/* Contact Form - Centered Bottom */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="w-full max-w-xl glass-card p-8 border-t border-white/5"
          >
            <div className="text-center mb-8">
                <h3 className="text-xl font-display font-bold">Send a Message</h3>
                <p className="text-sm text-muted-foreground mt-2">
                    I usually respond within 24 hours.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                  Name
                </label>
                <div className="group relative">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-accent rounded-xl opacity-0 group-focus-within:opacity-50 transition duration-500 blur-sm" />
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="relative w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:border-transparent focus:ring-0 transition-colors text-foreground placeholder:text-muted-foreground"
                    placeholder="John Doe"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                  Email
                </label>
                <div className="group relative">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-accent rounded-xl opacity-0 group-focus-within:opacity-50 transition duration-500 blur-sm" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="relative w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:border-transparent focus:ring-0 transition-colors text-foreground placeholder:text-muted-foreground"
                    placeholder="john@company.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                  Message
                </label>
                <div className="group relative">
                   <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-accent rounded-xl opacity-0 group-focus-within:opacity-50 transition duration-500 blur-sm" />
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="relative w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:border-transparent focus:ring-0 transition-colors text-foreground placeholder:text-muted-foreground resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>
              </div>

              <div className="flex justify-center w-full">
                <MagneticButton className="w-full flex justify-center">
                  <motion.button
                    type="submit"
                    disabled={isSubmitting || isSubmitted}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full md:w-auto py-4 px-12 rounded-xl font-medium flex items-center justify-center gap-2 transition-all duration-300 ${
                      isSubmitted 
                        ? 'bg-green-500 text-white shadow-[0_0_20px_rgba(34,197,94,0.5)]' 
                        : 'glass-button'
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Sending...
                      </>
                    ) : isSubmitted ? (
                      <>
                        <CheckCircle className="w-5 h-5" />
                        Message Sent!
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Send Message
                      </>
                    )}
                  </motion.button>
                </MagneticButton>
              </div>
            </form>
          </motion.div>
           {/* Social Profiles */}
            <div className="flex justify-center gap-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <MagneticButton key={social.name} href={social.href}>
                    <div
                      className={`w-12 h-12 rounded-xl bg-muted/50 border border-border flex items-center justify-center text-muted-foreground transition-colors ${social.color}`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                  </MagneticButton>
                );
              })}
            </div>
        </div>
      </div>
    </section>
  );
};
