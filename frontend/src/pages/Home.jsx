import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { HeroSection } from "../components/HeroSection";
import { ObjetivoSection } from "../components/ObjetivoSection";
import { ProfissionaisSection } from "../components/ProfissionaisSection";

export const Home = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <ObjetivoSection />
        <ProfissionaisSection />
      </main>
      <Footer />
    </div>
  );
};
