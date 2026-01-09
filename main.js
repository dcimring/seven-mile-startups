import { createIcons, icons } from 'lucide';
import { WaveAnimation } from './waves.js';

// Initialize icons
createIcons({ icons });

// Initialize Waves
new WaveAnimation('hero-canvas');

// Theme Toggle Logic
const themeToggles = document.querySelectorAll('#theme-toggle, #theme-toggle-mobile');
const html = document.documentElement;

themeToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
        if (html.classList.contains('dark')) {
            html.classList.remove('dark');
            localStorage.theme = 'light';
        } else {
            html.classList.add('dark');
            localStorage.theme = 'dark';
        }
    });
});

// 3D Tilt Effect for Cards
const cards = document.querySelectorAll('.glass-card');
cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * -5; // Max 5deg rotation
        const rotateY = ((x - centerX) / centerX) * 5;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    });
});


// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mobileMenu = document.querySelector('.mobile-menu');

if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
}

// Modal Logic
const modalOverlay = document.getElementById('modal-overlay');
const modalContent = document.getElementById('modal-content');
const modalCloseBtn = document.getElementById('modal-close');
const modalTitle = document.getElementById('modal-title');
const modalMessage = document.getElementById('modal-message');
const modalIcon = document.getElementById('modal-icon'); 
const modalIconContainer = modalIcon ? modalIcon.parentElement : null;

const triggerButtons = document.querySelectorAll('.trigger-modal');

const openModal = (title, message, iconName = 'check') => {
    if (!modalOverlay) return;
    
    modalTitle.textContent = title;
    modalMessage.textContent = message;
    
    if (modalIconContainer) {
        modalIconContainer.innerHTML = `<i data-lucide="${iconName}" class="h-8 w-8"></i>`;
        createIcons({ 
            icons,
            nameAttr: 'data-lucide',
            attrs: {class: "h-8 w-8"}
        });
    }

    modalOverlay.classList.remove('hidden');
    setTimeout(() => {
        modalOverlay.classList.remove('opacity-0');
        if (modalContent) {
            modalContent.classList.remove('scale-95');
            modalContent.classList.add('scale-100');
        }
    }, 10);
};

const closeModal = () => {
    if (!modalOverlay) return;
    
    modalOverlay.classList.add('opacity-0');
    if (modalContent) {
        modalContent.classList.remove('scale-100');
        modalContent.classList.add('scale-95');
    }
    
    setTimeout(() => {
        modalOverlay.classList.add('hidden');
    }, 300);
};

triggerButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const type = btn.getAttribute('data-type');
        const project = btn.getAttribute('data-project');
        
        let title = "Success!";
        let message = "Action completed successfully.";
        let icon = "check";

        switch (type) {
            case 'interest':
                title = "Interest Registered";
                message = `We've let the founder of ${project} know you're interested! They will be in touch soon.`;
                icon = "thumbs-up";
                break;
            case 'sponsor':
                title = "Thank You!";
                message = `Your support for ${project} means the world. A sponsorship packet has been emailed to you.`;
                icon = "heart";
                break;
            case 'submit':
                title = "Idea Submitted";
                message = "Your idea has been securely received. Our review board will analyze it and get back to you within 48 hours.";
                icon = "lightbulb";
                break;
            case 'apply':
                title = "Application Started";
                message = "Great initiative! We're redirecting you to the detailed co-founder application form...";
                icon = "briefcase";
                break;
            case 'general':
                title = "Welcome Aboard";
                message = "Let's get started on your innovation journey.";
                icon = "rocket";
                break;
            case 'browse':
                const browseSection = document.getElementById('browse');
                if (browseSection) browseSection.scrollIntoView({ behavior: 'smooth' });
                return;
        }
        
        openModal(title, message, icon);
    });
});

if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
}

if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });
}
