// Load footer component across all pages
(function() {
    // Create a placeholder for the footer if it doesn't exist
    const footerPlaceholder = document.getElementById('footer-placeholder');

    if (footerPlaceholder) {
        fetch('/footer.html')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Footer not found');
                }
                return response.text();
            })
            .then(html => {
                footerPlaceholder.innerHTML = html;

                // Update copyright year after footer is loaded
                const yearSpan = document.getElementById('copyright-year');
                if (yearSpan) {
                    yearSpan.textContent = new Date().getFullYear();
                }
            })
            .catch(error => {
                console.error('Error loading footer:', error);
                // Provide fallback footer
                footerPlaceholder.innerHTML = `
                    <footer>
                        <div class="container">
                            <div class="footer-content">
                                <a href="/">Home</a>
                                <a href="/privacy">Privacy Policy</a>
                                <a href="/security">Security</a>
                                <a href="/terms">Terms of Service</a>
                                <span>© ${new Date().getFullYear()} Elderella Inc.</span>
                            </div>
                        </div>
                    </footer>
                `;
            });
    }
})();
