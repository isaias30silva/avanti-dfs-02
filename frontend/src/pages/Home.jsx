import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import ObjetivoSection from "../components/ObjetivoSection";
import ProfissionaisSection from "../components/ProfissionaisSection";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow">
        <HeroSection />
        <ObjetivoSection />
        <ProfissionaisSection />
      </main>

      <Footer />
    </div>
  );
}