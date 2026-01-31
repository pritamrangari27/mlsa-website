import React from 'react';
import { motion } from 'framer-motion';
import { HiUser } from 'react-icons/hi';
import './Team.css';

// Team data organized by designation
const teamData = {
  advisors: {
    title: 'Club Advisors',
    members: [
      { id: 1, name: 'Omkar Avasare', role: 'Club Advisor', image: null },
      { id: 2, name: 'Prathamesh Dawkar', role: 'Club Advisor', image: null },
      { id: 3, name: 'Sandesh Shinde', role: 'Club Advisor', image: null },
    ]
  },
  leadership: {
    title: 'Leadership',
    members: [
      { id: 4, name: 'Niraj Shevade', role: 'President', image: null },
      { id: 5, name: 'Rushikesh Mundaware', role: 'Vice President', image: null },
    ]
  },
  eventTeam: {
    title: 'Event Team',
    members: [
      { id: 6, name: 'Arjun Malwankar', role: 'Event Head', image: null },
      { id: 7, name: 'Sumit Jadhav', role: 'Jt. Event Head', image: null },
    ]
  },
  techTeam: {
    title: 'Tech Team',
    members: [
      { id: 8, name: 'Kshitij Kumawat', role: 'Tech Head', image: null },
      { id: 9, name: 'Purva Patil', role: 'Jt. Tech Head', image: null },
      { id: 10, name: 'Tanishka Dahiphale', role: 'Tech Team', image: null },
      { id: 11, name: 'Bhumi Shinde', role: 'Tech Team', image: null },
    ]
  },
  mediaTeam: {
    title: 'Media Team',
    members: [
      { id: 12, name: 'Siddhesh Shah', role: 'Media Head', image: null },
      { id: 13, name: 'Sarvesh Hingankar', role: 'Jt. Media Head', image: null },
    ]
  },
  documentationTeam: {
    title: 'Documentation Team',
    members: [
      { id: 14, name: 'Parul Dhawale', role: 'Documentation Head', image: null },
      { id: 15, name: 'Vinit Phasge', role: 'Jt. Documentation Head', image: null },
    ]
  }
};

const MemberCard = ({ member, index }) => (
  <motion.div
    className="team-member-card glass-card"
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    whileHover={{ y: -10 }}
  >
    <div className="member-avatar">
      {member.image ? (
        <img src={member.image} alt={member.name} />
      ) : (
        <div className="avatar-placeholder">
          <HiUser />
        </div>
      )}
      <div className="avatar-glow" />
    </div>
    <h3 className="member-name">{member.name}</h3>
    <p className="member-role">{member.role}</p>
  </motion.div>
);

const TeamSection = ({ title, members }) => (
  <div className="team-category">
    <motion.h2 
      className="category-title"
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {title}
    </motion.h2>
    <div className={`team-grid ${members.length <= 2 ? 'team-grid-centered' : ''}`}>
      {members.map((member, index) => (
        <MemberCard key={member.id} member={member} index={index} />
      ))}
    </div>
  </div>
);

const Team = () => {
  return (
    <div className="team-page">
      {/* Hero */}
      <section className="team-hero">
        <div className="hero-background">
          <div className="hero-gradient" />
        </div>
        <div className="container">
          <motion.div
            className="team-hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="page-tag">Our Team</span>
            <h1>Meet the Team</h1>
            <p>Passionate leaders driving innovation and learning in our community</p>
          </motion.div>
        </div>
      </section>

      {/* Team Sections */}
      <section className="team-section section">
        <div className="container">
          <TeamSection title={teamData.advisors.title} members={teamData.advisors.members} />
          <TeamSection title={teamData.leadership.title} members={teamData.leadership.members} />
          <TeamSection title={teamData.eventTeam.title} members={teamData.eventTeam.members} />
          <TeamSection title={teamData.techTeam.title} members={teamData.techTeam.members} />
          <TeamSection title={teamData.mediaTeam.title} members={teamData.mediaTeam.members} />
          <TeamSection title={teamData.documentationTeam.title} members={teamData.documentationTeam.members} />
        </div>
      </section>

    </div>
  );
};

export default Team;
