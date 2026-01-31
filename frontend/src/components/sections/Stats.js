import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { HiUsers, HiCalendar, HiAcademicCap, HiCode, HiBadgeCheck, HiGlobe } from 'react-icons/hi';
import { fetchStats } from '../../services/api';
import './Stats.css';

const statConfig = [
  { key: 'members', label: 'Active Members', icon: HiUsers, suffix: '+' },
  { key: 'events', label: 'Events Hosted', icon: HiCalendar, suffix: '+' },
  { key: 'workshops', label: 'Workshops', icon: HiAcademicCap, suffix: '+' },
  { key: 'projects', label: 'Projects Built', icon: HiCode, suffix: '+' },
  { key: 'certifications', label: 'Certifications', icon: HiBadgeCheck, suffix: '+' },
  { key: 'countries', label: 'Community', icon: HiGlobe, suffix: '' },
];

const AnimatedCounter = ({ value, suffix, inView }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;

    const duration = 2000;
    const steps = 60;
    const stepValue = value / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += stepValue;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value, inView]);

  return (
    <span className="stat-value">
      {count.toLocaleString()}{suffix}
    </span>
  );
};

const Stats = () => {
  const [stats, setStats] = useState(null);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  useEffect(() => {
    const loadStats = async () => {
      try {
        const response = await fetchStats();
        setStats(response.data);
      } catch (error) {
        // Fallback data
        setStats({
          members: 500,
          events: 45,
          workshops: 32,
          projects: 28,
          certifications: 150,
          countries: 1,
        });
      }
    };
    loadStats();
  }, []);

  return (
    <section className="stats section" ref={ref}>
      <div className="stats-background">
        <div className="stats-gradient" />
      </div>

      <div className="container">
        <motion.div
          className="stats-header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-tag">Our Impact</span>
          <h2 className="section-title">Numbers That Speak</h2>
          <p className="section-subtitle">
            We're proud of what we've achieved together as a community
          </p>
        </motion.div>

        <div className="stats-grid">
          {statConfig.map((stat, index) => (
            <motion.div
              key={stat.key}
              className="stat-card glass-card"
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -10 }}
            >
              <div className="stat-icon">
                <stat.icon />
              </div>
              {stats && (
                <AnimatedCounter
                  value={stats[stat.key]}
                  suffix={stat.suffix}
                  inView={inView}
                />
              )}
              <span className="stat-label">{stat.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
