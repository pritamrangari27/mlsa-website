import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { HiArrowRight, HiUserAdd, HiSparkles } from 'react-icons/hi';
import './CTA.css';

const CTA = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <section className="cta section" ref={ref}>
      <div className="cta-background">
        <div className="cta-gradient" />
        <div className="cta-pattern" />
        <div className="cta-glow cta-glow-1" />
        <div className="cta-glow cta-glow-2" />
      </div>

      <div className="container">
        <motion.div
          className="cta-content"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="cta-badge"
            initial={{ scale: 0 }}
            animate={inView ? { scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <HiSparkles />
            <span>Join the Community</span>
          </motion.div>

          <h2 className="cta-title">
            Ready to Start Your
            <br />
            <span className="gradient-text">Tech Journey?</span>
          </h2>

          <p className="cta-description">
            Join Microsoft Learn Student Ambassadors at AISSMS IOIT and unlock 
            access to exclusive workshops, certifications, mentorship, and a 
            community of passionate learners.
          </p>

          <div className="cta-features">
            <div className="cta-feature">
              <span className="feature-check">✓</span>
              <span>Free Microsoft Certifications</span>
            </div>
            <div className="cta-feature">
              <span className="feature-check">✓</span>
              <span>Exclusive Workshops</span>
            </div>
            <div className="cta-feature">
              <span className="feature-check">✓</span>
              <span>Industry Mentorship</span>
            </div>
            <div className="cta-feature">
              <span className="feature-check">✓</span>
              <span>Global Network</span>
            </div>
          </div>

          <div className="cta-buttons">
            <Link to="/register" className="btn btn-primary btn-lg">
              <HiUserAdd />
              Join MLSA Now
            </Link>
            <Link to="/contact" className="btn btn-secondary btn-lg">
              Get in Touch
              <HiArrowRight />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
