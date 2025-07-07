document.addEventListener('DOMContentLoaded', () => {
    // Function to handle smooth scrolling for anchor links
    const handleSmoothScrolling = () => {
        document.querySelectorAll('a[href^="/index.html#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href').split('#')[1];
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    };

    // Load projects dynamically
    const loadProjects = () => {
        const container = document.getElementById('project-cards-container');
        if (container && typeof projects !== 'undefined') {
            projects.forEach(project => {
                const card = document.createElement('div');
                card.className = 'project-card';
                card.innerHTML = `
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <a href="${project.link}" target="_blank">View Project</a>
                `;
                container.appendChild(card);
            });
        }
    };

    // Theme Toggle Logic
    function initializeThemeToggle() {
        const themeToggle = document.getElementById('theme-toggle');
        if (!themeToggle) return;

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

    // Initializations
    handleSmoothScrolling();
    loadProjects();
    initializeThemeToggle();
});
