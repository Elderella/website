/**
 * Site Header Web Component
 * Contains: App promo banner (mobile), main header with logo/nav/CTA, promo banner
 * Includes mobile nav toggle functionality
 */
class SiteHeader extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        // Get current page for active nav state
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';

        // Check if promo banner should be hidden
        const hidePromo = this.hasAttribute('no-promo');

        this.innerHTML = `
            <!-- Skip Link for Accessibility -->
            <a href="#main-content" class="skip-link">Skip to main content</a>

            <!-- App Promo Banner (mobile-only; dismissible) -->
            <div id="app-promo" class="app-promo" role="region" aria-label="Get the app" hidden>
                <div class="app-promo__inner">
                    <div class="app-promo__left">
                        <img src="images/app-promo-icon.png"
                             srcset="images/app-promo-icon.png 1x, images/app-promo-icon@2x.png 2x"
                             alt="Elderella" class="app-promo__icon" width="48" height="48">
                        <div class="app-promo__text">
                            <div class="app-promo__title">Elderella</div>
                            <div class="app-promo__subtitle">Get the app</div>
                        </div>
                    </div>
                    <div class="app-promo__right">
                        <a id="app-promo-download" class="app-promo__button" href="#" role="button">Download</a>
                        <button id="app-promo-close" class="app-promo__close" aria-label="Close">&times;</button>
                    </div>
                </div>
            </div>

            <!-- Header -->
            <header class="site-header">
                <div class="container header-container">
                    <a href="index.html" class="logo">
                        <img src="images/elderella-logo-header.svg" alt="Elderella" width="709" height="300">
                    </a>

                    <button class="nav-toggle" aria-controls="primary-navigation" aria-expanded="false" aria-label="Menu">
                        <span class="hamburger" aria-hidden="true"></span>
                    </button>

                    <div id="primary-navigation" class="primary-navigation" data-open="false">
                        <nav class="main-nav">
                            <a href="#">Help for Family Caregivers</a>
                            <a href="explore.html" ${currentPage === 'explore.html' ? 'class="active"' : ''}>How Elderella Works</a>
                            <a href="faq.html" ${currentPage === 'faq.html' ? 'class="active"' : ''}>FAQ</a>
                        </nav>
                        <a href="signup.html" class="btn-signup">Start for free</a>
                    </div>
                </div>
            </header>

            ${hidePromo ? '' : `<!-- Promo Banner -->
            <div class="promo-banner">
                <div class="promo-container">
                    <span class="promo-text">Have thoughts about how to make the caregiving journey better?</span>
                    <a href="early-access.html" class="promo-link"><span class="promo-link-text">Share your story</span></a>
                </div>
            </div>`}
        `;

        // Initialize mobile nav toggle
        this.initMobileNav();
        // Initialize app promo banner
        this.initAppPromo();
    }

    initMobileNav() {
        const toggle = this.querySelector('.nav-toggle');
        const panel = this.querySelector('#primary-navigation');
        if (!toggle || !panel) return;

        const setOpen = (open) => {
            panel.dataset.open = open ? 'true' : 'false';
            toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
            document.documentElement.classList.toggle('nav-open', open);
        };

        toggle.addEventListener('click', () => {
            const open = panel.dataset.open !== 'true';
            setOpen(open);
        });

        // Close on ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') setOpen(false);
        });

        // Close when a nav link is clicked
        panel.addEventListener('click', (e) => {
            if (e.target && e.target.tagName === 'A') setOpen(false);
        });
    }

    initAppPromo() {
        const banner = this.querySelector('#app-promo');
        if (!banner) return;
        const closeBtn = this.querySelector('#app-promo-close');
        const downloadBtn = this.querySelector('#app-promo-download');

        // App Store URLs
        const IOS_URL = 'https://apps.apple.com/app/id6753773809';
        const ANDROID_URL = 'https://play.google.com/store/apps/details?id=com.elderella.app&hl=en_CA';
        const LANDING_URL = 'https://www.elderella.com/early-access';

        const isiOS = () => /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
        const isAndroid = () => /Android/.test(navigator.userAgent);

        // Respect dismissal
        const dismissed = localStorage.getItem('appPromoDismissed') === '1';
        const isMobile = window.matchMedia('(max-width: 768px)').matches;

        const open = () => {
            banner.hidden = false;
            requestAnimationFrame(() => { banner.classList.add('is-visible'); });
        };

        const close = () => {
            banner.classList.remove('is-visible');
            localStorage.setItem('appPromoDismissed', '1');
            setTimeout(() => { banner.hidden = true; }, 250);
        };

        if (isMobile && !dismissed) open();

        if (closeBtn) closeBtn.addEventListener('click', (e) => { e.preventDefault(); close(); });

        if (downloadBtn) downloadBtn.addEventListener('click', () => {
            const url = isiOS() ? IOS_URL : (isAndroid() ? ANDROID_URL : LANDING_URL);
            downloadBtn.setAttribute('href', url);
        });
    }
}

customElements.define('site-header', SiteHeader);
