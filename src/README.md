# 513 Sips Website

A modern, professional website for 513 Sips mobile bar service. Built with React, Vite, and Tailwind CSS.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
513sips-website/
├── public/              # Static assets
├── src/
│   ├── components/      # Reusable components
│   │   ├── Navbar.jsx   # Navigation bar
│   │   └── Footer.jsx   # Footer
│   ├── pages/           # Page components
│   │   ├── Home.jsx     # Homepage
│   │   ├── Services.jsx # Services/Packages
│   │   ├── About.jsx    # About Us
│   │   ├── Gallery.jsx  # Gallery & Testimonials
│   │   ├── FAQ.jsx      # Frequently Asked Questions
│   │   └── Contact.jsx  # Contact Form
│   ├── App.jsx          # Main app component
│   ├── main.jsx         # Entry point
│   └── index.css        # Global styles
├── index.html           # HTML template
├── package.json         # Dependencies
├── tailwind.config.js   # Tailwind configuration
└── postcss.config.js    # PostCSS configuration
```

## 🎨 Design System

### Colors
- **Primary:** `#1E3A8A` (Navy)
- **Secondary:** `#3B82F6` (Light Navy)
- **CTA:** `#CA8A04` (Gold)
- **Background:** `#F8FAFC` (Off-white)
- **Text:** `#1E40AF` (Dark Navy)

### Typography
- **Headings:** Poppins (600-700 weight)
- **Body:** Open Sans (400-500 weight)

### Style
- Glassmorphism cards
- Navy gradient backgrounds
- Gold accents
- Generous whitespace

## 📄 Pages

### Home (/)
- Hero section with CTA
- Services preview (3 packages)
- About snippet
- Testimonials section
- Final CTA

### Services (/services)
- Golden Standard ($650)
- The Signature ($850) - Most Popular
- Uniquely Yours (Custom)
- How It Works section
- Important details

### About (/about)
- Full founder story
- Values section
- Founder profile
- Certifications

### Gallery (/gallery)
- Photo gallery (placeholder)
- Testimonials
- Video section (placeholder)
- Lightbox functionality

### FAQ (/faq)
- 12 frequently asked questions
- Accordion-style layout
- Contact CTA

### Contact (/contact)
- Full contact form
- Form validation
- Contact information sidebar
- Success state

## 🔍 SEO Features

Every page includes:
- Unique, keyword-rich `<title>`
- Meta description
- Open Graph tags
- Semantic HTML (H1, H2, etc.)
- Proper heading hierarchy

### Target Keywords
- "mobile bar service Cincinnati"
- "wedding bartending Cincinnati"
- "event bartending Ohio"
- "dry hire mobile bar"
- "private party bartenders"

## ♿ Accessibility

- 4.5:1 contrast ratio minimum
- Focus states on all interactive elements
- Semantic HTML
- ARIA labels where needed
- Keyboard navigation support

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints:
  - Mobile: < 768px
  - Tablet: 768px - 1024px
  - Desktop: > 1024px

## 🚀 Deployment

### GitHub Pages
1. Build the project: `npm run build`
2. Copy `dist/` contents to `gh-pages` branch
3. Enable GitHub Pages in repo settings

### Vercel (Recommended)
1. Connect GitHub repo to Vercel
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Deploy!

## 📝 Content Notes

### Photos Needed
- Hero image (mobile bar at event)
- Eddie's founder photo
- Event gallery photos (6+)
- Behind-the-scenes shots

### Testimonials Needed
- 3-5 real client testimonials
- Names and event types
- Star ratings

### Future Enhancements
- [ ] Real photos
- [ ] Instagram feed integration
- [ ] Blog section
- [ ] Online booking/payment
- [ ] Live chat
- [ ] Google Analytics
- [ ] Schema markup

## 🐛 Known Issues

1. All photos are placeholders
2. Testimonials are sample text
3. Form submission is frontend-only (no backend)
4. Phone number is placeholder

## 📞 Contact

For questions about this website, contact:
- Email: hello@513sips.com
- Phone: (513) 322-2645

---

Built with ❤️ for 513 Sips by Charlie
