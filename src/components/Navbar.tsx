import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { STUDIO_CONFIG } from '../config/studioConfig';

const NAV_LINKS = [
  { label: 'Studio', href: '#about' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Consultation', href: '#booking' },
  { label: 'Contact', href: '#contact' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-colors duration-200 ${
        scrolled || mobileOpen
          ? 'bg-[#08080A]/92 backdrop-blur-md border-b border-white/[0.08]'
          : 'bg-gradient-to-b from-[#08080A]/80 to-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 h-[72px] flex items-center justify-between gap-8">
        {/* Zone 1: Transparent High-Res Emblem + Single-Line Brand Wordmark */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('#hero');
          }}
          className="inline-flex items-center gap-3 whitespace-nowrap shrink-0 group"
        >
          <img
            src={STUDIO_CONFIG.brand.logoPath}
            alt="Fashion Tattoo Studio Logo"
            referrerPolicy="no-referrer"
            className="h-11 sm:h-12 w-auto object-contain shrink-0 transition-transform duration-200 group-hover:scale-[1.03]"
          />
          <span className="font-display text-sm sm:text-base font-semibold tracking-tight text-white whitespace-nowrap group-hover:text-zinc-200 transition-colors">
            {STUDIO_CONFIG.brand.name}
          </span>
        </a>

        {/* Zone 2: Concise single-line navigation links */}
        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-zinc-300"
        >
          {NAV_LINKS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(item.href);
              }}
              className="relative py-1 whitespace-nowrap shrink-0 hover:text-white transition-colors after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-[#E03E24] hover:after:w-full after:transition-all after:duration-200"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Primary CTA + Mobile Toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="#booking"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#booking');
            }}
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-xs font-semibold tracking-wide text-white bg-[#E03E24] hover:bg-[#C8321B] rounded-md transition-colors whitespace-nowrap shrink-0 min-h-[40px]"
          >
            Book Session
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-md text-zinc-200 hover:text-white hover:bg-white/[0.06] transition-colors"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-[#08080A] border-t border-white/[0.08] px-5 py-6">
          <nav aria-label="Mobile navigation" className="flex flex-col gap-1">
            {NAV_LINKS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
                className="py-3 px-2 text-base font-medium text-zinc-200 hover:text-white hover:bg-white/[0.04] rounded-md transition-colors"
              >
                {item.label}
              </a>
            ))}
            <div className="pt-4 mt-2 border-t border-white/[0.08]">
              <a
                href="#booking"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('#booking');
                }}
                className="flex items-center justify-center w-full py-3 px-4 text-sm font-semibold text-white bg-[#E03E24] hover:bg-[#C8321B] rounded-md transition-colors min-h-[44px]"
              >
                Book a Consultation
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
