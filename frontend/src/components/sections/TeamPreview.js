import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { HiArrowRight } from 'react-icons/hi';
import { fetchTeam } from '../../services/api';
import 'react-lazy-load-image-component/src/effects/blur.css';
import './TeamPreview.css';

const TeamCard = ({ member, index }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      className="team-card-wrapper"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div 
        className={`team-card ${isFlipped ? 'flipped' : ''}`}
        onMouseEnter={() => setIsFlipped(true)}
        onMouseLeave={() => setIsFlipped(false)}
      >
        {/* Front */}
        <div className="card-face card-front glass-card">
          <div className="member-image">
            <LazyLoadImage
              src={member.image}
              alt={member.name}
              effect="blur"
              width="120"
              height="120"
            />
          </div>
          <h3 className="member-name">{member.name}</h3>
          <p className="member-role">{member.role}</p>
        </div>

        {/* Back */}
        <div className="card-face card-back glass-card">
          <p className="member-bio">{member.bio}</p>
        </div>
      </div>
    </motion.div>
  );
};

const TeamPreview = () => {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    const loadTeam = async () => {
      try {
        const response = await fetchTeam();
        setTeam(response.data.slice(0, 4));
      } catch (error) {
        console.error('Failed to fetch team:', error);
      } finally {
        setLoading(false);
      }
    };
    loadTeam();
  }, []);

  return (
    <section className="team-preview section" ref={ref}>
      <div className="container">
        <motion.div
          className="team-header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-tag">Our Team</span>
          <h2 className="section-title">Meet the Team</h2>
          <p className="section-subtitle">
            Passionate leaders driving innovation and learning in our community
          </p>
        </motion.div>

        {loading ? (
          <div className="team-grid">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="team-card-skeleton glass-card">
                <div className="skeleton skeleton-avatar" style={{ margin: '0 auto 1rem' }} />
                <div className="skeleton skeleton-title" style={{ width: '60%', margin: '0 auto 0.5rem' }} />
                <div className="skeleton skeleton-text" style={{ width: '40%', margin: '0 auto' }} />
              </div>
            ))}
          </div>
        ) : (
          <div className="team-grid">
            {team.map((member, index) => (
              <TeamCard key={member.id} member={member} index={index} />
            ))}
          </div>
        )}

        <motion.div
          className="team-cta"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
        >
          <Link to="/team" className="btn btn-primary">
            View Full Team
            <HiArrowRight />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default TeamPreview;
