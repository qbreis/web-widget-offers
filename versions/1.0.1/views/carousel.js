// versions/1.0.1/views/carousel.js

const initCarousel = () => {
    // versions/1.0.1/views/carousel.js

    const wwo_slidesContainer = document.getElementById('wwo-slides-container');
    const wwo_slides = document.querySelectorAll('.wwo-slide');
    const prevButton = document.getElementById('wwo-slide-arrow-prev');
    const nextButton = document.getElementById('wwo-slide-arrow-next');

    nextButton.addEventListener('click', () => {
        const slideWidth = wwo_slidesContainer.clientWidth / 3; // One third of the container width
        const maxScrollLeft = wwo_slidesContainer.scrollWidth - wwo_slidesContainer.clientWidth;

        if (wwo_slidesContainer.scrollLeft + slideWidth > maxScrollLeft) {
            // If we're at the end, loop back to the start
            wwo_slidesContainer.scrollLeft = 0;
        } else {
            wwo_slidesContainer.scrollLeft += slideWidth;
        }
    });

    prevButton.addEventListener('click', () => {
        const slideWidth = wwo_slidesContainer.clientWidth / 3; // One third of the container width

        if (wwo_slidesContainer.scrollLeft - slideWidth < 0) {
            // If we're at the start, loop back to the end
            wwo_slidesContainer.scrollLeft = wwo_slidesContainer.scrollWidth - wwo_slidesContainer.clientWidth;
        } else {
            wwo_slidesContainer.scrollLeft -= slideWidth;
        }
    });

};

module.exports = { initCarousel };
