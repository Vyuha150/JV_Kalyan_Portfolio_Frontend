import { motion } from 'framer-motion';
import { Heart, ExternalLink } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="py-16 border-t border-border/30 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-t from-card/20 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <h3 className="text-2xl font-bold font-display mb-4">
              J V <span className="text-primary">Kalyan</span>
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-6 max-w-md">
              Strategist, Technologist, and Public Leader empowering youth through 
              innovation and strategic thinking. Building tomorrow's tech-enabled ecosystems today.
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Made with</span>
              <Heart size={14} className="text-red-500 animate-pulse" />
              <span>for the community</span>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-lg font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { label: 'About', href: '#about' },
                { label: 'Skills', href: '#skills' },
                { label: 'Contact', href: '#contact' },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm"
                    onClick={(e) => {
                      e.preventDefault();
                      document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Connect */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-lg font-semibold text-foreground mb-4">Connect</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://www.linkedin.com/in/venkat-kalyan-4239ba21a/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm flex items-center gap-2 group"
                >
                  LinkedIn
                  <ExternalLink size={12} className="group-hover:translate-x-1 transition-transform duration-300" />
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm"
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Speaking Inquiries
                </a>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="pt-8 border-t border-border/30 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} J V Kalyan. All rights reserved.
          </div>
          
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <span className="hover:text-primary transition-colors cursor-pointer">Privacy Policy</span>
            <span className="hover:text-primary transition-colors cursor-pointer">Terms of Service</span>
          </div>
        </motion.div>

        {/* Scroll to Top */}
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 w-12 h-12 bg-primary/20 backdrop-blur-md border border-primary/30 rounded-full flex items-center justify-center text-primary hover:bg-primary/30 hover:scale-110 transition-all duration-300 z-50"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          ↑
        </motion.button>
      </div>
    </footer>
  );
};

export default Footer;