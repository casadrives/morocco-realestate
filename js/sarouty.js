// Current language state
let currentLang = 'fr';

// Language configuration
const languageConfig = {
    fr: { dir: 'ltr', name: 'Français', next: 'ar' },
    ar: { dir: 'rtl', name: 'عربي', next: 'fr' }
};

// Function to update page direction
function updatePageDirection(lang) {
    document.documentElement.dir = languageConfig[lang].dir;
    document.documentElement.lang = lang;
}

// Function to update language button
function updateLanguageButton(lang) {
    const nextLang = languageConfig[lang].next;
    const langBtn = document.querySelector('.lang-btn');
    if (langBtn) {
        langBtn.textContent = languageConfig[nextLang].name;
    }
}

// Function to translate the page
function translatePage(lang) {
    // Add fade-out effect
    document.body.style.opacity = '0';

    setTimeout(() => {
        // Update all elements with data-lang attribute
        document.querySelectorAll('[data-lang]').forEach(element => {
            const key = element.getAttribute('data-lang');
            if (translations[lang][key]) {
                element.textContent = translations[lang][key];
            }
        });

        // Update all placeholders with data-lang-placeholder attribute
        document.querySelectorAll('[data-lang-placeholder]').forEach(element => {
            const key = element.getAttribute('data-lang-placeholder');
            if (translations[lang][key]) {
                element.placeholder = translations[lang][key];
            }
        });

        // Update select options
        document.querySelectorAll('option[data-lang]').forEach(element => {
            const key = element.getAttribute('data-lang');
            if (translations[lang][key]) {
                element.textContent = translations[lang][key];
            }
        });

        // Update page direction and language button
        updatePageDirection(lang);
        updateLanguageButton(lang);

        // Add fade-in effect
        document.body.style.opacity = '1';
    }, 300);
}

// Function to toggle language
function toggleLanguage() {
    const nextLang = languageConfig[currentLang].next;
    currentLang = nextLang;
    translatePage(currentLang);
}

// Function to handle search
function handleSearch(event) {
    event.preventDefault();
    const propertyType = document.querySelector('.property-type').value;
    const location = document.querySelector('.location').value;
    const transactionType = document.querySelector('.transaction-type').value;
    
    // In a real application, this would redirect to a search results page
    console.log('Search params:', { propertyType, location, transactionType });
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    // Initialize with French
    translatePage('fr');
    
    // Add search form handler
    const searchBtn = document.querySelector('.search-btn');
    if (searchBtn) {
        searchBtn.addEventListener('click', handleSearch);
    }

    // Add smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add hover effects to city cards
    document.querySelectorAll('.city-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.querySelector('img').style.transform = 'scale(1.1)';
        });
        card.addEventListener('mouseleave', () => {
            card.querySelector('img').style.transform = 'scale(1)';
        });
    });
});
