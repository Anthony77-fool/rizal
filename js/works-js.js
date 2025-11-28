
// Smooth scroll for button
document.querySelector('.btn-primary-custom').addEventListener('click', function(e) {
    if (this.parentElement.getAttribute('href') === '#propaganda') {
        e.preventDefault();
        document.querySelector('#propaganda').scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
});

// Individual card observer for staggered animations
const cardObserverOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
};

const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            cardObserver.unobserve(entry.target);
        }
    });
}, cardObserverOptions);

// Observe each card individually
document.querySelectorAll('.image-card').forEach((card, index) => {
    // Add staggered delay based on card index
    card.style.transitionDelay = `${index * 0.15}s`;
    cardObserver.observe(card);
});

// Section observer for other elements
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -80px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Special handling for table animation
            const table = entry.target.querySelector('.comparison-table');
            if (table) {
                setTimeout(() => {
                    table.classList.add('animate');
                }, 200);
            }
            
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe sections
document.querySelectorAll('.propaganda-content, .comparison-container, .image-cards-container').forEach(section => {
    observer.observe(section);
});