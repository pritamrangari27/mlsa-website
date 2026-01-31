import React from 'react';
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import EventsPreview from '../components/sections/EventsPreview';
import TeamPreview from '../components/sections/TeamPreview';
import GalleryPreview from '../components/sections/GalleryPreview';
import CTA from '../components/sections/CTA';

const Home = () => {
  return (
    <>
      <Hero />
      <About />
      <EventsPreview />
      <TeamPreview />
      <GalleryPreview />
      <CTA />
    </>
  );
};

export default Home;
