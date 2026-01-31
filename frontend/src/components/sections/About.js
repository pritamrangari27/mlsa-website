import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { HiLightBulb, HiUserGroup, HiAcademicCap, HiGlobe } from 'react-icons/hi';
import './About.css';

const features = [
  {
    icon: HiLightBulb,
    title: 'Innovation',
    description: 'Learn cutting-edge technologies and build innovative solutions that make a difference.',
  },
  {
    icon: HiUserGroup,
    title: 'Community',
    description: 'Join a vibrant community of tech enthusiasts, mentors, and industry professionals.',
  },
  {
    icon: HiAcademicCap,
    title: 'Learning',
    description: 'Access exclusive resources, certifications, and hands-on workshops to accelerate your growth.',
  },
  {
    icon: HiGlobe,
    title: 'Global Network',
    description: 'Connect with MLSA communities worldwide and collaborate on global initiatives.',
  },
];

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section className="about section" id="about" ref={ref}>
      <div className="container">
        <motion.div
          className="about-header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-tag">About Us</span>
          <h2 className="section-title">What is MLSA?</h2>
          <p className="section-subtitle">
            Microsoft Learn Student Ambassadors are a global group of campus leaders 
            who are eager to help fellow students, create robust tech communities, 
            and develop technical and career skills for the future.
          </p>
        </motion.div>

        <div className="about-content">
          <motion.div
            className="about-image"
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="image-frame">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=500&fit=crop"
                alt="MLSA Team Collaboration"
                loading="lazy"
              />
              <div className="image-overlay" />
            </div>
            <div className="floating-card card-1">
              <span className="card-number">500+</span>
              <span className="card-label">Active Members</span>
            </div>
            <div className="floating-card card-2">
              <span className="card-emoji">🎯</span>
              <span className="card-text">Learning Together</span>
            </div>
          </motion.div>

          <motion.div
            className="about-features"
            variants={containerVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="feature-card glass-card"
                variants={itemVariants}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <div className="feature-icon">
                  <feature.icon />
                </div>
                <div className="feature-content">
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
