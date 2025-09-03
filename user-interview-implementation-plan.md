# Elderella User Interview & Email Capture Implementation Plan

## Overview
Transform the current single email capture form into a two-pronged approach:
1. **Primary**: User interview booking flow (with Calendly integration)
2. **Secondary**: Simple email signup for updates (in footer)

## Architecture

### Data Flow
```
User Interview Form → JavaScript → CloudFlare Worker → Attio CRM
                                         ↓
                                  Calendly (redirect)
```

## Phase 1: Frontend Implementation

### 1.1 User Interview Form (Main Section)

**Location**: Replace current email section (index.html lines 506-520)

**Form Fields**:
- **Name** (required, text)
- **Email** (required, email)
- **Phone** (optional, tel)
- **Caregiving Situation** (optional, textarea)
  - Placeholder: "Tell us briefly about your caregiving situation (optional)"
  - Maps to Calendly Question 1: "Please tell us a little about your caregiving situation"
- **Preferred Interviewer** (radio buttons)
  - Jacqui Murphy (first option)
  - Mike Kirkup (second option)
  - No preference (default selected)

**Visual Design**:
- Maintain current styling consistency
- Header: "Share Your Caregiving Story"
- Subtext: "Book a 50-minute conversation to help shape the future of elder care"
- CTA Button: "Schedule Your Interview"

### 1.2 JavaScript Functionality

**File**: Add to existing `<script>` section or create `interview-form.js`

**Core Functions**:

```javascript
async function handleInterviewSubmit(event) {
    // 1. Prevent default form submission
    // 2. Capture form data
    // 3. Send to CloudFlare Worker API
    // 4. Build Calendly URL with parameters
    // 5. Redirect to Calendly
}

function buildCalendlyUrl(formData) {
    // Base URLs
    const urls = {
        mike: 'https://calendly.com/mkirkup/elderella-caregiver-interview',
        jacqui: 'https://calendly.com/jacqui-murphy/elderella-caregiver-interview'
    }
    
    // Select interviewer (default to Jacqui for no preference)
    let baseUrl = formData.interviewer === 'mike' ? urls.mike : urls.jacqui;
    
    // Build parameters
    const params = new URLSearchParams({
        name: formData.name,
        email: formData.email,
        a1: formData.situation // Maps to Calendly Question 1
    });
    
    return `${baseUrl}?${params.toString()}`;
}
```

### 1.3 Footer Email Signup

**Location**: Add to footer section (before closing footer tag)

**Simple Form**:
- Single email input field
- Submit button: "Get Updates"
- Minimal styling to fit footer aesthetic
- Sends to CloudFlare Worker: `/api/newsletter`

## Phase 2: CloudFlare Worker Setup

### 2.1 Create CloudFlare Worker

**Setup Steps**:
1. Use existing CloudFlare account
2. Create new Worker: `elderella-website-api`
3. Add environment variables:
   - `ATTIO_API_KEY` - Your Attio API key
   - `INTERVIEW_LIST_ID` - ID of your "User Interviews" list in Attio
   - `INTERVIEW_REQUESTED_STAGE_ID` - ID of the "Interview Requested" stage

**Worker Code** (`worker.js`):
```javascript
export default {
  async fetch(request, env, ctx) {
    // Get origin from request
    const origin = request.headers.get('Origin');
    const allowedOrigins = ['https://elderella.com', 'https://elderella.github.io'];
    const corsOrigin = allowedOrigins.includes(origin) ? origin : allowedOrigins[0];
    
    // Handle CORS
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': corsOrigin,
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        }
      });
    }

    const url = new URL(request.url);
    
    // Handle interview form submission
    if (url.pathname === '/api/interview' && request.method === 'POST') {
      try {
        const data = await request.json();
        
        // Create or update contact in Attio
        const attioResponse = await fetch('https://api.attio.com/v2/objects/people', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${env.ATTIO_API_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            data: {
              values: {
                name: [{ value: data.name }],
                email_addresses: [{ email_address: data.email }],
                phone_numbers: data.phone ? [{ phone_number: data.phone }] : [],
                // Custom attributes - adjust based on your Attio setup
                caregiving_situation: [{ value: data.situation }],
                source: [{ value: 'Website' }]
              }
            }
          })
        });

        if (!attioResponse.ok) {
          throw new Error('Failed to save to Attio');
        }

        const person = await attioResponse.json();
        
        // Add to User Interviews list in "Interview Requested" stage
        // Note: You'll need to get the list_id and stage_id from Attio
        await fetch(`https://api.attio.com/v2/lists/${env.INTERVIEW_LIST_ID}/entries`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${env.ATTIO_API_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            data: {
              parent_object: 'people',
              parent_record_id: person.data.id,
              stage_id: env.INTERVIEW_REQUESTED_STAGE_ID
            }
          })
        });

        return new Response(JSON.stringify({ success: true }), {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': corsOrigin
          }
        });
      } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': corsOrigin
          }
        });
      }
    }

    // Handle newsletter signup
    if (url.pathname === '/api/newsletter' && request.method === 'POST') {
      try {
        const data = await request.json();
        
        const attioResponse = await fetch('https://api.attio.com/v2/objects/people', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${env.ATTIO_API_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            data: {
              values: {
                email_addresses: [{ email_address: data.email }],
                source: [{ value: 'Website' }]
              }
            }
          })
        });

        if (!attioResponse.ok) {
          throw new Error('Failed to save to Attio');
        }

        return new Response(JSON.stringify({ success: true }), {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': corsOrigin
          }
        });
      } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': corsOrigin
          }
        });
      }
    }

    return new Response('Not Found', { status: 404 });
  }
};
```

### 2.2 Deploy Worker
```bash
# Install Wrangler CLI
npm install -g wrangler

# Login to CloudFlare
wrangler login

# Create wrangler.toml
name = "elderella-website-api"
main = "worker.js"
compatibility_date = "2024-01-01"

[vars]
# Non-secret environment variables

[[kv_namespaces]]
# If you need storage later

# Deploy
wrangler publish

# Add secrets
wrangler secret put ATTIO_API_KEY
wrangler secret put INTERVIEW_LIST_ID
wrangler secret put INTERVIEW_REQUESTED_STAGE_ID
```

### 2.3 Update Frontend JavaScript

```javascript
async function handleInterviewSubmit(event) {
    event.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        situation: document.getElementById('situation').value,
        interviewer: document.querySelector('input[name="interviewer"]:checked').value
    };
    
    try {
        // Send to CloudFlare Worker
        const response = await fetch('https://elderella-website-api.YOUR-SUBDOMAIN.workers.dev/api/interview', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        
        if (response.ok) {
            // Build and redirect to Calendly
            const calendlyUrl = buildCalendlyUrl(formData);
            window.location.href = calendlyUrl;
        } else {
            // Handle error - maybe still redirect to Calendly?
            console.error('Failed to save data, but redirecting to Calendly anyway');
            const calendlyUrl = buildCalendlyUrl(formData);
            window.location.href = calendlyUrl;
        }
    } catch (error) {
        // Even on error, redirect to Calendly so we don't lose the interview
        console.error('Error:', error);
        const calendlyUrl = buildCalendlyUrl(formData);
        window.location.href = calendlyUrl;
    }
}
```

## Phase 3: Attio Configuration

### 3.1 Attio Setup

**Create Custom Attributes in Attio**:
1. `caregiving_situation` (Text field)
2. `source` (Text field, default: "Website")

**Create List for Interview Pipeline**:
1. Create new List: "User Interviews"
2. Add stages:
   - "Interview Requested" (initial stage)
   - "Interview Scheduled"
   - "Interview Completed"
   - "Follow-up Needed"

**Get API Key and IDs**:
1. Go to Attio Settings → Developers → API Keys
2. Create new key with permissions:
   - `record:read`
   - `record:write`
3. Copy key for CloudFlare Worker environment variable
4. Get List and Stage IDs:
   - Use Attio API Explorer or make API call to GET /v2/lists
   - Find your "User Interviews" list ID
   - Find the "Interview Requested" stage ID within that list

### 3.2 Calendly → Attio Sync (Optional Enhancement)

**Using Calendly Webhooks**:
1. Set up webhook in Calendly to notify CloudFlare Worker
2. Worker finds contact in Attio by email
3. Moves contact to "Interview Scheduled" stage in User Interviews list
4. Adds note with interview date/time

## Phase 4: Testing Checklist

### 4.1 CloudFlare Worker Setup
- [ ] Worker deployed successfully
- [ ] ATTIO_API_KEY environment variable set
- [ ] Worker URL is accessible
- [ ] CORS headers allow requests from elderella.com

### 4.2 User Interview Flow
- [ ] Form validates required fields (name, email)
- [ ] Form data sends to CloudFlare Worker successfully
- [ ] Attio contact is created/updated
- [ ] Calendly redirect works with all parameters
- [ ] Name prefills in Calendly
- [ ] Email prefills in Calendly
- [ ] Caregiving situation prefills in Calendly Question 1
- [ ] Mike's Calendly link works when selected
- [ ] Jacqui's Calendly link works when selected
- [ ] Random assignment works for "no preference"
- [ ] Phone number (if provided) is saved to Attio

### 4.3 Newsletter Signup
- [ ] Footer form submits successfully
- [ ] Email is saved to Attio with correct source tag
- [ ] Form doesn't interfere with interview form

### 4.4 Data Flow
- [ ] CloudFlare Worker receives form submissions
- [ ] Attio API calls succeed
- [ ] Contacts appear in Attio with correct fields
- [ ] Error handling works (still redirects to Calendly on failure)

## Phase 5: Launch Steps

1. **Set up CloudFlare Worker** (20 mins)
   - Create CloudFlare account
   - Deploy worker code
   - Add ATTIO_API_KEY secret
   - Test worker endpoints

2. **Configure Attio** (15 mins)
   - Create custom attributes
   - Generate API key
   - Test API connection

3. **Implement frontend changes** (30 mins)
   - Update interview form HTML
   - Add JavaScript for form handling
   - Add footer newsletter signup

4. **Test locally** (15 mins)
   - Verify form validation
   - Test CloudFlare Worker calls
   - Confirm Calendly redirects

5. **Deploy to GitHub Pages** (5 mins)
   - Commit and push changes
   - Verify deployment

6. **Run full end-to-end test** (15 mins)
   - Submit test interview request
   - Verify Attio contact created
   - Complete Calendly booking
   - Test newsletter signup

7. **Monitor first real submissions** (ongoing)

## Success Metrics

- **Primary**: Number of user interviews scheduled
- **Secondary**: Conversion rate from form view to Calendly booking
- **Tertiary**: Newsletter signups via footer

## Rollback Plan

If issues arise:
1. Revert to simple email capture form (git revert)
2. FormSubmit continues to capture emails as fallback
3. Manual outreach to anyone affected

## Future Enhancements

1. **A/B Testing**: Test different CTA copy
2. **Analytics**: Add event tracking for form interactions
3. **Calendly Webhooks**: Get notified when interviews are actually booked
4. **Scheduling Intelligence**: Auto-assign interviewer based on availability
5. **Thank You Page**: Custom confirmation page post-Calendly
6. **Rate Limiting**: Add rate limiting to CloudFlare Worker to prevent abuse
7. **Backup Storage**: Store submissions in CloudFlare KV as backup

## Architecture Benefits

**Why CloudFlare Workers:**
- **Fast**: ~50ms response time from edge locations
- **Reliable**: 99.9% uptime SLA
- **Secure**: API keys never exposed to frontend
- **Scalable**: 100,000 requests/day free tier
- **Simple**: No servers to manage

## Notes

- CloudFlare Worker handles all API communication securely
- Calendly parameter `a1` maps to their first custom question
- Both founders have identical Calendly setup for consistency
- Random interviewer assignment helps balance interview load
- Always redirect to Calendly even if Attio save fails (don't lose the interview!)