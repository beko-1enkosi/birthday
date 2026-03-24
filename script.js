// ========================================
// SECTION: 01 - INITIALIZATION & LOADING
// ========================================

window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    
    // 1. Hide the loader after the "Sequencing" delay
    setTimeout(() => {
        loader.classList.add('loader-hidden');
        
        // 2. Show the Birthday Message and trigger the Party Confetti
        setTimeout(() => {
            showBirthdayPopup();
            triggerPartyConfetti();
        }, 800);
    }, 2000); 
});

// ========================================
// SECTION: 02 - BIRTHDAY POPUP LOGIC
// ========================================

function showBirthdayPopup() {
    const popup = document.getElementById('birthday-popup');
    if(popup) {
        popup.classList.add('active');
    }
}

function closePopup() {
    const popup = document.getElementById('birthday-popup');
    if(popup) {
        popup.style.opacity = '0';
        setTimeout(() => {
            popup.classList.remove('active');
        }, 500);
    }
}

// ========================================
// SECTION: 03 - PARTY CONFETTI EFFECT
// ========================================

function triggerPartyConfetti() {
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 10000 };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        
        // Since particles fall down, we start them a bit higher than random
        confetti({ 
            ...defaults, 
            particleCount, 
            origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
            colors: ['#ff4d6d', '#0057ff', '#ffbe0b', '#3a86ff', '#ff006e']
        });
        confetti({ 
            ...defaults, 
            particleCount, 
            origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
            colors: ['#ff4d6d', '#0057ff', '#ffbe0b', '#3a86ff', '#ff006e']
        });
    }, 250);
}

// ========================================
// SECTION: 04 - SCROLL & REVEAL EFFECTS
// ========================================

window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    const progressLine = document.querySelector(".reading-progress");
    if (progressLine) {
        progressLine.style.width = scrolled + "%";
    }
});

const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

// ========================================
// SECTION: 05 - UTILITIES
// ========================================

if (window.lucide) {
    lucide.createIcons();
}