import { HeroSection } from "@/components/hero-section";
import { QuickCats } from "@/components/quick-cats";
import { EngineFramesSection } from "@/components/engine-frames-section";
import { PromotionsSection } from "@/components/promotions-section";
import { ServicesSection } from "@/components/services-section";
import { CatalogSection } from "@/components/catalog-section";
import { BookingSection } from "@/components/booking-section";
import { BrandsSection } from "@/components/brands-section";
import { ContactSection } from "@/components/contact-section";

export default function Home() {
  return (
    <>
      <HeroSection />
      <QuickCats />
      <EngineFramesSection />
      <PromotionsSection />
      <ServicesSection />
      <CatalogSection />
      <BookingSection />
      <BrandsSection />
      <ContactSection />
    </>
  );
}
