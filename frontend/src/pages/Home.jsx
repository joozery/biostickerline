import React from 'react';
import StickerSection from '../components/StickerSection';
import HeroSection from '../components/HeroSection';
import WhyChooseUs from '../components/WhyChooseUs';
import StoreStats from '../components/StoreStats';
import ThemeSlider from '../components/ThemeSlider';

export default function Home() {
  return (
    <div>
      <HeroSection />
      <StoreStats />
      <StickerSection />
      <ThemeSlider />
      <WhyChooseUs />
    </div>
  );
}
