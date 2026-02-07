import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  HiAcademicCap, 
  HiExternalLink, 
  HiClock, 
  HiStar,
  HiFilter,
  HiBookOpen,
  HiChip,
  HiCloud,
  HiCode,
  HiDatabase,
  HiShieldCheck,
  HiLightningBolt
} from 'react-icons/hi';
import './Activity.css';

// Microsoft Learn Modules Data
const learnModules = [
  {
    id: 1,
    title: 'Azure Fundamentals',
    description: 'Learn cloud concepts, Azure services, security, privacy, compliance, and pricing. Perfect for beginners starting their cloud journey.',
    category: 'cloud',
    level: 'Beginner',
    duration: '10 hours',
    modules: 12,
    link: 'https://learn.microsoft.com/en-us/training/paths/az-900-describe-cloud-concepts/',
    badge: 'AZ-900',
    image: 'https://learn.microsoft.com/en-us/training/achievements/az-900-describe-cloud-concepts.svg'
  },
  {
    id: 2,
    title: 'Introduction to AI',
    description: 'Explore fundamental AI concepts including machine learning, computer vision, natural language processing, and conversational AI.',
    category: 'ai',
    level: 'Beginner',
    duration: '6 hours',
    modules: 5,
    link: 'https://learn.microsoft.com/en-us/training/paths/get-started-with-artificial-intelligence-on-azure/',
    badge: 'AI-900',
    image: 'https://learn.microsoft.com/en-us/training/achievements/get-started-with-artificial-intelligence-on-azure.svg'
  },
  {
    id: 3,
    title: 'Power Platform Fundamentals',
    description: 'Build apps with Power Apps, automate processes with Power Automate, and analyze data with Power BI.',
    category: 'development',
    level: 'Beginner',
    duration: '8 hours',
    modules: 8,
    link: 'https://learn.microsoft.com/en-us/training/paths/power-plat-fundamentals/',
    badge: 'PL-900',
    image: 'https://learn.microsoft.com/en-us/training/achievements/power-plat-fundamentals.svg'
  },
  {
    id: 4,
    title: 'GitHub Foundations',
    description: 'Master version control with Git and GitHub. Learn collaboration, branching strategies, and modern development workflows.',
    category: 'development',
    level: 'Beginner',
    duration: '7 hours',
    modules: 10,
    link: 'https://learn.microsoft.com/en-us/training/paths/github-foundations/',
    badge: 'GitHub',
    image: 'https://learn.microsoft.com/en-us/training/achievements/github-foundations.svg'
  },
  {
    id: 5,
    title: 'Azure Data Fundamentals',
    description: 'Understand core data concepts and how they are implemented using Azure data services including SQL, Cosmos DB, and more.',
    category: 'data',
    level: 'Beginner',
    duration: '8 hours',
    modules: 6,
    link: 'https://learn.microsoft.com/en-us/training/paths/azure-data-fundamentals-explore-core-data-concepts/',
    badge: 'DP-900',
    image: 'https://learn.microsoft.com/en-us/training/achievements/azure-data-fundamentals-explore-core-data-concepts.svg'
  },
  {
    id: 6,
    title: 'Security, Compliance & Identity',
    description: 'Learn security, compliance, and identity fundamentals across Microsoft services including Azure AD and Microsoft 365.',
    category: 'security',
    level: 'Beginner',
    duration: '5 hours',
    modules: 4,
    link: 'https://learn.microsoft.com/en-us/training/paths/describe-concepts-of-security-compliance-identity/',
    badge: 'SC-900',
    image: 'https://learn.microsoft.com/en-us/training/achievements/describe-concepts-of-security-compliance-identity.svg'
  },
  {
    id: 7,
    title: 'Microsoft 365 Fundamentals',
    description: 'Explore cloud productivity with Microsoft 365. Learn about collaboration tools, security features, and licensing options.',
    category: 'cloud',
    level: 'Beginner',
    duration: '6 hours',
    modules: 5,
    link: 'https://learn.microsoft.com/en-us/training/paths/m365-fundamentals/',
    badge: 'MS-900',
    image: 'https://learn.microsoft.com/en-us/training/achievements/m365-fundamentals.svg'
  },
  {
    id: 8,
    title: 'Build JavaScript Applications',
    description: 'Create modern web applications using JavaScript. Cover Node.js, frameworks, and full-stack development practices.',
    category: 'development',
    level: 'Intermediate',
    duration: '12 hours',
    modules: 15,
    link: 'https://learn.microsoft.com/en-us/training/paths/build-javascript-applications-nodejs/',
    badge: 'JavaScript',
    image: 'https://learn.microsoft.com/en-us/training/achievements/build-javascript-applications-nodejs.svg'
  },
  {
    id: 9,
    title: 'Azure Developer Associate',
    description: 'Design, build, test, and maintain cloud applications on Azure. Learn about Azure compute, storage, and security.',
    category: 'cloud',
    level: 'Intermediate',
    duration: '20 hours',
    modules: 18,
    link: 'https://learn.microsoft.com/en-us/training/paths/create-azure-app-service-web-apps/',
    badge: 'AZ-204',
    image: 'https://learn.microsoft.com/en-us/training/achievements/create-azure-app-service-web-apps.svg'
  },
  {
    id: 10,
    title: 'Machine Learning with Python',
    description: 'Build and train ML models using Python and Azure Machine Learning. Cover regression, classification, and clustering.',
    category: 'ai',
    level: 'Intermediate',
    duration: '15 hours',
    modules: 12,
    link: 'https://learn.microsoft.com/en-us/training/paths/create-machine-learn-models/',
    badge: 'ML',
    image: 'https://learn.microsoft.com/en-us/training/achievements/create-machine-learn-models.svg'
  },
  {
    id: 11,
    title: 'DevOps with Azure',
    description: 'Implement DevOps practices using Azure DevOps. Learn CI/CD pipelines, infrastructure as code, and monitoring.',
    category: 'development',
    level: 'Intermediate',
    duration: '18 hours',
    modules: 14,
    link: 'https://learn.microsoft.com/en-us/training/paths/evolve-your-devops-practices/',
    badge: 'AZ-400',
    image: 'https://learn.microsoft.com/en-us/training/achievements/evolve-your-devops-practices.svg'
  },
  {
    id: 12,
    title: 'Data Engineering on Azure',
    description: 'Design and implement data solutions using Azure Synapse, Data Factory, and Databricks for big data processing.',
    category: 'data',
    level: 'Advanced',
    duration: '25 hours',
    modules: 20,
    link: 'https://learn.microsoft.com/en-us/training/paths/data-engineering-with-databricks/',
    badge: 'DP-203',
    image: 'https://learn.microsoft.com/en-us/training/achievements/data-engineering-with-databricks.svg'
  },
  {
    id: 13,
    title: 'C# First Steps',
    description: 'Start programming with C#. Learn syntax, data types, control flow, and object-oriented programming fundamentals.',
    category: 'development',
    level: 'Beginner',
    duration: '8 hours',
    modules: 10,
    link: 'https://learn.microsoft.com/en-us/training/paths/csharp-first-steps/',
    badge: 'C#',
    image: 'https://learn.microsoft.com/en-us/training/achievements/csharp-first-steps.svg'
  },
  {
    id: 14,
    title: 'Generative AI with Azure OpenAI',
    description: 'Build intelligent apps with Azure OpenAI Service. Learn prompt engineering, embeddings, and responsible AI practices.',
    category: 'ai',
    level: 'Intermediate',
    duration: '10 hours',
    modules: 8,
    link: 'https://learn.microsoft.com/en-us/training/paths/develop-ai-solutions-azure-openai/',
    badge: 'AI-102',
    image: 'https://learn.microsoft.com/en-us/training/achievements/develop-ai-solutions-azure-openai.svg'
  },
  {
    id: 15,
    title: 'Azure Administrator',
    description: 'Manage Azure identities, governance, storage, compute, and virtual networks as an Azure administrator.',
    category: 'cloud',
    level: 'Intermediate',
    duration: '22 hours',
    modules: 16,
    link: 'https://learn.microsoft.com/en-us/training/paths/az-104-administrator-prerequisites/',
    badge: 'AZ-104',
    image: 'https://learn.microsoft.com/en-us/training/achievements/az-104-administrator-prerequisites.svg'
  },
  {
    id: 16,
    title: 'Python for Data Science',
    description: 'Analyze data using Python libraries like NumPy, Pandas, and Matplotlib. Build data visualization skills.',
    category: 'data',
    level: 'Beginner',
    duration: '10 hours',
    modules: 8,
    link: 'https://learn.microsoft.com/en-us/training/paths/beginner-python/',
    badge: 'Python',
    image: 'https://learn.microsoft.com/en-us/training/achievements/beginner-python.svg'
  }
];

const categories = [
  { id: 'all', label: 'All Courses', icon: HiBookOpen },
  { id: 'cloud', label: 'Cloud', icon: HiCloud },
  { id: 'ai', label: 'AI & ML', icon: HiChip },
  { id: 'development', label: 'Development', icon: HiCode },
  { id: 'data', label: 'Data', icon: HiDatabase },
  { id: 'security', label: 'Security', icon: HiShieldCheck },
];

const levelColors = {
  'Beginner': 'level-beginner',
  'Intermediate': 'level-intermediate',
  'Advanced': 'level-advanced'
};

const Activity = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredModules = selectedCategory === 'all' 
    ? learnModules 
    : learnModules.filter(module => module.category === selectedCategory);

  return (
    <div className="activity-page">
      {/* Hero Section */}
      <section className="activity-hero">
        <div className="hero-background">
          <div className="hero-gradient" />
          <div className="hero-pattern" />
        </div>
        <div className="container">
          <motion.div
            className="activity-hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="page-tag">
              <HiLightningBolt /> Learning Activity
            </span>
            <h1>Microsoft Learn Modules</h1>
            <p>
              Explore curated learning paths and modules designed for college students. 
              Earn certifications and badges to boost your career!
            </p>
            <div className="hero-stats">
              <div className="hero-stat">
                <span className="stat-number">{learnModules.length}+</span>
                <span className="stat-label">Courses</span>
              </div>
              <div className="hero-stat">
                <span className="stat-number">Free</span>
                <span className="stat-label">Access</span>
              </div>
              <div className="hero-stat">
                <span className="stat-number">100%</span>
                <span className="stat-label">Online</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="activity-filter">
        <div className="container">
          <div className="filter-header">
            <HiFilter />
            <span>Filter by Category</span>
          </div>
          <div className="filter-tabs">
            {categories.map(category => (
              <button
                key={category.id}
                className={`filter-tab ${selectedCategory === category.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category.id)}
              >
                <category.icon />
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Modules Grid */}
      <section className="activity-modules section">
        <div className="container">
          <motion.div
            className="modules-grid"
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
          >
            {filteredModules.map((module, index) => (
              <motion.a
                key={module.id}
                href={module.link}
                target="_blank"
                rel="noopener noreferrer"
                className="module-card glass-card"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="module-header">
                  <div className="module-icon">
                    <HiAcademicCap />
                  </div>
                  <span className={`module-level ${levelColors[module.level]}`}>
                    {module.level}
                  </span>
                </div>
                
                <div className="module-badge">{module.badge}</div>
                
                <h3 className="module-title">{module.title}</h3>
                <p className="module-description">{module.description}</p>
                
                <div className="module-meta">
                  <span className="meta-item">
                    <HiClock />
                    {module.duration}
                  </span>
                  <span className="meta-item">
                    <HiBookOpen />
                    {module.modules} modules
                  </span>
                </div>
                
                <div className="module-footer">
                  <span className="start-learning">
                    Start Learning
                    <HiExternalLink />
                  </span>
                </div>
              </motion.a>
            ))}
          </motion.div>
          
          {filteredModules.length === 0 && (
            <div className="no-results">
              <HiBookOpen />
              <p>No modules found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="activity-cta section">
        <div className="container">
          <motion.div
            className="cta-card glass-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="cta-content">
              <HiStar className="cta-icon" />
              <h2>Want More Learning Resources?</h2>
              <p>
                Visit Microsoft Learn for hundreds of additional modules, 
                learning paths, and certification preparation materials.
              </p>
              <a 
                href="https://learn.microsoft.com/en-us/training/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                Explore Microsoft Learn
                <HiExternalLink />
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Activity;
