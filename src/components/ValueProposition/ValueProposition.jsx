const props = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
        <path d="M8 12l3 3 5-5" />
      </svg>
    ),
    title: 'Truly Handmade',
    description: 'Every bar is crafted by hand in small batches, ensuring consistent quality and personal care in each product.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: 'Natural Ingredients',
    description: 'We use only pure, plant-based ingredients sourced from nature — no synthetic additives, no shortcuts.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
      </svg>
    ),
    title: 'No Fragrance Added',
    description: 'Gentle on sensitive skin. Our products are free from artificial fragrances, making them safe for all skin types.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
      </svg>
    ),
    title: 'Made With Love',
    description: 'STAR products are born from a passion for clean living. Each product reflects our commitment to your skin\'s wellbeing.',
  },
];

export default function ValueProposition() {
  return (
    <section className="w-full bg-[#8FA882] py-12 md:py-16">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6">
          {props.map((item) => (
            <div key={item.title} className="flex flex-col items-center text-center gap-3">
              {/* Icon circle */}
              <div className="w-14 h-14 rounded-full border border-white/40 flex items-center justify-center text-white mb-1">
                {item.icon}
              </div>
              {/* Divider */}
              <div className="w-6 h-px bg-white/50" />
              {/* Title */}
              <h3 className="font-['Montserrat'] text-[10px] sm:text-xs tracking-[0.15em] uppercase text-white font-normal">
                {item.title}
              </h3>
              {/* Description */}
              <p className="text-[11px] sm:text-xs text-white/80 font-light leading-relaxed max-w-[160px]">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
