import { motion } from "framer-motion";
import { ArrowDown, ExternalLink, Play, Sparkles } from "lucide-react";
import MeshBackground from "../3d/MeshBackground";

const HeroSection = () => {
  const scrollToNext = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen md:min-h-screen flex items-center overflow-hidden bg-background"
    >
      {/* Clean minimal background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/5 to-background" />

      {/* Main Content Grid */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 pt-12 sm:pt-16">
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-10 lg:gap-16 items-center min-h-[calc(70vh-4rem)] sm:min-h-[calc(100vh-5rem)]">
          {/* Left Content */}
          <motion.div
            className="space-y-8 order-1 md:order-2"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Premium Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20"
            >
              <Sparkles size={16} className="text-primary" />
              <span className="text-sm font-medium text-primary">
                Innovation Leader
              </span>
            </motion.div>

            {/* Main Heading */}
            <div className="space-y-4 sm:space-y-6">
              <motion.h1
                className="text-4xl sm:text-5xl lg:text-7xl font-black font-display leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent">
                  J V KALYAN
                </span>
              </motion.h1>

              <motion.div
                className="text-lg sm:text-xl lg:text-2xl font-display font-medium"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent">
                  Strategist • Technologist • Youth Leader
                </span>
              </motion.div>
            </div>

            {/* Description */}
            <motion.p
              className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-lg"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
            >
              Empowering minds through innovation and creating lasting impact in
              technology and leadership.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 pt-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              <motion.a
                href="https://www.linkedin.com/in/venkat-kalyan-4239ba21a/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-all duration-300 text-sm sm:text-base"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <ExternalLink size={18} className="sm:w-5 sm:h-5" />
                Connect on LinkedIn
              </motion.a>

              <motion.button
                onClick={() => {
                  const aboutSection = document.getElementById("about");
                  if (aboutSection) {
                    aboutSection.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="inline-flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 border-2 border-border text-foreground font-semibold rounded-xl hover:bg-muted/50 transition-all duration-300 text-sm sm:text-base"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Learn More
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right Content - Professional Image */}
          <motion.div
            className="relative flex justify-center lg:justify-start"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="relative">
              {/* Professional Photo */}
              <img
                src="/lovable-uploads/7fc57a2b-c42d-41f1-952e-3c9859d8848c.png"
                alt="J V Kalyan - Professional Photo"
                className="w-80 h-80 sm:w-96 sm:h-96 lg:w-96 lg:h-96 rounded-full object-cover shadow-lg"
              />
            </div>
          </motion.div>
        </div>

        {/* Enhanced Scroll Indicator */}
        <motion.div
          className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          onClick={scrollToNext}
        >
          <motion.div
            className="flex flex-col items-center text-muted-foreground hover:text-primary transition-all duration-300 group"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="text-xs sm:text-sm mb-2 sm:mb-3 font-medium group-hover:text-primary">
              Scroll to explore
            </span>
            <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center group-hover:border-primary/50 transition-colors">
              <motion.div
                className="w-1 h-2 sm:h-3 bg-primary rounded-full mt-1.5 sm:mt-2"
                animate={{ y: [0, 10, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
