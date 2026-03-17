import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Award, Users, BookOpen, Mic } from "lucide-react";
import { useState, useEffect } from "react";
import { achievementsService, Achievement } from "../../services/api";
import { toBackendAssetUrl } from "@/lib/apiConfig";

const AchievementsSection = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Icon mapping
  const iconMap = {
    Award: <Award size={20} />,
    Users: <Users size={20} />,
    BookOpen: <BookOpen size={20} />,
    Mic: <Mic size={20} />,
  };

  // Fetch achievements data from API
  useEffect(() => {
    const fetchAchievementsData = async () => {
      try {
        setLoading(true);
        const data = await achievementsService.getAllAchievements();
        setAchievements(data);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch achievements data:", err);
        setError("Failed to load achievements data");
        setAchievements([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAchievementsData();
  }, []);

  // Helper function to get full image URL
  const getImageUrl = (imagePath: string) => {
    return toBackendAssetUrl(imagePath);
  };

  return (
    <section id="achievements" ref={ref} className="py-12 md:py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: inView ? 0 : 0.2 }}
          className="text-center mb-8 md:mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold font-display mb-6">
            <span className="text-primary">Achievements</span> Gallery
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Milestones in leadership, community service, and youth empowerment
          </p>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
            <p className="text-muted-foreground mt-4">
              Loading achievements...
            </p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-20">
            <p className="text-red-500 mb-4">{error}</p>
            <p className="text-muted-foreground">Please try again later.</p>
          </div>
        )}

        {/* Achievements Grid */}
        {!loading && (
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement._id || achievement.title}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: (inView ? 0 : 0.3) + index * 0.2,
                }}
                className="card-glass overflow-hidden group cursor-pointer"
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
                <div className="relative overflow-hidden">
                  <img
                    src={getImageUrl(achievement.image)}
                    alt={achievement.title}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-4 right-4 bg-primary/90 text-white p-2 rounded-full">
                    {iconMap[achievement.icon as keyof typeof iconMap] || (
                      <Award size={20} />
                    )}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                    {achievement.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {achievement.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default AchievementsSection;
