document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuIcon = document.querySelector('.mobile-menu-icon');
    const navUl = document.querySelector('nav ul');
    const ctaButtons = document.querySelector('.cta-buttons');
    const heroContent = document.querySelector('.hero-content');
    const appButtons = document.querySelector('.app-buttons');
    const userCount = document.querySelector('.user-count');
    const heroImage = document.querySelector('.hero-image');
    const featureItems = document.querySelectorAll('.feature-item');
    const counterItems = document.querySelectorAll('.counter-item');
    const serviceItems = document.querySelectorAll('.service-item');
    const faqContainer = document.querySelector('.faq-container');

    mobileMenuIcon.addEventListener('click', () => {
        navUl.classList.toggle('show');
        ctaButtons.classList.toggle('show');
        mobileMenuIcon.classList.toggle('active');
        
        const icon = mobileMenuIcon.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });

    // Trigger animations when the page loads
    const animateHero = () => {
        heroContent.classList.add('animate');
        setTimeout(() => {
            appButtons.classList.add('animate');
            setTimeout(() => {
                userCount.classList.add('animate');
                setTimeout(() => {
                    heroImage.classList.add('animate');
                }, 200);
            }, 200);
        }, 200);
    };

    // Animate elements on scroll
    const animateOnScroll = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    };

    const scrollObserver = new IntersectionObserver(animateOnScroll, {
        root: null,
        threshold: 0.1
    });

    // Observe feature items
    featureItems.forEach(item => {
        scrollObserver.observe(item);
    });

    // Observe service items
    serviceItems.forEach(item => {
        scrollObserver.observe(item);
    });

    // Animate counter items
    let animationStarted = false;
    const counterObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !animationStarted) {
            animationStarted = true;
            counterItems.forEach((item, index) => {
                setTimeout(() => {
                    item.style.animation = 'fadeInUp 0.5s ease forwards';
                }, index * 200);
            });
        }
    }, { threshold: 0.5 });

    counterObserver.observe(document.querySelector('.download-counter'));

    // Start hero animation after a short delay
    setTimeout(animateHero, 100);

    // FAQ functionality
    const faqData = [
        {
            question: "How can I fund my wallet?",
            answer: "You can fund your wallet through various methods including bank transfer, card payment, or mobile money. Simply go to the 'Fund Wallet' section in the app and follow the instructions."
        },
        {
            question: "How can I purchase data?",
            answer: "To purchase data, navigate to the 'Data Services' section in the app, select your preferred data plan, and follow the prompts to complete the transaction."
        },
        {
            question: "How do I earn a commission?",
            answer: "You can earn commissions by referring new users to the app or by reaching certain transaction milestones. Check the 'Rewards' section in the app for more details on our commission structure."
        },
        {
            question: "How can I withdraw my commission?",
            answer: "To withdraw your commission, go to the 'Wallet' section, select 'Withdraw', choose your preferred withdrawal method, and follow the instructions. Make sure you have met the minimum withdrawal threshold."
        },
        {
            question: "Can I activate my SIM card using the app?",
            answer: "Yes, you can activate your SIM card using our app. Go to the 'SIM Services' section and follow the step-by-step guide for SIM activation."
        },
        {
            question: "How do I check my data balance?",
            answer: "You can check your data balance directly in the app. Navigate to the 'My Account' section and look for 'Data Balance' or use the quick balance check feature on the home screen."
        }
    ];

    // Function to create FAQ items
    const createFaqItem = (question, answer) => {
        const faqItem = document.createElement('div');
        faqItem.classList.add('faq-item');
        faqItem.innerHTML = `
            <div class="faq-question">
                <h3>${question}</h3>
                <span class="toggle-icon">+</span>
            </div>
            <div class="faq-answer" style="display: none;">
                <p>${answer}</p>
            </div>
        `;

        const questionDiv = faqItem.querySelector('.faq-question');
        const answerDiv = faqItem.querySelector('.faq-answer');
        const toggleIcon = faqItem.querySelector('.toggle-icon');

        questionDiv.addEventListener('click', () => {
            const isOpen = answerDiv.style.display === 'block';
            answerDiv.style.display = isOpen ? 'none' : 'block';
            toggleIcon.textContent = isOpen ? '+' : '-';
        });

        return faqItem;
    }

    faqData.forEach(item => {
        const faqItem = createFaqItem(item.question, item.answer);
        faqContainer.appendChild(faqItem);
    });
});
