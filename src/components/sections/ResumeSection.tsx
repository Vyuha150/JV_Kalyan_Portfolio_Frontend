import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FileText, FolderOpen, Download, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ResumeSection = () => {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const documents = [
    {
      icon: <FileText size={32} />,
      title: "Professional Resume",
      description: "Comprehensive overview of experience, skills, and achievements",
      action: "Download PDF",
      type: "resume",
    },
    {
      icon: <FolderOpen size={32} />,
      title: "Case Studies & Projects",
      description: "Detailed portfolio of successful initiatives and strategic implementations",
      action: "View Portfolio",
      type: "portfolio",
    },
    {
      icon: <ExternalLink size={32} />,
      title: "LinkedIn Profile",
      description: "Professional network and detailed career journey",
      action: "Visit LinkedIn",
      type: "linkedin",
      link: "https://www.linkedin.com/in/venkat-kalyan-4239ba21a/",
    },
  ];

  return (
    <section id="resume" ref={ref} className="py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background to-background/95" />
      
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold font-display mb-6">
            Resume & <span className="text-primary">Documents</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Professional credentials and detailed portfolio of achievements
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {documents.map((doc, index) => (
            <motion.div
              key={doc.title}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="card-glass p-8 text-center group"
              style={{
                transition: 'all 0.5s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = 'var(--shadow-card), var(--shadow-glow-primary)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = 'var(--shadow-card)';
              }}
            >
              <div className="text-primary mb-6 flex justify-center group-hover:scale-110 transition-transform duration-300">
                {doc.icon}
              </div>
              
              <h3 className="text-xl font-bold text-foreground mb-4">
                {doc.title}
              </h3>
              
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {doc.description}
              </p>
              
              <Button
                className="w-full"
                onClick={() => {
                  if (doc.type === 'linkedin' && doc.link) {
                    window.open(doc.link, '_blank');
                  } else {
                    // Handle resume/portfolio downloads
                    console.log(`Downloading ${doc.type}`);
                  }
                }}
              >
                <Download className="mr-2 h-4 w-4" />
                {doc.action}
              </Button>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="card-glass p-8 mt-16"
        >
          <div className="text-center">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Professional Summary
            </h3>
            <p className="text-muted-foreground leading-relaxed max-w-4xl mx-auto">
              Experienced strategist and youth leader with a proven track record of building innovative ecosystems. 
              Founder of Vyuha with 1500+ members empowered, specializing in AI strategy, community development, 
              and public speaking. Passionate about bridging technology with human potential to create lasting impact.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ResumeSection;