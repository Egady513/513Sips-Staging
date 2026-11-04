# LeadScout - Sales Intelligence Dashboard

**LeadScout** is a sales intelligence dashboard for 513 Sips mobile bar service, focused on identifying and tracking hot leads in the Cincinnati area.

## Overview

LeadScout helps you:
- **Discover** local businesses with upcoming events
- **Score** leads by likelihood to book (Hot Score)
- **Track** pipeline stages and activity
- **Prioritize** your outreach efforts

## Current Status

This is a **prototype** using demo data. All leads shown are fictional examples to demonstrate the UX.

## Features

### Lead List View
- Filter by Hot Score (90+, 75-89, 50-74), Business Type, Territory, Pipeline Stage
- Sort by Hot Score, Date Found, or Event Date
- Visual lead cards with color-coded scores
- Quick stats dashboard

### Lead Detail View
- Business information (address, phone, website)
- Contact person details
- "Why This Lead is Hot" intelligence
- Suggested talking points for sales calls
- Activity history tracking
- Pipeline stage management

## Demo Data

The prototype includes 15 sample leads across Cincinnati:
- **Restaurants**: Stone Bowl, Echo, Proud Rooster, O'Bryonville Bar & Grill, Mt Lookout Tavern
- **Venues**: Hyde Park Golf & Country Club, Woman's City Club, Oakley Kitchen Food Hall
- **Corporate**: Paycor, Messer Construction, Cincinnati Children's Hospital, Kroger
- **Breweries**: Rhinegeist, MadTree Brewing
- **Hotels**: The Summit Hotel

Territories covered: Hyde Park, Oakley, Mt Lookout, Rookwood, Kenwood, O'Bryonville, Over-the-Rhine

## Connect Real Data

To power LeadScout with live intelligence:

### 1. Reddit API (PRAW)
Monitor local subreddits for event mentions:
- r/cincinnati
- r/HydePark
- Local neighborhood subreddits

**Look for:** "planning a party", "recommendations for caterers", "company event"

### 2. LinkedIn Sales Navigator
Track company updates:
- Hiring announcements (growth indicator)
- New office openings
- Company milestones
- Event postings

### 3. Google Alerts
Set up alerts for:
- "new restaurant opening Cincinnati"
- "company expansion Cincinnati"
- "corporate event planning"

### 4. Google Places API
Enrich lead data:
- Business details and hours
- Contact information
- Reviews and ratings
- Photos

### 5. Local News APIs
Monitor for:
- Business expansions
- New business licenses
- Event announcements
- Corporate relocations

## File Structure

```
leadscout/
├── index.html      # Main dashboard
├── styles.css      # 513 Sips design system
├── app.js          # Interactivity and data
└── README.md       # This file
```

## Design System

LeadScout uses the 513 Sips design system:
- **Navy**: #0A1628 (primary background)
- **Gold**: #D4AF37 (accents, highlights)
- **Cream**: #FAF8F3 (text)
- **Hot Red**: #EF4444 (90+ scores)
- **Warm Orange**: #F97316 (75-89 scores)
- **Cool Yellow**: #EAB308 (50-74 scores)

## Next Steps

1. **Add real data source** (start with manual CSV import)
2. **Integrate Reddit monitoring** for automated lead discovery
3. **Add email/CRM integration** for activity tracking
4. **Build lead scoring algorithm** based on:
   - Event timeline proximity
   - Business type match
   - Social media activity
   - Previous interactions
5. **Add map view** for territory planning

## Usage

Open `index.html` in a browser to view the dashboard. Click any lead card to see detailed information.

---

*Built for 513 Sips - Elevating Cincinnati events, one sip at a time.*
