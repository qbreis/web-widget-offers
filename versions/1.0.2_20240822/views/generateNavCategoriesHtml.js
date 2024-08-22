/**
 * Generates HTML for navigation categories.
 * @param {Array} uniqueCategoriesArray - Array of unique categories.
 * @returns {string} HTML string for navigation categories.
 */

const onlyDev = false;
if(onlyDev) console.log('versions/1.0.2/views/generateNavCategoriesHtml.js: onlyDev is set to 1');

const debugGenerateNavCategoriesHtml = 0;
if(debugGenerateNavCategoriesHtml) console.log('debugGenerateNavCategoriesHtml is set to 1');

require('../css/generateNavCategoriesHtml.css');
const { getLanguageStrings } = require('../lang/languageManager');

const generateNavCategoriesHtml = (endpointData) => {

    const wwo_strings = getLanguageStrings();
    if (!wwo_strings) {
        console.error('Failed to get language strings in graphql/graphql');
        return;
    }
    let navCategoriesHtml = `<ul class="wwo-categories-nav">`;
    if(debugGenerateNavCategoriesHtml) console.log('endpointData in generateNavCategoriesHtml function', endpointData);
    
    let isFirstItem = true;
    if ( onlyDev ) {
        /** Development */
        isFirstItem = false; // in production set to false and remove next line assignment
        navCategoriesHtml += `
                <li 
                    class="wwo-category-nav-item wwo-active"
                    data-category="all"
                    >
                    ${wwo_strings.all}
                </li>
            `;
    } else {
        /** production */
        isFirstItem = true;
    }

    

    endpointData.forEach((item) => {
        // console.log('item in generateNavCategoriesHtml function', item);
        navCategoriesHtml += `
            <li 
                class="
                    wwo-category-nav-item 
                    ${isFirstItem ? 'wwo-active' : ''}
                "
                data-category="${item.post_name}"
                >
                ${item.get_the_title}
            </li>
        `;
        isFirstItem = false;  // Set flag to false after the first iteration
    });
    navCategoriesHtml += `</ul><!-- .wwo-categories-nav -->`;

    // Attach event listener to handle click events
    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('wwo-category-nav-item')) {
            if(debugGenerateNavCategoriesHtml) console.log('click on .wwo-category-nav-item');
            // Remove 'wwo-active' class from all items
            document.querySelectorAll('.wwo-category-nav-item').forEach(item => {
                item.classList.remove('wwo-active');
            });
            // Add 'wwo-active' class to the clicked item
            event.target.classList.add('wwo-active');
            // Update the corresponding grid or carousel items based on category
            const clickedCategory = event.target.getAttribute('data-category');
            if(debugGenerateNavCategoriesHtml) console.log('clickedCategory: '+clickedCategory);
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