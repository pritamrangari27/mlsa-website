import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { HiSpeakerphone, HiChevronRight } from 'react-icons/hi';
import { fetchAnnouncements } from '../../services/api';
import './Announcements.css';

const getPriorityColor = (priority) => {
  switch (priority) {
    case 'high': return 'var(--ms-orange)';
    case 'medium': return 'var(--ms-blue)';
    default: return 'var(--ms-green)';
  }
};

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    const loadAnnouncements = async () => {
      try {
        const response = await fetchAnnouncements(4);
        setAnnouncements(response.data);
      } catch (error) {
        console.error('Failed to fetch announcements:', error);
      } finally {
        setLoading(false);
      }
    };
    loadAnnouncements();
  }, []);

  return (
    <section className="announcements section" ref={ref}>
      <div className="announcements-bg">
        <div className="announcements-pattern" />
      </div>

      <div className="container">
        <motion.div
          className="announcements-header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-tag">Updates</span>
          <h2 className="section-title">Latest Announcements</h2>
          <p className="section-subtitle">
            Stay updated with the latest news and updates from MLSA AISSMS IOIT
          </p>
        </motion.div>

        <div className="announcements-container">
          {loading ? (
            <div className="announcements-list">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="announcement-item-skeleton glass-card">
                  <div className="skeleton" style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
                  <div style={{ flex: 1 }}>
                    <div className="skeleton skeleton-title" />
                    <div className="skeleton skeleton-text" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="announcements-list">
              {announcements.map((announcement, index) => (
                <motion.div
                  key={announcement.id}
                  className="announcement-item glass-card"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ x: 10 }}
                >
                  <div 
                    className="announcement-icon"
                    style={{ background: getPriorityColor(announcement.priority) }}
                  >
                    <HiSpeakerphone />
                  </div>

                  <div className="announcement-content">
                    <div className="announcement-meta">
                      <span className="announcement-date">
                        {new Date(announcement.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </span>
                      <span className="announcement-author">by {announcement.author}</span>
                    </div>
                    <h3 className="announcement-title">{announcement.title}</h3>
                    <p className="announcement-text">{announcement.content}</p>
                  </div>

                  <HiChevronRight className="announcement-arrow" />
                </motion.div>
              ))}
            </div>
          )}

          <motion.div
            className="announcements-sidebar"
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="sidebar-card glass-card">
              <div className="sidebar-icon">
                <HiSpeakerphone />
              </div>
              <h3>Stay Connected</h3>
              <p>Join our community channels to never miss an update</p>
              <div className="sidebar-links">
                <a href="https://discord.gg" target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                  Join Discord
                </a>
                <a href="https://t.me" target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                  Telegram Group
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Announcements;
