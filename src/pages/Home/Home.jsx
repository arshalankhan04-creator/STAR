import Hero from '../../components/Hero/Hero';
import ValueProposition from '../../components/ValueProposition/ValueProposition';
import FeaturedProducts from '../../components/FeaturedProducts/FeaturedProducts';
import WhyChooseStar from '../../components/WhyChooseStar/WhyChooseStar';
import WholesaleSection from '../../components/WholesaleSection/WholesaleSection';
import WhatsAppCTA from '../../components/WhatsAppCTA/WhatsAppCTA';

export default function Home() {
  return (
    <main>
      <Hero />
      <ValueProposition />
      <FeaturedProducts />
      <WhyChooseStar />
      <WholesaleSection />
      <WhatsAppCTA />
    </main>
  );
}
