// Theme Toggle Logic - Placed outside DOMContentLoaded to be accessible
function initializeThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;

    const themeIcon = themeToggle.querySelector('.theme-icon');
    const body = document.body;
    const applyTheme = (theme) => {
        body.classList.remove('light-mode', 'dark-mode');
        body.classList.add(theme + '-mode');
    };

    themeToggle.addEventListener('click', () => {
        const newTheme = body.classList.contains('dark-mode') ? 'light' : 'dark';
        localStorage.setItem('theme', newTheme);
        applyTheme(newTheme);
    });
}

// Apply initial theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    document.body.classList.add(savedTheme + '-mode');
} else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.body.classList.add('dark-mode');
} else {
    document.body.classList.add('light-mode');
}
