import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import JourneySection from "@/components/JourneySection";
import FeaturesSection from "@/components/FeaturesSection";
import InterfaceSection from "@/components/InterfaceSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <JourneySection />
        <FeaturesSection />
        <InterfaceSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
