import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Target, Zap, Users } from "lucide-react";

const VisionPhilosophySection = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const philosophyCards = [
    {
      icon: <Target size={32} />,
      title: "Vision",
      subtitle: "Empowering Young Minds",
      description:
        "Building tech-enabled ecosystems that provide students and youth with the tools, knowledge, and opportunities to create meaningful impact in their communities.",
    },
    {
      icon: <Zap size={32} />,
      title: "Approach",
      subtitle: "Strategy, Innovation, Execution",
      description:
        "Combining strategic thinking with cutting-edge technology and hands-on execution to deliver solutions that scale and create lasting change.",
    },
    {
      icon: <Users size={32} />,
      title: "Impact",
      subtitle: "Community, Tech, Education",
      description:
        "Fostering collaborative environments where technology meets education to empower the next generation of leaders and innovators.",
    },
  ];

  return (
    <section id="vision" ref={ref} className="py-24 md:py-32 relative bg-background">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/50 to-background" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-display mb-4 md:mb-6">
            Vision & Philosophy
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            A guiding framework for leadership, innovation, and impact across communities.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {philosophyCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.15 }}
              className="card-glass p-8 transition-all duration-500 group"
              style={{
                transition: "all 0.5s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow =
                  "var(--shadow-card), var(--shadow-glow-primary)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "var(--shadow-card)";
              }}
            >
              <div className="text-primary mb-6 group-hover:scale-110 transition-transform duration-300">
                {card.icon}
              </div>
              <h4 className="text-xl font-bold mb-2 text-foreground">
                {card.title}
              </h4>
              <h5 className="text-primary font-medium mb-4">
                {card.subtitle}
              </h5>
              <p className="text-muted-foreground leading-relaxed">
                {card.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VisionPhilosophySection;
