import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import LogosStrip from "@/components/LogosStrip";
import FeaturesSection from "@/components/FeaturesSection";
import PlatformSection from "@/components/PlatformSection";
import MetricsSection from "@/components/MetricsSection";
import JourneySection from "@/components/JourneySection";
import CTABanner from "@/components/CTABanner";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <LogosStrip />
        <FeaturesSection />
        <PlatformSection />
        <MetricsSection />
        <JourneySection />
        <CTABanner />
      </main>
      <Footer />
    </>
  );
}
