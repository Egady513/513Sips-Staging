# CincyScout Notification System

## Overview
This document defines the notification system for alerting Eddie when hot leads are identified through social monitoring.

---

## Notification Types

### 1. 🔥 Hot Lead Alert (90+ Score)

**Trigger:** Lead scores 90-100 points
**Delivery:** Immediate (within 5 minutes of detection)
**Channels:** SMS + Email + Telegram

#### SMS Template
```
🔥 HOT LEAD - 513 Sips

Wedding inquiry from r/cincinnati
Score: 95/100

"Getting married next month, need bartender for 100 guests, open bar..."

Reply link: [short URL to full post]
Contact within 2 hrs for best chance!
```

#### Email Template
```
Subject: 🔥 Hot Lead Alert - Wedding in Cincinnati (Score: 95)

New hot lead detected!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
LEAD DETAILS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Source: Reddit - r/cincinnati
Posted: March 12, 2026 at 2:34 PM
Score: 95/100 🔥

Original Post:
"Getting married in Cincinnati next month! Looking for a bartender 
for our reception. Expecting about 100 guests, want to do an open 
bar with craft cocktails. Any recommendations?"

Scoring Breakdown:
✅ Location: Cincinnati (25 pts)
✅ Event: Wedding (25 pts)
✅ Timeline: Next month (15 pts)
✅ Budget: Open bar + craft cocktails (15 pts)
✅ Intent: Looking for recommendations (10 pts)
✅ Guest count: 100+ (5 pts)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ACTION REQUIRED
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⏰ Respond within: 2 hours
💬 Suggested response: See below
🔗 Direct link: https://reddit.com/r/cincinnati/comments/...

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SUGGESTED RESPONSE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Hi [username]! Congratulations on your upcoming wedding! 🎉

I'm Eddie with 513 Sips - we specialize in craft cocktail bartending 
for weddings in the Cincinnati area. We'd love to help make your 
special day amazing!

A few quick questions:
- What's your venue?
- Do you have a date locked in?
- Any specific cocktail preferences?

You can see our work at 513sips.com or DM me here!

Best,
Eddie
513 Sips

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Reply to this email to log your response
```

---

### 2. 🟡 Daily Digest (Warm Leads)

**Trigger:** Once daily at 8:00 AM
**Delivery:** Email
**Includes:** All leads scoring 50-89 from past 24 hours

#### Email Template
```
Subject: 🟡 CincyScout Daily Digest - 3 Warm Leads

Good morning Eddie!

Here are yesterday's leads worth following up on:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔥 HOT LEADS (90+) - 0 new
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
No hot leads yesterday. Check spam folder if you expected alerts.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🟡 WARM LEADS (75-89) - 2 new
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Lead #1 - Score: 82
Source: Reddit r/cincinnati
Type: Corporate holiday party
Timeline: December (9 months out)
Budget: Full bar mentioned
Action: Contact within 24h
[View Details] [Mark Contacted]

Lead #2 - Score: 78
Source: Reddit r/NorthernKentucky
Type: Private party (40 guests)
Timeline: "This summer"
Budget: Moderate
Action: Contact within 48h
[View Details] [Mark Contacted]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📊 STATS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Total leads scanned: 247
Matches found: 3
Conversion opportunity: Medium

View full dashboard →
```

---

### 3. 📊 Weekly Report

**Trigger:** Every Monday at 9:00 AM
**Delivery:** Email
**Includes:** Full week summary, trends, recommendations

#### Email Template
```
Subject: 📊 CincyScout Weekly Report - March 3-9, 2026

Weekly Lead Intelligence Report for 513 Sips

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📈 WEEK AT A GLANCE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Total Leads Monitored: 1,847
Qualified Leads Found: 12
Hot Leads (90+): 2
Warm Leads (75-89): 4
Qualified (50-74): 6

Response Rate: 50% (6/12 contacted)
Conversion Rate: 17% (1 booking from leads)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔥 TOP OPPORTUNITIES THIS WEEK
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. Wedding - June 2026 - Cincinnati (Score: 95)
   Status: Contacted, awaiting response
   Value potential: $2,000-3,000

2. Corporate Event - December 2026 - NKY (Score: 92)
   Status: Hot lead, contact ASAP
   Value potential: $1,500-2,500

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
💡 INSIGHTS & RECOMMENDATIONS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎯 Trending Keywords:
- "Craft cocktails" (mentioned 5 times)
- "Open bar" (mentioned 4 times)
- "Signature drinks" (mentioned 3 times)

📍 Hot Neighborhoods:
- Hyde Park/Oakley (4 leads)
- Northern Kentucky (3 leads)
- Mason/West Chester (2 leads)

💰 Budget Trends:
- 60% of leads mentioned open/premium bar
- Average guest count: 75 people
- Peak booking months: June, September, December

🎯 Recommended Actions:
1. Follow up on 2 pending leads from last week
2. Post in r/cincinnati offering "Spring wedding planning tips"
3. Consider running promotion for weekday events

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📅 UPCOMING FOLLOW-UPS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Today: Follow up with Sarah M. (wedding inquiry)
Tomorrow: Check in with Corporate Events Inc.
This Week: Send proposal to 2 warm leads

View full dashboard →
```

---

## Notification Configuration

### Priority Matrix

| Lead Score | Notification | Response Time | Channel |
|------------|--------------|---------------|---------|
| 90-100 | 🔥 Immediate | 2 hours | SMS + Email |
| 75-89 | 🟡 Daily digest | 24 hours | Email |
| 50-74 | 🟢 Weekly report | 1 week | Email |
| <50 | ⚪ No notification | N/A | Dashboard only |

### Quiet Hours

**Default:** No notifications between 10:00 PM - 7:00 AM
**Hot leads during quiet hours:** Queue for 7:00 AM delivery unless marked "URGENT"

### Notification Fatigue Prevention

- Maximum 3 hot lead SMS alerts per day
- If limit exceeded, switch to email-only for remaining
- Weekly summary always sent regardless of volume

---

## Lead Response Tracking

### Status Workflow

```
DETECTED → NOTIFIED → CONTACTED → RESPONDED → QUOTED → BOOKED/LOST
    ↓           ↓           ↓           ↓          ↓
  [Auto]    [Auto]    [Manual]    [Manual]   [Manual]
```

### Status Definitions

| Status | Description | Action |
|--------|-------------|--------|
| `DETECTED` | Lead found by scanner | Auto |
| `NOTIFIED` | Alert sent to Eddie | Auto |
| `CONTACTED` | Eddie reached out | Manual - Update via reply |
| `RESPONDED` | Lead replied | Manual - Update via dashboard |
| `QUOTED` | Proposal sent | Manual |
| `BOOKED` | Event secured! | Manual - Track revenue |
| `LOST` | Not converting | Manual - Note reason |
| `DISQUALIFIED` | False positive | Manual |

### Updating Lead Status

**Via Email Reply:**
Reply to any lead notification with:
- `CONTACTED` - Mark as contacted
- `BOOKED` - Mark as won
- `LOST` - Mark as lost
- `DISQUALIFY` - Remove from pipeline

**Via Dashboard:**
Click status dropdown on any lead to update

---

## Implementation Notes

### Technical Requirements

1. **Email Service:** SendGrid or AWS SES
2. **SMS Service:** Twilio
3. **Queue System:** Redis or similar for notification batching
4. **Database:** PostgreSQL for lead storage
5. **Scheduler:** Cron or Celery for digests

### Notification Templates Location

```
/cincyscout/
  /templates/
    /email/
      hot_lead.html
      daily_digest.html
      weekly_report.html
    /sms/
      hot_lead.txt
    /telegram/
      hot_lead.md
```

### Testing Notifications

Test command:
```bash
python cincyscout.py --test-notification --lead-id=123
```

This sends test notifications through all channels without marking as real.

---

## Future Enhancements

### Phase 2 Features
- [ ] AI-generated response suggestions
- [ ] Calendar integration (auto-block tentative dates)
- [ ] CRM integration (HubSpot, Salesforce)
- [ ] Competitor mention alerts
- [ ] Sentiment analysis on responses
- [ ] Automated follow-up reminders

### Phase 3 Features
- [ ] Predictive lead scoring (ML-based)
- [ ] Auto-responder for common questions
- [ ] Integration with 513sips.com booking form
- [ ] Revenue attribution tracking
