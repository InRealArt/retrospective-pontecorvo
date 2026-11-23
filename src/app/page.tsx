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

const SITE_URL = "https://retrospective-pontecorvo.galerie-leadouze.inrealart.com/";

const eventJsonLd = {
  "@context": "https://schema.org",
  "@type": "ExhibitionEvent",
  name: "Alain Pontecorvo, rétrospective",
  description:
    "Rétrospective de plus de soixante ans de peinture d'Alain Pontecorvo : paysages urbains, intérieurs, natures mortes et portraits.",
  startDate: "2026-11-13",
  endDate: "2026-12-12",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  eventStatus: "https://schema.org/EventScheduled",
  isAccessibleForFree: true,
  inLanguage: "fr",
  url: SITE_URL,
  image: [`${SITE_URL}images/ailleurs.webp`],
  location: {
    "@type": "Place",
    name: "Galerie Leadouze",
    address: {
      "@type": "PostalAddress",
      streetAddress: "16 avenue Matignon",
      postalCode: "75008",
      addressLocality: "Paris",
      addressCountry: "FR",
    },
  },
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "EUR",
    url: SITE_URL,
    availability: "https://schema.org/InStock",
  },
  organizer: { "@type": "Organization", name: "Galerie Leadouze" },
  performer: { "@type": "Person", name: "Alain Pontecorvo" },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(eventJsonLd).replace(/</g, "\\u003c"),
        }}
      />
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
