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
                        <img src="images/elderella-logo-header.png" alt="Elderella" width="709" height="300">
                    </a>

                    <button class="nav-toggle" aria-controls="primary-navigation" aria-expanded="false" aria-label="Menu">
                        <span class="hamburger" aria-hidden="true"></span>
                    </button>

                    <div id="primary-navigation" class="primary-navigation" data-open="false">
                        <nav class="main-nav">
                            <a href="how-elderella-works.html" ${currentPage === 'how-elderella-works.html' ? 'class="active"' : ''}>How Elderella Works</a>
                            <div class="nav-item nav-item--dropdown" id="care-dropdown">
                                <a href="collects-care-details.html" class="dropdown-toggle" aria-haspopup="true" aria-expanded="false" aria-controls="care-dropdown-menu">Help for Family Caregivers</a>
                                <div class="dropdown-menu" id="care-dropdown-menu" role="menu" hidden>
                                    <a class="dropdown-item" role="menuitem" href="collects-care-details.html">
                                        <span class="dropdown-icon icon-collects" aria-hidden="true"></span>
                                        <span class="dropdown-content">
                                            <span class="dropdown-title">Collects</span>
                                            <span class="dropdown-desc">Elderella collects caregiving information from everywhere and everyone.</span>
                                        </span>
                                    </a>
                                    <a class="dropdown-item" role="menuitem" href="remembers-and-reminds.html">
                                        <span class="dropdown-icon icon-remembers" aria-hidden="true"></span>
                                        <span class="dropdown-content">
                                            <span class="dropdown-title">Remembers &amp; reminds</span>
                                            <span class="dropdown-desc">Elderella makes elder care information easy to find, fast.</span>
                                        </span>
                                    </a>
                                    <a class="dropdown-item" role="menuitem" href="shares-the-load.html">
                                        <span class="dropdown-icon icon-shares" aria-hidden="true"></span>
                                        <span class="dropdown-content">
                                            <span class="dropdown-title">Shares the load</span>
                                            <span class="dropdown-desc">Elderella turns caregiving information into a coordinated care team.</span>
                                        </span>
                                    </a>
                                </div>
                            </div>
                            
                        </nav>
                        <a href="download.html" class="btn-signup">Get started</a>
                    </div>
                </div>
            </header>

            ${hidePromo ? '' : `<!-- Promo Banner -->
            <div class="promo-banner">
                <div class="promo-container">
                    <span class="promo-text">Welcome to Elderella. We're glad you're here.</span>
                    <a href="story.html" class="promo-link"><span class="promo-link-text">Share your story</span></a>
                </div>
            </div>`}
        `;

        // Initialize mobile nav toggle
        this.initMobileNav();
        // Initialize app promo banner
        this.initAppPromo();
        // Initialize dropdown menu
        this.initDropdown();
        // Initialize scroll border behavior
        this.initScrollBorder();
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

        // Close when tapping outside the header on mobile
        document.addEventListener('click', (e) => {
            const header = this.querySelector('.site-header');
            if (panel.dataset.open === 'true' && !header.contains(e.target)) {
                setOpen(false);
            }
        });
    }

    initDropdown() {
        const dropdown = this.querySelector('#care-dropdown');
        if (!dropdown) return;
        const toggle = dropdown.querySelector('.dropdown-toggle');
        const menu = dropdown.querySelector('.dropdown-menu');
        const items = Array.from(menu.querySelectorAll('.dropdown-item'));

        const isDesktop = () => window.matchMedia('(min-width: 769px)').matches;
        const setOpen = (open) => {
            dropdown.dataset.open = open ? 'true' : 'false';
            toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
            menu.hidden = !open;
        };

        // Desktop: open on hover with small grace period to cross gaps
        let hoverCloseTimeout = null;
        const clearHoverClose = () => { if (hoverCloseTimeout) { clearTimeout(hoverCloseTimeout); hoverCloseTimeout = null; } };
        // Open when hovering the toggle or the menu itself
        toggle.addEventListener('mouseenter', () => { if (isDesktop()) { clearHoverClose(); setOpen(true); } });
        menu.addEventListener('mouseenter', () => { if (isDesktop()) { clearHoverClose(); setOpen(true); } });
        // Schedule close when pointer leaves the dropdown root; cancel if it enters menu quickly
        dropdown.addEventListener('mouseleave', () => {
            if (!isDesktop()) return;
            clearHoverClose();
            hoverCloseTimeout = setTimeout(() => setOpen(false), 150);
        });
        // Also close when leaving the menu area entirely
        menu.addEventListener('mouseleave', () => { if (isDesktop()) setOpen(false); });

        // Click behavior: always navigate (including mobile)
        // Previously on mobile we toggled the dropdown; requested behavior is navigation
        // so we intentionally do not intercept clicks here.

        // Close on outside click
        document.addEventListener('click', (e) => {
            if (!dropdown.contains(e.target)) setOpen(false);
        });

        // Close on ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') setOpen(false);
        });

        // Keyboard navigation within menu
        menu.addEventListener('keydown', (e) => {
            if (!['ArrowDown','ArrowUp','Home','End'].includes(e.key)) return;
            e.preventDefault();
            const current = document.activeElement;
            let idx = items.indexOf(current);
            if (e.key === 'Home') idx = 0;
            else if (e.key === 'End') idx = items.length - 1;
            else if (e.key === 'ArrowDown') idx = (idx + 1) % items.length;
            else if (e.key === 'ArrowUp') idx = (idx - 1 + items.length) % items.length;
            items[idx].focus();
        });

        // Focus first item on open via keyboard
        toggle.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                setOpen(true);
                items[0]?.focus();
            }
        });
    }

    initAppPromo() {
        // Kill-switch: disable the mobile app promo banner site-wide
        const ENABLE_APP_PROMO = false;
        if (!ENABLE_APP_PROMO) return;

        const banner = this.querySelector('#app-promo');
        if (!banner) return;
        const closeBtn = this.querySelector('#app-promo-close');
        const downloadBtn = this.querySelector('#app-promo-download');

        // App Store URLs
        const IOS_URL = null; // iOS coming soon; disable link
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

        if (downloadBtn) {
            // If iOS, disable link and show tooltip; otherwise route to store/landing
            if (isiOS()) {
                downloadBtn.classList.add('soon-badge');
                downloadBtn.setAttribute('data-tooltip', 'Coming soon! Sign up for our newsletter to be notified.');
                downloadBtn.setAttribute('aria-disabled', 'true');
                downloadBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    downloadBtn.classList.add('show-tooltip');
                    setTimeout(() => downloadBtn.classList.remove('show-tooltip'), 1200);
                });
            } else {
                downloadBtn.addEventListener('click', () => {
                    const url = isAndroid() ? ANDROID_URL : LANDING_URL;
                    downloadBtn.setAttribute('href', url);
                });
            }
        }
    }

    initScrollBorder() {
        const header = this.querySelector('.site-header');
        if (!header) return;

        const updateBorder = () => {
            if (window.scrollY > 0) {
                header.classList.add('has-scroll-border');
            } else {
                header.classList.remove('has-scroll-border');
            }
        };

        window.addEventListener('scroll', updateBorder, { passive: true });
        updateBorder(); // Check on page load
    }

}

customElements.define('site-header', SiteHeader);
