import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { HiCalendar, HiLocationMarker, HiClock, HiUsers, HiArrowRight, HiStar } from 'react-icons/hi';
import toast from 'react-hot-toast';
import 'react-lazy-load-image-component/src/effects/blur.css';
import './Events.css';

// Local events data
const localEvents = [
  {
    id: 1,
    title: 'MS QUEST - The Ultimate Quiz Challenge',
    description: 'An exciting technical quiz competition focused on AI and Developer tools. Test your knowledge and compete with fellow tech enthusiasts in this ultimate challenge organized by MLSA Club.',
    date: '2025-02-20',
    time: '10:30 AM - 12:30 PM',
    venue: 'Room No. 605, 6th Floor, AISSMS IOIT',
    type: 'quiz',
    image: '/gallery/event-1.jpeg',
    participants: 49,
    entryFee: 'Free',
    status: 'completed',
    winners: [
      { position: '1st Place', name: 'Ayesha Shaikh' },
      { position: '2nd Place', name: 'Rudraksha Sunil Langde' },
      { position: '3rd Place', name: 'Abhijeet Yadgire' }
    ]
  },
  {
    id: 2,
    title: 'MS SLIDEBATTLE - Presentation Competition',
    description: 'A creative presentation making competition where participants showcase their ideas through impactful visual storytelling. Enhance your research skills and presentation techniques!',
    date: '2025-02-19',
    time: '10:00 AM - 10:00 PM',
    venue: 'Online',
    type: 'competition',
    image: '/gallery/event-2.jpeg',
    participants: 47,
    entryFee: 'Free',
    status: 'completed',
    winners: [
      { position: '1st Place', name: 'Sohan Valse' },
      { position: '2nd Place', name: 'Parul Dhawale' },
      { position: '3rd Place', name: 'Pranjal Dharkar' }
    ]
  },
  {
    id: 3,
    title: 'MS SLIDEWAR - Presentation Battle',
    description: 'An intense presentation making competition encouraging students to express their ideas creatively through impactful visual storytelling. Enhance your research skills, presentation techniques, and content curation abilities through this structured and competitive platform.',
    date: '2025-10-03',
    time: '10:00 AM - 10:00 PM',
    venue: 'Online',
    type: 'competition',
    image: '/gallery/event-3.jpeg',
    participants: 47,
    entryFee: 'Free',
    status: 'completed',
    winners: [
      { position: '1st Place', name: 'Sohan Valse' },
      { position: '2nd Place', name: 'Parul Dhawale' },
      { position: '3rd Place', name: 'Pranjal Dharkar' }
    ]
  }
];

const Events = () => {
  const handleRegister = (eventTitle) => {
    toast.success(`Registration opened for ${eventTitle}!`);
  };

  return (
    <div className="events-page">
      {/* Hero */}
      <section className="events-hero">
        <div className="hero-background">
          <div className="hero-gradient" />
          <div className="hero-pattern" />
        </div>
        <div className="container">
          <motion.div
            className="events-hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="page-tag">Events & Workshops</span>
            <h1>Our Events</h1>
            <p>Join us for exciting workshops, competitions, and tech talks</p>
          </motion.div>
        </div>
      </section>

      {/* Events List */}
      <section className="events-list section">
        <div className="container">
          <div className="events-grid-page">
            {localEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  className="event-card-full glass-card"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="event-image-full">
                    <LazyLoadImage
                      src={event.image}
                      alt={event.title}
                      effect="blur"
                      width="100%"
                      height="250"
                    />
                    <span className={`event-badge ${event.type}`}>
                      {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                    </span>
                    {event.status === 'completed' && (
                      <span className="event-status completed">Completed</span>
                    )}
                  </div>

                  <div className="event-content-full">
                    <h3>{event.title}</h3>
                    <p className="event-desc">{event.description}</p>

                    <div className="event-meta">
                      <div className="meta-item">
                        <HiCalendar />
                        <span>{new Date(event.date).toLocaleDateString('en-US', {
                          weekday: 'long',
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric'
                        })}</span>
                      </div>
                      <div className="meta-item">
                        <HiClock />
                        <span>{event.time}</span>
                      </div>
                      <div className="meta-item">
                        <HiLocationMarker />
                        <span>{event.venue}</span>
                      </div>
                      <div className="meta-item">
                        <HiUsers />
                        <span>{event.participants} Participants</span>
                      </div>
                    </div>

                    {/* Winners Section */}
                    {event.winners && event.winners.length > 0 && (
                      <div className="event-winners">
                        <h4><HiStar /> Winners</h4>
                        <div className="winners-list">
                          {event.winners.map((winner, idx) => (
                            <div key={idx} className={`winner-item position-${idx + 1}`}>
                              <span className="winner-position">{winner.position}</span>
                              <span className="winner-name">{winner.name}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="event-footer">
                      <span className="entry-fee">Entry: {event.entryFee}</span>
                      {event.status !== 'completed' && (
                        <button 
                          className="btn btn-primary"
                          onClick={() => handleRegister(event.title)}
                        >
                          Register Now
                          <HiArrowRight />
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
        </div>
      </section>
    </div>
  );
};

export default Events;
