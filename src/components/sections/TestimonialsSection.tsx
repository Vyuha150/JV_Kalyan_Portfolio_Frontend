import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Quote, Star } from 'lucide-react';

const TestimonialsSection = () => {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const testimonials = [
    {
      name: "Dr. Rajesh Kumar",
      role: "Director, AIIMS Vijayawada",
      content: "J V Kalyan's leadership in health awareness programs has been exceptional. His CPR training initiative has potentially saved countless lives.",
      rating: 5,
      image: "/lovable-uploads/74f430d5-8e2d-4be6-8fff-cdb0aa77c8c6.png"
    },
    {
      name: "Pemmasani Chandra Shekhar",
      role: "Member of Parliament, Guntur",
      content: "Working with Kalyan on youth empowerment initiatives has been inspiring. His vision for connecting students with experts is remarkable.",
      rating: 5,
      image: "/lovable-uploads/2f095c44-3825-450f-93df-96413c20c8d3.png"
    },
    {
      name: "Prof. Sarah Williams",
      role: "Dean, KL University",
      content: "As founder of Vyuha, Kalyan has created an ecosystem that bridges academic excellence with real-world impact. His approach to student empowerment is revolutionary.",
      rating: 5,
      image: "/lovable-uploads/4824763f-1eb6-4a9a-83bd-0f9dfac722a9.png"
    }
  ];

  return (
    <section id="testimonials" ref={ref} className="py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/20 to-background" />
      <div className="absolute top-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-80 h-80 bg-secondary/5 rounded-full blur-3xl" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
          >
            <Quote size={16} className="text-primary" />
            <span className="text-sm font-medium text-primary">Testimonials</span>
          </motion.div>

          <h2 className="text-5xl md:text-6xl font-black font-display mb-6">
            What <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Leaders</span> Say
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Hear from distinguished professionals and academics about the impact of our work
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              className="group relative"
            >
              <div 
                className="relative bg-card/50 backdrop-blur-xl border border-border/50 rounded-2xl p-8 h-full transition-all duration-500 overflow-hidden"
                style={{
                  boxShadow: 'var(--shadow-card)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = 'var(--shadow-card-hover)';
                  e.currentTarget.style.transform = 'translateY(-5px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = 'var(--shadow-card)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                {/* Quote Icon */}
                <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Quote size={40} className="text-primary" />
                </div>

                {/* Rating Stars */}
                <div className="flex gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={inView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.3, delay: 0.5 + i * 0.1 }}
                    >
                      <Star size={16} className="text-secondary fill-secondary" />
                    </motion.div>
                  ))}
                </div>

                {/* Testimonial Content */}
                <blockquote className="text-lg leading-relaxed text-foreground mb-8 font-medium">
                  "{testimonial.content}"
                </blockquote>

                {/* Author Info */}
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full overflow-hidden bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground text-lg">
                      {testimonial.name}
                    </h4>
                    <p className="text-muted-foreground text-sm">
                      {testimonial.role}
                    </p>
                  </div>
                </div>

                {/* Hover Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;