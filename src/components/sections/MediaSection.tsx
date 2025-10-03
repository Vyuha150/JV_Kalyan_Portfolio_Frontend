import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Play,
  Mic,
  Camera,
  Award,
  Video,
  Users,
  Speaker,
  Headphones,
} from "lucide-react";
import { useState, useEffect } from "react";
import { mediaService, Media } from "../../services/api";

const MediaSection = () => {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const [mediaItems, setMediaItems] = useState<Media[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Icon mapping
  const iconMap = {
    Play: <Play size={20} />,
    Mic: <Mic size={20} />,
    Camera: <Camera size={20} />,
    Award: <Award size={20} />,
    Video: <Video size={20} />,
    Users: <Users size={20} />,
    Speaker: <Speaker size={20} />,
    Headphones: <Headphones size={20} />,
  };

  // Fetch media data from API
  useEffect(() => {
    const fetchMediaData = async () => {
      try {
        setLoading(true);
        const data = await mediaService.getAllMedia();
        setMediaItems(data);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch media data:", err);
        setError("Failed to load media data");
        // Fallback to hardcoded data if API fails
        setMediaItems([
          {
            image: "/lovable-uploads/9b07a4a2-48f6-452f-9c84-fbae4d7172ec.png",
            title: "Podcast with Pemmasani Chandra Shekhar",
            description:
              "Engaging conversation with Guntur MP on leadership and governance",
            type: "Podcast",
            icon: "Mic",
            link: "https://youtu.be/sZ8u-TqG6Tw?si=fEWXtRAtEbibvDnM",
            order: 1,
            isActive: true,
          },
          {
            image: "/lovable-uploads/36a177f7-a42b-4560-9f6a-f7c0031f7791.png",
            title: "SWEEP Electoral Education Event",
            description:
              "Speaking at systematic voters education and electoral participation program",
            type: "Speaking",
            icon: "Camera",
            link: "https://www.instagram.com/reel/C6FYmBNIEi_/?igsh=MTJ6dHM1aXVzZXJzbA==",
            order: 2,
            isActive: true,
          },
          {
            image: "/lovable-uploads/ff5d922c-4190-454f-b4a8-250dfd2100ec.png",
            title: "Leadership Content Creation",
            description:
              "Creating engaging content on youth empowerment and innovation",
            type: "Content",
            icon: "Award",
            link: "https://www.instagram.com/reel/C62kktFrqyA/?igsh=MWxvbnp0djBnbjZ3cg==",
            order: 3,
            isActive: true,
          },
          {
            image: "/lovable-uploads/e9bb5b4a-5e48-47e1-8f41-452a858222d3.png",
            title: "Panel Discussion Leadership",
            description:
              "Leading strategic discussions on innovation and community development",
            type: "Panel",
            icon: "Mic",
            link: "https://www.instagram.com/reel/C6YvX4MNkwE/?igsh=MXYyYzM5dXhvZm5xaw==",
            order: 4,
            isActive: true,
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchMediaData();
  }, []);

  // Helper function to get full image URL
  const getImageUrl = (imagePath: string) => {
    if (imagePath.startsWith("/uploads/")) {
      // This is a backend uploaded image
      let backendUrl =
        import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

      // If someone set the backend URL without protocol (e.g. api.jvkalyan.com/api), add https:// by default
      if (!/^https?:\/\//i.test(backendUrl)) {
        backendUrl = `https://${backendUrl}`;
      }

      // Remove a single trailing '/api' segment if present (only at the end)
      backendUrl = backendUrl.replace(/\/api\/?$/i, "");

      // Ensure no double slashes when concatenating
      return `${backendUrl}${imagePath}`;
    }
    // This is a frontend public image (fallback)
    return imagePath;
  };

  return (
    <section id="media" ref={ref} className="py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/50 to-background" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold font-display mb-6">
            Leadership <span className="text-primary">Talks</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Insights, speeches, and moments from various leadership events and
            initiatives
          </p>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
            <p className="text-muted-foreground mt-4">
              Loading media content...
            </p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-20">
            <p className="text-red-500 mb-4">{error}</p>
            <p className="text-muted-foreground">Showing fallback data</p>
          </div>
        )}

        {/* Media Grid */}
        {!loading && (
          <div className="grid md:grid-cols-2 gap-8">
            {mediaItems.map((item, index) => (
              <motion.a
                key={item._id || item.title}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="card-glass overflow-hidden group cursor-pointer block"
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
                    src={getImageUrl(item.image)}
                    alt={item.title}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="bg-primary/90 text-white p-4 rounded-full transform scale-0 group-hover:scale-100 transition-transform duration-300">
                      <Play size={24} />
                    </div>
                  </div>
                  <div className="absolute top-4 left-4 bg-primary/90 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2">
                    {iconMap[item.icon as keyof typeof iconMap] || (
                      <Play size={20} />
                    )}
                    {item.type}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.a>
            ))}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground mb-6">
            Interested in having J V Kalyan speak at your event?
          </p>
          <button className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors duration-300">
            Book Speaking Engagement
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default MediaSection;
