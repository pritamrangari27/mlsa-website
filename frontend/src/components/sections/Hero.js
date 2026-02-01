import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiArrowRight, HiPlay, HiSparkles } from 'react-icons/hi';
import './Hero.css';

const Hero = () => {
  const floatingVariants = {
    animate: {
      y: [0, -20, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <section className="hero">
      {/* Animated Background */}
      <div className="hero-background">
        <div className="gradient-orb gradient-orb-1" />
        <div className="gradient-orb gradient-orb-2" />
        <div className="gradient-orb gradient-orb-3" />
        <div className="grid-pattern" />
      </div>

      <div className="hero-container">
        <div className="hero-content">
          <motion.div
            className="hero-badge"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <HiSparkles />
            <span>Microsoft Learn Student Ambassadors</span>
          </motion.div>

          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Empowering Students
            <br />
            <span className="gradient-text">Through Technology</span>
          </motion.h1>

          <motion.p
            className="hero-description"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Join the vibrant community at AISSMS IOIT where we learn, grow, 
            and innovate together. Discover the power of Microsoft technologies 
            through hands-on workshops, hackathons, and collaborative projects.
          </motion.p>

          <motion.div
            className="hero-buttons"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Link to="/register" className="btn btn-primary btn-lg">
              Join MLSA
              <HiArrowRight />
            </Link>
            <Link to="/events" className="btn btn-secondary btn-lg">
              <HiPlay />
              Explore Events
            </Link>
          </motion.div>

          <motion.div
            className="hero-stats-mini"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="stat-mini">
              <span className="stat-number">500+</span>
              <span className="stat-label">Members</span>
            </div>
            <div className="stat-divider" />
            <div className="stat-mini">
              <span className="stat-number">15+</span>
              <span className="stat-label">Events</span>
            </div>
            <div className="stat-divider" />
            <div className="stat-mini">
              <span className="stat-number">10+</span>
              <span className="stat-label">Workshops</span>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="hero-visual"
          variants={floatingVariants}
          animate="animate"
        >
          <div className="hero-image-container">
            <div className="hero-image-glow" />
            <div className="hero-3d-card">
              <div className="card-content">
                <div className="microsoft-logo">
                  <svg viewBox="0 0 100 100" fill="none">
                    <rect x="5" y="5" width="40" height="40" fill="#f25022"/>
                    <rect x="55" y="5" width="40" height="40" fill="#7fba00"/>
                    <rect x="5" y="55" width="40" height="40" fill="#00a4ef"/>
                    <rect x="55" y="55" width="40" height="40" fill="#ffb900"/>
                  </svg>
                </div>
                <h3>Learn. Connect. Grow.</h3>
                <p>Your journey starts here</p>
              </div>
            </div>

            {/* Floating Elements */}
            <motion.div
              className="floating-element floating-1"
              animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg" alt="Azure" />
            </motion.div>

            <motion.div
              className="floating-element floating-2"
              animate={{ y: [0, 15, 0], rotate: [0, -5, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
            >
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="React" />
            </motion.div>

            <motion.div
              className="floating-element floating-3"
              animate={{ y: [0, -10, 0], x: [0, 10, 0] }}
              transition={{ duration: 6, repeat: Infinity }}
            >
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" alt="Python" />
            </motion.div>

            <motion.div
              className="floating-element floating-4"
              animate={{ y: [0, 12, 0], x: [0, -8, 0] }}
              transition={{ duration: 4.5, repeat: Infinity }}
            >
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" alt="GitHub" />
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <div className="scroll-mouse">
          <div className="scroll-wheel" />
        </div>
        <span>Scroll to explore</span>
      </motion.div>
    </section>
  );
};

export default Hero;
