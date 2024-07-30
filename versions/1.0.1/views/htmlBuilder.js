const debugHtmlBuilder = 0;
if (debugHtmlBuilder) console.log('debugHtmlBuilder is set to 1');

const { formatDateRange, addDaysToDate } = require('../utils/utils');
const { getUniqueCategories } = require('../utils/categoryUtils');
const { generateNavCategoriesHtml } = require('./generateNavCategoriesHtml');
const { getLanguageStrings } = require('../lang/languageManager');
const { getPropertyForProposal } = require('../utils/filter');

/**
 * Function to build the HTML string for the offers.
 * 
 * @param {*} proposalsOffersArray - Array of proposals and offers. Each item in the array is an object with the following structure:
 * {
 *    offer: { ID, acf_offers_season, offers_categories },
 *    acfItem: { offer-date-start, offer-date-end, offer-day-of-week },
 *    method: key,
 *    proposal: { proposalKey, propertyId, price, formattedDate, nbDays },
 *    accommodation: [ { post_title, post_content, post_excerpt, ID } ]
 * }
 * 
 * Each proposal has a propertyId that matches the ID of a property in the offer.properties array.
 * 
 * Each property in the offer.properties array has the following structure:
 * {
 *   ws_establishment_id,
 *   post_title,
 *   acf_featured_image: { url, alt }
 * }
 * 
 * @param {*} displayMode - Display mode for the offers. Can be 'carousel' or 'grid'.
 * @param {*} displayAllOffers - If true, all offers are displayed. If false, only the lowest price offer for each property is displayed. Default is false.
 * @returns - HTML string with the offers.
 */
const buildHtmlOffers = (proposalsOffersArray, displayMode, displayAllOffers = true) => {
    if (debugHtmlBuilder) console.log('proposalsOffersArray in buildHtmlOffers function', proposalsOffersArray);
    if (!proposalsOffersArray || proposalsOffersArray.length === 0) {
        const wwo_strings = getLanguageStrings();
        if (!wwo_strings) {
            console.error('Failed to get language strings in graphql/graphql');
            return;
        }
        return `<div class="wwo-offer-container wwo-slider-wrapper wwo-no-offers">${wwo_strings.no_offers}</div>`;
    }
    const uniqueCategoriesArray = getUniqueCategories(proposalsOffersArray);
    const navCategoriesHtml = generateNavCategoriesHtml(uniqueCategoriesArray);
    let html = generateContainerStartHtml(displayMode, navCategoriesHtml);

    proposalsOffersArray.forEach((item) => {
        const thisProperty = getPropertyForProposal(item);
        if (thisProperty) {
            if (item['lowest-price'] || displayAllOffers) {
                html += generateOfferHtml(item, thisProperty, displayMode, item['lowest-price']);
            }
        }
    });
    html += generateContainerEndHtml(displayMode);
    return html;
};

const generateContainerStartHtml = (displayMode, navCategoriesHtml) => {
    return displayMode === 'carousel' ? `
        <div class="wwo-offer-container wwo-slider-wrapper">
            ${navCategoriesHtml}
            <p>Only for development purposes, showing all offers highlightint the lowest prices only.</p>
            <button class="wwo-slide-arrow" id="wwo-slide-arrow-prev">
                &#8249;
            </button>
            <button class="wwo-offers-container wwo-slide-arrow" id="wwo-slide-arrow-next">
                &#8250;
            </button>
            <ul class="wwo-offers-container wwo-slides-container" id="wwo-slides-container">
        `
        :
        `
        <div class="wwo-offer-container wwo-grid-wrapper">
            ${navCategoriesHtml}
            <ul class="wwo-grid-container" id="wwo-grid-container">
        `;
};

const generateContainerEndHtml = (displayMode) => {
    return `
            </ul><!-- .${displayMode === 'carousel' ? 'wwo-slides-container' : 'wwo-grid-container'} -->
        </div><!-- .wwo-offer-container -->
    `;
};

const generateOfferHtml = (item, property, displayMode, lowestPrice) => {
    const categoryClasses = item.offer.offers_categories.map(category => `wwo-family-${category.slug}`).join(' ');
    const disponibilityRange = formatDateRange(
        item.proposal.formattedDate,
        addDaysToDate(item.proposal.formattedDate, item.proposal.nbDays)
    );
    const lowestPriceClasses = lowestPrice ? 'wwo-lowest-price' : '';
    return `
        <li 
            class="wwo-single-element wwo-grid-item wwo-active ${categoryClasses} ${lowestPriceClasses}"
            data-proposal-key="${item.proposal.proposalKey}"
            data-method="${item.method}"
            >
            <div class="${displayMode === 'carousel' ? `wwo-offer wwo-single-element ${categoryClasses}` : 'wwo-grid-element'}">
                <div class="wwo-offer-item">
                    <div class="wwo-featured-image-wrapper">
                        <img class="wwo-featured-image" src="${property.acf_featured_image.url}" alt="${property.acf_featured_image.alt}" />
                    </div>
                    <div class="wwo-offer-wrapper">
                        <div class="offer-title">
                            ${property.post_title}
                        </div>
                        <div class="wwo-disponibility-dates">
                            ${disponibilityRange}
                        </div>
                        <div class="wwo-offer-price">
                            <span class="wwo-offer-price-amount">${item.proposal.price.amount}</span> <span class="wwo-offer-price-currency">&euro;</span>
                        </div>
                    </div>
                    ${generateDebugHtml(item, property, categoryClasses)}
                </div>
            </div>
        </li>
    `;
};

const generateDebugHtml = (item, property, categoryClasses) => {
    // if (!debugHtmlBuilder) return '';
    let accommodations = '<ul>';
    for (const element of item.accommodation) {
        accommodations += `<li>${element.post_title}</li>`;
    }
    accommodations += `</ul>`;

    return `
        <div style="border: 1px #000 solid;font-size: 0.7em;padding: 0.2em;">
            <span style="background-color: #000;color: #fff;">offers_categories</span>
            ${categoryClasses}
        </div>
        <div style="border: 1px #000 solid;font-size: 0.7em;padding: 0.2em;">
            <span style="background-color: #000;color: #fff;">proposalKey</span>
            ${item.proposal.proposalKey}
        </div>
        <div style="border: 1px #000 solid;font-size: 0.7em;padding: 0.2em;">
            offer.ID: ${item.offer.ID}<br />
            offer.acf_offers_season: ${item.offer.acf_offers_season}<br />
            proposal.propertyId: ${item.proposal.propertyId}<br />
        </div>
        <div style="border: 1px #000 solid;font-size: 0.7em;padding: 0.2em;">
            <span style="background-color: #000;color: #fff;">accommodations</span>
            ${accommodations}
        </div>
        
    `;
};

module.exports = { buildHtmlOffers };
