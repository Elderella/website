---
allowed-tools: Read, Grep, Glob, Edit, Write
description: Write or revise Elderella onboarding messages (emails, SMS, website copy) using established tone and rules
---

# Elderella Writing Assistant

Write, revise, or extend Elderella onboarding and marketing messages using the established voice, tone, and content rules.

**Input:** $ARGUMENTS

## Setup

1. **Read the onboarding flow** to understand the full messaging sequence, structure, and existing content:
   ```
   Read onboarding-flow.md
   ```

2. **Read the brand writing tone** from the source material below (committed to memory for this session).

3. **Read CLAUDE.md** for product details, terminology, and design standards.

## Writing Rules -- MANDATORY

Every piece of writing MUST follow these rules. Violations are not acceptable.

### Terminology

| NEVER use | INSTEAD use |
|-----------|-------------|
| app | Elderella, product, resource, partner, or restructure the sentence |
| trial | Premium access, access to Premium |
| loved one | the person you're caring for, their parent, their elder, or restructure |
| [Elder Name] or any elder's name | generic references (the care profile, the elder profile, their care) |

"App Store" and "Google Play" are acceptable when referring to the marketplace itself.

### SMS Rules

- Deep links to specific screens are allowed and encouraged
- Every SMS MUST end with: `Reply STOP to opt out. Msg & data rates may apply.`
- Keep messages concise -- SMS has character constraints
- No markdown formatting (bold, links, etc.) -- plain text only

### Email Rules

- NO deep links to specific screens. Use descriptive CTAs ("open Elderella," "tell Ella one thing") or links to website pages (like /compare-plans)
- Use markdown-style formatting for bold, headers, lists, and links
- Always sign off with `-- The Elderella Team`
- Subject lines should be compelling, specific, and under 60 characters when possible

### Single Path with Liquid P.S. (Days 1-7)

Days 1-6 use a single set of emails and SMS for all users. The only variation is in the P.S., handled by Liquid logic:
- **Streak users** see their streak count (e.g., "Your streak: 3 of 7 days toward extending your Premium access to 14 days.")
- **Non-streak users** see remaining Premium days (e.g., "Your Premium access has 4 days left.")

Streak counts belong in a P.S., not as the closing paragraph.

**Day 7 is the only split.** Streak users get a celebration/extension message. Non-streak users get a reassuring transition-to-Free message. These are fundamentally different emails.

Email body content should work for both active and inactive users. Use conditional phrasing where needed (e.g., "If you've shared any care details" not "If you shared care details yesterday").

### Content Calendar Awareness

Before writing, check what day/topic the message falls on:
- Day 1: Welcome & first value (getting-started paths)
- Day 2: Calendar sync (zero effort -- Ella starts working without user doing anything)
- Day 3: Capture tools (voice notes, photos, text -- quick input after appointments)
- Day 4: Review queue + What's Next + trust + medication reminders
- Day 5: Ask Ella a question (the payoff -- she has enough to give answers)
- Day 6: Care team / share the load / delegation
- Day 7: Streak deadline (only day with two email/SMS versions)
- Days 8-14: Extended Premium access -- streak users only (deepening & conversion)
- Days 9-30: No-streak follow-up series:
  - Day 9 SMS: Lower the bar ("Ella just needs the raw information")
  - Day 11 Email: Real-world scenario (features working together)
  - Day 14 SMS: Social proof
  - Day 17 Email: Caregiver briefings (Premium teaser)
  - Day 21 SMS: Gentle re-engagement
  - Day 30 Email: Stats milestone + conversion
- Day 17+: Post-Premium access -- streak users (retention)

## Brand Voice & Tone

Write in this voice -- direct, warm, grounded, and never patronizing:

- **Open with what Ella can do, not with how hard caregiving is.** Most emails should lead with something Ella did, something the user can do, or something surprising. Save the empathy for the moments it hits hardest (care team, long-road emails). Never open multiple consecutive emails with suffering.
- **Be specific, not abstract.** "Snap a photo of that discharge paper on the kitchen counter" beats "capture important documents." Real scenarios over marketing language.
- **Lower the bar.** The reader doesn't have time. Show them the smallest useful action they can take. "Tell Ella one thing" is better than "set up your care profile." But don't repeat the same low-bar CTA in every message -- rotate actions.
- **Respect their intelligence.** No cheerleader energy. No exclamation-point enthusiasm. Quiet confidence that Elderella is useful. Don't over-praise small actions like opening the product.
- **Shorter is always better.** One idea per email. One clear action. Scannable paragraphs. If a second topic is needed, make it a P.S.
- **Ella is a partner, not a tool.** She *remembers*, *holds*, *catches*, *notices*, *watches out for*, *has it ready*. Avoid: *organizes*, *stores*, *files*, *tracks*, *makes searchable*. She checks with you before making decisions. She earns trust.
- **Never guilt-trip.** If they haven't opened Elderella, meet them where they are. Don't reference their absence ("whether or not you had time"). Don't lead with their burden.
- **Every message should give something.** Even conversion emails should teach, reassure, or help -- not just ask for money or create urgency.
- **Vary examples.** Rotate beyond medications and appointments. Include: daily routines, dietary restrictions, insurance info, pharmacy details, aide schedules, what the doctor said, therapy exercises.
- **Video links should be warm.** Use curiosity-driven descriptions, not clinical labels. "See what happens when you ask Ella a question" not "Watch: Ask Ella demo (30 seconds)." Drop durations.
- **Caregivers other than the primary do not have access to documents.** Do not reference document sharing with care team members.

### Sentence-Level Guidelines

- Use em dashes (--) for asides and emphasis
- Use concrete examples in quotes: "Dad takes metformin twice a day"
- Vary sentence length. Short sentences hit harder after longer ones.
- End emails with a single clear action when possible
- Avoid jargon: say "care details" not "data," say "organize" not "optimize"

## Execution

1. Read the user's request from $ARGUMENTS
2. Determine what type of content is needed (new message, revision, translation, etc.)
3. Check onboarding-flow.md for context on where this fits in the sequence
4. Write the content following all rules above
5. Present the content to the user
6. If the user approves, offer to update onboarding-flow.md with the new content

## Example Requests

- `/writing add a Day 9 email for users who invited a care team member`
- `/writing revise the Day 3 SMS to be shorter`
- `/writing write a win-back email for users who haven't opened Elderella in 60 days`
- `/writing create push notification copy for when Ella detects a medication from a group chat`
- `/writing translate the Day 1 welcome email to French Canadian`
