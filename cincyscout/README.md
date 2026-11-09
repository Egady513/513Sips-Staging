# CincyScout

**Social Lead Intelligence Tool for 513 Sips**

CincyScout monitors social platforms (Reddit, Facebook Groups, Nextdoor) for people in Cincinnati/Northern Kentucky posting about events that need bartending services.

---

## What It Does

- 🔍 **Scans** local social media for event planning discussions
- 🎯 **Scores** leads based on location, event type, timeline, and budget
- 🚨 **Alerts** Eddie immediately when hot leads (90+ score) are found
- 📊 **Reports** daily/weekly summaries of all opportunities

---

## Project Status

| Component | Status | Notes |
|-----------|--------|-------|
| Lead Scoring Algorithm | ✅ Complete | See LEAD_SCORING.md |
| Data Sources Research | ✅ Complete | See DATA_SOURCES.md |
| Notification System | ✅ Complete | See NOTIFICATIONS.md |
| Reddit API Integration | ⏳ Pending | Waiting for Eddie's credentials |
| Nextdoor API | ⏳ Pending | Application submitted |
| Facebook Monitoring | 🟡 Manual | Eddie to monitor groups |

---

## Quick Start

### For Eddie (Business Owner)

1. **Read SETUP_GUIDE.md** - Step-by-step instructions to get API credentials
2. **Get Reddit API credentials** - Highest priority for automated monitoring
3. **Apply for Nextdoor API** - Secondary data source
4. **Start manual Facebook monitoring** - Until automated solution found

### For Developers

```bash
# Install dependencies
pip install praw requests python-dateutil

# Run lead scorer on sample data
python lead_scorer.py --test

# Start monitoring (requires credentials)
python cincyscout.py --monitor
```

---

## Documentation

| File | Description |
|------|-------------|
| `LEAD_SCORING.md` | Complete scoring algorithm with examples |
| `DATA_SOURCES.md` | All available data sources and APIs |
| `SETUP_GUIDE.md` | Step-by-step setup instructions for Eddie |
| `NOTIFICATIONS.md` | Alert templates and notification system |
| `lead_scorer.py` | Python implementation of scoring algorithm |

---

## Lead Scoring Overview

Leads are scored 0-100 based on:

| Category | Max Points | Key Factors |
|----------|------------|-------------|
| Location | 25 | Cincinnati, NKY, surrounding areas |
| Event Type | 25 | Wedding, corporate, large private party |
| Timeline | 25 | Urgency (next month = highest) |
| Budget | 15 | Open bar, craft cocktails, guest count |
| Intent | 10 | "Looking for", "need recommendations" |

**Hot Lead Threshold:** 90+ points

---

## Data Sources

### Tier 1: Reddit (Primary)
- r/cincinnati (200K+ subscribers)
- r/NorthernKentucky
- Local subreddit network

### Tier 2: Nextdoor
- Public posts from Cincinnati neighborhoods
- Requires API approval

### Tier 3: Alternatives
- Eventbrite (corporate events)
- WeddingWire/The Knot (competitive intel)
- Facebook Groups (manual monitoring)

---

## Notification Channels

| Type | Trigger | Response Time |
|------|---------|---------------|
| 🔥 Hot Lead Alert | Score 90+ | Immediate SMS + Email |
| 🟡 Daily Digest | Score 50-89 | Daily at 8 AM |
| 📊 Weekly Report | All activity | Monday at 9 AM |

---

## Next Steps

1. **Eddie gets Reddit API credentials** (see SETUP_GUIDE.md)
2. **Charlie implements Reddit monitoring**
3. **Test with sample posts**
4. **Go live and start capturing leads**

---

## Contact

Questions? Contact Charlie or Eddie at 513 Sips.
