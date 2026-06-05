import { useLang } from '../../context/LanguageContext';
import { useInView } from '../../hooks/useInView';

function ReasonCard({ item, index }) {
  const [ref, inView] = useInView();
  const delays = ['delay-1', 'delay-2', 'delay-3', 'delay-4'];
  return (
    <div
      ref={ref}
      className={`flex flex-col gap-3 will-animate ${inView ? `in-view ${delays[index] || ''}` : ''}`}
    >
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
  );
}

export default function WhyChooseStar() {
  const { t } = useLang();
  const [headerRef, headerInView] = useInView();

  const reasons = [
    { number: '01', title: t.why1Title, description: t.why1Desc },
    { number: '02', title: t.why2Title, description: t.why2Desc },
    { number: '03', title: t.why3Title, description: t.why3Desc },
    { number: '04', title: t.why4Title, description: t.why4Desc },
  ];

  return (
    <section className="w-full bg-white py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">

        <div
          ref={headerRef}
          className={`text-center mb-12 md:mb-16 will-animate ${headerInView ? 'in-view' : ''}`}
        >
          <p className="text-[10px] tracking-[0.3em] uppercase text-[#6B8F5E] mb-3 font-['Montserrat'] font-normal">
            {t.whyEyebrow}
          </p>
          <h2 className="font-['Montserrat'] text-lg sm:text-xl md:text-2xl tracking-[0.15em] uppercase text-[#2C2C2C] font-normal">
            {t.whyHeading}
          </h2>
          <div className="w-8 h-px bg-[#6B8F5E] mx-auto mt-4 animate-grow-width" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          {reasons.map((item, index) => (
            <ReasonCard key={item.number} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
