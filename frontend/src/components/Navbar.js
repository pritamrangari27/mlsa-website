import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { 
  HiMenuAlt3, 
  HiX, 
  HiSun, 
  HiMoon,
  HiHome,
  HiCalendar,
  HiUserGroup,
  HiPhotograph,
  HiBookOpen,
  HiClipboardList,
  HiMail
} from 'react-icons/hi';
import './Navbar.css';

const navLinks = [
  { path: '/', label: 'Home', icon: HiHome },
  { path: '/events', label: 'Events', icon: HiCalendar },
  { path: '/team', label: 'Team', icon: HiUserGroup },
  { path: '/gallery', label: 'Gallery', icon: HiPhotograph },
  { path: '/resources', label: 'Resources', icon: HiBookOpen },
  { path: '/contact', label: 'Contact', icon: HiMail },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  return (
    <>
      <motion.nav
        className={`navbar ${scrolled ? 'scrolled' : ''}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="navbar-container">
          <Link to="/" className="navbar-logo">
            <motion.div
              className="logo-icon"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="5" y="5" width="40" height="40" fill="#f25022"/>
                <rect x="55" y="5" width="40" height="40" fill="#7fba00"/>
                <rect x="5" y="55" width="40" height="40" fill="#00a4ef"/>
                <rect x="55" y="55" width="40" height="40" fill="#ffb900"/>
              </svg>
            </motion.div>
            <div className="logo-text">
              <span className="logo-title">MLSA</span>
              <span className="logo-subtitle">AISSMS IOIT</span>
            </div>
          </Link>

          <ul className="navbar-links">
            {navLinks.map((link) => (
              <li key={link.path}>
                <NavLink 
                  to={link.path} 
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="navbar-actions">
            <motion.button
              className="theme-toggle"
              onClick={toggleTheme}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={isDark ? 'moon' : 'sun'}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {isDark ? <HiSun size={22} /> : <HiMoon size={22} />}
                </motion.div>
              </AnimatePresence>
            </motion.button>

            <Link to="/register" className="btn btn-primary navbar-cta">
              Join Us
            </Link>

            <button 
              className="mobile-menu-btn"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
              aria-expanded={isOpen}
            >
              {isOpen ? <HiX size={28} /> : <HiMenuAlt3 size={28} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="mobile-menu-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              className="mobile-menu"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              <div className="mobile-menu-header">
                <span className="mobile-menu-title">Menu</span>
                <button 
                  className="mobile-close-btn"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close menu"
                >
                  <HiX size={24} />
                </button>
              </div>

              <nav className="mobile-nav">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <NavLink
                      to={link.path}
                      className={({ isActive }) => 
                        `mobile-nav-link ${isActive ? 'active' : ''}`
                      }
                    >
                      <link.icon size={24} />
                      <span>{link.label}</span>
                    </NavLink>
                  </motion.div>
                ))}
              </nav>

              <div className="mobile-menu-footer">
                <Link 
                  to="/register" 
                  className="btn btn-primary mobile-cta"
                >
                  <HiClipboardList size={20} />
                  Join MLSA
                </Link>

                <button 
                  className="mobile-theme-toggle"
                  onClick={toggleTheme}
                >
                  {isDark ? <HiSun size={20} /> : <HiMoon size={20} />}
                  <span>{isDark ? 'Light Mode' : 'Dark Mode'}</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
