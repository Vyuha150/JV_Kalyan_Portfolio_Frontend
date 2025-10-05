import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Mail,
  MessageSquare,
  Calendar,
  ExternalLink,
  Send,
  CheckCircle,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

const ContactSection = () => {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [submitMessage, setSubmitMessage] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // Simulate API call - replace with actual form submission logic
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // For now, just log the form data (replace with actual API call)
      console.log("Form submitted:", formData);

      // Success state
      setSubmitStatus("success");
      setSubmitMessage(
        "Thank you! Your message has been sent successfully. I'll get back to you soon."
      );

      // Reset form after success
      setFormData({ name: "", email: "", message: "" });

      // Clear success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus("idle");
        setSubmitMessage("");
      }, 5000);
    } catch (error) {
      // Error state
      setSubmitStatus("error");
      setSubmitMessage(
        "Sorry, there was an error sending your message. Please try again."
      );

      // Clear error message after 5 seconds
      setTimeout(() => {
        setSubmitStatus("idle");
        setSubmitMessage("");
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactMethods = [
    {
      icon: <ExternalLink size={24} />,
      title: "LinkedIn",
      description: "Connect professionally",
      action: "Visit Profile",
      href: "https://www.linkedin.com/in/venkat-kalyan-4239ba21a/",
      color: "primary",
    },
    {
      icon: <Calendar size={24} />,
      title: "Speaking Engagements",
      description: "Book for conferences & events",
      action: "Schedule Call",
      href: "https://wa.me/917661073573?text=Hi%20J%20V%20Kalyan,%20I%20would%20like%20to%20discuss%20a%20speaking%20engagement%20opportunity.%20Could%20we%20schedule%20a%20call%20to%20discuss%20the%20details?",
      color: "secondary",
    },
    {
      icon: <MessageSquare size={24} />,
      title: "Consultation",
      description: "Strategic & technical guidance",
      action: "Get in Touch",
      href: "https://wa.me/917661073573?text=Hi%20J%20V%20Kalyan,%20I%20would%20like%20to%20discuss%20a%20speaking%20engagement%20opportunity.%20Could%20we%20schedule%20a%20call%20to%20discuss%20the%20details?",
      color: "primary",
    },
  ];

  return (
    <section id="contact" ref={ref} className="py-32 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-muted/5 to-background" />

      {/* Floating Geometric Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute opacity-10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              rotate: [0, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 15 + i * 2,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <div
              className={`w-16 h-16 ${
                i % 2 === 0 ? "bg-primary/20" : "bg-secondary/20"
              } ${i % 3 === 0 ? "rounded-full" : "rounded-lg rotate-45"}`}
            />
          </motion.div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold font-display mb-6">
            Let's <span className="text-primary">Connect</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Ready to collaborate, discuss opportunities, or explore how we can
            create impact together? Let's start a conversation.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Contact Methods */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <h3 className="text-2xl font-bold mb-8 font-display">
              Get in Touch
            </h3>

            {contactMethods.map((method, index) => (
              <motion.div
                key={method.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                className={`card-glass p-6 transition-all duration-500 group cursor-pointer`}
                style={{
                  transition: "all 0.5s ease",
                }}
                onMouseEnter={(e) => {
                  const shadow =
                    method.color === "primary"
                      ? "var(--shadow-glow-primary)"
                      : "var(--shadow-glow-secondary)";
                  e.currentTarget.style.boxShadow = `var(--shadow-card), ${shadow}`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "var(--shadow-card)";
                }}
                onClick={() =>
                  method.href !== "#" && window.open(method.href, "_blank")
                }
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`text-${method.color} p-3 rounded-lg bg-${method.color}/10 group-hover:bg-${method.color}/20 transition-colors duration-300`}
                  >
                    {method.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                      {method.title}
                    </h4>
                    <p className="text-muted-foreground text-sm mb-3">
                      {method.description}
                    </p>
                    <span
                      className={`text-${method.color} text-sm font-medium group-hover:underline`}
                    >
                      {method.action} →
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Additional Info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="card-glass p-6"
            >
              <h4 className="text-lg font-semibold mb-3 text-primary">
                Available For
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                  Strategic consulting & advisory
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-secondary rounded-full"></span>
                  Speaking engagements & workshops
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                  Technology partnerships
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-secondary rounded-full"></span>
                  Mentoring & coaching sessions
                </li>
              </ul>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="card-glass p-8"
          >
            <h3 className="text-2xl font-bold mb-8 font-display">
              Send a Message
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Your Name
                </label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="bg-input/50 border-border/50 focus:border-primary/50 transition-colors"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Email Address
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="bg-input/50 border-border/50 focus:border-primary/50 transition-colors"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleInputChange}
                  className="bg-input/50 border-border/50 focus:border-primary/50 transition-colors resize-none"
                  placeholder="Tell me about your project, speaking opportunity, or how we can collaborate..."
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-primary group"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Send Message
                    <motion.div
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                      whileHover={{ x: 5 }}
                    >
                      →
                    </motion.div>
                  </>
                )}
              </Button>

              {/* Status Messages */}
              {submitStatus !== "idle" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={`mt-4 p-4 rounded-lg border flex items-start gap-3 ${
                    submitStatus === "success"
                      ? "bg-green-50 border-green-200 text-green-800"
                      : "bg-red-50 border-red-200 text-red-800"
                  }`}
                >
                  {submitStatus === "success" ? (
                    <CheckCircle
                      size={20}
                      className="text-green-600 flex-shrink-0 mt-0.5"
                    />
                  ) : (
                    <AlertCircle
                      size={20}
                      className="text-red-600 flex-shrink-0 mt-0.5"
                    />
                  )}
                  <p className="text-sm font-medium">{submitMessage}</p>
                </motion.div>
              )}
            </form>

            {/* Response Time */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/20"
            >
              <div className="flex items-center gap-2 text-sm text-primary">
                <Mail size={16} />
                <span className="font-medium">Quick Response</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Typically respond within 24 hours during business days.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
