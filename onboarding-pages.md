# Onboarding Website Pages

Website pages that support the new user onboarding flow. These pages serve users who click email/SMS links before opening Elderella, and as landing pages for video content.

---

## Pages to Build

| URL | Purpose | Linked From |
|-----|---------|-------------|
| `/features/welcome` | "See what your first minute with Ella looks like" | Email #1, SMS #1 (Day 1) |
| `/features/calendar` | "See how Ella picks up care events from your calendar" | Email #2, SMS #2 (Day 2) |
| `/features/notes` | "See Ella turn a voice note into organized care details" | Email #3, SMS #3 (Day 3) |
| `/features/review-queue` | "See how Ella checks before adding anything" | SMS #4, Email #4 (Day 4) |
| `/features/ella-chat` | "See what happens when you ask Ella a question" | SMS #5, Email #5 (Day 5) |
| `/features/care-team` | "See how Ella keeps your care team in sync" | Email #6, SMS #6 (Day 6) |
| `/features/check-in` | "Who would you like to check in on today?" | SMS #7, Email #7, SMS #8, Email #8 (Day 7) |
| `/features/care-briefing` | What caregiver briefings are (Plus feature) | Email #8 (Day 10) |
| `/compare-plans` | Conversion page for Plus-ending emails | Day 10, 12-14, 17, 30 emails |
| `/features/settings` | Settings overview | — |
| `/features/google-drive` | How Google Drive backup works | — |
| `/features/group-chat` | Step-by-step: add Ella to iMessage/WhatsApp/SMS | — |
| `/features/notifications` | Notification preferences | — |

---

## Page Content Specifications

### Day 1: `/features/welcome`

**Headline:** "See what your first minute with Ella looks like"

**Purpose:** Pre-product orientation for Day 1 users

**Content:**
- Subhead: Brief reinforcement of Elderella's value
- 3 getting-started paths as cards:
  1. **Have a chat with Ella** — Tell her one thing about the care you're managing (link to `/features/ella-chat`)
  2. **Add Ella to your family group chats** — She'll pick up care details automatically (links to `/features/group-chat`)
  3. **Take notes** — Voice memo, photo, or quick text (link to `/features/notes`)
- CTA: Download links (App Store + Google Play)
- Video placeholder: 60-90s getting started walkthrough

---

### Day 2: `/features/calendar`

**Headline:** "See how Ella picks up care events from your calendar"

**Purpose:** Encourage calendar connection (Day 2)

**Content:**
- How to set up Calendar sync including the value of doing so
- Objection handling re. data privacy
- Explain how Ella picks up care events (titles with elder's name/relationship)
- Privacy assurance: personal/work events stay private
- Two-way sync: Elderella events can sync back as "Elderella Event"
- Information about how syncing works
- CTA: Link to app settings (`https://alpha.elderella.com/app?return=settings/calendar`)
- Video placeholder: 30s calendar sync demo

---

### Day 3: `/features/notes`

**Headline:** "See Ella turn a voice note into organized care details"

**Purpose:** Show capture tools (Day 3)

**Content:**
- Three ways to capture care details on the go:
  1. **Type a quick note** — Even a few words is enough for Ella to work with
  2. **Record a voice note** — Up to 60 minutes, Ella extracts key details and organizes them
  3. **Snap a photo** — Medication label, discharge summary, handwritten notes
- Demo of Ella turning voice notes into organized care details
- Example: Photo of medication label → Ella extracts name, dosage, frequency, prescriber
- CTA: Open Elderella (`https://alpha.elderella.com/app?screen=notes`)
- Video placeholder: 45s capture demo

---

### Day 4: `/features/review-queue`

**Headline:** "See how Ella checks before adding anything"

**Purpose:** Build trust by showing human oversight (Day 4)

**Content:**
- Explain **"What's Next"** — most pressing items for the day
- Explain **"Needs Your Review"** — items awaiting confirmation before Ella adds them
- Explain **"Care Team Updates"** — activity digest from your care team
- Trust message: Ella does the work, you stay in control
- CTA: Open Elderella home screen (`https://alpha.elderella.com/app?screen=elder-home`)
- Video placeholder: 30s review queue demo

---

### Day 5: `/features/ella-chat`

**Headline:** "See what happens when you ask Ella a question"

**Purpose:** Demonstrate query capability (Day 5)

**Content:**
- Ella chat in action
- Example questions:
  - "What medications are they on?"
  - "When is the next appointment?"
  - "What did the doctor say?"
- How it works: Ella pulls from everything you've shared
- Daily question feature: builds the elder's story over time
- CTA: Open Elderella chat (`https://alpha.elderella.com/app?screen=chat`)
- Video placeholder: 30s ask Ella demo

---

### Day 6: `/features/care-team`

**Headline:** "See how Ella keeps your care team in sync"

**Purpose:** Explain care team features (Day 6)

**Content:**
- The process of securely adding a care team member
- Who to invite: siblings, spouse, aides, professionals
- Auto-detection: Ella suggests people mentioned in notes ("the physiotherapist said...")
- Task delegation: Assign specific tasks with reminders
- Access levels: Control what each person can see
- Benefits of sharing the load
- CTA: Open care team settings (`https://alpha.elderella.com/app?screen=care-team`)
- Video placeholder: 45s care team walkthrough

---

### Day 7: `/features/check-in`

**Headline:** "Who would you like to check in on today?"

**Purpose:** Home screen orientation and pricing introduction (Day 7)

**Content:**
- Your elder? You? Add another elder?
- Overview of the home screen experience
- How the pricing model works
- CTA: Open Elderella (`https://alpha.elderella.com/app?screen=home`)

---

### Day 10: `/features/care-briefing`

**Headline:** "See where things stand at a glance"

**Purpose:** Showcase Plus feature for conversion (Day 10+)

**Content:**
- What caregiver briefings are and how they work
- AI-generated summary of recent care activity
- What's included: medications confirmed, upcoming appointments, completed tasks, new notes
- Benefit: No piecing together information yourself
- Plus badge: Indicate this is a premium feature
- CTA: Compare plans / Upgrade
- Video placeholder: 30s briefing feature tour

---

### Day 10+: `/compare-plans`

**Purpose:** Conversion page for Plus-ending emails

**Content:**
- Already exists on site
- Comparison of Free vs Plus features
- Clear upgrade CTA

---

### `/features/group-chat`

**Headline:** "Add Ella to your family group chat"

**Purpose:** Remove friction for adding Ella to group chats

**Content:**
- Step-by-step instructions for:
  - iMessage
  - WhatsApp
  - SMS/Android Messages
- What happens after: Ella starts picking up care details automatically
- Privacy note: Ella only extracts care-relevant information

---

### `/features/settings`

**Purpose:** Settings overview

**Content:**
- Overview of available settings
- Links to specific settings pages

---

### `/features/google-drive`

**Purpose:** How Google Drive backup works

**Content:**
- How to connect Google Drive
- What gets backed up
- Privacy and security information

---

### `/features/notifications`

**Purpose:** Notification preferences

**Content:**
- How to customize notifications
- Types of notifications available
- Recommendations for staying informed without overwhelm

---

## Page Structure Template

All onboarding pages follow this HTML structure:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="robots" content="index, follow">
    <meta name="description" content="[PAGE DESCRIPTION]">
    <title>[PAGE TITLE] - Elderella</title>
    <link rel="canonical" href="https://www.elderella.com/[PATH]">

    <!-- Open Graph -->
    <meta property="og:title" content="[PAGE TITLE] - Elderella">
    <meta property="og:description" content="[PAGE DESCRIPTION]">
    <meta property="og:url" content="https://www.elderella.com/[PATH]">
    <meta property="og:site_name" content="Elderella">
    <meta property="og:type" content="website">
    <meta property="og:image" content="https://www.elderella.com/images/elderella-logo-share.jpg">

    <!-- Twitter -->
    <meta name="twitter:card" content="summary">
    <meta name="twitter:title" content="[PAGE TITLE] - Elderella">
    <meta name="twitter:description" content="[PAGE DESCRIPTION]">
    <meta name="twitter:url" content="https://www.elderella.com/[PATH]">
    <meta name="twitter:image" content="https://www.elderella.com/images/elderella-logo-share.jpg">
    <meta name="twitter:site" content="@ElderellaCare">

    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Merriweather+Sans:wght@400;700&family=Source+Sans+Pro:wght@400;500;600&display=swap" rel="stylesheet">

    <!-- Styles -->
    <link rel="stylesheet" href="css/styles.css">
</head>
<body>
    <site-header></site-header>

    <!-- Page content here -->

    <site-footer></site-footer>

    <script src="js/components/site-header.js"></script>
    <script src="js/components/site-footer.js"></script>
</body>
</html>
```

---

## Design Standards Reference

### Typography

#### Headings & Body

| Element | Font | Desktop | Tablet (≤1024px) | Mobile (≤768px) |
|---------|------|---------|------------------|-----------------|
| H1 | Merriweather Sans 700 | 60px | 52px | 48px |
| H2 | Merriweather Sans 700 | 48px | 44px | 40px |
| H3 | Merriweather Sans 700 | 40px | 36px | 32px |
| Body | Source Sans Pro 400 | 20px | 20px | 20px |
| Hero subtitle | Source Sans Pro 600 | 28px | 28px | 28px |

#### Component-Specific

| Element | Font | Desktop | Tablet (≤1024px) | Mobile (≤768px) |
|---------|------|---------|------------------|-----------------|
| Feature card title | Source Sans Pro 400 | 24px | 24px | 24px |
| Feature card text | Source Sans Pro 400 | 16px | 16px | 15px |
| Tab links | Source Sans Pro 400 | 20px | 20px | 20px |
| CTA section title | Merriweather Sans 700 | 48px | 44px | 40px |
| Trust/info text | Source Sans Pro 400 | 20px | 20px | 20px |

Line height: 1.5 (standard)

### Colors

| Use | Hex |
|-----|-----|
| Background (main) | `#FFFFFF` |
| Background (alt sections) | `#F5F5F5` |
| Periwinkle (buttons, Ready for help? section) | `#5A4FCF` |
| Maroon (secondary buttons) | `#9954B4` |
| Light periwinkle (alternating box backgrounds) | `#EFEEFC` |
| Light maroon (alternating box backgrounds) | `#EADCEF` |
| Body text on white backgrounds | `#595959` |
| Body text on coloured backgrounds | `#000000` |
| Headings | `#000000` |
| Banners | `#FFEACC` |

### Layout

- Container max-width: 1440px
- Container padding: 0 180px (tablet: 0 30px, mobile: 0 20px)
- Section padding: 60px 0

### Breakpoints

- Tablet: `@media (max-width: 1024px)`
- Mobile: `@media (max-width: 768px)`

---

## File Organization

```
/website
├── features/
│   ├── welcome.html
│   ├── calendar.html
│   ├── notes.html
│   ├── review-queue.html
│   ├── ella-chat.html
│   ├── care-team.html
│   ├── check-in.html
│   ├── care-briefing.html
│   ├── settings.html
│   ├── google-drive.html
│   ├── group-chat.html
│   └── notifications.html
├── compare-plans.html
```

---

## Checklist Before Launch

- [ ] All pages use correct Google Fonts (Merriweather Sans + Source Sans Pro)
- [ ] All pages include `<site-header>` and `<site-footer>` components
- [ ] All pages have complete meta tags (description, OG, Twitter)
- [ ] All pages added to `sitemap.xml`
- [ ] All pages have mobile-responsive layouts tested
- [ ] Video embeds have placeholder images until videos are ready
- [ ] CTAs link to appropriate app deep links or download page
- [ ] Pages added to `_redirects` if needed
``