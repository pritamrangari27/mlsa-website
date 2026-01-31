<<<<<<< HEAD
# MLSA AISSMS IOIT Website

A professional, hackathon-quality website for the Microsoft Learn Student Ambassador Club at AISSMS IOIT, Pune.

![MLSA Logo](https://studentambassadors.microsoft.com/assets/studentambassadors-logo.png)

## 🚀 Features

### Frontend (React.js)
- ⚡ Modern, responsive UI with glassmorphism design
- 🌙 Dark/Light theme toggle with system preference detection
- 🎨 Microsoft brand colors with beautiful gradients
- 📱 Fully responsive across all devices
- 🎭 Smooth animations using Framer Motion
- 📊 Animated statistics counters
- 🖼️ Lazy loading images for optimal performance
- 🔔 Toast notifications for user feedback
- ⏳ Skeleton loading states
- ♿ Accessibility compliant (WCAG)
- 🃏 Flip card animations for team members
- 📸 Lightbox gallery with category filtering
- 📝 Form validation with React Hook Form

### Backend (Node.js/Express)
- 🔒 Secure API with Helmet.js
- 📡 RESTful API architecture
- ✅ Input validation with express-validator
- 📧 Contact form handling
- 🌐 CORS enabled for frontend integration
- 📊 Mock data for events, team, gallery, and resources

## 📦 Tech Stack

### Frontend
- React 18
- React Router DOM v6
- Framer Motion (animations)
- React Hook Form (form handling)
- React Hot Toast (notifications)
- React Icons
- React Intersection Observer
- React Lazy Load Image Component
- Axios (API calls)

### Backend
- Node.js
- Express.js
- Helmet (security)
- Morgan (logging)
- express-validator
- Nodemailer (email)
- dotenv (environment variables)

## 🛠️ Installation

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your configuration
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env.local
# Edit .env.local with your API URL
npm start
```

## 🚀 Running the Application

### Development Mode

**Backend (runs on http://localhost:5000):**
```bash
cd backend
npm run dev
```

**Frontend (runs on http://localhost:3000):**
```bash
cd frontend
npm start
```

### Production Build

**Backend:**
```bash
cd backend
npm start
```

**Frontend:**
```bash
cd frontend
npm run build
```

## 📁 Project Structure

```
MLSA-Web/
├── backend/
│   ├── routes/
│   │   └── index.js          # All API routes
│   ├── server.js             # Express server setup
│   ├── package.json
│   └── .env.example
│
├── frontend/
│   ├── public/
│   │   ├── index.html
│   │   └── manifest.json
│   ├── src/
│   │   ├── components/
│   │   │   ├── sections/     # Home page sections
│   │   │   │   ├── Hero.js
│   │   │   │   ├── About.js
│   │   │   │   ├── Stats.js
│   │   │   │   ├── EventsPreview.js
│   │   │   │   ├── TeamPreview.js
│   │   │   │   ├── Announcements.js
│   │   │   │   ├── GalleryPreview.js
│   │   │   │   └── CTA.js
│   │   │   ├── Navbar.js
│   │   │   ├── Footer.js
│   │   │   ├── Loading.js
│   │   │   └── ScrollToTop.js
│   │   ├── context/
│   │   │   └── ThemeContext.js
│   │   ├── pages/
│   │   │   ├── Home.js
│   │   │   ├── Events.js
│   │   │   ├── Team.js
│   │   │   ├── Gallery.js
│   │   │   ├── Resources.js
│   │   │   ├── Register.js
│   │   │   └── Contact.js
│   │   ├── services/
│   │   │   └── api.js        # API service layer
│   │   ├── styles/
│   │   │   └── index.css     # Global styles
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   └── .env.example
│
└── README.md
```

## 🎨 Design Features

- **Glassmorphism**: Frosted glass effect on cards and navigation
- **Microsoft Brand Colors**: Blue (#0078d4), gradients, and accent colors
- **Dark/Light Mode**: Automatic system preference detection with manual toggle
- **Smooth Animations**: Page transitions, hover effects, scroll animations
- **Responsive Grid**: Adapts seamlessly from mobile to desktop
- **Micro-interactions**: Button hover, card flip, progress bars

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/team` | Get all team members |
| GET | `/api/events` | Get all events |
| GET | `/api/events/:id` | Get single event |
| GET | `/api/announcements` | Get announcements |
| GET | `/api/gallery` | Get gallery images |
| GET | `/api/resources` | Get downloadable resources |
| GET | `/api/stats` | Get club statistics |
| POST | `/api/register` | Submit membership registration |
| POST | `/api/contact` | Submit contact form |
| POST | `/api/events/:id/register` | Register for event |

## 🌐 Environment Variables

### Backend (.env)
```
PORT=5000
NODE_ENV=development
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
FRONTEND_URL=http://localhost:3000
```

### Frontend (.env.local)
```
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_SITE_NAME=MLSA AISSMS IOIT
```

## 📱 Pages

1. **Home** - Hero section, About, Stats, Events preview, Team preview, Announcements, Gallery preview, CTA
2. **Events** - Full events listing with filtering
3. **Team** - All team members with flip card animations
4. **Gallery** - Masonry grid with lightbox and category filter
5. **Resources** - Downloadable materials with external links
6. **Register** - Membership registration form
7. **Contact** - Contact form with Google Maps integration

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👥 Team

Built by Pritam Rangari & Teams.

---

**Microsoft Learn Student Ambassadors** - Empowering students through technology
=======
# mlsa-website
https://mlsa-ioit.vercel.app/
