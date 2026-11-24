import { STUDIO_CONFIG } from '../config/studioConfig';

export function AboutSection() {
  return (
    <section
      id="about"
      className="py-20 lg:py-28 bg-[#0C0C0F] border-t border-white/[0.06]"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Studio Philosophy & Exact Pricing/Hours Statement */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 pb-16 border-b border-white/[0.08]">
          <div className="lg:col-span-5">
            <p className="text-xs font-medium tracking-[0.14em] uppercase text-[#E03E24] mb-3">
              About Our Studio
            </p>
            <h2
              className="font-display text-3xl sm:text-4xl font-semibold text-white tracking-tight leading-tight"
              style={{ textWrap: 'balance' }}
            >
              Crafted with discipline, hygiene, and custom artistry.
            </h2>
          </div>

          <div className="lg:col-span-7 flex flex-col justify-between gap-6">
            <p className="text-lg sm:text-xl text-zinc-200 leading-relaxed font-normal">
              {STUDIO_CONFIG.pricing.aboutStatement}
            </p>
            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed max-w-2xl">
              Whether you are commissioning your very first minimalist wrist piece or planning a
              multi-session realism sleeve, our Edappal studio pairs calm consultation rooms with
              sealed single-use cannulated needle cartridges, vegan-friendly professional pigments, and thorough
              aftercare guidance.
            </p>
          </div>
        </div>

        {/* Numbered Studio Standards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 py-14 border-b border-white/[0.08]">
          {STUDIO_CONFIG.standards.map((item) => (
            <div key={item.index} className="space-y-3">
              <p className="font-mono-tabular text-xs font-medium text-[#E03E24]">
                {item.index}.
              </p>
              <h3 className="text-lg font-semibold text-white tracking-tight">
                {item.title}
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Resident Collective Summary */}
        <div className="pt-14 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          <div className="lg:col-span-5">
            <p className="text-xs font-medium tracking-[0.14em] uppercase text-zinc-400 mb-2">
              {STUDIO_CONFIG.collective.kicker}
            </p>
            <h3
              className="font-display text-2xl sm:text-3xl font-semibold text-white tracking-tight"
              style={{ textWrap: 'balance' }}
            >
              {STUDIO_CONFIG.collective.heading}
            </h3>
          </div>

          <div className="lg:col-span-7">
            <p className="text-base sm:text-lg text-zinc-300 leading-relaxed max-w-2xl">
              {STUDIO_CONFIG.collective.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
