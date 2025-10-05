import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import {
  Menu,
  X,
  Home,
  User,
  Briefcase,
  Award,
  Calendar,
  Camera,
  Mail,
} from "lucide-react";

interface NavItem {
  id: string;
  icon: React.ReactNode;
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { id: "home", icon: <Home size={20} />, label: "Home", href: "#home" },
  { id: "about", icon: <User size={20} />, label: "About", href: "#about" },
  {
    id: "skills",
    icon: <Briefcase size={20} />,
    label: "Skills",
    href: "#skills",
  },
  {
    id: "achievements",
    icon: <Award size={20} />,
    label: "Achievements",
    href: "#achievements",
  },
  {
    id: "experience",
    icon: <Calendar size={20} />,
    label: "Experience",
    href: "#experience",
  },
  { id: "media", icon: <Camera size={20} />, label: "Media", href: "#media" },
  {
    id: "contact",
    icon: <Mail size={20} />,
    label: "Contact",
    href: "#contact",
  },
  {
    id: "admin",
    icon: <Briefcase size={20} />,
    label: "Admin",
    href: "/admin",
  },
];

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => item.id);
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveItem(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string, id: string) => {
    setActiveItem(id);
    setIsOpen(false);
    // If href is an in-page anchor, scroll. Otherwise navigate to the route.
    if (href.startsWith("#")) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // For external routes or internal SPA routes, navigate the browser.
      window.location.href = href;
    }
  };

  return (
    <>
      {/* Hamburger Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        onClick={() => setIsOpen(!isOpen)}
        className="z-50 w-10 h-10 rounded-xl bg-card/80 backdrop-blur-md border border-border/50 flex items-center justify-center text-foreground hover:bg-primary/20 hover:border-primary/50 transition-all duration-300 p-2"
        style={{
          boxShadow: "var(--shadow-card)",
        }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X size={20} />
            </motion.div>
          ) : (
            <motion.div
              key="menu"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Menu size={20} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            />

            {/* Menu Panel */}
            <motion.nav
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{
                duration: 0.4,
                type: "spring",
                damping: 25,
                stiffness: 300,
              }}
              className="fixed left-2 mr-2 top-20 z-50 w-full bg-card/90 backdrop-blur-xl border border-border/50 rounded-2xl overflow-hidden"
              style={{
                boxShadow: "var(--shadow-elegant)",
              }}
            >
              <div className="p-6">
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.3 }}
                  className="text-lg font-display font-semibold text-foreground mb-6"
                >
                  Navigation
                </motion.h3>

                <div className="space-y-2">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + index * 0.05, duration: 0.3 }}
                    >
                      <button
                        onClick={() => handleNavClick(item.href, item.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-300 ${
                          activeItem === item.id
                            ? "bg-primary/20 border border-primary/50 text-primary"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                        }`}
                      >
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex-shrink-0"
                        >
                          {item.icon}
                        </motion.div>
                        <span className="font-medium">{item.label}</span>
                      </button>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default HamburgerMenu;
