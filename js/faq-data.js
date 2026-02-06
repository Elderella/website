/**
 * FAQ Data
 * Structured FAQ content organized by categories for use with faq-list component
 */

const FAQ_DATA = [
    // ===== VALUE OF ELDERELLA =====
    {
        id: "value-easier",
        question: "How does Elderella make caregiving easier?",
        answer: `<p>Elderella removes the mental load of remembering everything. Instead of juggling notes, texts, and scattered information, you just tell Ella what's happening—through text, voice, photos, or forwarded emails—and it's saved automatically.</p>
<p>When you need to recall something ("What did the doctor say about Mom's medication?"), you ask Ella and get the answer instantly. No digging through old messages or paper files.</p>
<p>For families, Elderella keeps everyone on the same page with shared calendars, task lists, and care updates—so you're not constantly repeating yourself to siblings or other caregivers.</p>`,
        categories: ["value", "getting-started"]
    },
    {
        id: "value-memory",
        question: "How do I build caregiver memory in Elderella?",
        answer: `<p>Building caregiver memory is as simple as having a conversation with Ella. You can:</p>
<ul>
<li>Text or voice message details about appointments, medications, symptoms, or daily observations</li>
<li>Forward emails from doctors, pharmacies, or care facilities</li>
<li>Upload documents like care plans, prescription lists, or test results</li>
<li>Snap photos of medication bottles, wound healing progress, or important documents</li>
</ul>
<p>Ella extracts the key information and organizes it automatically. Over time, this becomes a comprehensive record of your elder's care.</p>`,
        categories: ["value"]
    },
    {
        id: "value-upload",
        question: "Can I upload documents or photos?",
        answer: `<p>Yes! You can upload:</p>
<ul>
<li>Photos (medication bottles, documents, wound progress, etc.)</li>
<li>PDFs (care plans, test results, insurance documents)</li>
<li>Voice notes (up to 5, 30, or 60 minutes depending on your plan)</li>
</ul>
<p>Ella processes uploaded content and makes it searchable. Ask "What's Mom's blood pressure medication?" and Ella can find it from a photo you took of her prescription bottle months ago.</p>`,
        categories: ["value"]
    },
    {
        id: "value-what-info",
        question: "What information helps to build caregiver memory?",
        answer: `<p>Everything related to your elder's care is valuable:</p>
<ul>
<li><strong>Medical:</strong> Medications, dosages, symptoms, doctor visits, test results, diagnoses</li>
<li><strong>Daily care:</strong> Eating habits, sleep patterns, mood changes, mobility observations</li>
<li><strong>Appointments:</strong> Doctor visits, therapy sessions, home care schedules</li>
<li><strong>Contacts:</strong> Doctors, pharmacies, specialists, care aides, family members</li>
<li><strong>Preferences:</strong> Food likes/dislikes, routines, comfort items, communication styles</li>
<li><strong>History:</strong> Past hospitalizations, allergies, reactions to medications</li>
</ul>
<p>Don't worry about organizing it perfectly—just share it with Ella and let the system do the work.</p>`,
        categories: ["value"]
    },
    {
        id: "value-how-often",
        question: "How often should I be adding information?",
        answer: `<p>There's no required frequency—add information whenever it's relevant. Many caregivers find it helpful to:</p>
<ul>
<li>Share updates right after doctor appointments</li>
<li>Note medication changes immediately</li>
<li>Log observations when something seems different</li>
<li>Forward emails from healthcare providers as they arrive</li>
</ul>
<p>The more consistently you share, the more complete your elder's care record becomes. But even occasional updates are valuable.</p>`,
        categories: ["value"]
    },
    {
        id: "value-access-info",
        question: "How do I access information I've shared?",
        answer: `<p>Just ask Ella! You can ask questions like:</p>
<ul>
<li>"When was Dad's last cardiology appointment?"</li>
<li>"What medications is Mom taking for blood pressure?"</li>
<li>"Show me the notes from last week's home care visit"</li>
<li>"What did the neurologist recommend?"</li>
</ul>
<p>Ella searches through everything you've shared—texts, documents, photos, voice notes—and gives you the relevant information.</p>`,
        categories: ["value"]
    },
    {
        id: "value-processing-time",
        question: "How long does it take for information to be accessible in chat?",
        answer: `<p>Most information is available within seconds of sharing it. Text messages and simple updates are processed immediately.</p>
<p>Larger files like documents and longer voice notes may take a minute or two to fully process, but you can start asking questions about them right away and Ella will search as processing completes.</p>`,
        categories: ["value"]
    },
    {
        id: "value-correct-remove",
        question: "How do I correct or remove information?",
        answer: `<p>To correct or remove information, go directly to the relevant screen in the app—for example, the medication detail, event detail, or care team member profile. From there you can edit or delete the record.</p>
<p>Ella can help you <strong>find</strong> information ("What's Mom's current dosage?"), but corrections and deletions are made through the app's screens, not through chat.</p>`,
        categories: ["value"]
    },

    // ===== ELLA (AI COMPANION) =====
    {
        id: "ella-who",
        question: "Who is Ella?",
        answer: `<p>Ella is your AI caregiving companion—a smart assistant designed specifically for family caregivers. Think of Ella as a tireless helper who:</p>
<ul>
<li>Remembers every detail you share about your elder's care</li>
<li>Answers questions about medications, appointments, and care history</li>
<li>Helps organize information from texts, emails, documents, and photos</li>
<li>Never forgets, never sleeps, and is always available when you need help</li>
</ul>
<p>Ella is powered by advanced AI but designed with one purpose: making caregiving less overwhelming for families like yours.</p>`,
        categories: ["ella", "getting-started"]
    },
    {
        id: "ella-medical-advice",
        question: "Does Ella provide medical advice?",
        answer: `<p>No. Ella does not provide medical advice, diagnoses, or treatment recommendations.</p>
<p>Ella is a caregiving organizer. She helps your family:</p>
<ul>
<li>Stay coordinated so everyone on the care team knows what's happening</li>
<li>Keep track of the details that matter—appointments, tasks, observations, and more</li>
<li>Share the caregiving load so no one person carries everything alone</li>
</ul>
<p>For medical questions or concerns, always consult with your elder's healthcare providers.</p>`,
        categories: ["ella"]
    },

    // ===== PRIVACY & SECURITY =====
    {
        id: "privacy-private",
        question: "Is the information I share private?",
        answer: `<p>Yes, absolutely. Your information is:</p>
<ul>
<li><strong>Encrypted</strong> in transit and at rest using industry-standard security</li>
<li><strong>Stored securely</strong> in Google Cloud servers in Montreal, Canada</li>
<li><strong>Never sold, shared, or traded</strong> with third parties</li>
<li><strong>Only accessible</strong> to you and the care team members you explicitly invite</li>
</ul>
<p>Elderella is built to meet healthcare-grade security standards (HIPAA and PIPEDA compliant). We treat all caregiving information as sensitive personal data.</p>
<p>Learn more on our <a href="security.html">Trust & Security</a> page.</p>`,
        categories: ["privacy"]
    },
    {
        id: "privacy-learning",
        question: "Will my information be used for AI learning or aggregated?",
        answer: `<p>Your personal caregiving information is never used to train AI models.</p>
<p>Your trust is our foundation. We're in this to help families, not to monetize your data.</p>`,
        categories: ["privacy"]
    },

    // ===== MULTIPLE ELDERS =====
    {
        id: "elders-separate",
        question: "Is each elder profile its own secure area?",
        answer: `<p>Yes. Each elder profile in Elderella is completely separate and secure:</p>
<ul>
<li>Information about one elder is never mixed with another</li>
<li>Care teams are managed independently for each elder</li>
<li>Conversations with Ella are specific to the elder you're currently viewing</li>
<li>You can have different care team members with different access levels for each elder</li>
</ul>
<p>If you're caring for both parents, for example, their information stays completely separate even though you manage both.</p>`,
        categories: ["elders"]
    },
    {
        id: "elders-phone-allocation",
        question: "Why do I have to choose which elder to allocate the phone number to?",
        answer: `<p>When you text Elderella directly (rather than using the app), we need to know which elder's profile to update. The phone number allocation tells Ella where to save information when you text from that number.</p>
<p>If you care for multiple elders, you can:</p>
<ul>
<li>Allocate your primary phone to your most frequently updated elder</li>
<li>Use the app to switch between elders and add information to specific profiles</li>
<li>Start your text with the elder's name to direct it to the right profile</li>
</ul>`,
        categories: ["elders"]
    },

    // ===== CALENDAR SYNC =====
    {
        id: "calendar-what-happens",
        question: "What happens when I sync my calendar?",
        answer: `<p>When you connect your calendar, Elderella can:</p>
<ul>
<li>See your existing appointments to help coordinate care schedules</li>
<li>Add care-related events to your calendar automatically</li>
<li>Send reminders about upcoming appointments</li>
<li>Help your care team avoid scheduling conflicts</li>
</ul>
<p>You control what gets synced—Elderella only accesses the calendars you explicitly connect.</p>`,
        categories: ["calendar"]
    },
    {
        id: "calendar-how-far",
        question: "How far back and forward does the calendar sync?",
        answer: `<p>Calendar sync covers:</p>
<ul>
<li><strong>Past events:</strong> 6 months back, so Ella has context about recent appointments</li>
<li><strong>Future events:</strong> 12 months forward, for upcoming scheduling</li>
</ul>
<p>This range gives Ella enough history to be helpful while keeping data manageable.</p>`,
        categories: ["calendar"]
    },
    {
        id: "calendar-what-details",
        question: "What calendar details will sync?",
        answer: `<p>Elderella syncs the following event details:</p>
<ul>
<li>Event title and description</li>
<li>Date, time, and duration</li>
<li>Location (if provided)</li>
<li>Recurring event patterns</li>
</ul>
<p>We don't sync attendee lists or private notes from your personal calendar—only the information needed to help coordinate care.</p>`,
        categories: ["calendar"]
    },
    {
        id: "calendar-no-bidirectional",
        question: "Why isn't calendar sync bi-directional?",
        answer: `<p>Currently, Elderella reads from your calendar but creates care events in a separate Elderella calendar. This approach:</p>
<ul>
<li>Keeps your personal calendar uncluttered</li>
<li>Prevents accidental modifications to your existing events</li>
<li>Gives your care team their own shared calendar view</li>
<li>Makes it easy to see only care-related events when needed</li>
</ul>
<p>We're exploring bi-directional sync options for future updates based on user feedback.</p>`,
        categories: ["calendar"]
    },

    // ===== CARE TEAMS =====
    {
        id: "careteam-convince-family",
        question: "How do I convince family that Elderella is a good idea?",
        answer: `<p>Here are some approaches that work:</p>
<ul>
<li><strong>Start with the problem:</strong> "I'm having trouble keeping track of all of Mom's medications and appointments. I found an app that might help."</li>
<li><strong>Emphasize the benefit to them:</strong> "This way, you won't have to call me every time you need to know something about Dad's care."</li>
<li><strong>Offer a trial:</strong> "Can we try it for a week? If it doesn't help, we'll stop using it."</li>
<li><strong>Address privacy:</strong> "The information stays private to our family. It's encrypted and secure."</li>
</ul>
<p>Often, family members become enthusiastic once they see how much easier it makes coordination.</p>`,
        categories: ["careteam", "getting-started"]
    },
    {
        id: "careteam-invite",
        question: "How do I invite someone to my care team?",
        answer: `<p>To invite someone to your elder's care team:</p>
<ol>
<li>Open the Elderella app and go to your elder's profile</li>
<li>Tap "Care Team" in the menu</li>
<li>Tap "Invite Member"</li>
<li>Enter their email address and select their access level</li>
<li>They'll receive an email invitation to join</li>
</ol>
<p>Once they accept, they can access the elder's information based on the access level you assigned. You can change access levels or remove team members anytime.</p>`,
        categories: ["careteam"]
    },
    {
        id: "careteam-permissions",
        question: "What are the different access levels?",
        answer: `<p>Elderella offers five access levels for care team members:</p>
<ul>
<li><strong>Primary Caregiver:</strong> Full access to all information, can manage billing, invite/remove team members, and delete the elder profile</li>
<li><strong>Caregiver:</strong> Can view and add all care information, manage tasks and events</li>
<li><strong>Contributor:</strong> Can view shared information and add updates</li>
<li><strong>Medical Professional:</strong> Tailored access for healthcare providers involved in your elder's care</li>
<li><strong>Contact Only:</strong> Can view basic contact information and receive notifications</li>
</ul>
<p>Choose the level that's appropriate for each person's role in your elder's care.</p>`,
        categories: ["careteam"]
    },
    {
        id: "careteam-delete-elder",
        question: "How do I delete an elder profile?",
        answer: `<p>Only the Primary Caregiver can delete an elder profile. To do so:</p>
<ol>
<li>Go to your elder's profile settings</li>
<li>Scroll to "Account Management"</li>
<li>Tap "Delete Elder Profile"</li>
<li>Confirm the deletion</li>
</ol>
<p><strong>Important:</strong> Deleting an elder profile permanently removes all care history, documents, and team access. This action cannot be undone. Consider exporting your data first if you might need it later.</p>`,
        categories: ["careteam"]
    },
    {
        id: "careteam-leave",
        question: "How do I leave a care team?",
        answer: `<p>To leave a care team you've been invited to:</p>
<ol>
<li>Go to the elder's profile you want to leave</li>
<li>Tap "Care Team" in the menu</li>
<li>Find your name and tap "Leave Team"</li>
<li>Confirm your decision</li>
</ol>
<p>After leaving, you'll no longer have access to that elder's information. If you're the Primary Caregiver, you'll need to transfer that role to another team member before you can leave.</p>`,
        categories: ["careteam"]
    },

    // ===== PRICING =====
    {
        id: "pricing-trial",
        question: "What happens after the 7-day free trial?",
        answer: `<p>After your 7-day free trial ends, you can choose to subscribe to Plus or Premium, or continue with our Free plan. Your data stays safe regardless of which plan you choose. If you downgrade, you'll retain access to everything within your new plan's limits.</p>`,
        categories: ["pricing"]
    },
    {
        id: "pricing-per-elder",
        question: "How does the \"per elder\" pricing work?",
        answer: `<p>The price is per elder profile. Each paid plan covers one elder profile. If you're caring for multiple elders, you can add additional profiles to your account. Each elder profile is billed separately at the same monthly rate. Your own profile (as the caregiver) is always free.</p>`,
        categories: ["pricing"]
    },
    {
        id: "pricing-change-plan",
        question: "How do I upgrade, downgrade, or cancel?",
        answer: `<p>You can change your plan anytime from your account settings in the app. Upgrades take effect immediately, and you'll be charged the prorated difference. Downgrades take effect at the end of your current billing period. You can cancel anytime with no penalties.</p>`,
        categories: ["pricing"]
    },
    {
        id: "pricing-downgrade-data",
        question: "What will happen if I downgrade my subscription?",
        answer: `<p>Your data is never deleted when you downgrade. If you exceed your new plan's limits (like care history duration or care team members), older data becomes view-only and team members beyond the limit can no longer access the profile until you upgrade again or adjust your team size.</p>`,
        categories: ["pricing"]
    },
    {
        id: "pricing-team-cost",
        question: "Do care team members need to pay separately?",
        answer: `<p>No. Care team members are included in your subscription at no extra cost. The person who creates and pays for the elder profile determines the plan level, and all invited care team members get access to that elder's information based on their assigned role.</p>`,
        categories: ["pricing"]
    },
    {
        id: "pricing-change-payer",
        question: "Can we change who is paying for an elder?",
        answer: `<p>Yes. To transfer billing responsibility:</p>
<ol>
<li>The current subscriber makes the new person a "Primary Caregiver" on the care team</li>
<li>The current subscriber downgrades to Free</li>
<li>The new Primary Caregiver subscribes to a paid plan</li>
</ol>
<p>Your care memory and team stay intact throughout the switch.</p>`,
        categories: ["pricing"]
    },
    {
        id: "pricing-cancel-data",
        question: "What happens to my information if I cancel my subscription?",
        answer: `<p>When you cancel, your account reverts to the Free plan. Your data remains accessible within Free plan limits. If you want to permanently delete your data, you can request account deletion from your settings. We retain data for 30 days after deletion requests in case you change your mind.</p>`,
        categories: ["pricing"]
    }
];

// Category definitions for display
const FAQ_CATEGORIES = {
    "value": "Value of Elderella",
    "ella": "About Ella",
    "privacy": "Privacy & Security",
    "elders": "Multiple Elders",
    "calendar": "Calendar Sync",
    "careteam": "Care Teams",
    "pricing": "Pricing & Plans",
    "getting-started": "Getting Started"
};

// Export for use in components
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { FAQ_DATA, FAQ_CATEGORIES };
}
