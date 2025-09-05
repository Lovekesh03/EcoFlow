import HeroSection from '../components/HeroSection';
import FeaturesSection from '../components/FeaturesSection';
import CommunitySection from '../components/CommunitySection';
import BlogsSection from '../components/BlogsSection';

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <FeaturesSection />
      <CommunitySection />
      <BlogsSection />
    </main>
  );
}
