import { createIcons, icons } from 'lucide';

// Initialize icons
createIcons({ icons });

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
const modalIcon = document.getElementById('modal-icon'); // The i element itself
const modalIconContainer = modalIcon.parentElement; // The container div

const triggerButtons = document.querySelectorAll('.trigger-modal');

const openModal = (title, message, iconName = 'check') => {
    if (!modalOverlay) return;
    
    modalTitle.textContent = title;
    modalMessage.textContent = message;
    
    // Update icon
    // Clear previous icon content
    modalIconContainer.innerHTML = `<i data-lucide="${iconName}" class="h-8 w-8"></i>`;
    createIcons({ 
        icons,
        nameAttr: 'data-lucide',
        attrs: {class: "h-8 w-8"}
    });

    modalOverlay.classList.remove('hidden');
    // Small timeout to allow display:flex to apply before opacity transition
    setTimeout(() => {
        modalOverlay.classList.remove('opacity-0');
        modalContent.classList.remove('scale-95');
        modalContent.classList.add('scale-100');
    }, 10);
};

const closeModal = () => {
    if (!modalOverlay) return;
    
    modalOverlay.classList.add('opacity-0');
    modalContent.classList.remove('scale-100');
    modalContent.classList.add('scale-95');
    
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
                // Just scroll to section, but we can show a toast or just let the anchor tag handle it if it was an anchor.
                // Since it's a button here for demo purposes:
                document.getElementById('browse').scrollIntoView({ behavior: 'smooth' });
                return; // Don't show modal
        }
        
        openModal(title, message, icon);
    });
});

if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
}

// Close on click outside
if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });
}
