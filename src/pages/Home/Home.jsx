import Hero from '../../components/Hero/Hero';
import WholesaleSection from '../../components/WholesaleSection/WholesaleSection';
import ValueProposition from '../../components/ValueProposition/ValueProposition';
import FeaturedProducts from '../../components/FeaturedProducts/FeaturedProducts';
import WhyChooseStar from '../../components/WhyChooseStar/WhyChooseStar';
import WhatsAppCTA from '../../components/WhatsAppCTA/WhatsAppCTA';

export default function Home() {
  return (
    <main>
      {/* Wholesale first — highest priority */}
      <Hero />
      <ValueProposition />
      <WholesaleSection />
      {/* Retail section below */}
      <FeaturedProducts />
      <WhyChooseStar />
      <WhatsAppCTA />
    </main>
  );
}
