import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { HiX, HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import 'react-lazy-load-image-component/src/effects/blur.css';
import './Gallery.css';

// Local gallery images from photos folder
const localGallery = [
  {
    id: 1,
    image: '/gallery/event-1.jpeg',
    title: 'MLSA Event Highlight',
    description: 'Community gathering and tech discussions',
    category: 'event'
  },
  {
    id: 2,
    image: '/gallery/event-2.jpeg',
    title: 'Workshop Session',
    description: 'Hands-on learning with Microsoft technologies',
    category: 'workshop'
  },
  {
    id: 3,
    image: '/gallery/event-3.jpeg',
    title: 'Team Collaboration',
    description: 'MLSA members working together on projects',
    category: 'team'
  },
  {
    id: 4,
    image: '/gallery/event-4.jpeg',
    title: 'Tech Talk',
    description: 'Knowledge sharing session by industry experts',
    category: 'talk'
  },
  {
    id: 5,
    image: '/gallery/event-5.jpeg',
    title: 'Hackathon',
    description: 'Students building innovative solutions',
    category: 'hackathon'
  },
  {
    id: 6,
    image: '/gallery/event-6.jpeg',
    title: 'Community Meetup',
    description: 'Networking and connecting with fellow ambassadors',
    category: 'networking'
  },
  {
    id: 7,
    image: '/gallery/event-7.jpeg',
    title: 'INTERVIEWS',
    description: 'Capturing moments from candidate interviews and selections',
    category: 'interviews'
  },
  {
    id: 8,
    image: '/gallery/event-8.jpeg',
    title: 'Coding Session',
    description: 'Live coding and pair programming activities',
    category: 'workshop'
  },
  {
    id: 9,
    image: '/gallery/event-9.jpeg',
    title: 'Guest Lecture',
    description: 'Learning from Microsoft engineers and MVPs',
    category: 'talk'
  },
  {
    id: 10,
    image: '/gallery/event-10.jpeg',
    title: 'TEAM',
    description: 'Our amazing MLSA team members in action',
    category: 'team'
  },
  {
    id: 11,
    image: '/gallery/event-11.jpeg',
    title: 'COMMUNITY',
    description: 'Building connections and growing together',
    category: 'community'
  }
];

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (item, index) => {
    setSelectedImage(item);
    setCurrentIndex(index);
  };

  const navigateImage = (direction) => {
    const newIndex = direction === 'next' 
      ? (currentIndex + 1) % localGallery.length
      : (currentIndex - 1 + localGallery.length) % localGallery.length;
    setCurrentIndex(newIndex);
    setSelectedImage(localGallery[newIndex]);
  };

  return (
    <div className="gallery-page">
      {/* Hero */}
      <section className="gallery-hero">
        <div className="hero-background">
          <div className="hero-gradient" />
        </div>
        <div className="container">
          <motion.div
            className="gallery-hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="page-tag">Memories</span>
            <h1>Our Gallery</h1>
            <p>Glimpses from our workshops, hackathons, and community events</p>
          </motion.div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="gallery-section section">
        <div className="container">
          <motion.div className="gallery-masonry" layout>
            <AnimatePresence>
              {localGallery.map((item, index) => (
                <motion.div
                  key={item.id}
                  className="gallery-item-full"
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => openLightbox(item, index)}
                >
                  <LazyLoadImage
                    src={item.image}
                    alt={item.title}
                    effect="blur"
                    width="100%"
                    height="100%"
                    placeholderSrc="/gallery/placeholder.jpg"
                  />
                  <div className="gallery-item-overlay">
                    <h4>{item.title}</h4>
                    <p>{item.description}</p>
                    <span className="item-category">{item.category}</span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Lightbox with Navigation */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              className="lightbox-content"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className="lightbox-close"
                onClick={() => setSelectedImage(null)}
                aria-label="Close"
              >
                <HiX />
              </button>
              
              <button 
                className="lightbox-nav lightbox-prev"
                onClick={() => navigateImage('prev')}
                aria-label="Previous image"
              >
                <HiChevronLeft />
              </button>
              
              <img src={selectedImage.image} alt={selectedImage.title} />
              
              <button 
                className="lightbox-nav lightbox-next"
                onClick={() => navigateImage('next')}
                aria-label="Next image"
              >
                <HiChevronRight />
              </button>
              
              <div className="lightbox-info">
                <h3>{selectedImage.title}</h3>
                <p>{selectedImage.description}</p>
                <span className="lightbox-counter">
                  {currentIndex + 1} / {localGallery.length}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;
