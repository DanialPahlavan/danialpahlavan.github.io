document.addEventListener('DOMContentLoaded', () => {
    // Function to handle smooth scrolling for anchor links
    const handleSmoothScrolling = () => {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const href = this.getAttribute('href');
                if (href.startsWith('#')) {
                    e.preventDefault();
                    const targetId = href.substring(1);
                    const targetElement = document.getElementById(targetId);
                    if (targetElement) {
                        targetElement.scrollIntoView({ behavior: 'smooth' });
                    }
                }
            });
        });
    };

    // Load projects dynamically and set up filtering
    const container = document.getElementById('project-cards-container');
    const filtersContainer = document.getElementById('category-filters');

    const filterProjects = (category) => {
        if (!container || typeof projects === 'undefined') return;
        container.innerHTML = '';
        const filteredProjects = category === 'All' ? projects : projects.filter(p => p.category === category);
        filteredProjects.forEach(project => {
            const card = document.createElement('div');
            card.className = 'project-card';
            card.innerHTML = `
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <a href="${project.link}" target="_blank">View Project</a>
            `;
            container.appendChild(card);
        });
    };

    const setupProjects = () => {
        if (!filtersContainer || typeof projects === 'undefined') return;

        const categories = ['All', ...new Set(projects.map(p => p.category))];

        categories.forEach(category => {
            const button = document.createElement('button');
            button.innerText = category;
            button.addEventListener('click', () => filterProjects(category));
            filtersContainer.appendChild(button);
        });

        filterProjects('All'); // Initially display all projects
    };


    // Theme Toggle Logic
    function initializeThemeToggle() {
        const themeToggle = document.getElementById('theme-toggle');
        if (!themeToggle) return;

        const themeIcon = themeToggle.querySelector('.theme-icon');
        const body = document.body;

        const applyTheme = (theme) => {
            body.classList.remove('light-mode', 'dark-mode');
            body.classList.add(theme + '-mode');
            if (themeIcon) {
                themeIcon.innerText = theme === 'dark' ? '☀️' : '🌙';
            }
        };

        themeToggle.addEventListener('click', () => {
            const newTheme = body.classList.contains('dark-mode') ? 'light' : 'dark';
            localStorage.setItem('theme', newTheme);
            applyTheme(newTheme);
        });

        // Set initial icon
        const currentTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        applyTheme(currentTheme);
    }

    // Initializations
    handleSmoothScrolling();
    setupProjects();
    initializeThemeToggle();
});
