import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import SkillsSection from '@/components/sections/SkillsSection';
import AchievementsSection from '@/components/sections/AchievementsSection';
import ExperienceSection from '@/components/sections/ExperienceSection';
import MediaSection from '@/components/sections/MediaSection';
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
        <SkillsSection />
        <AchievementsSection />
        <ExperienceSection />
        <MediaSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
