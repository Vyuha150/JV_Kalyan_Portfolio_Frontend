import { motion } from 'framer-motion';
import { Home, User, Briefcase, Award, Mail } from 'lucide-react';
import { useState } from 'react';

interface NavItem {
  id: string;
  icon: React.ReactNode;
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { id: 'home', icon: <Home size={20} />, label: 'Home', href: '#home' },
  { id: 'about', icon: <User size={20} />, label: 'About', href: '#about' },
  { id: 'skills', icon: <Briefcase size={20} />, label: 'Skills', href: '#skills' },
  { id: 'achievements', icon: <Award size={20} />, label: 'Awards', href: '#achievements' },
  { id: 'experience', icon: '💼', label: 'Experience', href: '#experience' },
  { id: 'media', icon: '🎥', label: 'Media', href: '#media' },
  { id: 'contact', icon: <Mail size={20} />, label: 'Contact', href: '#contact' },
];

const FloatingNav = () => {
  const [activeItem, setActiveItem] = useState('home');
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const handleNavClick = (href: string, id: string) => {
    setActiveItem(id);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.nav
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1, duration: 0.8 }}
      className="nav-floating"
    >
      {navItems.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.2 + index * 0.1, duration: 0.5 }}
          className="relative"
        >
          <div
            className={`nav-item ${activeItem === item.id ? 'bg-primary/20 border-primary/50' : ''}`}
            onClick={() => handleNavClick(item.href, item.id)}
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="text-foreground flex-shrink-0"
            >
              {item.icon}
            </motion.div>
            <span className="text-foreground font-medium">{item.label}</span>
          </div>
        </motion.div>
      ))}
    </motion.nav>
  );
};

export default FloatingNav;