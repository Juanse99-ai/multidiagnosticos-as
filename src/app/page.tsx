import { HeroSection } from "@/components/hero-section";
import { QuickCats } from "@/components/quick-cats";
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
      <ServicesSection />
      <CatalogSection />
      <BookingSection />
      <BrandsSection />
      <ContactSection />
    </>
  );
}
