import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { HiArrowRight, HiX } from 'react-icons/hi';
import 'react-lazy-load-image-component/src/effects/blur.css';
import './GalleryPreview.css';

// Local gallery preview images
const galleryPreview = [
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
    description: 'MLSA members working together',
    category: 'team'
  },
  {
    id: 4,
    image: '/gallery/event-4.jpeg',
    title: 'Tech Talk',
    description: 'Knowledge sharing session',
    category: 'talk'
  },
  {
    id: 5,
    image: '/gallery/event-5.jpeg',
    title: 'Hackathon',
    description: 'Building innovative solutions',
    category: 'hackathon'
  },
  {
    id: 6,
    image: '/gallery/event-6.jpeg',
    title: 'Community Meetup',
    description: 'Networking with fellow ambassadors',
    category: 'networking'
  }
];

const GalleryPreview = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="gallery-preview section" ref={ref}>
      <div className="container">
        <motion.div
          className="gallery-header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-tag">Memories</span>
          <h2 className="section-title">Our Gallery</h2>
          <p className="section-subtitle">
            Glimpses from our workshops, hackathons, and community events
          </p>
        </motion.div>

        <div className="gallery-grid">
          {galleryPreview.map((item, index) => (
            <motion.div
              key={item.id}
              className="gallery-item"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => setSelectedImage(item)}
            >
              <LazyLoadImage
                src={item.image}
                alt={item.title}
                effect="blur"
                width="100%"
                height="100%"
              />
              <div className="gallery-overlay">
                <h4>{item.title}</h4>
                <p>{item.description}</p>
                <span className="gallery-category">{item.category}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="gallery-cta"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
        >
          <Link to="/gallery" className="btn btn-primary">
            View Full Gallery
            <HiArrowRight />
          </Link>
        </motion.div>
      </div>

      {/* Lightbox */}
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
                aria-label="Close lightbox"
              >
                <HiX />
              </button>
              <img src={selectedImage.image} alt={selectedImage.title} />
              <div className="lightbox-info">
                <h3>{selectedImage.title}</h3>
                <p>{selectedImage.description}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default GalleryPreview;
