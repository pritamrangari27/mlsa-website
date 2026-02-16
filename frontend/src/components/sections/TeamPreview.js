import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { HiArrowRight } from 'react-icons/hi';
import 'react-lazy-load-image-component/src/effects/blur.css';
import './TeamPreview.css';

// Featured team members for homepage preview
const featuredTeam = [
  {
    id: 1,
    name: 'Omkar Avasare',
    role: 'Club Advisor',
    image: '/team/Omkar Avasare.jpg',
    bio: 'Guiding and mentoring students in their tech journey with Microsoft technologies.'
  },
  {
    id: 2,
    name: 'Prathmesh Dawkar',
    role: 'Club Advisor',
    image: '/team/Prathmesh Dawkar.jpg',
    bio: 'Supporting the community with technical expertise and leadership guidance.'
  },
  {
    id: 3,
    name: 'Niraj Shevade',
    role: 'President',
    image: '/team/Niraj-Shevade.jpg',
    bio: 'Leading the MLSA community and driving innovation and learning initiatives.'
  }
];

const TeamCard = ({ member, index }) => {
  return (
    <motion.div
      className="team-card-wrapper"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="team-card glass-card">
        <div className="card-content">
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
        <div className="member-bio-overlay">
          <p className="member-bio">{member.bio}</p>
        </div>
      </div>
    </motion.div>
  );
};

const TeamPreview = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

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

        <div className="team-grid">
          {featuredTeam.map((member, index) => (
            <TeamCard key={member.id} member={member} index={index} />
          ))}
        </div>

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
