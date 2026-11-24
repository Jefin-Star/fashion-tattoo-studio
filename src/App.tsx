/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { PortfolioSection } from './components/PortfolioSection';
import { BookingSection } from './components/BookingSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

export default function App() {
  const [preselectedArtist, setPreselectedArtist] = useState('');
  const [preselectedIdea, setPreselectedIdea] = useState('');
  const [preselectedPlacement, setPreselectedPlacement] = useState('');

  const scrollToBooking = () => {
    const el = document.querySelector('#booking');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleBookPiece = (artistName: string, ideaHint: string, placement: string) => {
    setPreselectedArtist(artistName);
    setPreselectedIdea(ideaHint);
    setPreselectedPlacement(placement);
    scrollToBooking();
  };

  return (
    <div className="min-h-screen bg-[#08080A] text-[#F4F4F5] flex flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <AboutSection />
        <PortfolioSection onBookPiece={handleBookPiece} />
        <BookingSection
          preselectedArtist={preselectedArtist}
          preselectedIdea={preselectedIdea}
          preselectedPlacement={preselectedPlacement}
        />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
