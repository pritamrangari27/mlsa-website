import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { HiUser, HiMail, HiChat, HiPaperAirplane, HiLocationMarker, HiPhone, HiClock } from 'react-icons/hi';
import { FaLinkedin, FaGithub, FaTwitter, FaInstagram, FaDiscord } from 'react-icons/fa';
import { submitContact } from '../services/api';
import toast from 'react-hot-toast';
import './Contact.css';

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await submitContact(data);
      toast.success('Message sent successfully! We\'ll get back to you soon.');
      reset();
    } catch (error) {
      toast.error(error.message || 'Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-page">
      {/* Hero */}
      <section className="contact-hero">
        <div className="hero-background">
          <div className="hero-gradient" />
        </div>
        <div className="container">
          <motion.div
            className="contact-hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="page-tag">Get in Touch</span>
            <h1>Contact Us</h1>
            <p>Have questions? We'd love to hear from you</p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section section">
        <div className="container">
          <div className="contact-grid">
            {/* Contact Info */}
            <motion.div
              className="contact-info"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2>Let's Connect</h2>
              <p>
                Whether you have a question about events, membership, partnerships, 
                or anything else, our team is ready to answer all your questions.
              </p>

              <div className="contact-details">
                <div className="contact-item">
                  <div className="contact-icon">
                    <HiLocationMarker />
                  </div>
                  <div>
                    <h4>Location</h4>
                    <p>AISSMS IOIT, Kennedy Road,<br />Near RTO, Pune - 411001</p>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-icon">
                    <HiMail />
                  </div>
                  <div>
                    <h4>Email</h4>
                    <a href="mailto:ioitmlsa@gmail.com">ioitmlsa@gmail.com</a>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-icon">
                    <HiPhone />
                  </div>
                  <div>
                    <h4>Phone</h4>
                    <a href="tel:+917385668637">+91 73856 68637</a>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-icon">
                    <HiClock />
                  </div>
                  <div>
                    <h4>Office Hours</h4>
                    <p>Mon - Fri: 10:00 AM - 5:00 PM</p>
                  </div>
                </div>
              </div>

              <div className="social-links">
                <h4>Follow Us</h4>
                <div className="social-icons">
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                    <FaLinkedin />
                  </a>
                  <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                    <FaGithub />
                  </a>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                    <FaTwitter />
                  </a>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                    <FaInstagram />
                  </a>
                  <a href="https://discord.gg" target="_blank" rel="noopener noreferrer" aria-label="Discord">
                    <FaDiscord />
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              className="contact-form-container glass-card"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3>Send us a Message</h3>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                  <label className="form-label">
                    <HiUser />
                    Your Name
                  </label>
                  <input
                    type="text"
                    className={`form-input ${errors.name ? 'error' : ''}`}
                    placeholder="Enter your name"
                    {...register('name', {
                      required: 'Name is required',
                      minLength: { value: 2, message: 'Name must be at least 2 characters' }
                    })}
                  />
                  {errors.name && (
                    <span className="form-error">{errors.name.message}</span>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <HiMail />
                    Email Address
                  </label>
                  <input
                    type="email"
                    className={`form-input ${errors.email ? 'error' : ''}`}
                    placeholder="Enter your email"
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address'
                      }
                    })}
                  />
                  {errors.email && (
                    <span className="form-error">{errors.email.message}</span>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <HiChat />
                    Subject
                  </label>
                  <input
                    type="text"
                    className={`form-input ${errors.subject ? 'error' : ''}`}
                    placeholder="What's this about?"
                    {...register('subject', {
                      required: 'Subject is required',
                      minLength: { value: 5, message: 'Subject must be at least 5 characters' }
                    })}
                  />
                  {errors.subject && (
                    <span className="form-error">{errors.subject.message}</span>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label">Message</label>
                  <textarea
                    className={`form-textarea ${errors.message ? 'error' : ''}`}
                    placeholder="Your message..."
                    rows="5"
                    {...register('message', {
                      required: 'Message is required',
                      minLength: { value: 10, message: 'Message must be at least 10 characters' }
                    })}
                  />
                  {errors.message && (
                    <span className="form-error">{errors.message.message}</span>
                  )}
                </div>

                <button 
                  type="submit" 
                  className="btn btn-primary submit-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    'Sending...'
                  ) : (
                    <>
                      <HiPaperAirplane />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="map-section">
        <iframe
          title="AISSMS IOIT Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3783.3606927823064!2d73.86503831491035!3d18.51574298740077!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c0416ee3c9e7%3A0x7c7f6c37ec80e0a4!2sAISSMS%20Institute%20of%20Information%20Technology!5e0!3m2!1sen!2sin!4v1640000000000!5m2!1sen!2sin"
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </section>
    </div>
  );
};

export default Contact;
