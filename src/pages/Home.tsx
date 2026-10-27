import { SiteNav } from "@/components/SiteNav";
import { Hero } from "@/components/hero/Hero";
import { Ticker } from "@/components/Ticker";
import { ServicesSection } from "@/components/ServicesSection";
import { BeforeAfterSection } from "@/components/BeforeAfterSection";
import { PriceEstimator } from "@/components/PriceEstimator";
import { SiteFooter } from "@/components/SiteFooter";

export default function Home() {
  return (
    <>
      <SiteNav />
      <main>
        <Hero />
        <Ticker />
        <ServicesSection />
        <BeforeAfterSection />
        <PriceEstimator />
      </main>
      <SiteFooter />
    </>
  );
}
