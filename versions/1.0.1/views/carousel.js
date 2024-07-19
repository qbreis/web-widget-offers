// versions/1.0.1/views/carousel.js

const debugCarousel = 1;
if(debugCarousel) console.log('debugCarousel is set to 1');

const wwo_css = require('../css/carousel.css');

const initCarousel = () => {
    // versions/1.0.1/views/carousel.js

    const wwo_slidesContainer = document.getElementById('wwo-slides-container');
    const prevButton = document.getElementById('wwo-slide-arrow-prev');
    const nextButton = document.getElementById('wwo-slide-arrow-next');

    function smoothScroll(element, target, duration) {
        const start = element.scrollLeft;
        const change = target - start;
        const startTime = performance.now();
    
        function animateScroll(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeInOutQuad = progress * (2 - progress); // Ease-in-out effect
            element.scrollLeft = start + change * easeInOutQuad;
    
            if (progress < 1) {
                requestAnimationFrame(animateScroll);
            }
        }
    
        requestAnimationFrame(animateScroll);
    }

    
    nextButton.addEventListener('click', () => {
        const slideWidth = wwo_slidesContainer.clientWidth / 3; // One third of the container width
        const maxScrollLeft = wwo_slidesContainer.scrollWidth - wwo_slidesContainer.clientWidth;

        nextButton.disabled = true;
        if(debugCarousel) console.log('maxScrollLeft', maxScrollLeft, wwo_slidesContainer.scrollLeft + slideWidth);
        if ((wwo_slidesContainer.scrollLeft + slideWidth - 10) > maxScrollLeft) {
            // If we're at the end, loop back to the start
            // wwo_slidesContainer.scrollLeft = 0;
            smoothScroll(wwo_slidesContainer, 0, 10); // 500ms duration for smooth scroll
        } else {
            // wwo_slidesContainer.scrollLeft += slideWidth;
            smoothScroll(wwo_slidesContainer, wwo_slidesContainer.scrollLeft + slideWidth, 200);
        }

        // Re-enable the button after the scroll duration
        setTimeout(() => {
            nextButton.disabled = false;
        }, 500); // Same duration as the smooth scroll

    });

    prevButton.addEventListener('click', () => {
        const slideWidth = wwo_slidesContainer.clientWidth / 3; // One third of the container width

        nextButton.disabled = true;

        if (wwo_slidesContainer.scrollLeft - slideWidth < 0) {
            // If we're at the start, loop back to the end
            // wwo_slidesContainer.scrollLeft = wwo_slidesContainer.scrollWidth - wwo_slidesContainer.clientWidth;
            smoothScroll(wwo_slidesContainer, wwo_slidesContainer.scrollWidth - wwo_slidesContainer.clientWidth, 10);
        } else {
            // wwo_slidesContainer.scrollLeft -= slideWidth;
            smoothScroll(wwo_slidesContainer, wwo_slidesContainer.scrollLeft - slideWidth, 200);
        }
        // Re-enable the button after the scroll duration
        setTimeout(() => {
            nextButton.disabled = false;
        }, 500); // Same duration as the smooth scroll
    });

};

module.exports = { initCarousel };
