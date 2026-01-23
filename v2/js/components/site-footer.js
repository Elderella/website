/**
 * Site Footer Web Component
 * Contains: Footer brand, nav columns, social links, newsletter form, copyright
 */
class SiteFooter extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
            <!-- Footer -->
            <footer class="site-footer">
                <div class="container">
                    <!-- Top Row -->
                    <div class="footer-top">
                        <div class="footer-brand">
                            <img src="images/elderella-logo-header.png" alt="Elderella" class="footer-logo" width="709" height="300">
                            <span class="footer-tagline">For family caregivers</span>
                        </div>
                        <div class="footer-nav">
                            <div class="footer-nav-col">
                                <h4>Product</h4>
                                <ul>
                                    <li><a href="how-elderella-works.html">How Elderella works</a></li>
                                    <li><a href="collects-care-details.html">Features</a></li>
                                    <li><a href="trust.html">Trust & security</a></li>
                                    <li><a href="terms.html">Terms of service</a></li>
                                </ul>
                            </div>
                            <div class="footer-nav-col">
                                <h4>Help us help you</h4>
                                <ul>
                                    <li><a href="story.html">Your caregiving story</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <!-- Bottom Row -->
                    <div class="footer-bottom">
                        <div class="footer-social">
                            <h4>Connect with us</h4>
                            <div class="footer-social-icons">
                                <a href="https://www.facebook.com/ElderellaCare/" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                                    <img
                                        src="images/facebook.png"
                                        srcset="images/facebook.png 1x, images/facebook@2x.png 2x"
                                        alt="Facebook"
                                        loading="lazy"
                                        decoding="async"
                                    >
                                </a>
                                <a href="https://www.instagram.com/elderellacare/" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                                    <img
                                        src="images/instagram.png"
                                        srcset="images/instagram.png 1x, images/instagram@2x.png 2x"
                                        alt="Instagram"
                                        loading="lazy"
                                        decoding="async"
                                    >
                                </a>
                                <a href="https://www.linkedin.com/company/elderella/" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
                                    <img
                                        src="images/linkedin.png"
                                        srcset="images/linkedin.png 1x, images/linkedin@2x.png 2x"
                                        alt="LinkedIn"
                                        loading="lazy"
                                        decoding="async"
                                    >
                                </a>
                                <a href="https://x.com/ElderellaCare" aria-label="X" target="_blank" rel="noopener noreferrer">
                                    <img
                                        src="images/x.png"
                                        srcset="images/x.png 1x, images/x@2x.png 2x"
                                        alt="X"
                                        loading="lazy"
                                        decoding="async"
                                    >
                                </a>
                            </div>
                        </div>
                        <div class="footer-newsletter">
                            <h4>Family elder care—right to your inbox</h4>
                            <p>Receive tips, advice, recommendations, and more.</p>
                            <form class="newsletter-form" id="footer-newsletter-form" onsubmit="return false;">
                                <div class="newsletter-name-row">
                                    <input type="text" id="newsletter-first-name" name="firstName" placeholder="First name" required>
                                    <input type="text" id="newsletter-last-name" name="lastName" placeholder="Last name" required>
                                </div>
                                <div class="newsletter-email-row">
                                    <input type="email" id="newsletter-email" name="email" placeholder="Your email address..." required>
                                </div>
                                <div class="newsletter-consent">
                                    <input type="checkbox" id="newsletter-consent" name="consent" required>
                                    <label for="newsletter-consent">I consent to receive communications from Elderella. I can unsubscribe at any time.</label>
                                </div>
                                <button type="submit" class="btn-signup-footer">Sign up</button>
                            </form>
                            <div id="newsletter-message" class="newsletter-message"></div>
                            <p class="privacy-note">We respect your privacy. See our <a href="privacy.html">Privacy Policy</a>.</p>
                        </div>
                    </div>

                    <!-- Copyright -->
                    <div class="footer-copyright">
                        <p>&copy; ${new Date().getFullYear()} Elderella Inc. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        `;

        this.initNewsletterForm();
    }

    initNewsletterForm() {
        const form = this.querySelector('#footer-newsletter-form');
        if (!form) return;

        let submitting = false;

        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            if (submitting) return;
            submitting = true;

            const submitBtn = form.querySelector('.btn-signup-footer');
            const messageDiv = this.querySelector('#newsletter-message');
            const consentCheckbox = this.querySelector('#newsletter-consent');
            const originalBtnText = submitBtn.textContent;

            // Check consent
            if (!consentCheckbox.checked) {
                messageDiv.textContent = 'Please consent to receive communications.';
                messageDiv.className = 'newsletter-message error';
                submitting = false;
                return;
            }

            submitBtn.textContent = 'Processing...';
            submitBtn.disabled = true;
            messageDiv.textContent = '';
            messageDiv.className = 'newsletter-message';

            const formData = {
                firstName: this.querySelector('#newsletter-first-name').value,
                lastName: this.querySelector('#newsletter-last-name').value,
                email: this.querySelector('#newsletter-email').value
            };

            try {
                const response = await fetch('/api/newsletter', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });

                const result = await response.json();

                if (!response.ok) {
                    console.error('Server error:', result.error);
                    messageDiv.textContent = result.error || 'Unable to sign up. Please try again.';
                    messageDiv.className = 'newsletter-message error';
                    submitBtn.textContent = originalBtnText;
                    submitBtn.disabled = false;
                    submitting = false;
                } else {
                    messageDiv.textContent = "Success! You're signed up for updates.";
                    messageDiv.className = 'newsletter-message success';
                    submitBtn.textContent = originalBtnText;
                    form.reset();

                    setTimeout(() => {
                        submitBtn.disabled = false;
                        submitting = false;
                        messageDiv.textContent = '';
                    }, 3000);
                }

            } catch (error) {
                console.error('Network error:', error);
                messageDiv.textContent = 'Connection error. Please try again.';
                messageDiv.className = 'newsletter-message error';
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;
                submitting = false;
            }
        });
    }
}

customElements.define('site-footer', SiteFooter);
