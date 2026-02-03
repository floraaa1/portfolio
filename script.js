(function () {
    'use strict';
    console.log("Hello");

    document.addEventListener('DOMContentLoaded', () => {

        document.addEventListener('mousemove', function (e) {
            if (Math.random() < 0.1) {
                createStar(e.pageX, e.pageY);
            }
        });

        function createStar(x, y) {
            const star = document.createElement('div');
            star.classList.add('magic-star');


            const colors = ['#ffd700', '#4cc9f0', '#f72585', '#ffffff'];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];


            const size = Math.random() * 8 + 4 + 'px';

            star.style.left = x + 'px';
            star.style.top = y + 'px';
            star.style.backgroundColor = randomColor;
            star.style.width = size;
            star.style.height = size;


            document.body.appendChild(star);

            setTimeout(() => {
                star.remove();
            }, 1000);
        }

        // Profile Interaction Logic
        const profileTrigger = document.getElementById('profile-trigger');
        const profileContainer = document.querySelector('.profile-container');
        
        if (profileTrigger && profileContainer) {
            profileTrigger.addEventListener('click', (e) => {
                
                e.stopPropagation(); 
                profileContainer.classList.toggle('active');
            });

            document.addEventListener('click', (e) => {
                if (!profileContainer.contains(e.target)) {
                    profileContainer.classList.remove('active');
                }
            });
        }

        // Typewriter Effect
        const heroTitle = document.querySelector('#hero h1');
        const originalText = "Hi, I'm Shutong!";

        heroTitle.textContent = '';
        heroTitle.classList.add('typing-cursor');

        let charIndex = 0;

        function typeWriter() {
            if (charIndex < originalText.length) {
                heroTitle.textContent += originalText.charAt(charIndex);
                charIndex++;
                setTimeout(typeWriter, 90);
            } else {
                heroTitle.classList.remove('typing-cursor');
            }
        }

        setTimeout(typeWriter, 400);



        const revealElements = document.querySelectorAll('.content-section, .project-grid-wrapper, .info-card, .bio-card');


        revealElements.forEach(el => el.classList.add('reveal-section'));

        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            root: null,
            threshold: 0.05,
            rootMargin: "0px 0px 0px 0px"
        });

        revealElements.forEach(el => {
            revealObserver.observe(el);
        });

        const magicSymbol = document.querySelector('.magic-symbol');
        if (magicSymbol) {
            magicSymbol.addEventListener('click', () => {
                magicSymbol.style.transition = 'transform 1s cubic-bezier(0.68, -0.55, 0.27, 1.55)';
                magicSymbol.style.transform = 'rotate(360deg) scale(1.5)';

                setTimeout(() => {
                    magicSymbol.style.transform = 'rotate(0deg) scale(1)';
                }, 1000);
            });
        }

    });
})();