import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ExternalLink } from "lucide-react";

interface NavItem {
  id: string;
  label: string;
  href: string;
  hasDropdown?: boolean;
  dropdownItems?: { label: string; href: string }[];
}

const navItems: NavItem[] = [
  { id: "home", label: "Home", href: "#home" },
  { id: "about", label: "About", href: "#about" },
  { id: "experience", label: "Experience", href: "#experience" },
  { id: "achievements", label: "Achievements", href: "#achievements" },
  { id: "media", label: "Media", href: "#media" },
  { id: "contact", label: "Contact", href: "#contact" },
  { id: "admin", label: "Admin", href: "/admin" },
];

const HorizontalNav = () => {
  const [activeItem, setActiveItem] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = navItems.map((item) => document.getElementById(item.id));
      const currentSection = sections.find((section) => {
        if (!section) return false;
        const rect = section.getBoundingClientRect();
        return rect.top <= 100 && rect.bottom >= 100;
      });

      if (currentSection) {
        setActiveItem(currentSection.id);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string, id: string) => {
    setActiveItem(id);
    if (href.startsWith("#")) {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      window.location.href = href;
    }
  };

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/95 backdrop-blur-md border-b border-border/50"
          : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <div className="text-2xl font-black bg-gradient-to-r from-blue-500 via-blue-400 to-blue-700 bg-clip-text text-transparent">
              J V KALYAN
            </div>
          </motion.div>

          {/* Navigation Menu */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <motion.div
                key={item.id}
                className="relative"
                onHoverStart={() => setHoveredItem(item.id)}
                onHoverEnd={() => setHoveredItem(null)}
              >
                <button
                  onClick={() => handleNavClick(item.href, item.id)}
                  className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg ${
                    activeItem === item.id
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <span className="relative z-10 flex items-center gap-1">
                    {item.label}
                    {item.hasDropdown && (
                      <ChevronDown
                        size={14}
                        className="transition-transform duration-200"
                      />
                    )}
                  </span>

                  {/* Active indicator */}
                  {activeItem === item.id && (
                    <motion.div
                      className="absolute inset-0 bg-primary/10 rounded-lg"
                      layoutId="activeNav"
                      initial={false}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    />
                  )}

                  {/* Hover effect */}
                  {hoveredItem === item.id && activeItem !== item.id && (
                    <motion.div
                      className="absolute inset-0 bg-muted/50 rounded-lg"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </button>
              </motion.div>
            ))}
          </nav>

          {/* CTA Button */}
          <motion.div
            className="hidden md:block"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <motion.a
              href="https://www.linkedin.com/in/venkat-kalyan-4239ba21a/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground font-medium rounded-xl hover:bg-primary/90 transition-all duration-300"
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ExternalLink size={16} />
              Connect
            </motion.a>
          </motion.div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button className="p-2 text-foreground">
              <div className="w-6 h-5 flex flex-col justify-between">
                <span className="block h-0.5 w-full bg-current"></span>
                <span className="block h-0.5 w-full bg-current"></span>
                <span className="block h-0.5 w-full bg-current"></span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default HorizontalNav;
