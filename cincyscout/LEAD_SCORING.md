# CincyScout Lead Scoring Algorithm

## Overview
The lead scoring system evaluates potential leads from social platforms and assigns a score from 0-100. Leads scoring 90+ are considered "hot leads" requiring immediate action.

---

## Scoring Categories

### 1. Location Proximity (Max: 25 points)

| Criteria | Points |
|----------|--------|
| Cincinnati city limits | 25 |
| Northern Kentucky (NKY) | 25 |
| Within 15 miles of Cincinnati | 20 |
| Within 30 miles of Cincinnati | 15 |
| Within 50 miles of Cincinnati | 10 |
| Ohio/Indiana/Kentucky tri-state | 5 |
| Outside region | 0 |

**Keywords that boost location score:**
- "Cincinnati", "Cincy", "513"
- "Northern Kentucky", "NKY", "Covington", "Newport", "Florence"
- "Hamilton", "Mason", "West Chester", "Loveland", "Milford"
- "Hyde Park", "Oakley", "Clifton", "Mount Adams", "OTR"

---

### 2. Event Type Match (Max: 25 points)

| Event Type | Points | Why It Matters |
|------------|--------|----------------|
| Wedding | 25 | Premium service, high budget |
| Corporate event | 25 | Recurring business, professional |
| Private party (50+ guests) | 20 | Good revenue potential |
| Private party (25-50 guests) | 15 | Moderate potential |
| Private party (<25 guests) | 10 | Lower priority |
| Fundraiser/Gala | 20 | Networking opportunity |
| Holiday party | 20 | Seasonal high demand |
| Birthday/Anniversary | 15 | Moderate potential |
| Graduation party | 15 | Seasonal opportunity |

**Keywords by Event Type:**

**Wedding (25 pts):**
- "getting married", "wedding", "bride", "groom", "fiancé", "engagement"
- "wedding reception", "wedding venue", "wedding planner"
- "bachelorette party", "bridal shower"

**Corporate (25 pts):**
- "company event", "corporate event", "business event"
- "team building", "holiday party", "office party"
- "networking event", "product launch", "grand opening"
- "client appreciation", "employee appreciation"

**Private Party (varies):**
- "house party", "backyard party", "birthday party"
- "anniversary party", "graduation party", "retirement party"
- "need a bartender", "hiring bartender", "bartender for hire"

---

### 3. Timeline Urgency (Max: 25 points)

| Timeline | Points | Action Priority |
|----------|--------|-----------------|
| Event in < 2 weeks | 25 | 🔥 URGENT - Immediate outreach |
| Event in 2-4 weeks | 20 | 🔥 Hot lead - Contact within 24h |
| Event in 1-2 months | 15 | Warm lead - Contact within 48h |
| Event in 2-3 months | 10 | Nurture - Contact within week |
| Event in 3-6 months | 5 | Long-term nurture |
| Event > 6 months | 2 | Very low priority |
| No timeline mentioned | 0 | Requires discovery |

**Date Detection Patterns:**
- Explicit dates: "June 15th", "07/04/2025", "next month"
- Relative dates: "this summer", "next weekend", "in two weeks"
- Seasonal: "this fall", "next spring", "holiday season"

---

### 4. Budget Indicators (Max: 15 points)

| Indicator | Points |
|-----------|--------|
| "Open bar" mentioned | 15 |
| "Full bar" mentioned | 15 |
| "Premium" / "Top shelf" | 10 |
| "Craft cocktails" | 10 |
| "Signature drinks" | 10 |
| Guest count 100+ | 10 |
| Guest count 50-100 | 8 |
| Guest count 25-50 | 5 |
| "Budget-friendly" / "Cheap" | -5 |
| "DIY" bar mentioned | -10 |

---

### 5. Engagement/Intent Signals (Max: 10 points)

| Signal | Points |
|--------|--------|
| "Need recommendations" | 10 |
| "Looking for" + bartender/service | 10 |
| "Hiring" / "Seeking" | 10 |
| "Help!" / "Desperate" | 8 |
| "Anyone know" + service | 8 |
| "Recommendations welcome" | 5 |
| Asking about pricing/cost | 5 |
| Just sharing ideas (no intent) | 0 |

---

## Hot Lead Criteria (90+ Points)

A lead scores 90+ when it has:
- ✅ Strong location match (20-25 pts)
- ✅ Wedding or corporate event (25 pts)
- ✅ Urgent timeline (20-25 pts)
- ✅ Budget indicators (10-15 pts)
- ✅ Clear intent signals (5-10 pts)

### Examples of Hot Leads:

**Example 1: Hot Wedding Lead (95 pts)**
> "Getting married in Cincinnati next month! Looking for a bartender for our reception. Expecting about 100 guests, want to do an open bar with craft cocktails. Any recommendations?"

- Location: Cincinnati (25 pts)
- Event: Wedding (25 pts)
- Timeline: Next month (15 pts)
- Budget: Open bar + craft cocktails (15 pts)
- Intent: Looking for recommendations (10 pts)
- Guest count: 100+ (5 pts)
- **TOTAL: 95 points** 🔥

**Example 2: Hot Corporate Lead (92 pts)**
> "Planning a company holiday party in Northern Kentucky for 150 employees. Need bartending service for Dec 15th. Full bar preferred. Please DM me!"

- Location: NKY (25 pts)
- Event: Corporate holiday party (25 pts)
- Timeline: Specific date (20 pts)
- Budget: Full bar for 150 (15 pts)
- Intent: "Please DM me" (7 pts)
- **TOTAL: 92 points** 🔥

**Example 3: Warm Lead (78 pts)**
> "Thinking about having a backyard party this summer in Mason. Maybe 30 people. Considering hiring a bartender but might just do BYOB. Thoughts?"

- Location: Mason (20 pts)
- Event: Private party (15 pts)
- Timeline: This summer (5 pts)
- Budget: Might do BYOB (-10 pts)
- Guest count: 30 (5 pts)
- Intent: "Thoughts?" (3 pts)
- **TOTAL: 38 points** ❄️

---

## Lead Categories

| Score Range | Category | Action |
|-------------|----------|--------|
| 90-100 | 🔥 HOT LEAD | Immediate notification + manual outreach within 2 hours |
| 75-89 | 🟡 WARM LEAD | Daily digest + outreach within 24 hours |
| 50-74 | 🟢 QUALIFIED | Weekly digest + outreach within week |
| 25-49 | ⚪ COLD | Monthly report + add to nurture sequence |
| 0-24 | ❄️ DISCARD | No action / automated only |

---

## Algorithm Implementation

### Python Pseudocode

```python
class LeadScorer:
    def __init__(self):
        self.location_keywords = {
            'cincinnati': 25, 'cincy': 25, '513': 25,
            'northern kentucky': 25, 'nky': 25, 'covington': 25,
            'hamilton': 20, 'mason': 20, 'west chester': 20,
            'hyde park': 20, 'oakley': 20, 'otr': 20
        }
        
        self.event_weights = {
            'wedding': 25, 'corporate': 25, 'company': 25,
            'private_party_large': 20, 'private_party_medium': 15,
            'fundraiser': 20, 'holiday_party': 20
        }
    
    def score_location(self, text):
        text_lower = text.lower()
        for keyword, points in self.location_keywords.items():
            if keyword in text_lower:
                return points
        return 0
    
    def score_event_type(self, text):
        text_lower = text.lower()
        if any(word in text_lower for word in ['wedding', 'married', 'bride', 'groom']):
            return 25
        if any(word in text_lower for word in ['corporate', 'company', 'business', 'office']):
            return 25
        # ... more logic
        return 0
    
    def score_timeline(self, text):
        # Parse dates and relative time expressions
        # Return points based on urgency
        pass
    
    def score_budget(self, text):
        text_lower = text.lower()
        score = 0
        if 'open bar' in text_lower:
            score += 15
        if 'craft cocktail' in text_lower:
            score += 10
        # ... more logic
        return score
    
    def score_intent(self, text):
        text_lower = text.lower()
        if 'need recommendations' in text_lower or 'looking for' in text_lower:
            return 10
        # ... more logic
        return 0
    
    def calculate_score(self, lead_data):
        text = lead_data['title'] + ' ' + lead_data.get('body', '')
        
        score = 0
        score += self.score_location(text)
        score += self.score_event_type(text)
        score += self.score_timeline(text)
        score += self.score_budget(text)
        score += self.score_intent(text)
        
        return min(score, 100)  # Cap at 100
    
    def categorize(self, score):
        if score >= 90:
            return 'HOT'
        elif score >= 75:
            return 'WARM'
        elif score >= 50:
            return 'QUALIFIED'
        elif score >= 25:
            return 'COLD'
        else:
            return 'DISCARD'
```

---

## Scoring Adjustments

### Positive Multipliers
- Multiple intent signals: +10%
- Specific venue mentioned: +5
- Previous engagement with 513 Sips: +15

### Negative Factors
- "Already booked" mentioned: -50
- "Found someone" mentioned: -100 (discard)
- Budget concerns emphasized: -10
- Very small event (<15 people): -10

---

## Continuous Improvement

Track conversion rates by score range and adjust weights:
- If 80-89 leads convert at same rate as 90+, lower hot threshold
- If certain keywords consistently lead to bookings, increase their weight
- Review and recalibrate monthly based on actual outcomes

---

## Integration with Notification System

```
IF score >= 90:
    → Immediate SMS/Email alert
    → Add to hot leads dashboard
    → Schedule follow-up reminder (2 hours)
    
ELIF score >= 75:
    → Add to daily digest
    → Queue for outreach (24h)
    
ELIF score >= 50:
    → Add to weekly report
    → Queue for outreach (1 week)
    
ELSE:
    → Archive for pattern analysis only
```
