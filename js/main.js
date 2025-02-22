// Sample property data (in a real application, this would come from a backend)
const featuredProperties = [
    {
        id: 1,
        title: "فيلا فاخرة مع حمام سباحة",
        location: "الدار البيضاء - أنفا",
        price: "5,500,000 درهم",
        type: "للبيع",
        bedrooms: 5,
        bathrooms: 4,
        area: 450,
        image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
    },
    {
        id: 2,
        title: "شقة حديثة وسط المدينة",
        location: "مراكش - جليز",
        price: "12,000 درهم/شهر",
        type: "للإيجار",
        bedrooms: 3,
        bathrooms: 2,
        area: 120,
        image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
    },
    {
        id: 3,
        title: "منزل تقليدي في المدينة القديمة",
        location: "فاس - المدينة",
        price: "2,800,000 درهم",
        type: "للبيع",
        bedrooms: 4,
        bathrooms: 3,
        area: 280,
        image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1475&q=80"
    }
];

// City data
const cities = [
    {
        name: "الدار البيضاء",
        image: "https://images.unsplash.com/photo-1577147443647-81856d5151af?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
    },
    {
        name: "مراكش",
        image: "https://images.unsplash.com/photo-1597212720158-e21f7e546389?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
    },
    {
        name: "الرباط",
        image: "https://images.unsplash.com/photo-1579014464128-c61daa6c5229?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
    },
    {
        name: "طنجة",
        image: "https://images.unsplash.com/photo-1553603227-2358aabe821f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
    }
];

// Function to create property cards with animation
function createPropertyCard(property) {
    return `
        <div class="property-card" data-aos="fade-up">
            <div class="property-image">
                <img src="${property.image}" alt="${property.title}" loading="lazy">
                <span class="property-type">${property.type}</span>
            </div>
            <div class="property-content">
                <h3>${property.title}</h3>
                <p class="location"><i class="fas fa-map-marker-alt"></i> ${property.location}</p>
                <p class="price">${property.price}</p>
                <div class="property-features">
                    <span><i class="fas fa-bed"></i> ${property.bedrooms} غرف</span>
                    <span><i class="fas fa-bath"></i> ${property.bathrooms} حمامات</span>
                    <span><i class="fas fa-vector-square"></i> ${property.area} م²</span>
                </div>
                <button class="contact-btn" onclick="contactAgent(${property.id})">تواصل مع الوكيل</button>
            </div>
        </div>
    `;
}

// Function to create city cards
function createCityCard(city) {
    return `
        <div class="city-card" data-aos="fade-up">
            <img src="${city.image}" alt="${city.name}" loading="lazy">
            <h3>${city.name}</h3>
        </div>
    `;
}

// Load featured properties
function loadFeaturedProperties() {
    const propertyGrid = document.querySelector('.property-grid');
    propertyGrid.innerHTML = featuredProperties.map(property => createPropertyCard(property)).join('');
}

// Load cities
function loadCities() {
    const citiesGrid = document.querySelector('.cities-grid');
    citiesGrid.innerHTML = cities.map(city => createCityCard(city)).join('');
}

// Contact agent function with modern modal
function contactAgent(propertyId) {
    const property = featuredProperties.find(p => p.id === propertyId);
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content" data-aos="zoom-in">
            <span class="close-modal">&times;</span>
            <h2>تواصل معنا بخصوص العقار</h2>
            <p>${property.title}</p>
            <form id="contact-form">
                <input type="text" placeholder="الاسم الكامل" required>
                <input type="email" placeholder="البريد الإلكتروني" required>
                <input type="tel" placeholder="رقم الهاتف" required>
                <textarea placeholder="رسالتك" required></textarea>
                <button type="submit" class="contact-btn">إرسال</button>
            </form>
        </div>
    `;
    document.body.appendChild(modal);

    // Close modal functionality
    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.onclick = () => {
        modal.remove();
    };

    // Close modal when clicking outside
    window.onclick = (event) => {
        if (event.target === modal) {
            modal.remove();
        }
    };

    // Handle form submission
    const form = modal.querySelector('#contact-form');
    form.onsubmit = (e) => {
        e.preventDefault();
        // Here you would typically send the form data to a server
        alert('شكراً لك! سنتواصل معك قريباً');
        modal.remove();
    };
}

// Language toggle function with smooth transition
function toggleLanguage() {
    const langBtn = document.querySelector('.language-switch button');
    document.body.style.opacity = '0';
    setTimeout(() => {
        if (langBtn.textContent === 'FR') {
            langBtn.textContent = 'عربي';
            document.documentElement.lang = 'fr';
            document.documentElement.dir = 'ltr';
            // Add logic to switch content to French
        } else {
            langBtn.textContent = 'FR';
            document.documentElement.lang = 'ar';
            document.documentElement.dir = 'rtl';
            // Add logic to switch content to Arabic
        }
        document.body.style.opacity = '1';
    }, 300);
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    loadFeaturedProperties();
    loadCities();

    // Initialize AOS animation library
    AOS.init({
        duration: 800,
        once: true
    });

    // Add smooth scrolling for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add scroll reveal animation for sections
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
});
