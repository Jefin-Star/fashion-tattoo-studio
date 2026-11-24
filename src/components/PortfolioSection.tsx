import { useState, useEffect, useCallback } from 'react';
import { X, ZoomIn, ZoomOut, ChevronLeft, ChevronRight, Sparkles, ArrowUpRight } from 'lucide-react';
import { STUDIO_CONFIG, PortfolioPiece, TattooStyle } from '../config/studioConfig';

const STYLE_FILTERS: TattooStyle[] = ['All', 'Realism', 'Fine Line', 'Blackwork', 'Neo-Traditional'];

interface PortfolioSectionProps {
  onBookPiece: (artistName: string, ideaHint: string, placement: string) => void;
}

export function PortfolioSection({ onBookPiece }: PortfolioSectionProps) {
  const [activeStyle, setActiveStyle] = useState<TattooStyle>('All');
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const filteredPieces =
    activeStyle === 'All'
      ? STUDIO_CONFIG.portfolio
      : STUDIO_CONFIG.portfolio.filter((item) => item.style === activeStyle);

  const selectedPiece: PortfolioPiece | null =
    selectedIndex !== null && filteredPieces[selectedIndex]
      ? filteredPieces[selectedIndex]
      : null;

  const closeModal = useCallback(() => {
    setSelectedIndex(null);
    setIsZoomed(false);
  }, []);

  const showPrev = useCallback(() => {
    setIsZoomed(false);
    setSelectedIndex((prev) => {
      if (prev === null) return null;
      return prev === 0 ? filteredPieces.length - 1 : prev - 1;
    });
  }, [filteredPieces.length]);

  const showNext = useCallback(() => {
    setIsZoomed(false);
    setSelectedIndex((prev) => {
      if (prev === null) return null;
      return prev === filteredPieces.length - 1 ? 0 : prev + 1;
    });
  }, [filteredPieces.length]);

  useEffect(() => {
    if (selectedIndex === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key === 'ArrowRight') showNext();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKey);
    };
  }, [selectedIndex, closeModal, showPrev, showNext]);

  return (
    <section
      id="portfolio"
      className="py-20 lg:py-28 bg-[#08080A] border-t border-white/[0.06]"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Section Header + Style Filter Tabs */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-xs font-medium tracking-[0.14em] uppercase text-zinc-400 mb-3">
              Artist Portfolio
            </p>
            <h2
              className="font-display text-3xl sm:text-4xl font-semibold text-white tracking-tight"
              style={{ textWrap: 'balance' }}
            >
              Selected Works on Skin
            </h2>
          </div>

          {/* Functional Segmented Filter Controls */}
          <div
            role="tablist"
            aria-label="Filter tattoo portfolio by style"
            className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-lg bg-[#121216] border border-white/[0.08]"
          >
            {STYLE_FILTERS.map((style) => {
              const active = activeStyle === style;
              return (
                <button
                  key={style}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => {
                    setActiveStyle(style);
                    setSelectedIndex(null);
                  }}
                  className={`px-3.5 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 min-h-[36px] ${
                    active
                      ? 'bg-white text-[#08080A]'
                      : 'text-zinc-400 hover:text-white hover:bg-white/[0.06]'
                  }`}
                >
                  {style === 'All' ? 'All Works' : style}
                </button>
              );
            })}
          </div>
        </div>

        {/* Asymmetric Editorial Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
          {filteredPieces.map((piece, idx) => {
            const isHeroSpan =
              activeStyle === 'All' && (idx === 0 || idx === 1);
            const colClass =
              activeStyle === 'All'
                ? idx === 0
                  ? 'lg:col-span-7'
                  : idx === 1
                    ? 'lg:col-span-5'
                    : 'lg:col-span-4'
                : 'lg:col-span-6';

            const heightClass = isHeroSpan
              ? 'h-[360px] sm:h-[440px]'
              : 'h-[320px] sm:h-[360px]';

            return (
              <article
                key={piece.id}
                className={`${colClass} group rounded-xl overflow-hidden bg-[#121216] border border-white/[0.08] hover:border-white/25 transition-colors flex flex-col`}
              >
                <button
                  type="button"
                  onClick={() => {
                    setSelectedIndex(idx);
                    setIsZoomed(false);
                  }}
                  aria-label={`Inspect ${piece.title} tattoo by ${piece.artist}`}
                  className={`relative w-full ${heightClass} overflow-hidden text-left focus-visible:outline-none`}
                >
                  {!failedImages[piece.id] ? (
                    <img
                      src={piece.image}
                      alt={`${piece.title} — ${piece.style} tattoo by ${piece.artist}`}
                      referrerPolicy="no-referrer"
                      onError={() =>
                        setFailedImages((prev) => ({ ...prev, [piece.id]: true }))
                      }
                      className="w-full h-full object-cover object-center transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-zinc-900 to-zinc-950 flex flex-col items-center justify-center p-6 text-center">
                      <Sparkles className="w-7 h-7 text-zinc-500 mb-2" />
                      <span className="text-sm font-medium text-zinc-300">{piece.title}</span>
                    </div>
                  )}

                  {/* Measured dark scrim on bottom */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-[#08080A]/90 via-[#08080A]/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity"
                  />

                  {/* Subtle zoom cue on hover */}
                  <span className="absolute top-4 right-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#08080A]/75 backdrop-blur-sm border border-white/15 text-xs font-medium text-white opacity-90 group-hover:opacity-100 transition-opacity">
                    <ZoomIn className="w-3.5 h-3.5" />
                    <span>Inspect</span>
                  </span>

                  {/* Unboxed Typographic Caption */}
                  <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6">
                    <div className="flex items-center gap-2 text-xs text-zinc-300 mb-1.5">
                      <span className="text-white font-medium">{piece.style}</span>
                      <span aria-hidden="true">·</span>
                      <span>{piece.placement}</span>
                    </div>
                    <h3 className="font-display text-xl sm:text-2xl font-semibold text-white tracking-tight">
                      {piece.title}
                    </h3>
                  </div>
                </button>
              </article>
            );
          })}
        </div>
      </div>

      {/* High-Contrast Lightbox Modal Zoom */}
      {selectedPiece && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${selectedPiece.title} zoomed portfolio view`}
          className="fixed inset-0 z-50 bg-black/92 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          onClick={closeModal}
        >
          <div
            className="relative w-full max-w-5xl bg-[#111114] border border-white/15 rounded-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 shadow-2xl max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top-Right Close Button */}
            <button
              type="button"
              onClick={closeModal}
              aria-label="Close zoomed preview"
              className="absolute top-3.5 right-3.5 z-20 inline-flex items-center justify-center w-10 h-10 rounded-md bg-black/80 hover:bg-white hover:text-[#08080A] text-white border border-white/20 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left Zoomable Image Frame */}
            <div className="lg:col-span-7 relative bg-black flex items-center justify-center overflow-hidden min-h-[300px] sm:min-h-[420px] lg:min-h-[540px]">
              <img
                src={selectedPiece.image}
                alt={`${selectedPiece.title} zoomed view`}
                referrerPolicy="no-referrer"
                onClick={() => setIsZoomed((z) => !z)}
                className={`w-full h-full max-h-[65vh] lg:max-h-[82vh] object-contain cursor-zoom-in transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isZoomed ? 'scale-150 cursor-zoom-out' : 'scale-100'
                }`}
              />

              {/* Zoom Toggle & Prev/Next Controls */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                <div className="flex items-center gap-2 pointer-events-auto">
                  <button
                    type="button"
                    onClick={showPrev}
                    aria-label="Previous artwork"
                    className="inline-flex items-center justify-center w-10 h-10 rounded-md bg-black/80 hover:bg-white/15 text-white border border-white/15 transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={showNext}
                    aria-label="Next artwork"
                    className="inline-flex items-center justify-center w-10 h-10 rounded-md bg-black/80 hover:bg-white/15 text-white border border-white/15 transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => setIsZoomed((z) => !z)}
                  className="pointer-events-auto inline-flex items-center gap-1.5 px-3.5 py-2 rounded-md bg-black/80 hover:bg-white/15 text-xs font-medium text-white border border-white/15 transition-colors min-h-[40px]"
                >
                  {isZoomed ? (
                    <>
                      <ZoomOut className="w-4 h-4" />
                      <span>Reset Zoom</span>
                    </>
                  ) : (
                    <>
                      <ZoomIn className="w-4 h-4" />
                      <span>Zoom Detail (1.5×)</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Right Editorial Details */}
            <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between gap-6 overflow-y-auto">
              <div>
                <div className="flex items-center gap-2 text-xs text-zinc-400 mb-3">
                  <span className="text-white font-semibold">{selectedPiece.style}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono-tabular">
                    {selectedIndex! + 1} / {filteredPieces.length}
                  </span>
                </div>

                <h3 className="font-display text-2xl sm:text-3xl font-semibold text-white tracking-tight mb-4">
                  {selectedPiece.title}
                </h3>

                <p className="text-sm text-zinc-300 leading-relaxed mb-6">
                  {selectedPiece.notes}
                </p>

                <dl className="divide-y divide-white/[0.08] border-y border-white/[0.08] text-sm">
                  <div className="py-3 flex justify-between gap-4">
                    <dt className="text-zinc-400">Discipline</dt>
                    <dd className="font-medium text-white text-right">{selectedPiece.artist}</dd>
                  </div>
                  <div className="py-3 flex justify-between gap-4">
                    <dt className="text-zinc-400">Placement</dt>
                    <dd className="font-medium text-white text-right">{selectedPiece.placement}</dd>
                  </div>
                  <div className="py-3 flex justify-between gap-4">
                    <dt className="text-zinc-400">Session Time</dt>
                    <dd className="font-mono-tabular font-medium text-white text-right">
                      {selectedPiece.sessionTime}
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="space-y-3">
                <button
                  type="button"
                  onClick={() => {
                    const p = selectedPiece;
                    closeModal();
                    onBookPiece(p.artist, `Inspired by "${p.title}" (${p.style})`, p.placement);
                  }}
                  className="inline-flex items-center justify-center gap-2 w-full px-5 py-3.5 text-sm font-semibold text-[#08080A] bg-white hover:bg-zinc-200 rounded-md transition-colors min-h-[44px]"
                >
                  <span>Book Similar Piece</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
                <p className="text-xs text-zinc-500 text-center">
                  Press ESC to close or arrow keys to browse
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
