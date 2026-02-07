import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { HiX, HiAcademicCap, HiSparkles, HiArrowRight } from 'react-icons/hi';
import './ActivityPopup.css';

const ActivityPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Show popup only on home page
    if (location.pathname === '/') {
      // Show popup after a short delay
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500);
      
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [location.pathname]);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleExplore = () => {
    setIsVisible(false);
    navigate('/activity');
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="popup-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
        >
          {/* Popup */}
          <motion.div
            className="activity-popup"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="popup-close" onClick={handleClose}>
              <HiX />
            </button>
            
            <div className="popup-icon">
              <HiAcademicCap />
              <span className="sparkle sparkle-1"><HiSparkles /></span>
              <span className="sparkle sparkle-2"><HiSparkles /></span>
            </div>
            
            <div className="popup-content">
              <span className="popup-badge">New Activity!</span>
              <h2>Microsoft Learn Modules</h2>
              <p>
                Explore curated college-level courses and learning paths from 
                Microsoft Learn. Boost your skills in Cloud, AI, Development, and more!
              </p>
              
              <div className="popup-features">
                <div className="feature-item">
                  <span className="feature-icon">🎓</span>
                  <span>Free Certifications</span>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">📚</span>
                  <span>Hands-on Labs</span>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">🏆</span>
                  <span>Earn Badges</span>
                </div>
              </div>
              
              <div className="popup-actions">
                <button className="btn btn-secondary" onClick={handleClose}>
                  Maybe Later
                </button>
                <button className="btn btn-primary" onClick={handleExplore}>
                  Explore Modules
                  <HiArrowRight />
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ActivityPopup;
