function initHamburgerMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
        // Remove existing listeners to prevent duplicates
        hamburger.replaceWith(hamburger.cloneNode(true));
        const newHamburger = document.querySelector('.hamburger');
        newHamburger.addEventListener('click', () => {
            document.querySelector('.nav-links').classList.toggle('expanded');
        });
    }
}

// Initialize immediately if DOM is already loaded, otherwise wait
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHamburgerMenu);
} else {
    // DOM is already loaded, run immediately
    initHamburgerMenu();
}

// Reinitialize on view transition
document.addEventListener('astro:after-swap', initHamburgerMenu);