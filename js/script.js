// Apply theme immediately
(function() {
    const theme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    document.documentElement.classList.add(theme + '-mode');
})();

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

        const applyTheme = (theme) => {
            document.documentElement.classList.remove('light-mode', 'dark-mode');
            document.documentElement.classList.add(theme + '-mode');
            if (themeIcon) {
                themeIcon.innerText = theme === 'dark' ? '☀️' : '🌙';
            }
        };

        themeToggle.addEventListener('click', () => {
            const newTheme = document.documentElement.classList.contains('dark-mode') ? 'light' : 'dark';
            localStorage.setItem('theme', newTheme);
            applyTheme(newTheme);
        });

        // Set initial icon
        const currentTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        if (themeIcon) {
            themeIcon.innerText = currentTheme === 'dark' ? '☀️' : '🌙';
        }
    }

    // Function to include HTML partials
    async function includeHTML() {
        const elements = document.querySelectorAll('[data-include]');
        for (const el of elements) {
            const file = el.getAttribute('data-include');
            try {
                const response = await fetch(file);
                if (!response.ok) throw new Error('File not found');
                const data = await response.text();
                el.innerHTML = data;
            } catch (error) {
                console.error('Error including HTML:', error);
            }
        }
    }

    // Initializations
    async function initializePage() {
        await includeHTML();
        handleSmoothScrolling();
        setupProjects();
        initializeThemeToggle();
    }

    initializePage();
});
