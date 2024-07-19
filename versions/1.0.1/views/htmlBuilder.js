const debugHtmlBuilder = 0;
if(debugHtmlBuilder) console.log('debugHtmlBuilder is set to 1');

const { formatDateRange, addDaysToDate } = require('../utils/utils');
const { getUniqueCategories } = require('../utils/categoryUtils');
const { generateNavCategoriesHtml } = require('./generateNavCategoriesHtml');

const buildHtmlOffers = (proposalsOffersArray, displayMode) => {

    if(debugHtmlBuilder) console.log('proposalsOffersArray in buildHtmlOffers function', proposalsOffersArray);
    const uniqueCategoriesArray = getUniqueCategories(proposalsOffersArray);
    const navCategoriesHtml = generateNavCategoriesHtml(uniqueCategoriesArray);

    let html = displayMode === 'carousel' ? `
    <div class="wwo-offer-container wwo-slider-wrapper">
        ${navCategoriesHtml}
        <button class="wwo-slide-arrow" id="wwo-slide-arrow-prev">
            &#8249;
        </button>
        <button class="wwo-slide-arrow" id="wwo-slide-arrow-next">
            &#8250;
        </button>
        <ul class="wwo-slides-container" id="wwo-slides-container">
    `
    :
    `
    <div class="wwo-offer-container wwo-grid-wrapper">
        ${navCategoriesHtml}
        <ul class="wwo-grid-container" id="wwo-grid-container">
    `
    ;

    proposalsOffersArray.forEach((item, key) => {

        let thisProperty = null;
        item.offer.properties.forEach(property => {
            if(!thisProperty) {
                if (property.ws_establishment_id * 1 === item.proposal.propertyId * 1) {
                    thisProperty = property;
                }
            }
        });
        if(debugHtmlBuilder) console.log('thisProperty:', thisProperty);

        if(thisProperty === null) {
            if(debugHtmlBuilder) console.log('No property found for proposal:', item.proposal);
        } else {
            if (displayMode === 'carousel') {
                if (key % 3 === 0) {
                    if (key !== 0) {
                        html += `</li>`; // Close previous slide
                    }
                    html += `<li class="wwo-single-elementxxx wwo-slide wwo-active">`; // Start new slide
                } 
            } else {
                html += `<li class="wwo-single-element wwo-grid-item wwo-active ${item.offer.offers_categories.map(category => `wwo-family-${category.slug}`).join(' ')}">`;
            }
            if(debugHtmlBuilder) console.log('item in buildHtmlOffers', item);
            if(debugHtmlBuilder) console.log('--'+addDaysToDate(item.proposal.formattedDate, item.proposal.nbDays))
            let disponibilityRange = formatDateRange(
                item.proposal.formattedDate, 
                addDaysToDate(item.proposal.formattedDate, item.proposal.nbDays)
            );

            html += `
                <div class="
                    ${displayMode === 'carousel' 
                        ? 
                        `wwo-offer wwo-single-element ${item.offer.offers_categories.map(category => `wwo-family-${category.slug}`).join(' ')}` 
                        : 
                        'wwo-grid-element'}
                    ">
                    <div class="wwo-offer-item">

                        <div class="wwo-featured-image-wrapper">
                            <img class="wwo-featured-image" src="${thisProperty.acf_featured_image.url}" alt="${thisProperty.acf_featured_image.alt}" />
                        </div><!-- .wwo-featured-image-wrapper -->
                        <div class="wwo-offer-wrapper">
                            <div class="offer-title">
                                ${thisProperty.post_title}
                            </div><!-- .offer-title -->
                            <div class="wwo-disponibility-dates">
                                ${disponibilityRange}
                            </div><!-- .wwo-disponibility-dates -->
                            <div class="wwo-offer-price">
                                <span class="wwo-offer-price-amount">${item.proposal.price.amount}</span> <span class="wwo-offer-price-currency">&euro;</span>
                            </div><!-- .offer-price -->
                        </div><!-- .wwo-offer-wrapper -->

                        <div style="border: 1px #000 solid;font-size: 0.7em;padding: 0.2em;">
                            <span style="background-color: #000;color: #fff;">offers_categories</span>
                            ${item.offer.offers_categories.map(category => `wwo-family-${category.slug}`).join(' ')}
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


    <div style="display: none;">
                        <div class="offer-proposal">
                            <b>PROPOSAL</b><br />
                            <div class="wwo-disponibility-dates">
                                ${disponibilityRange}
                            </div><!-- .wwo-disponibility-dates -->
                            propertyId: ${item.proposal.propertyId}<br />
                            ${item.proposal.price.amount} ${item.proposal.price.currencyCode}<br />
                            proposalKey: ${item.proposal.proposalKey}<br />
                            nbDays: ${item.proposal.nbDays}<br />
                            date start: ${item.proposal.formattedDate}<br />
                        </div><!-- .offer-proposal -->
                        <div class="offer-categories" style="border: 2px #ccc solid;margin: 1em;">
                            <b>OFFER</b><br />
                            get_the_title: ${item.offer.get_the_title}<br />
                            Categories: ${item.offer.offers_categories.map(category => `${category.slug}`).join(', ')}<br />
                            acf_offers_descirtion_content: ${item.offer.acf_offers_descirtion_content}<br />
                            acf_offers_season: ${item.offer.acf_offers_season}<br />
                        </div><!-- .offer-categories -->
                        <div class="offer-establishment" style="border: 2px #ccc solid;margin: 1em;">
                            <b>ESTABLISHMENT</b><br />
                            Establishment: ${thisProperty.post_title}<br />
                            guid: ${thisProperty.guid}<br />
                            acf_h1_title: ${thisProperty.acf_h1_title}<br />
                            acf_h1_subtitle: ${thisProperty.acf_h1_subtitle}<br />
                            acf_featured_image.alt: ${thisProperty.acf_featured_image.alt}<br />
                            acf_featured_image.caption: ${thisProperty.acf_featured_image.caption}<br />
                            acf_featured_image.url: ${thisProperty.acf_featured_image.url}<br />
                        </div><!-- .offer-establishment -->
    </div>

                    </div><!-- .wwo-offer-item -->
                </div><!-- .wwo-offer -->
            `;
        }
    });
    html += `
            </li><!-- .wwo-slide -->
        </ul><!-- .wwo-slides-container -->
    </div><!-- .wwo-offer-container -->
    `;









    return html;
}











module.exports = { buildHtmlOffers };