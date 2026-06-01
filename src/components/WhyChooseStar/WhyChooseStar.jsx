const reasons = [
  {
    number: '01',
    title: 'Small Batch Quality',
    description:
      'We never mass-produce. Every product is made in small batches so you always receive something fresh, potent, and crafted with full attention.',
  },
  {
    number: '02',
    title: 'Skin-Safe Formulas',
    description:
      'No parabens. No sulfates. No artificial fragrances. Our formulas are gentle enough for sensitive skin and safe for the whole family.',
  },
  {
    number: '03',
    title: 'Rooted in Nature',
    description:
      'From neem and aloevera to honey and multani mitti — every ingredient we use has been trusted by generations for its natural healing properties.',
  },
  {
    number: '04',
    title: 'Affordable Purity',
    description:
      'Clean, natural skincare should not be a luxury. STAR Herbal keeps prices honest so everyone can access products that are genuinely good for their skin.',
  },
];

export default function WhyChooseStar() {
  return (
    <section className="w-full bg-white py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <p className="text-[10px] tracking-[0.3em] uppercase text-[#6B8F5E] mb-3 font-['Montserrat'] font-normal">
            Our Promise
          </p>
          <h2 className="font-['Montserrat'] text-lg sm:text-xl md:text-2xl tracking-[0.15em] uppercase text-[#2C2C2C] font-normal">
            Why Choose STAR Herbal
          </h2>
          <div className="w-8 h-px bg-[#6B8F5E] mx-auto mt-4" />
        </div>

        {/* Reasons Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          {reasons.map((item) => (
            <div key={item.number} className="flex flex-col gap-3">
              <span className="font-['Montserrat'] text-4xl font-light text-[#6B8F5E]/25 tracking-tight">
                {item.number}
              </span>
              <div className="w-6 h-px bg-[#6B8F5E]" />
              <h3 className="font-['Montserrat'] text-xs tracking-[0.12em] uppercase text-[#2C2C2C] font-medium">
                {item.title}
              </h3>
              <p className="text-xs text-[#7A7A72] font-light leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
