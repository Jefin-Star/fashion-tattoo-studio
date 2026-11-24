import { useState } from 'react';
import { Phone, Mail, Instagram, MapPin, Clock, Copy, Check, ArrowUpRight } from 'lucide-react';
import { STUDIO_CONFIG, getWhatsAppUrl } from '../config/studioConfig';

export function ContactSection() {
  const [copied, setCopied] = useState(false);

  const handleCopyPhone = async () => {
    try {
      await navigator.clipboard.writeText(STUDIO_CONFIG.contact.whatsappRaw);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section
      id="contact"
      className="py-20 lg:py-28 bg-[#08080A] border-t border-white/[0.08]"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="max-w-2xl mb-12">
          <p className="text-xs font-medium tracking-[0.14em] uppercase text-zinc-400 mb-3">
            Contact Us
          </p>
          <h2
            className="font-display text-3xl sm:text-4xl font-semibold text-white tracking-tight mb-4"
            style={{ textWrap: 'balance' }}
          >
            Visit our Edappal studio or reach us directly.
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
            Have a question about pricing, cover-ups, or piercing care? Message us on WhatsApp,
            email our desk, or drop by between {STUDIO_CONFIG.hours.time}.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Left Direct Channels */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-4">
            {/* WhatsApp */}
            <div className="p-5 sm:p-6 rounded-xl bg-[#121216] border border-white/[0.08] flex flex-col justify-between gap-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs text-zinc-400 mb-1">WhatsApp &amp; Studio Phone</p>
                  <a
                    href={getWhatsAppUrl('Hello Fashion Tattoo Studio, I have an inquiry.')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono-tabular text-lg sm:text-xl font-semibold text-white hover:text-zinc-300 transition-colors inline-flex items-center gap-2"
                  >
                    <span>{STUDIO_CONFIG.contact.whatsappRaw}</span>
                    <ArrowUpRight className="w-4 h-4 text-zinc-400" />
                  </a>
                </div>
                <Phone className="w-5 h-5 text-white shrink-0" />
              </div>

              <div className="flex items-center gap-2.5 pt-1">
                <a
                  href={getWhatsAppUrl('Hello Fashion Tattoo Studio, I would like to book an appointment.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-3.5 py-2 text-xs font-semibold text-[#08080A] bg-white hover:bg-zinc-200 rounded-md transition-colors min-h-[38px]"
                >
                  Chat on WhatsApp
                </a>
                <button
                  type="button"
                  onClick={handleCopyPhone}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-zinc-300 hover:text-white bg-white/[0.05] hover:bg-white/[0.12] border border-white/15 rounded-md transition-colors min-h-[38px]"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-white" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Number</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Email */}
            <a
              href={`mailto:${STUDIO_CONFIG.contact.email}`}
              className="group p-5 sm:p-6 rounded-xl bg-[#121216] border border-white/[0.08] hover:border-white/30 transition-colors flex items-center justify-between gap-4"
            >
              <div className="min-w-0">
                <p className="text-xs text-zinc-400 mb-1">Email</p>
                <p className="text-base sm:text-lg font-medium text-white group-hover:text-zinc-200 transition-colors truncate">
                  {STUDIO_CONFIG.contact.email}
                </p>
              </div>
              <Mail className="w-5 h-5 text-zinc-400 group-hover:text-white transition-colors shrink-0" />
            </a>

            {/* Instagram */}
            <a
              href={STUDIO_CONFIG.contact.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-5 sm:p-6 rounded-xl bg-[#121216] border border-white/[0.08] hover:border-white/30 transition-colors flex items-center justify-between gap-4"
            >
              <div className="min-w-0">
                <p className="text-xs text-zinc-400 mb-1">Instagram</p>
                <p className="text-base sm:text-lg font-medium text-white group-hover:text-zinc-200 transition-colors truncate">
                  {STUDIO_CONFIG.contact.instagramHandle}
                </p>
              </div>
              <Instagram className="w-5 h-5 text-zinc-400 group-hover:text-white transition-colors shrink-0" />
            </a>

            {/* Studio Hours & Address Summary */}
            <div className="p-5 sm:p-6 rounded-xl bg-[#121216] border border-white/[0.08] space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-white shrink-0 mt-1" />
                <div>
                  <p className="text-sm font-medium text-white">
                    {STUDIO_CONFIG.contact.addressLine1}
                  </p>
                  <p className="text-xs text-zinc-400">{STUDIO_CONFIG.contact.addressLine2}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 pt-1 border-t border-white/[0.06]">
                <Clock className="w-4 h-4 text-zinc-400 shrink-0" />
                <p className="text-xs text-zinc-300">
                  {STUDIO_CONFIG.hours.days} ·{' '}
                  <span className="font-mono-tabular text-white">{STUDIO_CONFIG.hours.time}</span>
                </p>
              </div>
            </div>
          </div>

          {/* Right Google Maps Embed */}
          <div className="lg:col-span-7 flex flex-col rounded-xl overflow-hidden bg-[#121216] border border-white/[0.08] min-h-[380px] lg:min-h-full">
            <div className="flex items-center justify-between gap-4 px-5 py-3.5 border-b border-white/[0.08]">
              <span className="text-xs font-medium text-zinc-300">
                Studio Directions · Edappal
              </span>
              <a
                href={STUDIO_CONFIG.contact.mapDirectLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-medium text-white hover:underline whitespace-nowrap"
              >
                <span>Open in Google Maps</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
            <div className="relative flex-1 min-h-[340px]">
              <iframe
                title="Fashion Tattoo Studio Edappal Google Maps Location"
                src={STUDIO_CONFIG.contact.mapEmbedUrl}
                className="w-full h-full min-h-[340px] border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
