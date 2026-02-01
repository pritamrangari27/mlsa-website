import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  HiLocationMarker, 
  HiMail, 
  HiPhone
} from 'react-icons/hi';
import { 
  FaLinkedin, 
  FaGithub, 
  FaTwitter, 
  FaInstagram, 
  FaDiscord 
} from 'react-icons/fa';
import './Footer.css';

const footerLinks = {
  quickLinks: [
    { label: 'Home', path: '/' },
    { label: 'Events', path: '/events' },
    { label: 'Team', path: '/team' },
    { label: 'Gallery', path: '/gallery' },
  ],
  resources: [
    { label: 'Resources', path: '/resources' },
    { label: 'Register', path: '/register' },
    { label: 'Contact', path: '/contact' },
    { label: 'Microsoft Learn', path: 'https://learn.microsoft.com', external: true },
  ],
  connect: [
    { label: 'LinkedIn', icon: FaLinkedin, url: 'https://linkedin.com' },
    { label: 'GitHub', icon: FaGithub, url: 'https://github.com' },
    { label: 'Twitter', icon: FaTwitter, url: 'https://twitter.com' },
    { label: 'Instagram', icon: FaInstagram, url: 'https://instagram.com' },
    { label: 'Discord', icon: FaDiscord, url: 'https://discord.gg' },
  ],
};

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-glow" />
      
      <div className="footer-container">
        <div className="footer-main">
          {/* Brand Section */}
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <div className="footer-logo-icon">
                <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="5" y="5" width="40" height="40" fill="#f25022"/>
                  <rect x="55" y="5" width="40" height="40" fill="#7fba00"/>
                  <rect x="5" y="55" width="40" height="40" fill="#00a4ef"/>
                  <rect x="55" y="55" width="40" height="40" fill="#ffb900"/>
                </svg>
              </div>
              <div className="footer-logo-text">
                <span className="footer-logo-title">MLSA AISSMS IOIT</span>
                <span className="footer-logo-subtitle">Microsoft Learn Student Ambassadors</span>
              </div>
            </Link>
            <p className="footer-description">
              Empowering students with cutting-edge technology skills through workshops, 
              hackathons, and hands-on learning experiences.
            </p>
            
            <div className="footer-contact">
              <div className="contact-item">
                <HiLocationMarker />
                <span>AISSMS IOIT, Kennedy Road, Pune - 411001.</span>
              </div>
              <div className="contact-item">
                <HiMail />
                <a href="mailto:ioitmlsa@gmail.com">ioitmlsa@gmail.com</a>
              </div>
              <div className="contact-item">
                <HiPhone />
                <a href="tel:+917385668637">+91 73856 68637</a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-links-section">
            <h4 className="footer-section-title">Quick Links</h4>
            <ul className="footer-links">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="footer-links-section">
            <h4 className="footer-section-title">Resources</h4>
            <ul className="footer-links">
              {footerLinks.resources.map((link) => (
                <li key={link.path}>
                  {link.external ? (
                    <a href={link.path} target="_blank" rel="noopener noreferrer">
                      {link.label}
                    </a>
                  ) : (
                    <Link to={link.path}>{link.label}</Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div className="footer-links-section">
            <h4 className="footer-section-title">Connect With Us</h4>
            <div className="footer-social">
              {footerLinks.connect.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.label}
                >
                  <social.icon />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <p className="copyright">
            © {currentYear} MLSA AISSMS IOIT. All rights reserved.
          </p>
          <p className="made-with">
            Made with Pritam Rangari
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
