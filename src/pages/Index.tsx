import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import MediaSection from '@/components/sections/MediaSection';
import ExperienceSection from '@/components/sections/ExperienceSection';
import AchievementsSection from '@/components/sections/AchievementsSection';
import VisionPhilosophySection from '@/components/sections/VisionPhilosophySection';
import SkillsSection from '@/components/sections/SkillsSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import ContactSection from '@/components/sections/ContactSection';
import Footer from '@/components/sections/Footer';
import HorizontalNav from '@/components/navigation/HorizontalNav';

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Horizontal Navigation */}
      <HorizontalNav />
      
      {/* Main Content */}
      <main className="relative">
        <HeroSection />
        <AboutSection />
        <MediaSection />
        <ExperienceSection />
        <AchievementsSection />
        <VisionPhilosophySection />
        <SkillsSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
