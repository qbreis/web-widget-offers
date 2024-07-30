const debugHtmlBuilder = 0;
if (debugHtmlBuilder) console.log('debugHtmlBuilder is set to 1');

const { formatDateRange, addDaysToDate } = require('../utils/utils');
const { getUniqueCategories } = require('../utils/categoryUtils');
const { generateNavCategoriesHtml } = require('./generateNavCategoriesHtml');
const { getLanguageStrings } = require('../lang/languageManager');

const buildHtmlOffers = (proposalsOffersArray, displayMode) => {
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
            html += generateOfferHtml(item, thisProperty, displayMode);
        }
    });

    html += generateContainerEndHtml(displayMode);
    return html;
};

const generateContainerStartHtml = (displayMode, navCategoriesHtml) => {
    return displayMode === 'carousel' ? `
        <div class="wwo-offer-container wwo-slider-wrapper">
            ${navCategoriesHtml}
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

const getPropertyForProposal = (item) => {
    for (const property of item.offer.properties) {
        if (property.ws_establishment_id * 1 === item.proposal.propertyId * 1) {
            return property;
        }
    }
    if (debugHtmlBuilder) console.log('No property found for proposal:', item.proposal);
    return null;
};

const generateOfferHtml = (item, property, displayMode) => {
    const categoryClasses = item.offer.offers_categories.map(category => `wwo-family-${category.slug}`).join(' ');
    const disponibilityRange = formatDateRange(
        item.proposal.formattedDate,
        addDaysToDate(item.proposal.formattedDate, item.proposal.nbDays)
    );

    return `
        <li class="wwo-single-element wwo-grid-item wwo-active ${categoryClasses}">
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
    `;
};

module.exports = { buildHtmlOffers };
