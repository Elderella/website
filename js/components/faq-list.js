/**
 * FAQ List Web Component
 * Reusable accordion-style FAQ list with optional search functionality
 *
 * Attributes:
 * - filter: Comma-separated category IDs to include (default: all)
 * - searchable: Boolean, shows search input when present
 *
 * Usage:
 * <faq-list></faq-list>                           <!-- All FAQs, no search -->
 * <faq-list searchable></faq-list>                <!-- All FAQs with search -->
 * <faq-list filter="pricing"></faq-list>          <!-- Only pricing FAQs -->
 * <faq-list filter="privacy,ella"></faq-list>     <!-- Multiple categories -->
 */
class FaqList extends HTMLElement {
    constructor() {
        super();
        this.searchTimeout = null;
        this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }

    connectedCallback() {
        // Ensure FAQ_DATA is available before rendering
        if (typeof FAQ_DATA === 'undefined' || !Array.isArray(FAQ_DATA) || FAQ_DATA.length === 0) {
            console.error('FaqList: FAQ_DATA not available. Make sure faq-data.js is loaded first.');
            this.innerHTML = '<p class="faq-error">Unable to load FAQ content. Please refresh the page.</p>';
            return;
        }

        this.render();

        this.initAccordion();
        if (this.hasAttribute('searchable')) {
            this.initSearch();
        }
        window.addEventListener('resize', this.handleResize.bind(this));
    }

    disconnectedCallback() {
        window.removeEventListener('resize', this.handleResize.bind(this));
    }

    getFilteredData() {
        const filterAttr = this.getAttribute('filter');
        if (!filterAttr) return FAQ_DATA;

        const categories = filterAttr.split(',').map(c => c.trim().toLowerCase());
        return FAQ_DATA.filter(item =>
            item.categories.some(cat => categories.includes(cat.toLowerCase()))
        );
    }

    groupByCategory(data) {
        // Group FAQs by their first matching category from the filter, or first category if no filter
        const filterAttr = this.getAttribute('filter');
        const filterCategories = filterAttr
            ? filterAttr.split(',').map(c => c.trim().toLowerCase())
            : null;

        const groups = {};

        data.forEach(item => {
            // Find the best category to group under
            let groupCat;
            if (filterCategories) {
                // Use the first matching filter category
                groupCat = item.categories.find(c => filterCategories.includes(c.toLowerCase()));
            }
            if (!groupCat) {
                groupCat = item.categories[0];
            }

            if (!groups[groupCat]) {
                groups[groupCat] = [];
            }
            groups[groupCat].push(item);
        });

        return groups;
    }

    getCategoryOrder() {
        // Define the display order for categories
        return ['getting-started', 'value', 'ella', 'privacy', 'elders', 'calendar', 'careteam', 'pricing'];
    }

    render() {
        const isSearchable = this.hasAttribute('searchable');
        const data = this.getFilteredData();
        const groups = this.groupByCategory(data);
        const categoryOrder = this.getCategoryOrder();

        // Sort groups by defined order
        const sortedCategories = Object.keys(groups).sort((a, b) => {
            const aIndex = categoryOrder.indexOf(a);
            const bIndex = categoryOrder.indexOf(b);
            if (aIndex === -1 && bIndex === -1) return 0;
            if (aIndex === -1) return 1;
            if (bIndex === -1) return -1;
            return aIndex - bIndex;
        });

        let html = '';

        // Search input
        if (isSearchable) {
            html += `
                <div class="faq-search-container">
                    <div class="faq-search-wrapper">
                        <svg class="faq-search-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                        <input type="text"
                               class="faq-search-input"
                               placeholder="Search frequently asked questions..."
                               aria-label="Search FAQs">
                        <button class="faq-search-clear" aria-label="Clear search" hidden>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>
                    </div>
                </div>
            `;
        }

        // FAQ groups
        html += '<div class="faq-groups">';

        sortedCategories.forEach(category => {
            const categoryName = FAQ_CATEGORIES[category] || category;
            const items = groups[category];

            html += `
                <div class="faq-group" data-category="${category}">
                    <h3 class="faq-group-title">${categoryName}</h3>
                    <div class="faq-container">
            `;

            items.forEach((item, index) => {
                const faqId = `faq-${item.id}`;
                html += `
                    <div class="faq-item" data-faq-id="${item.id}">
                        <button class="faq-header"
                                aria-expanded="false"
                                aria-controls="${faqId}-content"
                                id="${faqId}-header">
                            <span class="faq-header-text">${item.question}</span>
                            <span class="faq-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <polyline points="6 9 12 15 18 9"></polyline>
                                </svg>
                            </span>
                        </button>
                        <div class="faq-content"
                             id="${faqId}-content"
                             role="region"
                             aria-labelledby="${faqId}-header"
                             hidden>
                            <div class="faq-content-inner">
                                ${item.answer}
                            </div>
                        </div>
                    </div>
                `;
            });

            html += `
                    </div>
                </div>
            `;
        });

        html += '</div>';

        // No results message
        html += `
            <div class="faq-no-results" hidden>
                <p>No questions found matching your search.</p>
                <p>Try different keywords or <a href="support.html">contact our support team</a>.</p>
            </div>
        `;

        this.innerHTML = html;
    }

    initAccordion() {
        const headers = Array.from(this.querySelectorAll('.faq-header'));

        headers.forEach((header, idx) => {
            header.addEventListener('click', () => {
                const item = header.parentElement;
                const isOpen = item.classList.contains('is-open');

                // Close others when opening (single-open behavior)
                if (!isOpen) {
                    this.querySelectorAll('.faq-item.is-open').forEach(openItem => {
                        if (openItem !== item) this.toggleFaq(openItem, false);
                    });
                }

                this.toggleFaq(item, !isOpen);
            });

            // Keyboard navigation
            header.addEventListener('keydown', (e) => {
                const keys = ['ArrowDown', 'ArrowUp', 'Home', 'End', 'Enter', ' '];
                if (!keys.includes(e.key)) return;
                e.preventDefault();

                if (e.key === 'Enter' || e.key === ' ') {
                    header.click();
                    return;
                }

                // Get visible headers only
                const visibleHeaders = headers.filter(h =>
                    !h.closest('.faq-item').hasAttribute('hidden') &&
                    !h.closest('.faq-group').hasAttribute('hidden')
                );
                const currentIdx = visibleHeaders.indexOf(header);

                let nextIndex = currentIdx;
                if (e.key === 'ArrowDown') nextIndex = (currentIdx + 1) % visibleHeaders.length;
                if (e.key === 'ArrowUp') nextIndex = (currentIdx - 1 + visibleHeaders.length) % visibleHeaders.length;
                if (e.key === 'Home') nextIndex = 0;
                if (e.key === 'End') nextIndex = visibleHeaders.length - 1;

                visibleHeaders[nextIndex]?.focus();
            });
        });
    }

    toggleFaq(item, open) {
        const header = item.querySelector('.faq-header');
        const content = item.querySelector('.faq-content');

        item.classList.toggle('is-open', open);
        if (header) header.setAttribute('aria-expanded', open ? 'true' : 'false');
        if (content) content.hidden = !open;

        this.setFaqMaxHeight(item, open);
    }

    setFaqMaxHeight(item, open) {
        const content = item.querySelector('.faq-content');
        if (!content) return;

        if (open) {
            if (this.prefersReducedMotion) {
                content.style.maxHeight = 'none';
            } else {
                content.style.maxHeight = 'none';
                const full = content.scrollHeight;
                content.style.maxHeight = (full + 20) + 'px';
            }
        } else {
            content.style.maxHeight = '0px';
        }
    }

    initSearch() {
        const input = this.querySelector('.faq-search-input');
        const clearBtn = this.querySelector('.faq-search-clear');

        if (!input) return;

        input.addEventListener('input', (e) => {
            const query = e.target.value.trim();

            // Show/hide clear button
            if (clearBtn) {
                clearBtn.hidden = query.length === 0;
            }

            // Debounce search
            if (this.searchTimeout) {
                clearTimeout(this.searchTimeout);
            }

            this.searchTimeout = setTimeout(() => {
                this.filterFaqs(query);
            }, 150);
        });

        // Clear button
        if (clearBtn) {
            clearBtn.addEventListener('click', () => {
                input.value = '';
                clearBtn.hidden = true;
                this.filterFaqs('');
                input.focus();
            });
        }

        // Clear on Escape
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && input.value) {
                e.preventDefault();
                input.value = '';
                if (clearBtn) clearBtn.hidden = true;
                this.filterFaqs('');
            }
        });
    }

    filterFaqs(query) {
        const groups = this.querySelectorAll('.faq-group');
        const noResults = this.querySelector('.faq-no-results');
        const normalizedQuery = query.toLowerCase();

        let totalVisible = 0;

        groups.forEach(group => {
            const items = group.querySelectorAll('.faq-item');
            let groupVisible = 0;

            items.forEach(item => {
                // Search directly in the rendered DOM content
                const questionEl = item.querySelector('.faq-header-text');
                const answerEl = item.querySelector('.faq-content-inner');

                const questionText = questionEl ? questionEl.textContent.toLowerCase() : '';
                const answerText = answerEl ? answerEl.textContent.toLowerCase() : '';

                const isMatch = !normalizedQuery ||
                    questionText.includes(normalizedQuery) ||
                    answerText.includes(normalizedQuery);

                item.hidden = !isMatch;

                if (isMatch) {
                    groupVisible++;
                    totalVisible++;

                    // Close item if it was open during search
                    if (query && item.classList.contains('is-open')) {
                        this.toggleFaq(item, false);
                    }
                }
            });

            // Hide group if no visible items
            group.hidden = groupVisible === 0;
        });

        // Show/hide no results message
        if (noResults) {
            noResults.hidden = totalVisible > 0 || !query;
        }
    }

    handleResize() {
        // Recalculate max-height for open items
        this.querySelectorAll('.faq-item.is-open').forEach(item => {
            this.setFaqMaxHeight(item, true);
        });
    }
}

customElements.define('faq-list', FaqList);
