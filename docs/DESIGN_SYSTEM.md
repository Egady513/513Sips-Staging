# 513 Sips Design System

*Generated from UI-UX Pro Max v2.2.1 design intelligence*

## Brand Identity

**Business:** Mobile bar service (dry hire)
**Vibe:** Luxury, elegant, wedding-focused, professional
**Keywords:** Navy, gold, hospitality, celebration, premium

## Color Palette

**Source:** Hotel/Hospitality category — "Luxury navy + gold service"

| Token | Hex | Usage |
|-------|-----|-------|
| Primary | `#1E3A8A` | Headers, buttons, key elements |
| Secondary | `#3B82F6` | Links, accents, hover states |
| CTA | `#CA8A04` | Call-to-action buttons, highlights |
| Background | `#F8FAFC` | Page background, cards |
| Text | `#1E40AF` | Body text, paragraphs |

**CSS Variables:**
```css
:root {
  --color-primary: #1E3A8A;
  --color-secondary: #3B82F6;
  --color-cta: #CA8A04;
  --color-background: #F8FAFC;
  --color-text: #1E40AF;
}
```

**Tailwind Config:**
```javascript
colors: {
  brand: {
    primary: '#1E3A8A',
    secondary: '#3B82F6',
    cta: '#CA8A04',
    background: '#F8FAFC',
    text: '#1E40AF',
  }
}
```

## Typography

**Source:** Modern Professional pairing

| Element | Font | Weight | Usage |
|---------|------|--------|-------|
| Headings | Poppins | 600-700 | H1, H2, H3, buttons |
| Body | Open Sans | 400-500 | Paragraphs, descriptions |

**Google Fonts Import:**
```css
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700&family=Poppins:wght@400;500;600;700&display=swap');
```

**Tailwind Config:**
```javascript
fontFamily: {
  heading: ['Poppins', 'sans-serif'],
  body: ['Open Sans', 'sans-serif'],
}
```

## UI Style

**Recommended:** Glassmorphism + generous whitespace

**Characteristics:**
- Semi-transparent cards with subtle blur
- Soft shadows (not harsh)
- Generous padding and margins (luxury = space)
- Rounded corners (8-12px)
- Gold accents on navy backgrounds

**CSS for Glassmorphism:**
```css
.glass-card {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 12px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
}
```

## Components

### Primary Button (CTA)
```css
.btn-primary {
  background: #CA8A04;
  color: white;
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  padding: 12px 24px;
  border-radius: 8px;
  transition: all 0.3s ease;
}
.btn-primary:hover {
  background: #B47D04;
  transform: translateY(-2px);
}
```

### Secondary Button
```css
.btn-secondary {
  background: transparent;
  color: #1E3A8A;
  border: 2px solid #1E3A8A;
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  padding: 12px 24px;
  border-radius: 8px;
}
```

### Card
```css
.card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 20px rgba(30, 58, 138, 0.1);
}
```

## Page Structure (Landing Page)

**Source:** Landing page domain recommendations

1. **Hero Section**
   - Full-width background image (mobile bar setup)
   - Headline: "Elevate Your Event"
   - Subheadline: Premium mobile bar service description
   - CTA button: "Get a Quote"

2. **Services Section**
   - 3-4 service cards (glassmorphism style)
   - Icons + brief descriptions
   - "Learn More" links

3. **Social Proof**
   - Testimonials (carousel or grid)
   - Logos of venues/partners

4. **Pricing/Calculator**
   - Interactive pricing calculator
   - Clear packages

5. **Contact/CTA Section**
   - Contact form
   - Final CTA
   - Footer with links

## Accessibility

- Contrast ratio: Navy on white = 7.2:1 (AAA)
- Gold on navy = 4.5:1 (AA)
- Focus states: 2px outline in secondary blue
- Minimum touch target: 44x44px

## Query Commands

To refresh design intelligence:

```bash
# Color palettes
python3 skills/ui-ux-pro-max/scripts/search.py "luxury hospitality" --domain color

# Typography
python3 skills/ui-ux-pro-max/scripts/search.py "elegant professional" --domain typography

# UI styles
python3 skills/ui-ux-pro-max/scripts/search.py "glassmorphism premium" --domain style

# Landing structure
python3 skills/ui-ux-pro-max/scripts/search.py "service business" --domain landing

# Stack-specific
python3 skills/ui-ux-pro-max/scripts/search.py "react tailwind" --stack react
```

---
*Design system validated by UI-UX Pro Max v2.2.1*
