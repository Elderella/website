# New Account Onboarding -- Primary Caregiver

## Objective

Get people from "created account" to using the product fully, on an ongoing basis.

---

## Onboarding Funnel

| Action | Detail | Metric |
|--------|--------|--------|
| Ad click / referral scan etc. | User sees an ad / referral. Clicks through to either: App Store listing (via a deep link), or a landing page on the company's website | Ad > Landing page = Click-through rate (CTR) |
| User reads landing page (if not direct to App Store) | Brief value prop reinforcing ad's message. Social proof (stats). Clear CTA linking to App Store. Could collect email here (for retargeting) | Landing page > App Store = Conversion rate |
| User reads App Store listing and downloads/installs Elderella | User reviews name, icon, screenshots, description, ratings. Taps Get (or the price button). Authenticates via Face ID, Touch ID, or Apple ID password. Elderella downloads and installs | App Store > Install = Install rate |
| User launches Elderella | Permissions requests: Notifications, microphone | Install > First open = Activation rate |
| User creates Elderella account "Created Account!" | Phone number and verification. Email | First open > Account created = Registration rate |
| User works through initial setup / onboarding | Create an elder profile. Set up text messages. Add Ella to contacts (add / do later). Invite care team (add / do later). Sync calendar (connect / do later) | Account created > onboarding steps for first elder completed = Onboarding completion rate |
| User completes a key action | User completes a key action that demonstrates Elderella's value (e.g., add Ella to group chat or log a first care note) | Aha! achieved |

---

## Aha! Moments

### Tier 1 -- Primary "Aha" Moments

These demonstrate the central promise: Ella organizes care for you.

1. **Ella auto-detects a care detail from a group chat** -- You add Ella to your family chat, someone mentions "Mom's cardiology appointment is Thursday at 2pm," and Ella captures it without anyone doing anything. The chaos-to-order promise becomes real. *Likely the strongest candidate for the primary activation metric -- it's the unique differentiator and requires the least effort from the user after setup. But it depends on the user already having an active caregiving group chat, which is a prerequisite that not every new user will have immediately.*

2. **Ask Ella a question and get an answer** -- "When is Mom's next appointment?" or "What medications is Dad on?" and Ella responds with accurate, organized information pulled from past conversations. The "caregiver memory" concept clicks.

3. **A care team member gets a useful update they wouldn't have had otherwise** -- A sibling who lives far away sees a care digest or gets notified about a medication change. The isolation of solo caregiving breaks.

### Tier 2 -- Deepening Value

These reinforce that Elderella is indispensable.

4. **First medication scanned from a photo** -- Take a photo of a pill bottle label, Ella extracts and stores the details. Manual data entry disappears.

5. **First voice note transcribed and organized** -- Record a rambling post-appointment debrief, Ella pulls out the key details and files them appropriately.

6. **First reminder fires before an appointment or medication** -- You didn't have to set it up manually -- Ella picked it up from conversation and reminded you at the right time.

7. **"What's Next" view shows the most pressing item** -- Opening Elderella and immediately seeing what matters most today without digging through messages.

8. **Review Queue works correctly** -- Ella flags something in "Needs Your Review" before adding it to the care story, and the user realizes Ella isn't making decisions on their behalf -- she's confirming with them. Trust is built.

### Tier 3 -- Team & Coordination Value

These unlock the "shares the load" pillar.

9. **First care team member accepts an invite and joins** -- Caregiving stops being a solo activity inside Elderella.

10. **First task delegated to a care team member** -- Assign "Pick up Mom's prescription" to a sibling, and they get notified. Coordination happens without awkward phone calls.

11. **Access levels work as expected** -- A paid home care aide can see medication schedules but not financial details. The user feels comfortable sharing because they control visibility.

12. **Ella identifies a care team member from chat messages** -- Ella notices "the physiotherapist said..." and suggests adding them to the care team. Elderella feels intelligent.

### Tier 4 -- Long-term Retention Moments

These create stickiness over time.

13. **Elder's story builds up through daily questions** -- Over weeks, a rich profile emerges that would be painful to recreate elsewhere.

14. **Care history becomes a reference during a medical appointment** -- The user pulls up Elderella to answer a doctor's question about when a symptom started or what medication was changed. Real-world utility beyond the home screen.

15. **Managing multiple elders in one place** -- A user caring for both parents sees the value of a single coordinated view.

16. **Exporting care data as PDF/CSV** -- Sharing a care summary with a new specialist or facility. The organized data has value beyond Elderella.

---

## Screen Map (from screenshots)

**Bottom navigation (persistent):**
- Chat -- conversation with Ella
- Take A Note -- quick capture (voice, text, photo)
- About [Elder] -- the elder's profile hub

**Home screen (scrollable cards):**
1. About [Elder] -- daily question (builds elder profile, shows % completion)
2. What's Next -- most urgent items or "all clear" status
3. Needs Your Review -- Ella's extracted items awaiting confirmation
4. Care Team Updates -- activity digest

**About [Elder] hub (8 tiles):**
- Chat, Notes, Docs, Meds, Events, Tasks, Care Team, Briefing
- Ella's Contact Information (for adding to group chats)

---

## Reverse Premium Mechanics

- **Day 1:** User creates account and gets full Premium access
- **Days 1-7:** If user opens Elderella every day, Premium access extends to 14 days
- **Day 7 or 14:** Premium access ends, user drops to Free tier unless they subscribe
- **Key messaging shift:** Days 1-7 focus on activation + "keep your streak." Days 8-14 (if earned) shift to deepening habits + conversion.

---

## Day-by-Day Communication Flow

### SMS Compliance Note

All SMS messages include a compliant opt-out footer for US/Canada:

> Reply STOP to opt out. Msg & data rates may apply.

---

### Day 1 -- Welcome & First Value

**SMS #1** (immediately after account creation)

> Welcome to Elderella. Ella is ready -- tell her one thing about the care you're managing and see what she does with it. You have 7 days of full Premium access, and using Elderella daily this week extends it to 14: [deep link]
>
> Reply STOP to opt out. Msg & data rates may apply.

---

**Email #1** (within 1 hour of account creation)

*Sent to all new users.*

**Subject:** Your first minute with Ella

Hi {{ customer.first_name | default: "there" }},

You just did something most caregivers don't do. You asked for help.

Ella is ready to start helping. She's good at remembering the things you don't have room to hold right now -- the medications, the appointments, the details that slip through the cracks when life gets loud.

Tell her one thing about the care you're managing and see what she does with it.

> You have full Premium access for 7 days. Use Elderella each day this week, and we'll double it to 14.

**Two easy ways to get started**

**Add Ella to your family group chat**
If your family already has a text thread, add Ella. She'll start picking up appointments, medications, and care details from the conversation. No extra work for anyone.

**Capture info before it disappears**
Chat with Ella, type a quick note, record a voice memo, or snap a photo. A medication. An appointment. Something the doctor said last week. Ella will know it when you need it.

[See what your first minute with Ella looks like](https://www.elderella.com/welcome)

One small action today. That's all it takes.

-- The Elderella Team

---

### Day 2 -- Calendar Sync

**SMS #2** (morning, ~9am local time)

> Elderella: Connect Google Calendar and Elderella automatically pulls in care events that mention your elder's name -- your personal and work events stay private. Elderella events can also sync back to Google Calendar as "Elderella Event" so nothing personal is exposed. Connect it in settings: [deep link to settings]
>
> Reply STOP to opt out. Msg & data rates may apply.

---

**Email #2**

**Subject:** Your calendar is already doing half the work

Hi {{ customer.first_name | default: "there" }},

Here's a small thing that makes a big difference.

Care events end up scattered across calendars, group chats, and sticky notes. Your Google Calendar already has some of them -- Elderella can pull those in.

**Connect your Google Calendar**

Elderella picks up anything with your elder's name or relationship in the title like *Mom's cardiology follow-up* or *Physical therapy (Joe)*.

Your personal and work events stay private.

It works the other way too. Care events created in Elderella can sync back to your Google Calendar. They can show up as "Elderella Event" so nothing personal is exposed to anyone who can see your calendar.

You can make any event visible to your care team or assign it to one of them.

Afterward, Elderella prompts for notes so details get captured while they're fresh.

[Sync your calendar](https://www.elderella.com/get-started/calendar-sync)

One connection. Elderella takes it from there.

{% if customer.user_streak_earned %}Your streak: 2 of 7 days toward extending your Premium access to 14 days.{% else %}Your Premium access has 5 days left.{% endif %}

-- The Elderella Team

---

### Day 3 -- Capture Tools (Voice Notes, Photos, Text)

**SMS #3** (morning)

> Elderella: Just left an appointment? Talked to a nurse on the phone? Tell Ella before the details fade -- type, record a voice note, or snap a photo: [deep link to Take A Note]
>
> Reply STOP to opt out. Msg & data rates may apply.

---

**Email #3**

**Subject:** Before you forget what they told you

Hi {{ customer.first_name | default: "there" }},

You know that moment after a doctor's appointment when your head is full of instructions and medication changes -- and by the time you get to the car, half of it's fuzzy?

Elderella was built for that moment.

**Three ways to capture care details on the go**

- **Type a quick note:** Even a few words is enough for Ella to work with.
- **Record a voice note:** Talk for up to 60 minutes. Just ramble. Ella extracts the key details and organizes them.
- **Snap a photo:** A medication label, a discharge summary, a page of handwritten instructions.

If it's a medication label, Ella pulls out the name, dosage, frequency, and prescriber automatically.

[See Ella turn a voice note into organized care details](https://www.elderella.com/get-started/first-note)

Ella just needs the raw information -- she figures out the rest.

{% if customer.user_streak_earned %}Your streak: 3 of 7 days toward extending your Premium access to 14 days.{% else %}Your Premium access has 4 days left.{% endif %}

-- The Elderella Team

---

### Day 4 -- Review Queue & Trust

**SMS #4** (morning)

> Elderella: Ella may have picked up something from what you shared -- or your calendar -- check your home screen to confirm it before she adds it to the care profile: [deep link to home screen]
>
> Reply STOP to opt out. Msg & data rates may apply.

---

**Email #4**

**Subject:** If Ella found something, she's waiting for your OK

Hi {{ customer.first_name | default: "there" }},

If you've shared any care details or connected your Google Calendar, Ella has been busy -- listening, organizing, and pulling out the things that matter.

But she doesn't add anything to your care profiles without your say-so.

**Open Elderella and check your home screen**

**"What's Next"** shows the most pressing items for the day.

**"Needs Your Review"** shows anything flagged for you to look at.

If you've added anyone to your care team, **"Care Team Updates"** shows what they've done.

Between them, you'll always know where things stand. Without digging through notes or messages.

[See how Ella checks before adding anything](https://www.elderella.com/get-started/review-queue)

Ella does the work. You stay in control.

{% if customer.user_streak_earned %}Your streak: 4 of 7 days toward extending your Premium access to 14 days.{% else %}Your Premium access has 3 days left.{% endif %}

-- The Elderella Team

---

### Day 5 -- Ask Ella a Question

**SMS #5** (morning)

> Elderella: Try asking Ella something: "What medications are they on?" or "When is the next appointment?" See what she comes back with: [deep link to Chat]
>
> Reply STOP to opt out. Msg & data rates may apply.

---

**Email #5**

**Subject:** Just a second I have that here somewhere...

Hi {{ customer.first_name | default: "there" }},

You know that moment when someone asks about a medication or an appointment and you're scrolling through old texts trying to find it? Ella already knows.

Everything you've shared: appointments, medications, care details -- she's holding all of it.

Just ask:

*"What medications are they taking?"*

*"When is the next appointment?"*

*"What did the doctor say?"*

[See what happens when you ask Ella a question](https://www.elderella.com/get-started/ask-ella)

No digging. No guessing. Just ask Ella.

{% if customer.user_streak_earned %}Your streak: 5 of 7 days toward extending your Premium access to 14 days.{% else %}Your Premium access has 2 days left.{% endif %}

-- The Elderella Team

---

### Day 6 -- Care Team / Share the Load

**SMS #6** (morning)

> Elderella: Is someone else helping with care? Invite them to Elderella so everyone's on the same page -- and you're not the only one carrying the details: [deep link to Care Team]
>
> Reply STOP to opt out. Msg & data rates may apply.

---

**Email #6**

**Subject:** What happens when you add your care team

Hi {{ customer.first_name | default: "there" }},

There's a specific kind of exhaustion that comes from being the one everyone calls. The sibling who knows the medication schedule. The person who remembers what the doctor said.

The one who can never fully step away because too much lives only in your head.

Elderella changes that.

**Invite your care team**

Siblings, a spouse, an aide -- anyone helping with care.

If Ella notices someone mentioned in your notes ("the physiotherapist said..."), she'll suggest adding them too.

**Delegate to your care team**

Elderella turns "I'll help however I can" into something specific: "Pick up the prescription."

Set up reminders so you don't have to follow up.

**Control who sees what**

You decide what each care team member can see.

From full shared access to only what they need.

[See how you choose what each person on your care team can see](https://www.elderella.com/get-started/invite-team)

{% if customer.user_streak_earned %}Your streak: 6 of 7 days toward extending your Premium access to 14 days.{% else %}Your Premium access has 1 day left.{% endif %}

-- The Elderella Team

---

### Day 7 -- Streak Deadline

**SMS #7 -- STREAK** (morning)

> Elderella: It's Day 7. Open Elderella today and your Premium access extends to 14 days. You've earned it: [deep link]
>
> Reply STOP to opt out. Msg & data rates may apply.

**SMS #7 -- NO STREAK** (morning)

> Elderella: Last day of Premium access. Everything you add to Elderella stays in your account -- even on the Free plan. Worth capturing what you can today: [deep link]
>
> Reply STOP to opt out. Msg & data rates may apply.

---

**Email #7 -- STREAK** (sent morning)

**Subject:** You've earned more time

Hi [Name],

You've shown up six days in a row. That takes real follow-through -- especially when you're already managing a full life and someone else's care.

Today is Day 7. Open Elderella before midnight and your Premium access extends to 14 days. That's 14 more days of unlimited history, your full care team, briefings, and exports.

You've already built the habit. Now you get more time to make it stick.

-- The Elderella Team

---

**Email #7 -- NO STREAK** (sent afternoon, only if user has NOT opened Elderella today)

**Subject:** Your Premium access ends today -- but Ella isn't going anywhere

Hi [Name],

Today is Day 7 of your Premium access. After today, your account moves to the Free plan unless you subscribe.

Here's what stays the same: everything you've added is safe. Your notes, medications, appointments -- none of it goes anywhere. Ella keeps working for you on the Free plan -- chat, notes, medication reminders, and up to 2 care team members.

Some features do change -- unlimited care history, larger care teams, briefings, long voice notes, and exports are Premium-only. But nothing is deleted.

Ella doesn't stop just because Premium does. And Premium is one tap away whenever you want more.

-- The Elderella Team

---

## Days 8-14 -- Extended Premium Access (Deepening & Conversion)

*These messages only send to users who earned the 14-day extension by maintaining their 7-day streak.*

---

### Day 8

**SMS #8** (morning)

> Elderella: You earned 14 days of Premium. Try this: tap "Briefing" in the elder profile for an AI-generated summary of recent care activity. [deep link to About Elder hub]
>
> Reply STOP to opt out. Msg & data rates may apply.

---

### Day 10

**Email #8**

**Subject:** Here's what Ella has been quietly holding for you

Hi [Name],

You've been using Elderella for 10 days. Here's what Ella has been holding for you:

- **[X] notes** captured
- **[X] medications** remembered
- **[X] events** on the calendar
- **[X] care team members** connected
- **Elder profile: [X]% complete**

This is what organized care looks like. Every detail you've shared is ready when you or your team needs it.

[See what a caregiver briefing looks like](https://www.elderella.com/get-started/briefing)

-- The Elderella Team

P.S. -- Your extended access ends in 4 days. To keep unlimited history and your full care team, [compare plans](https://www.elderella.com/compare-plans).

---

### Day 12

**SMS #9** (morning)

> Elderella: Your Premium access ends in 2 days. Everything Ella has organized stays in your account -- upgrade to keep unlimited history and your full care team. https://www.elderella.com/compare-plans
>
> Reply STOP to opt out. Msg & data rates may apply.

---

### Day 13

**Email #9**

**Subject:** Your Premium access ends tomorrow -- here's what that means

Hi [Name],

Tomorrow your Premium access converts to the Free plan. Here's what changes:

| | Premium (now) | Free (tomorrow) |
|---|---|---|
| Care history | Unlimited | 90 days |
| Care team members | 10 | 2 |
| Voice notes | 60 min | 5 min |
| Briefings | Yes | No |
| Export | Yes | No |

**What doesn't change:** Everything you've added stays in your account. You won't lose any data. Older history and some features will be inaccessible until you upgrade, but nothing is deleted.

If Elderella has been useful this past two weeks -- if you've felt even a little more organized, a little less alone in this -- keeping Premium means keeping that going.

[Keep Premium -- $30/month](subscription link)
[Compare all plans](https://www.elderella.com/compare-plans)

Either way, Ella isn't going anywhere. She'll keep holding your care details on whatever plan you're on.

-- The Elderella Team

---

### Day 14

**SMS #10** (morning)

> Elderella: Your Premium access ends today. Upgrade to keep unlimited care history and your full care team: https://www.elderella.com/compare-plans. Everything Ella has organized stays in your account, no matter what.
>
> Reply STOP to opt out. Msg & data rates may apply.

---

## Days 9-30 -- No-Streak Follow-Up (Re-engagement & Conversion)

*These messages only send to users who did NOT earn the 14-day extension -- they either never opened Elderella or didn't maintain a daily streak. Their Premium access ended on Day 7.*

---

### Day 9

**SMS #11** (morning)

> Elderella: Ella just needs the raw information -- a medication, an appointment, anything on your mind. She figures out the rest: [deep link to Chat]
>
> Reply STOP to opt out. Msg & data rates may apply.

---

### Day 11

**Email #12**

**Subject:** What two minutes with Ella looks like

Hi [Name],

Tuesday afternoon. You're in the car after a doctor's appointment. The doctor changed a medication, moved the next appointment up two weeks, and mentioned something about dietary restrictions.

You open Elderella and record a 90-second voice note while it's all still fresh. You don't organize anything. You just talk.

By the time you get home, Ella has pulled out the new medication and dosage, added the next appointment to your calendar, and flagged a note about the diet. All of it is sitting in "Needs Your Review" -- waiting for you to confirm before she adds it.

Later, a family member texts: "How'd the appointment go?" You don't have to type it all out again. You tell them to check Elderella.

Two minutes in the car. And the next time someone asks, the answer is already there.

-- The Elderella Team

---

### Day 14

**SMS #12** (morning)

> Elderella: Caregivers tell Ella things like "Dad takes metformin twice a day" and "Mom's cardiologist is Dr. Patel on Tuesdays." Small details that are easy to forget and hard to find later. What would you tell her? [deep link to Chat]
>
> Reply STOP to opt out. Msg & data rates may apply.

---

### Day 17

**Email #13**

**Subject:** What a caregiver briefing looks like

Hi [Name],

Imagine opening Elderella and seeing a summary of everything that's happened this week -- medications confirmed, appointments coming up, tasks completed, notes added. Not a list of notifications. A briefing. Written for you, about the care you're coordinating.

That's what caregiver briefings do. Ella reads everything she's holding and gives you a clear picture of where things stand -- so you don't have to piece it together yourself.

Briefings are a Premium feature. If you've been thinking about upgrading, this is the one that makes caregivers say "I didn't know I needed this."

[See what a caregiver briefing looks like](https://www.elderella.com/get-started/briefing)

[Compare plans](https://www.elderella.com/compare-plans)

-- The Elderella Team

---

### Day 21

**SMS #13** (morning)

> Elderella: Ella is still here -- whenever a care detail crosses your mind, she's ready. Chat, take notes, track medications, all on your Free plan: [deep link to Chat]
>
> Reply STOP to opt out. Msg & data rates may apply.

---

### Day 30

**Email #14**

**Subject:** A month with Ella

Hi [Name],

It's been 30 days. Here's what Ella has been holding for you:

- **[X] notes** captured
- **[X] medications** remembered
- **[X] events** on the calendar

Every detail you've shared makes the next conversation easier -- with a doctor, a pharmacist, a sibling, or just with yourself at 11pm trying to remember if you called the insurance company.

Caregiving doesn't have an end date. Neither does Ella.

If you want unlimited history, a bigger care team, briefings, and exports, Premium is one tap away.

[Compare plans](https://www.elderella.com/compare-plans)

-- The Elderella Team

---

## Post-Premium Access -- Streak Users (didn't convert after 14-day extension)

*These messages only send to users who completed the 7-day streak, earned the 14-day extension, but did not subscribe to Premium.*

---

### Day 17

**Email #10**

**Subject:** Ella is still here

Hi [Name],

Your Premium access ended a few days ago, but Ella hasn't gone anywhere. She's still here on your Free plan -- still remembering your notes, still answering questions, still holding everything together.

You can chat with Ella, take notes, and manage care with up to 2 care team members. The foundation is there.

Whenever you're ready for more -- unlimited history, a bigger care team, briefings, and exports -- Premium is one tap away.

No pressure. We'll be here.

-- The Elderella Team

---

### Day 30

**Email #11**

**Subject:** A month with Ella

Hi [Name],

It's been 30 days since you started using Elderella. Whether you've been using it every day or checking in when things get hectic, Ella has been here the whole time.

Here's what she's holding for you:

- **[X] notes** captured
- **[X] medications** tracked
- **[X] events** on the calendar
- **Elder profile: [X]% complete**

A month of care details, all in one place. That's a safety net you didn't have 30 days ago -- especially the next time a doctor asks "when did that start?" or a sibling asks "what did the specialist say?"

If you've been on the Free plan and want to unlock the full picture -- unlimited history, more care team members, briefings, and exports -- you can upgrade anytime.

[Compare plans](https://www.elderella.com/compare-plans)

-- The Elderella Team

---

## Website Mirror Pages

For users who want to move ahead before opening Elderella, and as landing pages for video content linked from emails and SMS.

| URL | Content | Video | Purpose |
|-----|---------|-------|---------|
| /welcome | Recap of the 3 getting-started paths (group chat, chat with Ella, take a note) + link to download | 60-90s getting started walkthrough | Pre-product orientation. Linked from Email #1 (Day 1) and SMS #1 (Day 1) |
| /get-started/calendar-sync | How calendar sync works, what Ella does with appointments, zero-effort value | 30s calendar sync demo | Linked from Email #2 (Day 2) and SMS #2 (Day 2) |
| /get-started/group-chat | Step-by-step: how to add Ella to iMessage/WhatsApp/SMS group | -- | Removes friction for adding Ella to group chats |
| /get-started/first-note | Examples of what to tell Ella + link to download | 45s capture demo (voice note, photo, text) | Linked from Email #3 (Day 3) and SMS #3 (Day 3) |
| /get-started/review-queue | How "Needs Your Review" works, how Ella builds trust | 30s review queue demo | Linked from Email #4 (Day 4) |
| /get-started/ask-ella | Examples of questions to ask Ella + how the daily question builds the care story | 30s ask Ella demo | Linked from Email #5 (Day 5) |
| /get-started/invite-team | Explains access levels, what team members see | 45s care team invite + access levels walkthrough | Linked from Email #6 (Day 6) and SMS #6 (Day 6) |
| /get-started/briefing | What caregiver briefings are and how they work | 30s briefing feature tour | Linked from Email #8 (Day 10) |
| /compare-plans | Already exists | -- | Conversion page for Premium-ending emails |

Each email CTA can link to the relevant website page as a fallback for users who haven't installed Elderella yet, or as a preview for what they'll do when they open it.

---

## Customer.io Subscription Topics

All non-transactional messages are gated by subscription topics in Customer.io. Users manage their preferences via the hosted subscription center (linked from email footers). Internal segmentation (streak vs no-streak, day number) is handled by campaign logic, not by topics.

### Topics

| Topic | Description (shown to user) | Default State |
|---|---|---|
| **Getting Started** | Tips to help you get the most out of Ella during your first week | Opted in |
| **Product Tips** | Feature highlights, how-tos, and ways to get more from Elderella | Opted in |
| **Plan & Pricing Updates** | Information about your Premium access, plan comparisons, and upgrade options | Opted in |
| **Elderella Newsletter** | Updates from the Elderella team -- product news, caregiving resources, and company updates | Opted in for newsletter subscribers, opted out for others |

### Campaign-to-Topic Mapping

| Campaign / Message | Topic |
|---|---|
| Day 1 Welcome Email | Getting Started |
| Day 2 Calendar Sync Email | Getting Started |
| Day 3 Capture Tools Email | Getting Started |
| Day 4 Review Queue & Trust Email | Getting Started |
| Day 5 Ask Ella Email | Getting Started |
| Day 6 Care Team Email | Getting Started |
| Day 7 Streak / No-Streak Email | Getting Started |
| Day 8 SMS (briefing) | Product Tips |
| Day 9 SMS (lower the bar) | Product Tips |
| Day 10 Email (stats + briefing) | Product Tips |
| Day 11 Email (real-world scenario) | Product Tips |
| Day 14 SMS (social proof) | Product Tips |
| Day 17 Email (Ella is still here -- post-premium) | Product Tips |
| Day 21 SMS (re-engagement) | Product Tips |
| Day 12 SMS (Premium ending) | Plan & Pricing Updates |
| Day 13 Email (comparison table) | Plan & Pricing Updates |
| Day 14 SMS (last day Premium) | Plan & Pricing Updates |
| Day 17 Email (briefing teaser -- no-streak) | Plan & Pricing Updates |
| Day 30 Email (stats -- no-streak) | Plan & Pricing Updates |
| Day 30 Email (stats -- post-premium) | Plan & Pricing Updates |
| Newsletter broadcasts | Elderella Newsletter |

### Transactional Messages (bypass subscription preferences)

These are marked as transactional in Customer.io and always send regardless of topic preferences:

- Account verification / password reset
- Billing receipts and payment failures
- Premium access status changes (started, ending today, ended)
- Legal/privacy updates

### Email Footer

Every non-transactional email includes this footer with subscription center links:

```
-- The Elderella Team

[Manage your email preferences]({{ unsubscribe_url }}) · [Unsubscribe from all]({{ unsubscribe_url }})
```

Customer.io generates `{{ unsubscribe_url }}` pointing to the hosted subscription center. The one-click unsubscribe header (List-Unsubscribe) is handled automatically.

### SMS Opt-Out

SMS opt-out is handled at the carrier level via "Reply STOP." Customer.io respects STOP replies automatically. SMS is not included as a channel toggle in the subscription center.

### Subscription Center Branding

Configured in Customer.io > Settings > Subscription Center:

- **Heading:** "Communication Preferences"
- **Subheading:** "Choose what you'd like to hear from us about. You can update these anytime."
- **Primary/accent color:** #5A4FCF
- **Button color:** #FFBC57
- **Button text color:** #595959
- **Text color:** #595959
- **Background:** #FFFFFF
- **Footer text:** "Questions? Reach us at hello@elderella.com"

### New User Defaults

**From product account creation:**
- Getting Started: opted in
- Product Tips: opted in
- Plan & Pricing Updates: opted in
- Elderella Newsletter: opted out

**From website newsletter signup:**
- Elderella Newsletter: opted in
- Other topics: no change

### Attio vs Customer.io

- **Attio** tracks legal consent (consent_type, consent_timestamp, consent_source)
- **Customer.io** manages message preferences (which topics the user wants)
- Subscription preferences are NOT synced between the two systems
