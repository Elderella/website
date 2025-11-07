# Newsletter Signup Implementation Plan

## Overview
Add newsletter signup functionality to the Elderella website in two locations:
1. Checkbox opt-in on the existing "Share your Elder care story" interview form
2. Standalone newsletter signup section (new)

---

## 1. Update Interview Form (index.html)

### Changes to Form Fields
**Current:** Single "name" field
**Update to:** Split into "first name" and "last name" fields

#### HTML Changes (lines 240-244)
```html
<!-- BEFORE -->
<input type="text" id="name" name="name" placeholder="Your name" required>

<!-- AFTER -->
<input type="text" id="firstName" name="firstName" placeholder="Your first name" required>
<input type="text" id="lastName" name="lastName" placeholder="Your last name" required>
```

### Add Newsletter Checkbox
Add after the radio section, before the submit button (after line 262):

```html
<div class="newsletter-checkbox">
    <label>
        <input type="checkbox" name="newsletter" id="newsletter" checked>
        <span>Yes! Please send me Elderella updates.</span>
    </label>
</div>
```

### CSS for Checkbox
Add to `styles-v2.css`:

```css
.newsletter-checkbox {
    margin: 20px 0;
}

.newsletter-checkbox label {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    cursor: pointer;
    font-size: 16px;
    color: #595959;
}

.newsletter-checkbox input[type="checkbox"] {
    margin-top: 2px;
    width: 18px;
    height: 18px;
    cursor: pointer;
}
```

### Update JavaScript (lines 486-601)

#### Form Data Collection
Update `formData` object to include:
```javascript
const formData = {
    firstName: document.getElementById('firstName').value,
    lastName: document.getElementById('lastName').value,
    email: document.getElementById('email').value,
    phone: document.getElementById('phone').value || '',
    situation: document.getElementById('situation').value || '',
    interviewer: document.querySelector('input[name="interviewer"]:checked').value,
    newsletter: document.getElementById('newsletter').checked
};
```

#### Calendly URL Update
Update `buildCalendlyUrl` function to use firstName + lastName:
```javascript
const params = new URLSearchParams({
    name: `${formData.firstName} ${formData.lastName}`,
    email: formData.email
});
```

### API Payload to Backend
The interview form will now send:
```json
{
    "firstName": "Jane",
    "lastName": "Doe",
    "email": "jane@example.com",
    "phone": "+1234567890",
    "situation": "Caring for elderly parents...",
    "interviewer": "jacqui",
    "newsletter": true
}
```

**Backend should:**
- If `newsletter === true`, set Attio fields:
  - Consent Type: "Express"
  - Consent Timestamp: current datetime
  - Consent Source: "Marketing Sign up Form"

---

## 2. Create Standalone Newsletter Section

### HTML Structure
Insert new section **before** the Founders section (before line 408):

```html
<!-- Newsletter Section -->
<section class="newsletter-section">
    <div class="container">
        <div class="newsletter-content">
            <img src="images/elderella-sparkle.svg" alt="Elderella sparkle" class="newsletter-star-icon">
            <h2>Want to keep up with our latest news?</h2>

            <form id="newsletterForm" class="newsletter-form">
                <div class="newsletter-inputs">
                    <input type="text" id="newsletter-firstName" name="firstName" placeholder="Your first name" required>
                    <input type="text" id="newsletter-lastName" name="lastName" placeholder="Your last name" required>
                    <input type="email" id="newsletter-email" name="email" placeholder="Your email address" required>
                </div>
                <button type="submit" class="newsletter-submit-btn">Sign up for updates!</button>
                <div id="newsletter-message" class="newsletter-message"></div>
            </form>
        </div>
    </div>
</section>
```

### CSS Styling (styles-v2.css)

```css
/* Newsletter Section */
.newsletter-section {
    background-color: #FFFFFF;
    padding: 80px 0;
}

.newsletter-content {
    max-width: 800px;
    margin: 0 auto;
    text-align: center;
    position: relative;
}

.newsletter-star-icon {
    width: 60px;
    height: 60px;
    margin: 0 auto 20px;
    display: block;
}

.newsletter-section h2 {
    font-family: 'Merriweather', serif;
    font-size: 2rem;
    color: #342A99;
    margin-bottom: 30px;
}

.newsletter-form {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.newsletter-inputs {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 15px;
}

.newsletter-inputs input[type="text"],
.newsletter-inputs input[type="email"] {
    padding: 15px 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-size: 16px;
    font-family: 'Source Sans Pro', sans-serif;
    background-color: #FFFFFF;
}

.newsletter-inputs input:focus {
    outline: none;
    border-color: #8b7dd8;
}

/* Email spans both columns on desktop */
.newsletter-inputs input[type="email"] {
    grid-column: 1 / -1;
}

.newsletter-submit-btn {
    background-color: #FFBC57;
    color: #595959;
    padding: 15px 40px;
    border: none;
    border-radius: 8px;
    font-size: 18px;
    font-weight: 500;
    cursor: pointer;
    transition: opacity 0.3s;
    font-family: 'Source Sans Pro', sans-serif;
}

.newsletter-submit-btn:hover {
    opacity: 0.9;
}

.newsletter-submit-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

.newsletter-message {
    min-height: 24px;
    font-size: 16px;
    font-weight: 500;
    margin-top: 10px;
}

.newsletter-message.success {
    color: #28a745;
}

.newsletter-message.error {
    color: #dc3545;
}

/* Tablet */
@media (max-width: 768px) {
    .newsletter-section {
        padding: 60px 0;
    }

    .newsletter-section h2 {
        font-size: 1.5rem;
    }

    .newsletter-inputs {
        gap: 12px;
    }
}

/* Mobile */
@media (max-width: 480px) {
    .newsletter-section {
        padding: 40px 0;
    }

    .newsletter-inputs {
        grid-template-columns: 1fr;
    }

    .newsletter-inputs input[type="email"] {
        grid-column: 1;
    }
}
```

### JavaScript Handler
Add before the closing `</script>` tag (around line 600):

```javascript
// Newsletter form handler
let newsletterFormStarted = false;
const newsletterFormInputs = document.querySelectorAll('#newsletterForm input');
newsletterFormInputs.forEach(input => {
    input.addEventListener('focus', () => {
        if (!newsletterFormStarted) {
            newsletterFormStarted = true;
            window.dataLayer.push({
                'event': 'start_form',
                'form_name': 'newsletter_form'
            });
        }
    });
});

document.getElementById('newsletterForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = e.target.querySelector('.newsletter-submit-btn');
    const messageDiv = document.getElementById('newsletter-message');
    const originalBtnText = submitBtn.textContent;

    submitBtn.textContent = 'Processing...';
    submitBtn.disabled = true;
    messageDiv.textContent = '';
    messageDiv.className = 'newsletter-message';

    const formData = {
        firstName: document.getElementById('newsletter-firstName').value,
        lastName: document.getElementById('newsletter-lastName').value,
        email: document.getElementById('newsletter-email').value
    };

    try {
        const response = await fetch(`${WORKER_URL}/api/newsletter`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const result = await response.json();

        if (!response.ok) {
            console.error('Server error:', result.error);
            messageDiv.textContent = result.error || 'Unable to save information. Please try again.';
            messageDiv.className = 'newsletter-message error';
            submitBtn.textContent = originalBtnText;
            submitBtn.disabled = false;

            // Fire event even on error for analytics
            window.dataLayer.push({
                'event': 'newsletter_signup',
                'form_name': 'newsletter_form',
                'submission_status': 'server_error'
            });
        } else {
            // Success
            window.dataLayer.push({
                'event': 'newsletter_signup',
                'form_name': 'newsletter_form',
                'submission_status': 'success'
            });

            messageDiv.textContent = 'Success! You\'re signed up for updates.';
            messageDiv.className = 'newsletter-message success';
            submitBtn.textContent = originalBtnText;

            // Clear form
            e.target.reset();

            // Re-enable button after 3 seconds
            setTimeout(() => {
                submitBtn.disabled = false;
                messageDiv.textContent = '';
            }, 3000);
        }

    } catch (error) {
        console.error('Network error:', error);

        window.dataLayer.push({
            'event': 'newsletter_signup',
            'form_name': 'newsletter_form',
            'submission_status': 'network_error'
        });

        messageDiv.textContent = 'Connection issue. Please try again.';
        messageDiv.className = 'newsletter-message error';
        submitBtn.textContent = originalBtnText;
        submitBtn.disabled = false;
    }
});
```

---

## 3. Backend API Changes

### New Endpoint: `/api/newsletter`
**Method:** POST

**Request Body:**
```json
{
    "firstName": "Jane",
    "lastName": "Doe",
    "email": "jane@example.com"
}
```

**Attio Fields to Set:**
- First Name: `firstName`
- Last Name: `lastName`
- Email: `email`
- Consent Type: "Express"
- Consent Timestamp: `new Date().toISOString()`
- Consent Source: "Marketing Sign up Form"

**Response:**
```json
{
    "success": true,
    "message": "Newsletter signup successful"
}
```

**Error Response:**
```json
{
    "error": "Invalid email address"
}
```

### Update Existing Endpoint: `/api/interview`

**Updated Request Body:**
```json
{
    "firstName": "Jane",
    "lastName": "Doe",
    "email": "jane@example.com",
    "phone": "+1234567890",
    "situation": "Caring for elderly parents...",
    "interviewer": "jacqui",
    "newsletter": true
}
```

**Backend Logic:**
1. Process interview request as normal
2. If `newsletter === true`, also set newsletter consent fields:
   - Consent Type: "Express"
   - Consent Timestamp: `new Date().toISOString()`
   - Consent Source: "Marketing Sign up Form"

---

## 4. Google Tag Manager Events

### New Event: `newsletter_signup`
Fired when standalone newsletter form is submitted.

**DataLayer Push:**
```javascript
window.dataLayer.push({
    'event': 'newsletter_signup',
    'form_name': 'newsletter_form',
    'submission_status': 'success' // or 'server_error', 'network_error'
});
```

### Updated Event: `lead`
Already exists for interview form. Newsletter checkbox state is captured in backend, no additional GTM event needed (unless you want to track checkbox state explicitly).

---

## 5. Implementation Checklist

### Frontend (index.html)
- [ ] Update interview form: split "name" into "firstName" + "lastName"
- [ ] Add newsletter checkbox to interview form (checked by default)
- [ ] Update interview form JavaScript to collect firstName, lastName, newsletter
- [ ] Update Calendly URL builder to combine firstName + lastName
- [ ] Add new newsletter section HTML before founders section
- [ ] Add newsletter form JavaScript handler with GTM events
- [ ] Update dataLayer events for newsletter tracking

### CSS (styles-v2.css)
- [ ] Add `.newsletter-checkbox` styles
- [ ] Add `.newsletter-section` styles
- [ ] Add `.newsletter-form` styles
- [ ] Add responsive styles for mobile/tablet

### Backend (CloudFlare Worker)
- [ ] Create new `/api/newsletter` endpoint
- [ ] Update `/api/interview` endpoint to accept firstName, lastName, newsletter fields
- [ ] Add Attio field mapping for newsletter consent:
  - Consent Type: "Express"
  - Consent Timestamp: current datetime
  - Consent Source: "Marketing Sign up Form"
- [ ] Handle newsletter opt-in from interview form (when newsletter === true)

### Testing
- [ ] Test interview form with newsletter checkbox checked
- [ ] Test interview form with newsletter checkbox unchecked
- [ ] Test standalone newsletter form submission
- [ ] Test form validation (empty fields)
- [ ] Test error handling (server errors, network errors)
- [ ] Test GTM event firing
- [ ] Test Attio data appears correctly with consent fields
- [ ] Test mobile responsive layout
- [ ] Test tablet responsive layout
- [ ] Test Calendly URL still works with firstName + lastName

---

## 6. Design Compliance

### Colors
- Newsletter section background: `#FFFFFF` (pure white)
- Heading: `#342A99` (dark purple)
- Button background: `#FFBC57` (yellow/orange)
- Button text: `#595959` (dark gray)
- Input borders: `#ddd` (light gray), focus: `#8b7dd8` (light purple)

### Typography
- Heading: `'Merriweather', serif` at 2rem
- Body/inputs: `'Source Sans Pro', sans-serif` at 16px
- Button: `'Source Sans Pro', sans-serif` at 18px, weight 500

### Spacing
- Section padding: 80px vertical (mobile: 40px, tablet: 60px)
- Input border-radius: 8px
- Button border-radius: 8px

---

## 7. Notes & Considerations

1. **Data consistency:** Both forms now collect firstName + lastName separately
2. **Default opt-in:** Newsletter checkbox is checked by default on interview form
3. **Single consent source:** Both forms use "Marketing Sign up Form" as consent source
4. **No double opt-in:** Users are immediately added to newsletter without confirmation email
5. **Success feedback:** Interview form redirects to Calendly, newsletter form shows inline success message
6. **Error handling:** Both forms handle network/server errors gracefully and fire GTM events for tracking
7. **GTM tracking:** New `newsletter_signup` event for standalone form, existing `lead` event for interview form
8. **Mobile responsive:** Newsletter form stacks vertically on mobile devices

---

## 8. Future Enhancements (Not in this phase)

- Double opt-in with confirmation email
- Welcome email sequence for newsletter signups
- Unsubscribe functionality
- Newsletter preference management page
- A/B testing checkbox default state
- Track separate consent sources for interview vs newsletter forms
