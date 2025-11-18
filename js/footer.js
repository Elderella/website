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
            })
            .catch(error => {
                console.error('Error loading footer:', error);
            });
    }
})();
