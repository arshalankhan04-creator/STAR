const props = [
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
        <path d="M8 12l3 3 5-5" />
      </svg>
    ),
    title: 'Truly Handmade',
    description: 'Crafted by hand in small batches — consistent quality, every time.',
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: 'Natural Ingredients',
    description: 'Pure, plant-based ingredients — no synthetic additives, no shortcuts.',
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
      </svg>
    ),
    title: 'No Fragrance',
    description: 'Free from artificial fragrances — gentle and safe for all skin types.',
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
      </svg>
    ),
    title: 'Made With Love',
    description: 'Every product reflects our passion for clean, honest skincare.',
  },
];

export default function ValueProposition() {
  return (
    <section className="w-full bg-[#4A7A3D] py-12 md:py-16">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6">
          {props.map((item) => (
            <div key={item.title} className="flex flex-col items-center text-center gap-3">
              {/* Icon circle */}
              <div className="w-13 h-13 rounded-full border border-white/30 bg-white/10 flex items-center justify-center text-white mb-1 p-3">
                {item.icon}
              </div>
              {/* Divider */}
              <div className="w-5 h-px bg-white/40" />
              {/* Title */}
              <h3 className="font-['Montserrat'] text-[10px] sm:text-[11px] tracking-[0.18em] uppercase text-white font-medium">
                {item.title}
              </h3>
              {/* Description */}
              <p className="text-[11px] sm:text-xs text-white/75 font-light leading-relaxed max-w-[150px]">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
