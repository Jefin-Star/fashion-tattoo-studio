export type TattooStyle = 'All' | 'Realism' | 'Fine Line' | 'Blackwork' | 'Neo-Traditional';

export interface PortfolioPiece {
  id: string;
  title: string;
  style: Exclude<TattooStyle, 'All'>;
  artist: string;
  placement: string;
  sessionTime: string;
  image: string;
  aspect: 'portrait' | 'landscape';
  featured?: boolean;
  notes: string;
}

/**
 * FASHION TATTOO STUDIO — CENTRAL CONFIGURATION
 * Update pricing, opening hours, contact details, Google Maps embed URL,
 * artists, and portfolio items from this single file.
 */
export const STUDIO_CONFIG = {
  brand: {
    name: 'FASHION TATTOO STUDIO',
    shortName: 'Fashion Tattoo Studio',
    tagline: 'Precision Ink. Timeless Craft.',
    subheadline:
      'Bespoke custom tattooing and sterile body piercing in the heart of Edappal—crafted by experienced artists under hospital-grade hygiene standards.',
    logoPath: '/assets/logo-transparent.png',
    originalLogoPath: '/assets/aistudio/b923873a-63f9-4c1b-87ee-59207e96672d_691d5daa.jpg',
    heroImage: '/src/assets/images/hero_tattoo_studio_1795347167133.jpg',
    copyrightYear: 2026,
  },

  hours: {
    days: 'Open Daily (Mon – Sun)',
    time: '10:00 AM – 8:00 PM',
    short: '10 AM – 8 PM Daily',
  },

  pricing: {
    tattooStarting: '₹1,000',
    tattooLabel: 'Professional Tattoos Starting From',
    piercingStarting: '₹500',
    piercingLabel: 'Precise Piercings Starting From',
    aboutStatement:
      'Open daily from 10 AM to 8 PM, our studio features highly experienced artists. We offer professional tattoos starting at 1,000 rupees and precise piercings starting from 500 rupees.',
  },

  contact: {
    whatsappDisplay: '+91 81578 07000',
    whatsappRaw: '8157807000',
    whatsappCountryCode: '91',
    email: 'edappalmy@gmail.com',
    instagramHandle: '@fashion_tattoo_studio_edappal',
    instagramUrl:
      'https://www.instagram.com/fashion_tattoo_studio_edappal?bqrl=N3hyd211dWszMjh1',
    addressLine1: 'Fashion Tattoo Studio, Edappal',
    addressLine2: 'Malappuram District, Kerala, India',
    mapEmbedUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3735.5976331742436!2d76.0087161!3d10.7871264!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba7b93e51111a6d%3A0xf528ceb9a2ce0816!2sFashion%20Tattoo%20Studio%20Edappal!5e1!3m2!1sen!2sin!4v1795343520716!5m2!1sen!2sin',
    mapDirectLink: 'https://maps.google.com/?q=Fashion+Tattoo+Studio+Edappal',
  },

  standards: [
    {
      index: '01',
      title: 'Single-Use Cannulated Needles',
      description:
        'Every cannulated needle cartridge, ink cap, and barrier film is sealed, opened in front of you, and disposed of safely after a single session.',
    },
    {
      index: '02',
      title: 'Custom Skin-Mapped Design',
      description:
        'Each tattoo is sized and stenciled specifically to complement your anatomy, skin tone, and long-term aging clarity.',
    },
    {
      index: '03',
      title: 'Transparent Studio Rates',
      description:
        'Honest upfront quotes before any cannulated needle touches skin—custom tattoos start at ₹1,000 and sterile piercings start at ₹500.',
    },
  ],

  collective: {
    kicker: 'Resident Collective',
    heading: 'Meet Our Tattoo & Piercing Artists',
    description:
      'Fashion Tattoo Studio is powered by a dedicated collective of highly experienced, full-time tattoo and piercing professionals united by a commitment to bespoke custom art and hospital-grade safety. Every session begins with collaborative skin-mapped design and is executed with single-use sterile cannulated needles, autoclave-verified equipment, and medical-grade barrier protocols so every client leaves with enduring artwork and complete peace of mind.',
  },

  bookingSpecialists: [
    'Any Available Senior Artist',
    'Black & Grey Realism Specialist',
    'Fine Line & Dotwork Specialist',
    'Neo-Traditional & Custom Color Specialist',
    'Body Piercing Specialist',
  ],

  portfolio: [
    {
      id: 'piece-shiv-shakti-om',
      title: 'Shiv-Shakti & Sacred Om',
      style: 'Realism',
      artist: 'Black & Grey Realism Specialist',
      placement: 'Inner Forearm',
      sessionTime: '5.5 Hours',
      image: '/assets/aistudio/37a4ac37-9002-4f2e-83fd-0b48fca2a161_c5b30627.jpg',
      aspect: 'portrait',
      featured: true,
      notes:
        'Black-and-grey portrait realism uniting Lord Shiva and Goddess Parvati with a vermilion tilak accent, flowing cleanly into a calligraphic Om symbol.',
    },
    {
      id: 'piece-theyyam-mask',
      title: 'Theyyam Sacred Mask & Brushstroke',
      style: 'Blackwork',
      artist: 'Black & Grey Realism Specialist',
      placement: 'Inner Forearm',
      sessionTime: '6 Hours',
      image: '/assets/aistudio/147c6997-836b-4251-842d-191376803021_0d819c10.jpg',
      aspect: 'portrait',
      featured: true,
      notes:
        'Layered Kerala Theyyam ritual portrait framed by raw ink brushstrokes, intricate geometric crown stippling, and subtle crimson eye highlights.',
    },
    {
      id: 'piece-anchor-eagle-eye',
      title: 'Navigator Anchor, Eagle & Clockwork Eye',
      style: 'Realism',
      artist: 'Black & Grey Realism Specialist',
      placement: 'Outer Forearm',
      sessionTime: '6.5 Hours',
      image: '/assets/aistudio/dc3e9f3d-a93b-429f-bcd7-b751d2ba87b5_a25bdae5.jpg',
      aspect: 'portrait',
      notes:
        'Custom black-and-grey sleeve montage pairing a roped maritime anchor and world map wash with Roman numeral clockwork, an eagle portrait, and a surrealist eye.',
    },
    {
      id: 'piece-krishna-flute',
      title: 'Flute-Playing Krishna & Lotus',
      style: 'Fine Line',
      artist: 'Fine Line & Dotwork Specialist',
      placement: 'Inner Forearm',
      sessionTime: '4 Hours',
      image: '/assets/aistudio/7fd56389-97c0-4f7e-83d0-1e534065b59b_4df884c9.jpg',
      aspect: 'portrait',
      notes:
        'Delicate fine-line illustration of Lord Krishna playing the flute in flowing drapery, accented by a lotus blossom below and an infinity-trishul feather motif above.',
    },
    {
      id: 'piece-eagle-plumage',
      title: 'Crimson-Eyed Eagle & Plumage',
      style: 'Neo-Traditional',
      artist: 'Neo-Traditional & Custom Color Specialist',
      placement: 'Upper Arm & Shoulder',
      sessionTime: '4.5 Hours',
      image: '/assets/aistudio/f15000cf-0134-43bf-96c1-bb47227171f1_0578c5bc.jpg',
      aspect: 'portrait',
      notes:
        'Bold neo-traditional eagle and stylized wing feathers cradling a realistic eye within the plumage, accented by a crimson iris and radiating ink strokes.',
    },
  ] satisfies PortfolioPiece[],
};

export function getWhatsAppUrl(prefilledMessage?: string): string {
  const base = `https://wa.me/${STUDIO_CONFIG.contact.whatsappCountryCode}${STUDIO_CONFIG.contact.whatsappRaw}`;
  if (!prefilledMessage) return base;
  return `${base}?text=${encodeURIComponent(prefilledMessage)}`;
}
