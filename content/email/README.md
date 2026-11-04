# 513 Sips Email Templates Index

Complete collection of automated email sequences for 513 Sips - Elevated Ventures EG, LLC

---

## 📧 Email Sequences

### 1. Welcome Series (New Inquiries)
**Purpose:** Nurture new leads and build trust from first contact
**Trigger:** Form submission or initial inquiry

| Email | Send Timing | File |
|-------|-------------|------|
| Welcome & What to Expect | Immediately | `welcome/01-welcome.html` |
| Our Story & Values | Day 2 | `welcome/02-our-story.html` |
| Let's Plan Together | Day 5 | `welcome/03-lets-plan.html` |

**Personalization Tokens:**
- `{{first_name}}` - Lead's first name
- `{{event_type}}` - Type of event (wedding, corporate, etc.)
- `{{event_date}}` - Proposed event date

---

### 2. Post-Event Follow-Up
**Purpose:** Collect testimonials, reviews, and maintain relationship
**Trigger:** Event completion (day after)

| Email | Send Timing | File |
|-------|-------------|------|
| Thank You & Share Your Experience | 24 hours post-event | `post-event/01-thank-you.html` |
| Quick Review Request | 7 days post-event | `post-event/02-review-request.html` |

**Personalization Tokens:**
- `{{first_name}}` - Client's first name
- `{{event_date}}` - Event date
- `{{event_type}}` - Type of event
- `{{spouse_name}}` - Partner/spouse name (weddings)

---

### 3. Abandoned Quote Recovery
**Purpose:** Re-engage leads who received a quote but haven't responded
**Trigger:** 7 days after quote sent with no response

| Email | Send Timing | File |
|-------|-------------|------|
| Checking In | Day 7 after quote | `abandoned-quote/01-checking-in.html` |
| Final Follow-Up | Day 14 after quote | `abandoned-quote/02-final-follow-up.html` |

**Personalization Tokens:**
- `{{first_name}}` - Lead's first name
- `{{quote_amount}}` - Quoted price
- `{{event_date}}` - Event date
- `{{quote_date}}` - Date quote was sent

---

### 4. Vendor Partnership Outreach
**Purpose:** Build referral relationships with complementary vendors
**Trigger:** Manual outreach to venues, planners, photographers, etc.

| Email | File |
|-------|------|
| Partnership Introduction | `vendor-outreach/partnership-intro.html` |

**Personalization Tokens:**
- `{{vendor_name}}` - Vendor/business name
- `{{contact_name}}` - Contact person's first name
- `{{vendor_type}}` - Type of vendor (venue, planner, etc.)

---

## 🎨 Brand Voice Guidelines

- **Tone:** Warm, professional, elevated
- **Values:** Christian integrity, honesty, service excellence
- **Never:** Pushy, salesy, or desperate
- **Always:** Helpful, grateful, confident

## 🔧 Implementation Notes

1. All templates include both HTML and plain text versions
2. Personalization tokens use double curly braces: `{{token}}`
3. Test all emails before activating sequences
4. Monitor open rates and adjust subject lines as needed
5. Update tokens in your email platform (Mailchimp, ConvertKit, etc.)

---

*Created by Charlie for 513 Sips | Elevated Ventures EG, LLC*
