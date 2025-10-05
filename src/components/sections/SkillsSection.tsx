import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Code2, Brain, Users, Megaphone, Database, Cloud } from "lucide-react";
import { useState, useEffect } from "react";
import { skillsService, SkillCategory } from "../../services/api";

const SkillsSection = () => {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const [skillCategories, setSkillCategories] = useState<SkillCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Icon mapping
  const iconMap = {
    Brain: <Brain size={32} />,
    Code2: <Code2 size={32} />,
    Users: <Users size={32} />,
    Megaphone: <Megaphone size={32} />,
    Database: <Database size={32} />,
    Cloud: <Cloud size={32} />,
  };

  // Fetch skills data from API
  useEffect(() => {
    const fetchSkillsData = async () => {
      try {
        setLoading(true);
        const data = await skillsService.getAllSkillCategories();
        setSkillCategories(data);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch skills data:", err);
        setError("Failed to load skills data");
        // Fallback to hardcoded data if API fails
        setSkillCategories([
          {
            icon: "Brain",
            title: "AI & Data Science",
            skills: [
              "NLP",
              "Scikit-Learn",
              "Machine Learning",
              "Data Analysis",
              "Predictive Modeling",
            ],
            color: "primary",
            order: 1,
          },
          {
            icon: "Code2",
            title: "Programming & Tech",
            skills: ["Python", "RPA", "Azure", "Linux", "API Development"],
            color: "secondary",
            order: 2,
          },
          {
            icon: "Users",
            title: "Leadership & Strategy",
            skills: [
              "Strategic Planning",
              "Team Management",
              "Organizational Development",
              "Project Management",
            ],
            color: "primary",
            order: 3,
          },
          {
            icon: "Megaphone",
            title: "Public Speaking",
            skills: [
              "Conference Speaking",
              "Workshop Facilitation",
              "Entrepreneurship Training",
              "Mentoring",
            ],
            color: "secondary",
            order: 4,
          },
          {
            icon: "Database",
            title: "Consulting",
            skills: [
              "Business Strategy",
              "Process Optimization",
              "Digital Transformation",
              "Innovation Management",
            ],
            color: "primary",
            order: 5,
          },
          {
            icon: "Cloud",
            title: "Technology Stack",
            skills: [
              "Cloud Computing",
              "Automation",
              "Integration",
              "Scalable Solutions",
            ],
            color: "secondary",
            order: 6,
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchSkillsData();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section
      id="skills"
      ref={ref}
      className="py-8 md:py-32 relative overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/5 to-background" />

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-64 h-64 rounded-full opacity-5"
            style={{
              background:
                i % 2 === 0
                  ? "var(--gradient-primary)"
                  : "var(--gradient-secondary)",
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 20 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 md:mb-20"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-display mb-4 md:mb-6">
            Skills & <span className="text-primary">Technologies</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            A comprehensive toolkit spanning technology, strategy, and
            leadership. Combining technical expertise with strategic vision to
            drive innovation.
          </p>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
            <p className="text-muted-foreground mt-4">Loading skills...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-20">
            <p className="text-red-500 mb-4">{error}</p>
            <p className="text-muted-foreground">Showing fallback data</p>
          </div>
        )}

        {/* Skills Grid */}
        {!loading && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {skillCategories.map((category, index) => (
              <motion.div
                key={category._id || category.title}
                variants={cardVariants}
                className={`card-glass p-8 transition-all duration-500 group relative overflow-hidden`}
                style={{
                  transition: "all 0.5s ease",
                }}
                onMouseEnter={(e) => {
                  const shadow =
                    category.color === "primary"
                      ? "var(--shadow-glow-primary)"
                      : "var(--shadow-glow-secondary)";
                  e.currentTarget.style.boxShadow = `var(--shadow-card), ${shadow}`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "var(--shadow-card)";
                }}
              >
                {/* Card Background Effect */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br from-${category.color}/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />

                <div className="relative z-10">
                  {/* Icon */}
                  <div
                    className={`text-${category.color} mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    {iconMap[category.icon as keyof typeof iconMap] || (
                      <Brain size={32} />
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold mb-4 text-foreground group-hover:text-primary transition-colors duration-300">
                    {category.title}
                  </h3>

                  {/* Skills List */}
                  <div className="space-y-3">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.div
                        key={skill}
                        initial={{ opacity: 0, x: -20 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{
                          duration: 0.4,
                          delay: 0.8 + index * 0.1 + skillIndex * 0.05,
                        }}
                        className="flex items-center gap-3"
                      >
                        <div
                          className={`w-2 h-2 bg-${category.color} rounded-full flex-shrink-0`}
                        />
                        <span className="text-muted-foreground text-sm group-hover:text-foreground transition-colors duration-300">
                          {skill}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Skill Level Indicator */}
                  <motion.div
                    initial={{ width: 0 }}
                    animate={inView ? { width: "90%" } : {}}
                    transition={{ duration: 1, delay: 1 + index * 0.1 }}
                    className={`mt-6 h-1 bg-${category.color}/30 rounded-full overflow-hidden`}
                  >
                    <motion.div
                      initial={{ width: 0 }}
                      animate={inView ? { width: "100%" } : {}}
                      transition={{ duration: 1.5, delay: 1.2 + index * 0.1 }}
                      className={`h-full bg-${category.color} rounded-full`}
                    />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Achievement Highlight */}
        {!loading && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1.5 }}
            className="mt-20 text-center"
          >
            <div className="card-glass p-8 max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold mb-4 text-primary">
                Continuous Learning & Innovation
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Committed to staying at the forefront of technology and
                leadership methodologies. Regularly engaging with new
                frameworks, attending conferences, and contributing to
                open-source projects to drive continuous improvement and
                innovation.
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default SkillsSection;
