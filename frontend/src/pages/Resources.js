import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HiDownload, HiDocumentText, HiCode, HiDatabase, HiCog } from 'react-icons/hi';
import { fetchResources } from '../services/api';
import toast from 'react-hot-toast';
import './Resources.css';

const categoryIcons = {
  certification: HiDocumentText,
  development: HiCode,
  'data-science': HiDatabase,
  tools: HiCog,
};

const Resources = () => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadResources = async () => {
      try {
        const response = await fetchResources();
        setResources(response.data);
      } catch (error) {
        console.error('Failed to fetch resources:', error);
      } finally {
        setLoading(false);
      }
    };
    loadResources();
  }, []);

  const handleDownload = (title) => {
    toast.success(`Downloading ${title}...`);
  };

  return (
    <div className="resources-page">
      {/* Hero */}
      <section className="resources-hero">
        <div className="hero-background">
          <div className="hero-gradient" />
        </div>
        <div className="container">
          <motion.div
            className="resources-hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="page-tag">Learning Materials</span>
            <h1>Resources</h1>
            <p>Free downloadable materials to accelerate your learning journey</p>
          </motion.div>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="resources-section section">
        <div className="container">
          {loading ? (
            <div className="resources-grid">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="resource-card-skeleton glass-card">
                  <div className="skeleton" style={{ width: '60px', height: '60px', borderRadius: '12px' }} />
                  <div style={{ flex: 1 }}>
                    <div className="skeleton skeleton-title" />
                    <div className="skeleton skeleton-text" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="resources-grid">
              {resources.map((resource, index) => {
                const Icon = categoryIcons[resource.category] || HiDocumentText;
                return (
                  <motion.div
                    key={resource.id}
                    className="resource-card glass-card"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                  >
                    <div className="resource-icon">
                      <Icon />
                    </div>

                    <div className="resource-info">
                      <h3>{resource.title}</h3>
                      <p>{resource.description}</p>
                      <div className="resource-meta">
                        <span className="resource-type">{resource.type.toUpperCase()}</span>
                        <span className="resource-size">{resource.size}</span>
                      </div>
                    </div>

                    <button 
                      className="btn btn-primary download-btn"
                      onClick={() => handleDownload(resource.title)}
                      aria-label={`Download ${resource.title}`}
                    >
                      <HiDownload />
                      <span>Download</span>
                    </button>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* External Resources */}
      <section className="external-resources section">
        <div className="container">
          <h2 className="section-title">External Resources</h2>
          <p className="section-subtitle">Additional learning platforms and resources</p>

          <div className="external-grid">
            <motion.a
              href="https://learn.microsoft.com"
              target="_blank"
              rel="noopener noreferrer"
              className="external-card glass-card"
              whileHover={{ y: -5 }}
            >
              <div className="external-icon ms-learn">
                <svg viewBox="0 0 100 100">
                  <rect x="5" y="5" width="40" height="40" fill="#f25022"/>
                  <rect x="55" y="5" width="40" height="40" fill="#7fba00"/>
                  <rect x="5" y="55" width="40" height="40" fill="#00a4ef"/>
                  <rect x="55" y="55" width="40" height="40" fill="#ffb900"/>
                </svg>
              </div>
              <h3>Microsoft Learn</h3>
              <p>Free, interactive training paths and certifications</p>
            </motion.a>

            <motion.a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="external-card glass-card"
              whileHover={{ y: -5 }}
            >
              <div className="external-icon github">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                </svg>
              </div>
              <h3>GitHub</h3>
              <p>Access our project repositories and code samples</p>
            </motion.a>

            <motion.a
              href="https://docs.microsoft.com/azure"
              target="_blank"
              rel="noopener noreferrer"
              className="external-card glass-card"
              whileHover={{ y: -5 }}
            >
              <div className="external-icon azure">
                <svg viewBox="0 0 96 96" fill="currentColor">
                  <path d="M40.255 17.003h15.743L30.56 78.997H14.817l25.438-61.994zM81.183 68.394L53.75 78.997H27.542l35.558-10.143 18.083-5.213-7.94 4.753zM55.998 17.003l-20.44 57.204 33.285-9.486L81.183 28.55 55.998 17.003z"/>
                </svg>
              </div>
              <h3>Azure Documentation</h3>
              <p>Comprehensive cloud computing documentation</p>
            </motion.a>

            <motion.a
              href="https://visualstudio.microsoft.com"
              target="_blank"
              rel="noopener noreferrer"
              className="external-card glass-card"
              whileHover={{ y: -5 }}
            >
              <div className="external-icon vscode">
                <svg viewBox="0 0 100 100" fill="currentColor">
                  <path d="M71.1 84.4L28.7 52.7l42.4-31.7v63.4zM22.8 52.7L5.4 65.8V39.6l17.4 13.1z"/>
                </svg>
              </div>
              <h3>Visual Studio</h3>
              <p>Professional development tools and IDEs</p>
            </motion.a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Resources;
