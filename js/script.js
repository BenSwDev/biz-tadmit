// js/script.js


// Hamburger and Drawer Functionality
const hamburger = document.querySelector('.hamburger');
const drawerNav = document.querySelector('.drawer-nav');
const drawerOverlay = document.querySelector('.drawer-overlay');
const drawerLinks = document.querySelectorAll('.drawer-nav ul li a');

const toggleDrawer = () => {
    const isActive = drawerNav.classList.toggle('active');
    drawerOverlay.classList.toggle('active');
    hamburger.classList.toggle('active'); // Toggle 'active' class on hamburger
    hamburger.setAttribute('aria-expanded', isActive);
    drawerNav.setAttribute('aria-hidden', !isActive);
};

// Event listener for hamburger click
hamburger.addEventListener('click', toggleDrawer);

// Event listener for overlay click to close drawer
drawerOverlay.addEventListener('click', toggleDrawer);

// Close drawer when a link is clicked
drawerLinks.forEach(link => {
    link.addEventListener('click', toggleDrawer);
});

// Smooth Scrolling with Offset
const offset = 80; // Adjust this value according to header height

const smoothScroll = (event) => {
    event.preventDefault();
    const targetId = event.currentTarget.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
        });
    }
};

// Apply smooth scrolling to all nav links
const allNavLinks = document.querySelectorAll(
    'nav ul li a, .drawer-nav ul li a, .cta-button'
);

allNavLinks.forEach((link) => {
    link.addEventListener('click', smoothScroll);
});

// Language Switching Functionality
const languageSwitcher = document.querySelector('.language-switcher');
const languageToggle = document.querySelector('.language-switcher .dropdown-toggle');
const languageMenu = document.querySelector('.language-switcher .dropdown-menu');
const languageOptions = document.querySelectorAll('.language-switcher .dropdown-menu li');

languageToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    languageMenu.classList.toggle('show');
});

languageOptions.forEach((option) => {
    option.addEventListener('click', () => {
        const selectedLang = option.getAttribute('data-lang');
        // Update the language
        setLanguage(selectedLang);
        // Close the dropdown
        languageMenu.classList.remove('show');
    });
});

// Close the language menu when clicking outside
document.addEventListener('click', (event) => {
    if (!languageSwitcher.contains(event.target)) {
        languageMenu.classList.remove('show');
    }
});

// Function to load translation JSON file
function loadTranslations(lang) {
    return fetch(`translations/${lang}.json`)
        .then(response => response.json())
        .catch(error => {
            console.error('Error loading translations:', error);
            return {};
        });
}

// Update the language based on the selected translations
function setLanguage(lang) {
    loadTranslations(lang).then(selectedTranslations => {
        if (selectedTranslations) {
            // Update all elements with data-translate attribute
            document.querySelectorAll('[data-translate]').forEach((element) => {
                const key = element.getAttribute('data-translate');
                if (selectedTranslations[key]) {
                    if (
                        element.tagName.toLowerCase() === 'input' ||
                        element.tagName.toLowerCase() === 'textarea'
                    ) {
                        element.placeholder = selectedTranslations[key];
                    } else if (element.tagName.toLowerCase() === 'title') {
                        document.title = selectedTranslations[key];
                    } else {
                        element.textContent = selectedTranslations[key];
                    }
                }
            });

            // Update the lang and dir attributes on the html tag
            const htmlTag = document.documentElement;
            htmlTag.lang = lang;
            if (lang === 'ar' || lang === 'he') {
                htmlTag.dir = 'rtl';
            } else {
                htmlTag.dir = 'ltr';
            }

            // Update the flag icon in the language toggle button
            const selectedOption = document.querySelector(
                `.language-switcher .dropdown-menu li[data-lang="${lang}"]`
            );
            if (selectedOption) {
                const flagClass = selectedOption.querySelector('.fi').className;
                languageToggle.querySelector('.fi').className = flagClass;
            }

            // Store the selected language in localStorage
            localStorage.setItem('selectedLang', lang);
        } else {
            console.error('Translations not found for language:', lang);
        }
    });
}

// On page load, check if a language is stored in localStorage
document.addEventListener('DOMContentLoaded', () => {
    const storedLang = localStorage.getItem('selectedLang') || 'he';
    setLanguage(storedLang);
});


document.addEventListener('DOMContentLoaded', () => {
    // Image slideshows for monitor and phone
    const monitorImages = [
        'assets/image1.png',
        // Repeat the same image if needed
    ];

    const phoneImages = [
        'assets/image1.png',
        // Repeat the same image if needed
    ];

    let monitorIndex = 0;
    let phoneIndex = 0;

    const monitorImgElement = document.querySelector('.monitor-svg image');
    const phoneImgElement = document.querySelector('.phone-svg image');

    function changeMonitorImage() {
        // No change needed since only one image is present
        monitorImgElement.setAttribute('href', monitorImages[monitorIndex]);
    }

    function changePhoneImage() {
        // No change needed since only one image is present
        phoneImgElement.setAttribute('href', phoneImages[phoneIndex]);
    }

    // Change images every 3 seconds (optional, no effect with single image)
    setInterval(changeMonitorImage, 3000);
    setInterval(changePhoneImage, 3000);
});


// Toggle FAQ answers
document.addEventListener('DOMContentLoaded', () => {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            item.classList.toggle('active');
        });

        // Allow toggling via keyboard
        question.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                item.classList.toggle('active');
            }
        });
    });
});
