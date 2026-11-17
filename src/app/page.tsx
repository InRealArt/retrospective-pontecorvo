import Header from "@/components/sections/Header";
import Hero from "@/components/sections/Hero";
import LExposition from "@/components/sections/LExposition";
import GaleriePhotos from "@/components/sections/GaleriePhotos";
import LArtiste from "@/components/sections/LArtiste";
import Regards from "@/components/sections/Regards";
import Collectionner from "@/components/sections/Collectionner";
import Visite from "@/components/sections/Visite";
import Contact from "@/components/sections/Contact";
import Faq from "@/components/sections/Faq";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <LExposition />
        <GaleriePhotos />
        <LArtiste />
        <Regards />
        <Collectionner />
        <Visite />
        <Contact />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
