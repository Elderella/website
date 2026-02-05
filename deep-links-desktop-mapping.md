# Deep Links - Desktop Fallback URL Mapping

When desktop users click universal links in emails, they're redirected to these website pages instead of the app.

**Default fallback:** `https://www.elderella.com/download`

| Screen | Universal Link | Desktop Fallback URL | Purpose | Linked From |
|--------|----------------|---------------------|---------|-------------|
| Welcome | — | `/features/welcome` | "See what your first minute with Ella looks like" — Overview of key ways to get started: 1) Chat with Ella 2) Add Ella to family group chats 3) Take notes | Email #1, SMS #1 (Day 1) |
| Calendar Settings | `https://alpha.elderella.com/app?return=settings/calendar` | `/features/calendar` | "See how Ella picks up care events from your calendar" — How to set up calendar sync, value prop, privacy objection handling, how syncing works | Email #2, SMS #2 (Day 2) |
| Notes (Take a Note) | `https://alpha.elderella.com/app?screen=notes` | `/features/notes` | "See Ella turn a voice note into organized care details" — Three ways to capture care details on the go + demo of voice-to-organized-details | Email #3, SMS #3 (Day 3) |
| Elder Home | `https://alpha.elderella.com/app?screen=elder-home` | `/features/review-queue` | "See how Ella checks before adding anything" — What's Next, Needs Your Review, Care Team Updates | SMS #4, Email #4 (Day 4) |
| Chat | `https://alpha.elderella.com/app?screen=chat` | `/features/ella-chat` | "See what happens when you ask Ella a question" — Ella chat in action | SMS #5, Email #5 (Day 5) |
| Care Team | `https://alpha.elderella.com/app?screen=care-team` | `/features/care-team` | "See how Ella keeps your care team in sync" — Securely adding care team members + benefits | Email #6, SMS #6 (Day 6) |
| Home | `https://alpha.elderella.com/app?screen=home` | `/features/check-in` | "Who would you like to check in on today?" — Your elder? You? Add another elder? How pricing works | SMS #7, Email #7, SMS #8, Email #8 (Day 7) |
| Briefing | — | `/features/care-briefing` | What caregiver briefings are (Plus feature) | Email #8 (Day 10) |
| Compare Plans | — | `/compare-plans` | Conversion page for Plus-ending emails | Day 10, 12-14, 17, 30 emails |
| Settings | `https://alpha.elderella.com/app?screen=settings` | `/features/settings` | | |
| Drive Settings | `https://alpha.elderella.com/app?return=settings/drive` | `/features/google-drive` | | |
| SMS Settings | `https://alpha.elderella.com/app?return=settings/sms` | `/features/group-chat` | Step-by-step: add Ella to iMessage/WhatsApp/SMS | — |
| WhatsApp Setup | `https://alpha.elderella.com/app?return=settings/whatsapp` | `/features/group-chat` | Step-by-step: add Ella to iMessage/WhatsApp/SMS | — |
| Notification Preferences | `https://alpha.elderella.com/app?return=settings/notifications` | `/features/notifications` | | |

---

## Page Purpose Details

### Day 1: Welcome (`/features/welcome`)
**"See what your first minute with Ella looks like"**

Overview of some key ways to get started:
1. Have a chat with Ella (with link to Chat page)
2. Add Ella to your family group chats (with links to SMS Settings / WhatsApp Settings pages)
3. Take notes (with link to Notes page)

### Day 2: Calendar Settings (`/features/calendar`)
**"See how Ella picks up care events from your calendar"**

How to set up Calendar sync including the value of doing so & objection handling re. data privacy. Information about how syncing works.

### Day 3: Notes (`/features/notes`)
**"See Ella turn a voice note into organized care details"**

Three ways to capture care details on the go and a demo of Ella turning voice notes into organized care details.

### Day 4: Elder Home (`/features/review-queue`)
**"See how Ella checks before adding anything"**

What's Next, Needs Your Review, Care Team Updates.

### Day 5: Chat (`/features/ella-chat`)
**"See what happens when you ask Ella a question"**

Ella chat in action.

### Day 6: Care Team (`/features/care-team`)
**"See how Ella keeps your care team in sync"**

The process of securely adding a care team member and the benefits of doing so.

### Day 7: Home (`/features/check-in`)
**"Who would you like to check in on today?"**

Your elder? You? Add another elder? How the pricing model works.

### Day 10: Briefing (`/features/care-briefing`)
What caregiver briefings are and how they work (Plus feature).

### Day 10+: Compare Plans (`/compare-plans`)
Conversion page for Plus-ending emails.

---

## Notes

- Blank rows use the default fallback (`/download`)
- Mappings align with onboarding email content where possible
- All URLs are relative to `https://www.elderella.com`
