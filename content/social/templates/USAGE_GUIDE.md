# 513 Sips Instagram Templates - Usage Guide

## Overview
This package contains **30 Instagram post templates** designed specifically for 513 Sips mobile bar and wedding service business. All templates use the brand colors of Navy (#1E3A8A) and Gold (#CA8A04).

## Template Inventory

### 1. Quote Graphics (5 templates)
| Template | File Class | Description |
|----------|------------|-------------|
| Quote Elegant | `.quote-elegant` | Centered quote on navy gradient background |
| Quote Split | `.quote-split` | Two-panel design with quote mark accent |
| Quote Gold Bar | `.quote-goldbar` | White background with gold accent bar |
| Quote Overlay | `.quote-overlay` | Decorative rings with overlay effect |
| Quote Minimal | `.quote-minimal` | Clean card design with top gold accent |

**Best for:** Inspirational wedding quotes, industry wisdom, romantic sayings

### 2. Service Showcases (5 templates)
| Template | File Class | Description |
|----------|------------|-------------|
| Service Hero | `.service-hero` | Large icon with service highlight |
| Service Split | `.service-split` | Image left, content right layout |
| Service Grid | `.service-grid` | 2x2 card grid for multiple services |
| Service Pricing | `.service-pricing` | Featured pricing package card |
| Service Process | `.service-process` | 3-step process visualization |

**Best for:** Promoting packages, highlighting services, explaining process

### 3. Before/After (5 templates)
| Template | File Class | Description |
|----------|------------|-------------|
| BA Slider | `.beforeafter-slider` | Side-by-side comparison panels |
| BA Transform | `.beforeafter-transform` | Arrow transition visualization |
| BA Gallery | `.beforeafter-gallery` | 2x2 photo grid with labels |
| BA Story | `.beforeafter-story` | Client story with quote |
| BA Process | `.service-process` (modified) | Setup timeline steps |

**Best for:** Venue transformations, setup process, event showcases

### 4. Client Testimonials (5 templates)
| Template | File Class | Description |
|----------|------------|-------------|
| Testimonial Card | `.testimonial-card` | Star rating with avatar |
| Testimonial Quote | `.testimonial-quote` | Large quote on navy background |
| Testimonial Split | `.testimonial-split` | Photo left, review right |
| Testimonial Video | `.testimonial-video` | Video preview with play button |
| Testimonial Carousel | `.service-grid` (modified) | Multiple reviews in grid |

**Best for:** Client reviews, social proof, success stories

### 5. Educational Tips (5 templates)
| Template | File Class | Description |
|----------|------------|-------------|
| Tip Single | `.education-single` | Featured tip with large number |
| Tip List | `.education-list` | Numbered list format |
| Tip Did You Know | `.education-didyouknow` | Fun fact badge style |
| Tip Myth vs Fact | `.education-myth` | Comparison boxes |
| Tip Guide | `.education-guide` | 4-card step guide |

**Best for:** Wedding planning tips, industry education, myth busting

### 6. Behind The Scenes (5 templates)
| Template | File Class | Description |
|----------|------------|-------------|
| BTS Team | `.bts-team` | Meet the team layout |
| BTS Prep | `.bts-prep` | 3-item prep process grid |
| BTS Day | `.bts-day` | Timeline of wedding day |
| BTS Gallery | `.bts-gallery` | Photo collage grid |
| BTS Story | `.bts-story` | Founder/company story |

**Best for:** Team introductions, process transparency, company culture

## How to Use

### Option 1: Edit HTML Directly
1. Open `index.html` in a text editor
2. Find the template you want to use
3. Edit the placeholder text (keep the HTML structure)
4. Replace `[Your Image]` placeholders with actual image URLs
5. Save and open in browser to preview
6. Use browser screenshot tools to capture at 1080x1080

### Option 2: Use as Reference in Canva
1. Open Canva and create 1080x1080px design
2. Use the CSS classes as layout guides
3. Apply brand colors:
   - Navy: #1E3A8A
   - Gold: #CA8A04
   - Cream: #F8FAFC
4. Use fonts:
   - Headlines: Playfair Display
   - Body: Inter
   - Accent: Cormorant Garamond

### Option 3: Screenshot from Browser
1. Open `index.html` in Chrome/Edge
2. Find the template you want
3. Right-click → Inspect
4. Find the `.instagram-post` element
5. Set dimensions to 1080x1080 in inspector
6. Screenshot or use browser's "Capture node screenshot"

## Customization Guide

### Changing Colors
Edit the CSS variables in `templates.css`:
```css
:root {
  --navy-800: #1E3A8A;  /* Primary navy */
  --gold-600: #CA8A04;  /* Primary gold */
  --cream: #F8FAFC;     /* Background */
}
```

### Changing Text
Each template has placeholder text like:
```html
<p class="quote-text">Your quote here</p>
```

### Adding Images
Replace placeholder divs:
```html
<!-- Before -->
<div class="placeholder-img">[Your Image]</div>

<!-- After -->
<div class="placeholder-img" style="background-image: url('your-image.jpg'); background-size: cover;"></div>
```

### Exporting for Instagram
1. Screenshot at exactly 1080x1080 pixels
2. Save as JPG (for photos) or PNG (for graphics)
3. File size should be under 8MB for Instagram
4. Use 1:1 aspect ratio

## Content Calendar Suggestions

### Weekly Rotation
- **Monday:** Educational Tip (Tips #21-25)
- **Tuesday:** Quote Graphic (Quotes #1-5)
- **Wednesday:** Service Showcase (Services #6-10)
- **Thursday:** Behind The Scenes (BTS #26-30)
- **Friday:** Testimonial (Reviews #16-20)
- **Saturday:** Before/After (BA #11-15)
- **Sunday:** User-generated content or rest

### Seasonal Campaigns
- **Engagement Season (Nov-Feb):** Focus on Service Showcases
- **Wedding Season (May-Oct):** Focus on Before/After and Testimonials
- **Planning Season (Jan-Mar):** Focus on Educational Tips

## Brand Voice Guidelines

### Tone
- Professional but approachable
- Warm and celebratory
- Knowledgeable but not pretentious

### Key Messages
- "Elevating your celebration"
- "Custom-crafted for your love story"
- "Professional service, personal touch"

### Hashtags to Use
Primary: #513Sips #CincinnatiWeddings #MobileBar
Secondary: #WeddingBar #SignatureCocktails #OhioWeddings
Community: #WeddingPlanning #BrideToBe #WeddingInspo

## File Structure
```
templates/
├── index.html          # Preview all 30 templates
├── templates.css       # All styles and layouts
└── USAGE_GUIDE.md      # This guide
```

## Technical Notes

### Instagram Dimensions
- Square posts: 1080 x 1080 px
- These templates are designed at exactly these dimensions

### Browser Compatibility
- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support
- Mobile browsers: Preview only (use desktop for editing)

### Fonts Used
- Playfair Display (Google Fonts)
- Inter (Google Fonts)
- Cormorant Garamond (Google Fonts)

## Support
For questions about using these templates, refer to:
1. This usage guide
2. The CSS comments in templates.css
3. The HTML structure in index.html

---

**513 Sips - Elevating Celebrations, One Sip at a Time**
