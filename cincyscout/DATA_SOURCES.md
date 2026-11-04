# CincyScout Data Sources

## Overview
This document outlines all available data sources for lead generation for 513 Sips, including free and paid options, API vs scraping approaches, and implementation difficulty.

---

## Tier 1: Reddit (Recommended - Await API)

### Official Reddit API (PRAW)
**Status:** ⏳ Awaiting Eddie's credentials
**Cost:** Free (with rate limits)
**Difficulty:** Easy
**Data Quality:** High

**What we can access:**
- r/cincinnati (200K+ subscribers)
- r/NorthernKentucky
- r/cincinnati/wiki/localsubs (local subreddit directory)
- Wedding-related posts
- Event planning discussions
- "Need a bartender" / "planning an event" keywords

**Implementation:**
- Python library: `praw`
- Requires: client_id, client_secret, user_agent
- Read-only mode available (no username/password needed for basic monitoring)

**Subreddits to Monitor:**
1. r/cincinnati - Main Cincinnati community
2. r/NorthernKentucky - NKY specific
3. r/weddings - General wedding discussions
4. r/weddingplanning - Planning discussions
5. r/cincinnatifood - Food/drink events

---

## Tier 2: Nextdoor API (Apply for Access)

### Nextdoor Search API
**Status:** 🔵 Available - Requires application
**Cost:** Free (requires approval)
**Difficulty:** Medium
**Data Quality:** High

**What we can access:**
- Public posts from Cincinnati neighborhoods
- Posts mentioning keywords: "wedding", "event", "party", "bartender"
- Marketplace listings for event services
- Local events

**Requirements:**
- Apply at: https://forms.gle/ub9nd2LacrLH4fJ67
- Business verification may be required
- OAuth2 authentication

**API Capabilities:**
- Search by lat/long + radius
- Filter by keywords and categories
- Get post metadata (title, description, reactions, comments)
- 30-day lookback on posts

---

## Tier 3: Alternative/Scraping Approaches

### Option A: Reddit Read-Only Scraping (No API)
**Status:** 🟡 Workaround available
**Cost:** Free
**Difficulty:** Medium
**Risk:** Medium (could break if Reddit changes)

**Approaches:**
1. **old.reddit.com** - Legacy interface, easier to scrape
2. **JSON endpoints** - Reddit provides `.json` suffix on any page
3. **Third-party services:**
   - ScrapingBee (paid, ~$49/mo)
   - Grepsr (managed scraping)
   - Pushshift (historical data, limited real-time)

**Example:**
```
https://www.reddit.com/r/cincinnati/new.json?limit=100
```

**Pros:** No API credentials needed
**Cons:** Fragile, against ToS, rate limited

---

### Option B: WeddingWire / The Knot
**Status:** 🟡 No official API, scraping possible
**Cost:** Free (scraping) / Paid (Apify actors)
**Difficulty:** Hard

**Options:**
1. **Apify Wedding Vendor Scraper** - $5-50/mo
   - Scrape vendor profiles, reviews, contact info
   - Not ideal for finding leads (more for competitive research)

2. **Registry Search** - Limited lead value
   - Find engaged couples by registry
   - WeddingWire Registry Finder available

**Verdict:** Better for competitive intelligence than lead generation

---

### Option C: Eventbrite API
**Status:** 🟢 Available
**Cost:** Free tier available
**Difficulty:** Easy
**Data Quality:** Medium

**What we can access:**
- Public events in Cincinnati area
- Corporate/business events
- Event details, dates, venues

**Limitations:**
- Doesn't show private events
- No host contact info (usually)
- Better for market research than direct leads

**API Endpoint:**
```
https://www.eventbriteapi.com/v3/events/search/
?location.latitude=39.1031
&location.longitude=-84.5120
&location.within=50mi
&categories=110
```

---

### Option D: Facebook Groups (Manual/Scraping)
**Status:** 🔴 Difficult
**Cost:** Free to expensive
**Difficulty:** Hard

**Challenges:**
- Facebook Graph API severely restricted since 2018
- Group posts require user authentication
- Scraping against ToS, actively blocked

**Potential Workarounds:**
1. **Manual monitoring** - Eddie checks groups daily
2. **Facebook Business Suite** - Limited keyword monitoring
3. **Paid tools:**
   - Brand24 ($99/mo)
   - Mention ($41/mo)
   - Hootsuite Insights

**Cincinnati Groups to Monitor:**
- Cincy Event Planning (facebook.com/cincyeventplanning)
- Cincinnati Wedding Professionals
- NKY Community Groups
- Local Buy/Sell/Trade groups (often have event posts)

---

## Tier 4: Manual/Community Sources

### Local Wedding Vendor Networks
**Approach:** Partner with complementary vendors
**Cost:** Time/relationship building
**Difficulty:** Low

**Partners to pursue:**
- Wedding planners (referral exchange)
- Venues (preferred vendor list)
- Caterers (package deals)
- Photographers (vendor network)

### Cincinnati Wedding Expos
**Approach:** Attend/Exhibit
**Cost:** $200-1000 per expo
**Difficulty:** Low

**Major Expos:**
- Cincinnati Wedding Show (Duke Energy Center)
- Bridal Show at various venues

### Local Business Networks
- Cincinnati Chamber of Commerce
- NKY Chamber
- Local business meetups (Eventbrite, Meetup.com)

---

## Recommended Implementation Priority

### Phase 1 (Immediate - No API Needed)
1. ✅ Build lead scoring algorithm
2. ✅ Create notification templates
3. ✅ Set up data structure for storing leads
4. 🔵 Apply for Nextdoor API access

### Phase 2 (Requires Eddie's Action)
1. 🔴 Get Reddit API credentials (see SETUP_GUIDE.md)
2. 🟡 Implement Reddit monitoring (PRAW or JSON scraping)
3. 🟡 Set up Eventbrite monitoring for corporate events

### Phase 3 (Expansion)
1. 🟡 Implement Nextdoor API (once approved)
2. 🟡 Evaluate paid tools (Brand24, Apify)
3. 🟢 Manual Facebook Group monitoring (Eddie task)

---

## Cost Summary

| Source | Monthly Cost | Setup Difficulty | Lead Quality |
|--------|--------------|------------------|--------------|
| Reddit API | Free | Easy | High |
| Nextdoor API | Free | Medium | High |
| Reddit Scraping | Free | Medium | Medium |
| Eventbrite API | Free | Easy | Low-Medium |
| Apify (WeddingWire) | $5-50 | Easy | Low |
| Brand24 | $99 | Easy | Medium |
| ScrapingBee | $49 | Medium | Medium |

---

## Next Steps

1. **Immediate:** Eddie to get Reddit API credentials
2. **This week:** Apply for Nextdoor API
3. **Backup plan:** Implement Reddit JSON scraping as fallback
4. **Parallel:** Set up Eventbrite monitoring for corporate events
5. **Ongoing:** Manual Facebook Group monitoring until better solution found
