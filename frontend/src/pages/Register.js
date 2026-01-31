import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { HiUser, HiMail, HiPhone, HiAcademicCap, HiSparkles, HiCheck } from 'react-icons/hi';
import { submitRegistration } from '../services/api';
import toast from 'react-hot-toast';
import './Register.css';

const interests = [
  'Cloud Computing',
  'Web Development',
  'Mobile Development',
  'AI/ML',
  'Data Science',
  'Cybersecurity',
  'DevOps',
  'UI/UX Design',
];

const departments = [
  'Computer Science',
  'Information Technology',
  'Electronics & Telecommunication',
  'Mechanical Engineering',
  'Civil Engineering',
  'Other',
];

const Register = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await submitRegistration(data);
      setIsSuccess(true);
      toast.success('Registration successful! Welcome to MLSA!');
      reset();
    } catch (error) {
      toast.error(error.message || 'Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="register-page">
        <section className="register-hero">
          <div className="hero-gradient" />
        </section>
        <section className="success-section section">
          <div className="container">
            <motion.div
              className="success-card glass-card"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="success-icon">
                <HiCheck />
              </div>
              <h2>Registration Successful!</h2>
              <p>
                Welcome to MLSA AISSMS IOIT! You'll receive a confirmation email shortly 
                with details about upcoming events and how to get started.
              </p>
              <button 
                className="btn btn-primary"
                onClick={() => setIsSuccess(false)}
              >
                Register Another Member
              </button>
            </motion.div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="register-page">
      {/* Hero */}
      <section className="register-hero">
        <div className="hero-background">
          <div className="hero-gradient" />
          <div className="hero-pattern" />
        </div>
        <div className="container">
          <motion.div
            className="register-hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="page-tag">Join Us</span>
            <h1>Become a Member</h1>
            <p>Join our community of tech enthusiasts and start your journey</p>
          </motion.div>
        </div>
      </section>

      {/* Registration Form */}
      <section className="register-section section">
        <div className="container">
          <div className="register-grid">
            <motion.div
              className="register-info"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2>Why Join MLSA?</h2>
              <ul className="benefits-list">
                <li>
                  <HiSparkles />
                  <div>
                    <h4>Free Microsoft Certifications</h4>
                    <p>Get vouchers for Microsoft certification exams</p>
                  </div>
                </li>
                <li>
                  <HiSparkles />
                  <div>
                    <h4>Exclusive Workshops</h4>
                    <p>Hands-on learning sessions on latest technologies</p>
                  </div>
                </li>
                <li>
                  <HiSparkles />
                  <div>
                    <h4>Industry Mentorship</h4>
                    <p>Connect with Microsoft engineers and industry experts</p>
                  </div>
                </li>
                <li>
                  <HiSparkles />
                  <div>
                    <h4>Global Network</h4>
                    <p>Join a worldwide community of student ambassadors</p>
                  </div>
                </li>
                <li>
                  <HiSparkles />
                  <div>
                    <h4>Leadership Opportunities</h4>
                    <p>Lead events and build your portfolio</p>
                  </div>
                </li>
              </ul>
            </motion.div>

            <motion.div
              className="register-form-container glass-card"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3>Registration Form</h3>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                  <label className="form-label">
                    <HiUser />
                    Full Name
                  </label>
                  <input
                    type="text"
                    className={`form-input ${errors.fullName ? 'error' : ''}`}
                    placeholder="Enter your full name"
                    {...register('fullName', {
                      required: 'Name is required',
                      minLength: { value: 2, message: 'Name must be at least 2 characters' }
                    })}
                  />
                  {errors.fullName && (
                    <span className="form-error">{errors.fullName.message}</span>
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
                    <HiPhone />
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    className={`form-input ${errors.phone ? 'error' : ''}`}
                    placeholder="Enter your phone number"
                    {...register('phone', {
                      required: 'Phone number is required',
                      pattern: {
                        value: /^[0-9]{10}$/,
                        message: 'Enter a valid 10-digit phone number'
                      }
                    })}
                  />
                  {errors.phone && (
                    <span className="form-error">{errors.phone.message}</span>
                  )}
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">
                      <HiAcademicCap />
                      Department
                    </label>
                    <select
                      className={`form-select ${errors.department ? 'error' : ''}`}
                      {...register('department', { required: 'Department is required' })}
                    >
                      <option value="">Select department</option>
                      {departments.map((dept) => (
                        <option key={dept} value={dept}>{dept}</option>
                      ))}
                    </select>
                    {errors.department && (
                      <span className="form-error">{errors.department.message}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label className="form-label">Year</label>
                    <select
                      className={`form-select ${errors.year ? 'error' : ''}`}
                      {...register('year', { required: 'Year is required' })}
                    >
                      <option value="">Select year</option>
                      <option value="1">First Year</option>
                      <option value="2">Second Year</option>
                      <option value="3">Third Year</option>
                      <option value="4">Fourth Year</option>
                    </select>
                    {errors.year && (
                      <span className="form-error">{errors.year.message}</span>
                    )}
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Interests</label>
                  <div className="interests-grid">
                    {interests.map((interest) => (
                      <label key={interest} className="interest-checkbox">
                        <input
                          type="checkbox"
                          value={interest}
                          {...register('interests', {
                            required: 'Select at least one interest'
                          })}
                        />
                        <span className="checkbox-custom" />
                        <span className="checkbox-label">{interest}</span>
                      </label>
                    ))}
                  </div>
                  {errors.interests && (
                    <span className="form-error">{errors.interests.message}</span>
                  )}
                </div>

                <button 
                  type="submit" 
                  className="btn btn-primary submit-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Registering...' : 'Register Now'}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Register;
