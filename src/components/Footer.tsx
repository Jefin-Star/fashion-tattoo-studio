import { Instagram, Mail, MessageCircle } from 'lucide-react';
import { STUDIO_CONFIG, getWhatsAppUrl } from '../config/studioConfig';

export function Footer() {
  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <footer className="bg-[#060608] border-t border-white/[0.08] py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-10 border-b border-white/[0.08]">
          {/* Brand Logo & Wordmark */}
          <div className="md:col-span-5 flex items-start gap-4">
            <img
              src={STUDIO_CONFIG.brand.logoPath}
              alt="Fashion Tattoo Studio Logo"
              referrerPolicy="no-referrer"
              className="h-14 w-auto object-contain shrink-0"
            />
            <div>
              <p className="font-display text-lg font-semibold text-white tracking-tight">
                {STUDIO_CONFIG.brand.name}
              </p>
              <p className="text-xs text-zinc-400 mt-1 leading-relaxed max-w-xs">
                {STUDIO_CONFIG.contact.addressLine1} · {STUDIO_CONFIG.hours.time} daily. Tattoos
                from {STUDIO_CONFIG.pricing.tattooStarting} &amp; piercings from{' '}
                {STUDIO_CONFIG.pricing.piercingStarting}.
              </p>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="md:col-span-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-3">
              Navigation
            </p>
            <ul className="grid grid-cols-2 gap-y-2.5 gap-x-6 text-sm text-zinc-300">
              <li>
                <a
                  href="#hero"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo('#hero');
                  }}
                  className="hover:text-white transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo('#about');
                  }}
                  className="hover:text-white transition-colors"
                >
                  About Studio
                </a>
              </li>
              <li>
                <a
                  href="#portfolio"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo('#portfolio');
                  }}
                  className="hover:text-white transition-colors"
                >
                  Portfolio
                </a>
              </li>
              <li>
                <a
                  href="#booking"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo('#booking');
                  }}
                  className="hover:text-white transition-colors"
                >
                  Book Consultation
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo('#contact');
                  }}
                  className="hover:text-white transition-colors"
                >
                  Contact &amp; Map
                </a>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="md:col-span-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-3">
              Connect
            </p>
            <div className="flex items-center gap-3">
              <a
                href={getWhatsAppUrl('Hello Fashion Tattoo Studio!')}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp Fashion Tattoo Studio"
                className="inline-flex items-center justify-center w-10 h-10 rounded-md bg-white/[0.05] hover:bg-[#E03E24] text-zinc-200 hover:text-white border border-white/10 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href={STUDIO_CONFIG.contact.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram Fashion Tattoo Studio"
                className="inline-flex items-center justify-center w-10 h-10 rounded-md bg-white/[0.05] hover:bg-[#E03E24] text-zinc-200 hover:text-white border border-white/10 transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${STUDIO_CONFIG.contact.email}`}
                aria-label="Email Fashion Tattoo Studio"
                className="inline-flex items-center justify-center w-10 h-10 rounded-md bg-white/[0.05] hover:bg-[#E03E24] text-zinc-200 hover:text-white border border-white/10 transition-colors"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Quiet Copyright Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-500">
          <p>
            © {STUDIO_CONFIG.brand.copyrightYear} {STUDIO_CONFIG.brand.name}. All rights reserved.
          </p>
          <p>Edappal, Malappuram, Kerala</p>
        </div>
      </div>
    </footer>
  );
}
