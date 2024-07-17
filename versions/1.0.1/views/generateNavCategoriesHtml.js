/**
 * Generates HTML for navigation categories.
 * @param {Array} uniqueCategoriesArray - Array of unique categories.
 * @returns {string} HTML string for navigation categories.
 */

require('../css/generateNavCategoriesHtml.css');

const { getLanguageStrings } = require('../lang/languageManager');

const generateNavCategoriesHtml = (uniqueCategoriesArray) => {

    const wwo_strings = getLanguageStrings();
    if (!wwo_strings) {
        console.error('Failed to get language strings in graphql/graphql');
        return;
    }

    let navCategoriesHtml = `
        <ul class="wwo-categories-nav">
            <li 
                class="wwo-category-nav-item wwo-active"
                data-category="all"
                >
                ${wwo_strings.all}
            </li>
    `;
    uniqueCategoriesArray.forEach((item) => {
        navCategoriesHtml += `
            <li 
                class="wwo-category-nav-item"
                data-category="${item.slug}"
                >
                ${item.name}
            </li>
        `;
    });
    navCategoriesHtml += `</ul>`;

    // Attach event listener to handle click events
    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('wwo-category-nav-item')) {

            // Remove 'wwo-active' class from all items
            document.querySelectorAll('.wwo-category-nav-item').forEach(item => {
                item.classList.remove('wwo-active');
            });

            // Add 'wwo-active' class to the clicked item
            event.target.classList.add('wwo-active');

            // Update the corresponding grid or carousel items based on category
            const clickedCategory = event.target.getAttribute('data-category');
            updateGridOrCarouselItems(clickedCategory);
            document.querySelectorAll('.wwo-single-element').forEach(item => {
                if(item.classList.contains(`wwo-family-${clickedCategory}`) || clickedCategory === 'all') {
                    item.classList.add('wwo-active');
                } else {
                    item.classList.remove('wwo-active');
                }
            });
        }
    });


    return navCategoriesHtml;
};

function updateGridOrCarouselItems(category) {
    const gridOrCarouselItems = document.querySelectorAll('.wwo-single-element, .wwo-slide');

    gridOrCarouselItems.forEach(item => {
        if (item.classList.contains(`wwo-family-${category}`)) {
            item.classList.add('wwo-active');
        } else {
            item.classList.remove('wwo-active');
        }
    });
}

module.exports = { generateNavCategoriesHtml };