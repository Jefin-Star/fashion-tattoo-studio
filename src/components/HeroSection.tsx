import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowDownRight, Calendar } from 'lucide-react';
import { STUDIO_CONFIG } from '../config/studioConfig';

export function HeroSection() {
  const [heroLoaded, setHeroLoaded] = useState(true);

  const scrollToSection = (id: string) => {
    const el = document.querySelector(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] flex flex-col justify-between pt-24 pb-0 overflow-hidden bg-[#08080A]"
    >
      {/* Full-bleed Studio Backdrop */}
      <div className="absolute inset-0 z-0">
        {heroLoaded ? (
          <img
            src={STUDIO_CONFIG.brand.heroImage}
            alt="Interior of Fashion Tattoo Studio showing sterile workstation and artist tattooing"
            referrerPolicy="no-referrer"
            onError={() => setHeroLoaded(false)}
            className="w-full h-full object-cover object-center opacity-70"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-zinc-900 via-[#0C0C0F] to-black" />
        )}
        {/* Measured scrim for WCAG AA contrast across all frames */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-[#08080A]/95 via-[#08080A]/75 to-[#08080A]/45"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[#08080A] via-transparent to-[#08080A]/60"
        />
      </div>

      {/* Main Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-5 sm:px-8 my-auto py-12 lg:py-20">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl"
        >
          <p className="text-xs sm:text-sm font-medium tracking-[0.16em] uppercase text-zinc-300 mb-4">
            {STUDIO_CONFIG.contact.addressLine1} · {STUDIO_CONFIG.hours.short}
          </p>

          <h1
            className="font-display font-semibold text-white tracking-tight leading-[1.06] mb-6"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4.35rem)', textWrap: 'balance' }}
          >
            {STUDIO_CONFIG.brand.name}
          </h1>

          <p className="font-display italic text-xl sm:text-2xl text-[#F4F4F5] mb-4">
            {STUDIO_CONFIG.brand.tagline}
          </p>

          <p className="text-base sm:text-lg text-zinc-300 leading-relaxed max-w-xl mb-9">
            {STUDIO_CONFIG.brand.subheadline}
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <a
              href="#booking"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('#booking');
              }}
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm font-semibold text-white bg-[#E03E24] hover:bg-[#C8321B] rounded-md transition-colors min-h-[44px] whitespace-nowrap"
            >
              <Calendar className="w-4 h-4" />
              <span>Book a Consultation</span>
            </a>

            <a
              href="#portfolio"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('#portfolio');
              }}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-zinc-100 bg-white/[0.06] hover:bg-white/[0.12] border border-white/20 rounded-md transition-colors min-h-[44px] whitespace-nowrap"
            >
              <span>View Portfolio</span>
              <ArrowDownRight className="w-4 h-4" />
            </a>
          </div>
        </motion.div>
      </div>

      {/* Full-Width Key Studio Facts Strip */}
      <div className="relative z-10 border-t border-white/[0.1] bg-[#08080A]/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-5 grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          <div>
            <p className="text-xs text-zinc-400 mb-1">Studio Hours</p>
            <p className="font-mono-tabular text-sm sm:text-base font-medium text-white">
              {STUDIO_CONFIG.hours.time}
            </p>
          </div>
          <div>
            <p className="text-xs text-zinc-400 mb-1">{STUDIO_CONFIG.pricing.tattooLabel}</p>
            <p className="font-mono-tabular text-sm sm:text-base font-medium text-white">
              {STUDIO_CONFIG.pricing.tattooStarting}
            </p>
          </div>
          <div>
            <p className="text-xs text-zinc-400 mb-1">{STUDIO_CONFIG.pricing.piercingLabel}</p>
            <p className="font-mono-tabular text-sm sm:text-base font-medium text-white">
              {STUDIO_CONFIG.pricing.piercingStarting}
            </p>
          </div>
          <div>
            <p className="text-xs text-zinc-400 mb-1">Studio Location</p>
            <p className="text-sm sm:text-base font-medium text-white truncate">
              Edappal, Kerala
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
