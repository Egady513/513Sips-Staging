#!/usr/bin/env python3
"""
CincyScout Lead Scorer
Implements the lead scoring algorithm for 513 Sips
"""

import re
from datetime import datetime, timedelta
from typing import Dict, List, Tuple
from dataclasses import dataclass
from enum import Enum


class LeadCategory(Enum):
    HOT = "hot"           # 90-100
    WARM = "warm"         # 75-89
    QUALIFIED = "qualified"  # 50-74
    COLD = "cold"         # 25-49
    DISCARD = "discard"   # 0-24


@dataclass
class Lead:
    source: str           # e.g., "reddit", "nextdoor"
    subsource: str        # e.g., "r/cincinnati"
    title: str
    body: str
    author: str
    posted_at: datetime
    url: str
    score: int = 0
    category: LeadCategory = None
    scoring_breakdown: Dict = None


class LeadScorer:
    """Scores leads based on 513 Sips criteria"""
    
    def __init__(self):
        # Location keywords with scores
        self.location_keywords = {
            # Cincinnati - Full points
            'cincinnati': 25, 'cincy': 25, '513': 25,
            'queen city': 25, 'cinti': 25,
            
            # Northern Kentucky - Full points
            'northern kentucky': 25, 'nky': 25,
            'covington': 25, 'newport': 25, 'florence': 25,
            'fort thomas': 25, 'fort wright': 25, 'erlanger': 25,
            'independence': 25, 'union': 25, 'hebron': 25,
            
            # Hamilton County suburbs - High points
            'hamilton': 20, 'mason': 20, 'west chester': 20,
            'loveland': 20, 'milford': 20, 'fairfield': 20,
            'forest park': 20, 'springdale': 20,
            
            # Cincinnati neighborhoods - High points
            'hyde park': 20, 'oakley': 20, 'clifton': 20,
            'mount adams': 20, 'mt adams': 20, 'otr': 20,
            'over the rhine': 20, 'northside': 20, 'kenwood': 20,
            'blue ash': 20, 'montgomery': 20, 'madeira': 20,
            'mariemont': 20, 'terrace park': 20, 'indian hill': 20,
            
            # Nearby areas - Medium points
            'dayton': 10, 'middletown': 15, 'lebanon': 15,
            'monroe': 15, 'middletown': 15, 'fairfield': 15,
        }
        
        # Event type patterns
        self.event_patterns = {
            'wedding': {
                'keywords': ['wedding', 'getting married', 'bride', 'groom', 
                           'fiancé', 'fiance', 'engagement', 'reception',
                           'bachelorette', 'bridal shower', 'nuptials'],
                'score': 25
            },
            'corporate': {
                'keywords': ['corporate', 'company event', 'business event',
                           'team building', 'office party', 'networking event',
                           'product launch', 'grand opening', 'client appreciation',
                           'employee appreciation', 'holiday party', 'company party'],
                'score': 25
            },
            'fundraiser': {
                'keywords': ['fundraiser', 'charity event', 'benefit', 'auction',
                           'galas', 'nonprofit event'],
                'score': 20
            },
            'large_party': {
                'keywords': ['house party', 'backyard party', 'birthday party',
                           'anniversary party', 'graduation party', 'retirement party'],
                'score': 15
            }
        }
        
        # Budget indicators
        self.budget_indicators = {
            'open bar': 15,
            'full bar': 15,
            'premium': 10,
            'top shelf': 10,
            'craft cocktail': 10,
            'signature drink': 10,
            'custom cocktail': 10,
            'hosted bar': 15,
        }
        
        # Negative budget indicators
        self.budget_negatives = {
            'byob': -10,
            'bring your own': -10,
            'diy': -10,
            'budget friendly': -5,
            'cheap': -5,
            'affordable': -3,
        }
        
        # Intent signals
        self.intent_signals = {
            'need recommendations': 10,
            'looking for': 10,
            'seeking': 10,
            'hiring': 10,
            'need a bartender': 10,
            'need bartending': 10,
            'dm me': 10,
            'message me': 10,
            'please contact': 10,
            'help!': 8,
            'desperate': 8,
            'asap': 8,
            'urgent': 8,
            'anyone know': 8,
            'any recommendations': 8,
            'suggestions welcome': 5,
        }
        
        # Timeline patterns
        self.timeline_patterns = [
            (r'\bthis week\b|\bnext week\b', 25),
            (r'\bin (\d+) days?\b', 25),  # "in 3 days"
            (r'\bthis month\b', 20),
            (r'\bnext month\b', 15),
            (r'\bin (\d+) weeks?\b', 15),  # "in 2 weeks"
            (r'\bthis weekend\b', 25),
            (r'\bnext weekend\b', 20),
            (r'\bthis summer\b|\bnext summer\b', 10),
            (r'\bthis fall\b|\bnext fall\b', 10),
            (r'\bthis winter\b|\bnext winter\b', 10),
            (r'\bthis spring\b|\bnext spring\b', 10),
            (r'\bin (\d+) months?\b', 5),  # "in 3 months"
            (r'\bnext year\b', 2),
            # Specific date patterns
            (r'\b(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]* \d{1,2}(st|nd|rd|th)?\b', 20),
            (r'\b\d{1,2}/\d{1,2}/\d{2,4}\b', 20),
        ]
    
    def score_location(self, text: str) -> int:
        """Score based on location mentions"""
        text_lower = text.lower()
        for keyword, score in self.location_keywords.items():
            if keyword in text_lower:
                return score
        return 0
    
    def score_event_type(self, text: str) -> Tuple[int, str]:
        """Score based on event type"""
        text_lower = text.lower()
        max_score = 0
        event_type = "unknown"
        
        for event, data in self.event_patterns.items():
            for keyword in data['keywords']:
                if keyword in text_lower:
                    if data['score'] > max_score:
                        max_score = data['score']
                        event_type = event
                    break
        
        return max_score, event_type
    
    def score_timeline(self, text: str) -> int:
        """Score based on timeline urgency"""
        text_lower = text.lower()
        
        for pattern, score in self.timeline_patterns:
            if re.search(pattern, text_lower):
                return score
        
        # Check for specific dates (simplified)
        date_patterns = [
            r'\b(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]* \d{1,2}\b',
            r'\b\d{1,2}/\d{1,2}/\d{2,4}\b',
        ]
        for pattern in date_patterns:
            if re.search(pattern, text_lower):
                return 15  # Specific date mentioned
        
        return 0
    
    def score_budget(self, text: str) -> Tuple[int, int]:
        """Score based on budget indicators and guest count"""
        text_lower = text.lower()
        score = 0
        guest_count = 0
        
        # Positive indicators
        for indicator, points in self.budget_indicators.items():
            if indicator in text_lower:
                score += points
        
        # Negative indicators
        for indicator, points in self.budget_negatives.items():
            if indicator in text_lower:
                score += points
        
        # Extract guest count
        guest_patterns = [
            r'(\d+)\s*(?:guests?|people|attendees?)',
            r'(\d+)\s*(?:person|ppl)',
        ]
        for pattern in guest_patterns:
            match = re.search(pattern, text_lower)
            if match:
                count = int(match.group(1))
                guest_count = count
                if count >= 100:
                    score += 10
                elif count >= 50:
                    score += 8
                elif count >= 25:
                    score += 5
                break
        
        return score, guest_count
    
    def score_intent(self, text: str) -> int:
        """Score based on intent signals"""
        text_lower = text.lower()
        score = 0
        
        for signal, points in self.intent_signals.items():
            if signal in text_lower:
                score += points
                break  # Only count highest intent signal
        
        return score
    
    def calculate_score(self, lead: Lead) -> Lead:
        """Calculate total lead score"""
        text = f"{lead.title} {lead.body}"
        
        # Calculate individual scores
        location_score = self.score_location(text)
        event_score, event_type = self.score_event_type(text)
        timeline_score = self.score_timeline(text)
        budget_score, guest_count = self.score_budget(text)
        intent_score = self.score_intent(text)
        
        # Calculate total
        total_score = location_score + event_score + timeline_score + budget_score + intent_score
        total_score = min(total_score, 100)  # Cap at 100
        
        # Determine category
        if total_score >= 90:
            category = LeadCategory.HOT
        elif total_score >= 75:
            category = LeadCategory.WARM
        elif total_score >= 50:
            category = LeadCategory.QUALIFIED
        elif total_score >= 25:
            category = LeadCategory.COLD
        else:
            category = LeadCategory.DISCARD
        
        # Update lead
        lead.score = total_score
        lead.category = category
        lead.scoring_breakdown = {
            'location': location_score,
            'event_type': {'score': event_score, 'type': event_type},
            'timeline': timeline_score,
            'budget': {'score': budget_score, 'guest_count': guest_count},
            'intent': intent_score,
            'total': total_score
        }
        
        return lead
    
    def format_alert(self, lead: Lead) -> str:
        """Format a lead alert for notifications"""
        emoji = {
            LeadCategory.HOT: "🔥",
            LeadCategory.WARM: "🟡",
            LeadCategory.QUALIFIED: "🟢",
            LeadCategory.COLD: "⚪",
            LeadCategory.DISCARD: "❄️"
        }
        
        sb = lead.scoring_breakdown
        
        alert = f"""
{emoji.get(lead.category, "📋")} {lead.category.value.upper()} LEAD - Score: {lead.score}/100

Source: {lead.source} - {lead.subsource}
Posted: {lead.posted_at.strftime('%Y-%m-%d %H:%M')}

📝 POST:
{lead.title}
{lead.body[:200]}{'...' if len(lead.body) > 200 else ''}

📊 SCORING BREAKDOWN:
• Location: {sb['location']} pts
• Event Type: {sb['event_type']['score']} pts ({sb['event_type']['type']})
• Timeline: {sb['timeline']} pts
• Budget: {sb['budget']['score']} pts (Guests: {sb['budget']['guest_count'] or 'unknown'})
• Intent: {sb['intent']} pts

🔗 {lead.url}
"""
        return alert


def test_scorer():
    """Test the lead scorer with sample data"""
    scorer = LeadScorer()
    
    test_leads = [
        {
            "title": "Getting married next month!",
            "body": "Hi everyone! My fiancé and I are getting married in Cincinnati next month (April 15th). We're looking for a bartender for our reception. Expecting about 100 guests, want to do an open bar with craft cocktails. Any recommendations?",
            "expected": "HOT"
        },
        {
            "title": "Company holiday party help",
            "body": "Planning a company holiday party in Northern Kentucky for 150 employees. Need bartending service for Dec 15th. Full bar preferred. Please DM me!",
            "expected": "HOT"
        },
        {
            "title": "Backyard BBQ thoughts?",
            "body": "Thinking about having a backyard party this summer in Mason. Maybe 30 people. Considering hiring a bartender but might just do BYOB. Thoughts?",
            "expected": "COLD"
        },
        {
            "title": "Need bartender ASAP",
            "body": "Desperate! Our bartender canceled for our wedding this weekend in Hyde Park. 80 guests, open bar. Please help!",
            "expected": "HOT"
        }
    ]
    
    print("=" * 60)
    print("CINCYSCOUT LEAD SCORER - TEST RESULTS")
    print("=" * 60)
    
    for i, test in enumerate(test_leads, 1):
        lead = Lead(
            source="reddit",
            subsource="r/cincinnati",
            title=test["title"],
            body=test["body"],
            author=f"user_{i}",
            posted_at=datetime.now(),
            url=f"https://reddit.com/r/cincinnati/test_{i}"
        )
        
        scored_lead = scorer.calculate_score(lead)
        
        print(f"\nTest {i}: {test['title'][:50]}...")
        print(f"Expected: {test['expected']}")
        print(f"Actual: {scored_lead.category.value.upper()} ({scored_lead.score} pts)")
        print(f"Match: {'✅' if scored_lead.category.value.upper() == test['expected'] else '❌'}")
        print("-" * 60)
        print(scorer.format_alert(scored_lead))
        print("=" * 60)


if __name__ == "__main__":
    test_scorer()
