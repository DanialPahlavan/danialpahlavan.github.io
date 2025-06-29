document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    sections.forEach(section => {
        section.style.opacity = 0;
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(section);
    });

    // Project Data (replace with your actual projects)
    const projects = [
        {
            id: 'web-mining',
            title: 'Web Mining of PDF Scientific Papers',
            summary: 'Developed a tool to extract key information from Farsi scientific papers in PDF format.',
            description: 'This project involved creating a Python-based tool to automatically extract titles, authors, keywords, and other relevant details from Farsi scientific papers in PDF format. It utilized web scraping and data mining techniques, along with PyPDF2 for PDF parsing and OCR for non-copyable Persian text.',
            githubLink: 'https://github.com/DanialPahlavan/Web-Mining-of-PDF-Scientific-Papers',
            categories: ['Data Mining', 'NLP']
        },
        {
            id: 'ml-embedded',
            title: 'Machine Learning for Embedded Systems',
            summary: 'Developed and compiled C code for machine learning applications on embedded systems using Ubuntu.',
            description: 'In this project, I focused on implementing AI models on micro-controllers. This involved developing and compiling C code for embedded systems within an Ubuntu environment. We utilized GitHub for collaborative development and gained practical skills in applying machine learning to resource-constrained devices.',
            githubLink: 'https://github.com/DanialPahlavan/Machine-Learning-for-Embedded-Systems',
            categories: ['Machine Learning', 'Embedded Systems', 'Robotics']
        },
        {
            id: 'watermarking-steganography',
            title: 'Watermarking and Steganography',
            summary: 'Designed and implemented an image watermarking system using DCT and DWT techniques.',
            description: 'This project involved the design and implementation of image watermarking and steganography systems. For watermarking, DCT and DWT techniques were used, with a focus on robustness and imperceptibility. For steganography, LSB and DCT techniques were employed to hide secret messages in images. Comparative analysis of different techniques was also conducted.',
            githubLink: 'https://github.com/DanialPahlavan/Watermarking-and-Steganography',
            categories: ['Image Processing', 'Security']
        },
        {
            id: 'evolutionary-computing',
            title: 'Evolutionary Computing',
            summary: 'Studied the performance of evolutionary algorithms, including genetic algorithms, particle swarm optimization, and differential evolution.',
            description: 'This project explored the performance of various evolutionary algorithms, such as genetic algorithms, particle swarm optimization, and differential evolution, in solving optimization problems. I implemented an evolutionary algorithm to solve the traveling salesman problem and analyzed convergence properties, runtime, and performance under different settings.',
            githubLink: 'https://github.com/DanialPahlavan/Evolutionary-Computing',
            categories: ['Machine Learning', 'Algorithms']
        },
        {
            id: 'image-processing',
            title: 'Image Processing',
            summary: 'Developed systems for image enhancement, edge detection, color segmentation, denoising, and stitching.',
            description: 'This comprehensive image processing project involved developing several systems: image enhancement (histogram equalization, local contrast stretching), Sobel edge detection, color segmentation, image denoising (Gaussian, median filters), and image stitching for panoramic images.',
            githubLink: 'https://github.com/DanialPahlavan/Image-Processing',
            categories: ['Image Processing']
        }
        // Add more projects here following the same structure
    ];

    const projectsSection = document.getElementById('projects');
    const categoryFiltersContainer = document.getElementById('category-filters');
    const projectCardsContainer = document.getElementById('project-cards-container');
    const projectModal = document.getElementById('projectModal');
    const closeButton = document.querySelector('.close-button');
    const modalProjectTitle = document.getElementById('modalProjectTitle');
    const modalProjectDescription = document.getElementById('modalProjectDescription');
    const modalProjectLink = document.getElementById('modalProjectLink');

    // Function to render project cards
    function renderProjectCards(filteredProjects = projects) {
        if (projectCardsContainer) { // Only render if project cards container exists (i.e., on projects.html)
            projectCardsContainer.innerHTML = ''; // Clear existing cards
            filteredProjects.forEach(project => {
                const projectCard = document.createElement('div');
                projectCard.classList.add('project-item');
                projectCard.dataset.projectId = project.id;
                projectCard.innerHTML = `
                    <h3>${project.title}</h3>
                    <p>${project.summary}</p>
                `;
                projectCardsContainer.appendChild(projectCard);

                projectCard.addEventListener('click', () => openProjectModal(project.id));
            });
        }
    }

    // Function to generate category filter buttons
    function renderCategoryFilters() {
        if (categoryFiltersContainer) {
            const allCategories = new Set();
            projects.forEach(project => {
                project.categories.forEach(category => allCategories.add(category));
            });

            const categoriesArray = ['All', ...Array.from(allCategories).sort()];

            categoriesArray.forEach(category => {
                const button = document.createElement('button');
                button.classList.add('category-filter-button');
                button.textContent = category;
                button.dataset.category = category;
                categoryFiltersContainer.appendChild(button);

                button.addEventListener('click', () => filterProjects(category));
            });
        }
    }

    // Function to filter projects by category
    function filterProjects(category) {
        let filteredProjects;
        if (category === 'All') {
            filteredProjects = projects;
        } else {
            filteredProjects = projects.filter(project => project.categories.includes(category));
        }
        renderProjectCards(filteredProjects);

        // Update active button styling
        document.querySelectorAll('.category-filter-button').forEach(button => {
            if (button.dataset.category === category) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });
    }

    // Function to open the modal
    function openProjectModal(projectId) {
        const project = projects.find(p => p.id === projectId);
        if (project) {
            modalProjectTitle.textContent = project.title;
            modalProjectDescription.textContent = project.description;
            modalProjectLink.href = project.githubLink;
            projectModal.style.display = 'block';
        }
    }

    // Function to close the modal
    function closeProjectModal() {
        projectModal.style.display = 'none';
    }

    // Event listeners for modal
    if (closeButton) {
        closeButton.addEventListener('click', closeProjectModal);
    }
    if (projectModal) {
        window.addEventListener('click', (event) => {
            if (event.target === projectModal) {
                closeProjectModal();
            }
        });
    }

    // Initial render of project cards and category filters if on the projects page
    if (window.location.pathname.endsWith('projects.html')) {
        renderCategoryFilters();
        filterProjects('All'); // Show all projects by default
    }

    // Handle section visibility on index.html
    const aboutMeSection = document.getElementById('about-me');
    const contactSection = document.getElementById('contact');

    function updateIndexPageVisibility() {
        const hash = window.location.hash;
        if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
            if (hash === '#contact') {
                if (aboutMeSection) aboutMeSection.style.display = 'none';
                if (contactSection) contactSection.style.display = 'block';
            } else {
                // Default or #home
                if (aboutMeSection) aboutMeSection.style.display = 'block';
                if (contactSection) contactSection.style.display = 'none'; // Hide contact by default
            }
        }
    }

    // Listen for hash changes (for #contact)
    window.addEventListener('hashchange', updateIndexPageVisibility);

    // Initial display on page load for index.html
    updateIndexPageVisibility();

    // Ensure correct initial display for index.html if no hash
    if ((window.location.pathname.endsWith('index.html') || window.location.pathname === '/') && !window.location.hash) {
        if (aboutMeSection) aboutMeSection.style.display = 'block';
        if (contactSection) contactSection.style.display = 'none'; // Hide contact by default
    }
});
