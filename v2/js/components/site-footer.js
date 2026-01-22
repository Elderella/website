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
                                    <li><a href="how-elderella-works.html">Features</a></li>
                                    <li><a href="trust.html">Trust & security</a></li>
                                    <li><a href="terms.html">Terms of service</a></li>
                                    <li><a href="compare-plans.html">Pricing</a></li>
                                </ul>
                            </div>
                            <div class="footer-nav-col">
                                <h4>Help us help you</h4>
                                <ul>
                                    <li><a href="story.html">Your caregiving story</a></li>
                                    <li><a href="story.html">Get early access</a></li>
                                    <li><a href="faq.html">FAQ & help</a></li>
                                    <li><a href="introduce.html">Consent from elders</a></li>
                                </ul>
                            </div>
                            <div class="footer-nav-col">
                                <h4>Elderella Inc.</h4>
                                <ul>
                                    <li><a href="about.html">About</a></li>
                                    <li><a href="elder-care-crisis.html">The elder care crisis</a></li>
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
                            <form class="newsletter-form" action="#" method="POST">
                                <label for="newsletter-email" class="sr-only">Email address</label>
                                <input type="email" id="newsletter-email" name="email" placeholder="Your email address..." required>
                                <button type="submit" class="btn-signup-footer">Sign up</button>
                            </form>
                            <div class="newsletter-consent">
                                <input type="checkbox" id="newsletter-consent" name="consent" required>
                                <label for="newsletter-consent">I consent to receive communications from Elderella. I can unsubscribe at any time.</label>
                            </div>
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
    }
}

customElements.define('site-footer', SiteFooter);
