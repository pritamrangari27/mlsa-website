import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { HiCalendar, HiLocationMarker, HiClock, HiArrowRight, HiUsers } from 'react-icons/hi';
import 'react-lazy-load-image-component/src/effects/blur.css';
import './EventsPreview.css';

// Local events data for preview
const localEvents = [
  {
    id: 1,
    title: 'MS QUEST Quiz',
    description: 'An exciting technical quiz competition focused on AI and Developer tools.',
    date: '2025-02-20',
    time: '10:30 AM - 12:30 PM',
    venue: 'Room 605, AISSMS IOIT',
    type: 'quiz',
    image: '/gallery/event-1.jpeg',
    participants: 49,
    status: 'completed'
  },
  {
    id: 2,
    title: 'MS SLIDEBATTLE',
    description: 'A creative presentation making competition showcasing impactful visual storytelling.',
    date: '2025-02-19',
    time: '10:00 AM - 10:00 PM',
    venue: 'Online',
    type: 'competition',
    image: '/gallery/event-2.jpeg',
    participants: 47,
    status: 'completed'
  },
  {
    id: 3,
    title: 'MS SLIDEWAR',
    description: 'An intense presentation battle encouraging creative expression through visual storytelling.',
    date: '2025-10-03',
    time: '10:00 AM - 10:00 PM',
    venue: 'Online',
    type: 'competition',
    image: '/gallery/event-3.jpeg',
    participants: 47,
    status: 'completed'
  }
];

const EventCard = ({ event, index }) => {
  return (
    <motion.div
      className="event-card glass-card"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -10 }}
    >
      <div className="event-image">
        <LazyLoadImage
          src={event.image}
          alt={event.title}
          effect="blur"
          width="100%"
          height="200"
        />
        <span className={`event-type ${event.type}`}>{event.type}</span>
        {event.status === 'completed' && (
          <span className="event-completed-badge">Completed</span>
        )}
      </div>

      <div className="event-content">
        <h3 className="event-title">{event.title}</h3>
        <p className="event-description">{event.description}</p>

        <div className="event-details">
          <div className="detail-item">
            <HiCalendar />
            <span>{new Date(event.date).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            })}</span>
          </div>
          <div className="detail-item">
            <HiClock />
            <span>{event.time}</span>
          </div>
          <div className="detail-item">
            <HiLocationMarker />
            <span>{event.venue}</span>
          </div>
        </div>

        <div className="event-registration">
          <div className="registration-info">
            <HiUsers />
            <span>{event.participants} Participants</span>
          </div>
        </div>

        <Link to={`/events`} className="btn btn-secondary event-btn">
          View Details
          <HiArrowRight />
        </Link>
      </div>
    </motion.div>
  );
};

const EventsPreview = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="events-preview section" ref={ref}>
      <div className="container">
        <motion.div
          className="events-header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-tag">Events</span>
          <h2 className="section-title">Our Events</h2>
          <p className="section-subtitle">
            Join us for exciting workshops, competitions, and tech talks
          </p>
        </motion.div>

        <div className="events-grid">
          {localEvents.map((event, index) => (
            <EventCard key={event.id} event={event} index={index} />
          ))}
        </div>

        <motion.div
          className="events-cta"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
        >
          <Link to="/events" className="btn btn-primary">
            View All Events
            <HiArrowRight />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default EventsPreview;
