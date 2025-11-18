// Load header component across all pages
(function() {
    const headerPlaceholder = document.getElementById('header-placeholder');

    if (headerPlaceholder) {
        fetch('/header.html')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Header not found');
                }
                return response.text();
            })
            .then(html => {
                headerPlaceholder.innerHTML = html;
            })
            .catch(error => {
                console.error('Error loading header:', error);
                // Provide fallback header
                headerPlaceholder.innerHTML = `
                    <header class="site-header">
                        <div class="container">
                            <a href="/">
                                <img src="images/elderella-logo.svg" alt="Elderella" class="logo">
                            </a>
                        </div>
                    </header>
                `;
            });
    }
})();
