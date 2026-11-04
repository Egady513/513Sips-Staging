# CincyScout Setup Guide

## Overview
This guide walks Eddie through completing the CincyScout integration. Follow these steps to get the lead monitoring system fully operational.

---

## Phase 1: Reddit API Setup (HIGHEST PRIORITY)

The Reddit API is our highest-value data source. This is required to monitor r/cincinnati and other local subreddits.

### Step 1: Create a Reddit Account
1. Go to https://www.reddit.com/
2. Click "Sign Up" (if you don't already have an account)
3. Use a professional username (e.g., "513SipsBot" or "CincyScout")
4. Verify your email address

### Step 2: Create a Reddit App
1. Go to https://www.reddit.com/prefs/apps/
2. Scroll down to "Developed Applications" section
3. Click "create another app..."
4. Fill in the form:
   - **Name:** `CincyScout Lead Monitor`
   - **App type:** Select `script` (for personal use)
   - **Description:** `Monitoring local subreddits for event planning leads`
   - **About URL:** (leave blank or use 513sips.com)
   - **Redirect URI:** `http://localhost:8080` (required even for scripts)
5. Click "create app"

### Step 3: Get Your Credentials
After creating the app, you'll see:

```
CincyScout Lead Monitor
personal use script
<random_string_here>   ← This is your CLIENT_ID
secret: <longer_random_string>   ← This is your CLIENT_SECRET
```

**Write these down!** You'll need:
- `client_id` (14+ character string under the app name)
- `client_secret` (27+ character string next to "secret:")
- Your Reddit username
- Your Reddit password

### Step 4: Send Credentials to Charlie
Send these securely (Telegram is fine):
```
Reddit API Credentials:
- Client ID: [paste here]
- Client Secret: [paste here]
- Username: [your Reddit username]
- Password: [your Reddit password]
```

---

## Phase 2: Nextdoor API Application

Nextdoor has a public API that can access posts from Cincinnati neighborhoods.

### Step 1: Apply for Access
1. Go to: https://forms.gle/ub9nd2LacrLH4fJ67
2. Fill out the application form:
   - **Company:** 513 Sips / Elevated Ventures EG, LLC
   - **Use Case:** "Monitoring local neighborhood discussions for event planning and bartending service requests in the Cincinnati/Northern Kentucky area"
   - **Intended Features:** Search API for public posts
3. Submit the form

### Step 2: Wait for Approval
- Approval typically takes 1-2 weeks
- You'll receive an email with API credentials
- Forward these to Charlie when received

---

## Phase 3: Facebook Groups (Manual Monitoring)

Unfortunately, Facebook's API is very restricted for group content. We'll need a manual approach.

### Groups to Monitor

Join these Facebook groups and check them regularly:

**Event Planning:**
- [Cincy Event Planning](https://www.facebook.com/cincyeventplanning/)
- The Perfect Party Planner
- Cincinnati Wedding Professionals

**Local Community:**
- Cincinnati Buy/Sell/Trade groups
- Northern Kentucky Community groups
- Hyde Park, Oakley, Clifton neighborhood groups

### Manual Process
1. Check each group 2-3 times per week
2. Search for keywords: "bartender", "wedding", "party", "event"
3. When you find a relevant post:
   - Screenshot or copy the post
   - Send to Charlie for lead scoring
   - Or manually enter into lead tracker

### Alternative: Paid Monitoring Tools
If budget allows, these tools can monitor Facebook:
- **Brand24** ($99/mo) - Social listening across platforms
- **Mention** ($41/mo) - Brand monitoring
- **Hootsuite Insights** (varies)

**Eddie Decision Needed:** Are you willing to invest $50-100/mo for automated Facebook monitoring?

---

## Phase 4: Eventbrite API (Optional)

Good for finding corporate events, but lower lead quality.

### Step 1: Get API Key
1. Go to https://www.eventbrite.com/platform/api/
2. Sign in with your Eventbrite account (or create one)
3. Navigate to "API Keys"
4. Create a new API key
5. Copy the "Private Token"

### Step 2: Send to Charlie
Send the private token for integration.

---

## Phase 5: Configuration Decisions

### Notification Preferences

**How do you want to be notified of hot leads?**

| Option | Pros | Cons |
|--------|------|------|
| **Email** | Easy to track, non-intrusive | Might miss urgent leads |
| **SMS/Text** | Immediate attention | Could be annoying if too many |
| **Telegram** | Already using, organized | Requires checking app |
| **Dashboard only** | No spam | Must remember to check |

**Recommendation:** Email for daily/weekly digests, SMS only for 90+ hot leads

### Lead Response Time Commitment

**How quickly can you respond to leads?**

- 🔥 Hot leads (90+): Ideally within 2 hours
- 🟡 Warm leads (75-89): Within 24 hours
- 🟢 Qualified (50-74): Within 1 week

**Be realistic** - if you can't respond within 2 hours consistently, we should adjust the hot lead threshold to only the most urgent cases.

### Geographic Boundaries

**How far will you travel for events?**

Current scoring assumes:
- Cincinnati city: Full points
- NKY: Full points
- Within 15 miles: High priority
- Within 30 miles: Medium priority
- 30-50 miles: Lower priority

**Confirm your service area:**
- [ ] Cincinnati city limits
- [ ] All of Hamilton County
- [ ] Northern Kentucky (Boone, Campbell, Kenton counties)
- [ ] Butler/Warren counties
- [ ] Indiana border areas
- [ ] Other: ___________

---

## Phase 6: Testing & Go-Live

### Test Checklist

Once Charlie implements the monitoring:

- [ ] Reddit API connection successful
- [ ] Test lead scoring with sample posts
- [ ] Notification delivery working (email/SMS)
- [ ] Dashboard accessible
- [ ] Sample hot lead identified and sent

### Soft Launch (Week 1)
- Monitor only, no outreach
- Verify lead quality is good
- Tune scoring algorithm based on false positives

### Full Launch (Week 2+)
- Begin outreach to hot leads
- Track response rates
- Adjust based on results

---

## Information Checklist for Eddie

Please provide the following to complete setup:

### Required (for Reddit API):
- [ ] Reddit client_id
- [ ] Reddit client_secret
- [ ] Reddit username
- [ ] Reddit password

### Optional (enhances functionality):
- [ ] Nextdoor API credentials (when approved)
- [ ] Eventbrite API key
- [ ] Preferred notification method
- [ ] Service area confirmation
- [ ] Response time commitment

### Budget Decisions:
- [ ] Willing to pay for Facebook monitoring tools? ($50-100/mo)
- [ ] Willing to pay for Reddit scraping backup? ($49/mo for ScrapingBee)
- [ ] Any other paid tools you're interested in?

---

## Timeline

| Phase | Task | ETA | Status |
|-------|------|-----|--------|
| 1 | Reddit API credentials | Eddie to complete | ⏳ Pending |
| 2 | Nextdoor API application | Eddie to complete | ⏳ Pending |
| 3 | Facebook group list | Eddie to confirm | ⏳ Pending |
| 4 | Charlie implements Reddit monitoring | 1-2 days after credentials | ⏳ Waiting |
| 5 | Test & tune scoring | 1 week | ⏳ Waiting |
| 6 | Full launch | 1-2 weeks | ⏳ Waiting |

---

## Questions?

If any step is unclear, ask Charlie for help. This system will be a major competitive advantage for 513 Sips - let's get it running!

---

## Quick Reference: Reddit API Steps

1. Go to https://www.reddit.com/prefs/apps/
2. Click "create another app"
3. Select "script"
4. Name: "CincyScout Lead Monitor"
5. Redirect URI: `http://localhost:8080`
6. Click "create app"
7. Copy the client_id (under app name)
8. Copy the client_secret (next to "secret:")
9. Send both to Charlie along with your Reddit username/password

**That's it!** The rest Charlie will handle.
