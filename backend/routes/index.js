const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const nodemailer = require('nodemailer');

// Email transporter configuration
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.EMAIL_PORT) || 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Function to send contact email
const sendContactEmail = async (contactData) => {
  const { name, email, subject, message } = contactData;
  
  const mailOptions = {
    from: `"MLSA Website Contact" <${process.env.EMAIL_USER}>`,
    to: process.env.CONTACT_EMAIL || 'ioitmlsa@gmail.com',
    replyTo: email,
    subject: `[MLSA Contact] ${subject}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #0078D4, #00BCF2); padding: 20px; text-align: center;">
          <h1 style="color: white; margin: 0;">New Contact Form Submission</h1>
        </div>
        <div style="padding: 30px; background: #f9f9f9;">
          <h2 style="color: #333; border-bottom: 2px solid #0078D4; padding-bottom: 10px;">Contact Details</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; font-weight: bold; color: #555;">Name:</td>
              <td style="padding: 10px 0; color: #333;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; font-weight: bold; color: #555;">Email:</td>
              <td style="padding: 10px 0; color: #333;"><a href="mailto:${email}">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 10px 0; font-weight: bold; color: #555;">Subject:</td>
              <td style="padding: 10px 0; color: #333;">${subject}</td>
            </tr>
          </table>
          <h3 style="color: #333; margin-top: 20px;">Message:</h3>
          <div style="background: white; padding: 15px; border-radius: 5px; border-left: 4px solid #0078D4;">
            <p style="color: #333; line-height: 1.6; margin: 0;">${message.replace(/\n/g, '<br>')}</p>
          </div>
        </div>
        <div style="background: #333; padding: 15px; text-align: center;">
          <p style="color: #999; margin: 0; font-size: 12px;">
            This email was sent from the MLSA AISSMS IOIT website contact form.
          </p>
        </div>
      </div>
    `,
  };

  return transporter.sendMail(mailOptions);
};

// Mock data for the MLSA website
const teamMembers = [
  {
    id: 1,
    name: "Niraj Patil",
    role: "Lead Ambassador",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop",
    linkedin: "https://linkedin.com/in/nirajpatil",
    github: "https://github.com/nirajpatil",
    twitter: "https://twitter.com/nirajpatil",
    bio: "Passionate about cloud computing and helping students learn new technologies."
  },
  {
    id: 2,
    name: "Priya Sharma",
    role: "Technical Lead",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop",
    linkedin: "https://linkedin.com/in/priyasharma",
    github: "https://github.com/priyasharma",
    twitter: "https://twitter.com/priyasharma",
    bio: "Full-stack developer with expertise in Azure and ML technologies."
  },
  {
    id: 3,
    name: "Rahul Deshmukh",
    role: "Event Coordinator",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop",
    linkedin: "https://linkedin.com/in/rahuldeshmukh",
    github: "https://github.com/rahuldeshmukh",
    twitter: "https://twitter.com/rahuldeshmukh",
    bio: "Organizing impactful tech events and workshops for the community."
  },
  {
    id: 4,
    name: "Sneha Kulkarni",
    role: "Design Lead",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop",
    linkedin: "https://linkedin.com/in/snehakulkarni",
    github: "https://github.com/snehakulkarni",
    twitter: "https://twitter.com/snehakulkarni",
    bio: "UI/UX enthusiast creating beautiful and accessible designs."
  },
  {
    id: 5,
    name: "Amit Joshi",
    role: "Cloud Specialist",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop",
    linkedin: "https://linkedin.com/in/amitjoshi",
    github: "https://github.com/amitjoshi",
    twitter: "https://twitter.com/amitjoshi",
    bio: "Azure certified professional helping students master cloud services."
  },
  {
    id: 6,
    name: "Pooja Mehta",
    role: "Content Creator",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=300&fit=crop",
    linkedin: "https://linkedin.com/in/poojamehta",
    github: "https://github.com/poojamehta",
    twitter: "https://twitter.com/poojamehta",
    bio: "Creating engaging content to make tech learning fun and accessible."
  }
];

const events = [
  {
    id: 1,
    title: "Azure Fundamentals Workshop",
    date: "2026-02-15",
    time: "10:00 AM - 4:00 PM",
    venue: "AISSMS IOIT Auditorium",
    description: "Learn the basics of Microsoft Azure cloud platform with hands-on labs.",
    type: "workshop",
    registrationLink: "#",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&h=400&fit=crop",
    spots: 100,
    registered: 67
  },
  {
    id: 2,
    title: "Hackathon 2026",
    date: "2026-03-01",
    time: "9:00 AM - 9:00 PM",
    venue: "Campus Tech Hub",
    description: "24-hour coding challenge to build innovative solutions using Microsoft technologies.",
    type: "hackathon",
    registrationLink: "#",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&h=400&fit=crop",
    spots: 200,
    registered: 145
  },
  {
    id: 3,
    title: "GitHub & DevOps Masterclass",
    date: "2026-02-28",
    time: "2:00 PM - 6:00 PM",
    venue: "Computer Lab 3",
    description: "Master version control and CI/CD pipelines with GitHub Actions.",
    type: "workshop",
    registrationLink: "#",
    image: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=600&h=400&fit=crop",
    spots: 50,
    registered: 42
  },
  {
    id: 4,
    title: "AI/ML Study Jam",
    date: "2026-03-10",
    time: "11:00 AM - 5:00 PM",
    venue: "Seminar Hall",
    description: "Introduction to Machine Learning with Azure ML Studio.",
    type: "study-jam",
    registrationLink: "#",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&h=400&fit=crop",
    spots: 80,
    registered: 55
  }
];

const announcements = [
  {
    id: 1,
    title: "New Batch Registration Open!",
    content: "Registrations for the Spring 2026 batch are now open. Join us to learn cutting-edge technologies.",
    date: "2026-01-28",
    priority: "high",
    author: "MLSA Team"
  },
  {
    id: 2,
    title: "Azure Certification Discount",
    content: "Get 50% off on Microsoft Azure certifications through our student ambassador program.",
    date: "2026-01-25",
    priority: "medium",
    author: "Niraj Patil"
  },
  {
    id: 3,
    title: "Hackathon Winners Announced",
    content: "Congratulations to all winners of the Winter Hackathon 2025! Check the gallery for photos.",
    date: "2026-01-20",
    priority: "normal",
    author: "MLSA Team"
  },
  {
    id: 4,
    title: "Weekly Tech Talks Resume",
    content: "Our popular weekly tech talk series resumes from February. Topics include Web3, AI, and Cloud.",
    date: "2026-01-18",
    priority: "medium",
    author: "Priya Sharma"
  }
];

const gallery = [
  {
    id: 1,
    title: "Hackathon 2025",
    description: "Students collaborating during our annual hackathon",
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&h=600&fit=crop",
    category: "hackathon"
  },
  {
    id: 2,
    title: "Azure Workshop",
    description: "Hands-on cloud computing session",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=600&fit=crop",
    category: "workshop"
  },
  {
    id: 3,
    title: "Tech Talk Series",
    description: "Industry experts sharing insights",
    image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&h=600&fit=crop",
    category: "talk"
  },
  {
    id: 4,
    title: "Team Building",
    description: "MLSA team bonding activities",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop",
    category: "team"
  },
  {
    id: 5,
    title: "Certificate Distribution",
    description: "Recognizing student achievements",
    image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&h=600&fit=crop",
    category: "ceremony"
  },
  {
    id: 6,
    title: "Coding Session",
    description: "Live coding and pair programming",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=600&fit=crop",
    category: "workshop"
  },
  {
    id: 7,
    title: "Guest Lecture",
    description: "Microsoft engineers sharing experiences",
    image: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=800&h=600&fit=crop",
    category: "talk"
  },
  {
    id: 8,
    title: "Networking Event",
    description: "Students connecting with professionals",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&h=600&fit=crop",
    category: "networking"
  }
];

const resources = [
  {
    id: 1,
    title: "Azure Fundamentals Guide",
    description: "Complete study guide for AZ-900 certification",
    type: "pdf",
    downloadUrl: "#",
    size: "5.2 MB",
    category: "certification"
  },
  {
    id: 2,
    title: "React.js Cheat Sheet",
    description: "Quick reference for React hooks and patterns",
    type: "pdf",
    downloadUrl: "#",
    size: "1.8 MB",
    category: "development"
  },
  {
    id: 3,
    title: "Git Commands Reference",
    description: "Essential Git commands for everyday use",
    type: "pdf",
    downloadUrl: "#",
    size: "890 KB",
    category: "tools"
  },
  {
    id: 4,
    title: "Python for Data Science",
    description: "Introduction to Python libraries for ML",
    type: "pdf",
    downloadUrl: "#",
    size: "3.4 MB",
    category: "data-science"
  },
  {
    id: 5,
    title: "VS Code Extensions Pack",
    description: "Curated list of productivity extensions",
    type: "json",
    downloadUrl: "#",
    size: "12 KB",
    category: "tools"
  },
  {
    id: 6,
    title: "API Design Best Practices",
    description: "Guide to building RESTful APIs",
    type: "pdf",
    downloadUrl: "#",
    size: "2.1 MB",
    category: "development"
  }
];

const stats = {
  members: 500,
  events: 45,
  workshops: 32,
  projects: 28,
  certifications: 150,
  countries: 1
};

// Routes

// Get all team members
router.get('/team', (req, res) => {
  res.json({ success: true, data: teamMembers });
});

// Get all events
router.get('/events', (req, res) => {
  const upcoming = req.query.upcoming === 'true';
  let filteredEvents = events;
  
  if (upcoming) {
    const today = new Date();
    filteredEvents = events.filter(event => new Date(event.date) >= today);
  }
  
  res.json({ success: true, data: filteredEvents });
});

// Get single event
router.get('/events/:id', (req, res) => {
  const event = events.find(e => e.id === parseInt(req.params.id));
  if (!event) {
    return res.status(404).json({ success: false, message: 'Event not found' });
  }
  res.json({ success: true, data: event });
});

// Get announcements
router.get('/announcements', (req, res) => {
  const limit = parseInt(req.query.limit) || 10;
  const limitedAnnouncements = announcements.slice(0, limit);
  res.json({ success: true, data: limitedAnnouncements });
});

// Get gallery images
router.get('/gallery', (req, res) => {
  const category = req.query.category;
  let filteredGallery = gallery;
  
  if (category && category !== 'all') {
    filteredGallery = gallery.filter(item => item.category === category);
  }
  
  res.json({ success: true, data: filteredGallery });
});

// Get resources
router.get('/resources', (req, res) => {
  const category = req.query.category;
  let filteredResources = resources;
  
  if (category && category !== 'all') {
    filteredResources = resources.filter(item => item.category === category);
  }
  
  res.json({ success: true, data: filteredResources });
});

// Get stats
router.get('/stats', (req, res) => {
  res.json({ success: true, data: stats });
});

// Registration endpoint
router.post('/register', [
  body('fullName').trim().isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
  body('email').isEmail().normalizeEmail().withMessage('Invalid email address'),
  body('phone').isMobilePhone().withMessage('Invalid phone number'),
  body('department').notEmpty().withMessage('Department is required'),
  body('year').isIn(['1', '2', '3', '4']).withMessage('Invalid year'),
  body('interests').isArray({ min: 1 }).withMessage('Select at least one interest')
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  // In production, save to database
  const registration = {
    id: Date.now(),
    ...req.body,
    registeredAt: new Date().toISOString()
  };

  res.status(201).json({
    success: true,
    message: 'Registration successful! Welcome to MLSA AISSMS IOIT.',
    data: registration
  });
});

// Contact form endpoint
router.post('/contact', [
  body('name').trim().isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
  body('email').isEmail().normalizeEmail().withMessage('Invalid email address'),
  body('subject').trim().isLength({ min: 5 }).withMessage('Subject must be at least 5 characters'),
  body('message').trim().isLength({ min: 10 }).withMessage('Message must be at least 10 characters')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  const contact = {
    id: Date.now(),
    ...req.body,
    submittedAt: new Date().toISOString()
  };

  try {
    // Send email notification
    await sendContactEmail(req.body);
    console.log(`✉️ Contact email sent from ${req.body.email}`);
    
    res.status(201).json({
      success: true,
      message: 'Thank you for reaching out! We\'ll get back to you soon.',
      data: contact
    });
  } catch (emailError) {
    console.error('Failed to send contact email:', emailError.message);
    // Still return success to user but log the error
    res.status(201).json({
      success: true,
      message: 'Thank you for reaching out! We\'ll get back to you soon.',
      data: contact
    });
  }
});

// Event registration
router.post('/events/:id/register', [
  body('name').trim().isLength({ min: 2 }).withMessage('Name is required'),
  body('email').isEmail().normalizeEmail().withMessage('Invalid email'),
  body('phone').isMobilePhone().withMessage('Invalid phone number')
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  const event = events.find(e => e.id === parseInt(req.params.id));
  if (!event) {
    return res.status(404).json({ success: false, message: 'Event not found' });
  }

  res.status(201).json({
    success: true,
    message: `Successfully registered for ${event.title}!`,
    data: { eventId: event.id, ...req.body }
  });
});

module.exports = router;
