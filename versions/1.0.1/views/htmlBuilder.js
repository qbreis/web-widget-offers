const debugHtmlBuilder = 0;
if(debugHtmlBuilder) console.log('debugHtmlBuilder is set to 1');

const { formatDateRange, addDaysToDate } = require('../utils/utils');

const buildHtmlOffers = (proposalsOffersArray) => {
    let html = `
        <div class="wwo-offer-container wwo-slider-wrapper">
            <button class="wwo-slide-arrow" id="wwo-slide-arrow-prev">
                &#8249;
            </button>
            <button class="wwo-slide-arrow" id="wwo-slide-arrow-next">
                &#8250;
            </button>
            <ul class="wwo-slides-container" id="wwo-slides-container">
    `;
    proposalsOffersArray.forEach((item, key) => {

        if (key % 3 === 0) {
            if (key !== 0) {
                html += `</li>`; // Close previous slide
            }
            html += `<li class="wwo-slide">`; // Start new slide
        }

        if(debugHtmlBuilder) console.log('item in buildHtmlOffers', item);
        if(debugHtmlBuilder) console.log('--'+addDaysToDate(item.proposal.formattedDate, item.proposal.nbDays))
        let disponibilityRange = formatDateRange(
            item.proposal.formattedDate, 
            addDaysToDate(item.proposal.formattedDate, item.proposal.nbDays)
        );

        let thisProperty = null;
        item.offer.properties.forEach(property => {
            if(!thisProperty) {
                if (property.ws_establishment_id * 1 === item.proposal.propertyId * 1) {
                    thisProperty = property;
                }
            }
        });
        if(debugHtmlBuilder) console.log('thisProperty:', thisProperty);

        html += `
            <div class="wwo-offer">
                <div class="wwo-offer-item">
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
                        Categories: ${item.offer.offers_categories.map(category => `${category.name}`).join(', ')}<br />
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
                </div><!-- .wwo-offer-item -->
            </div><!-- .wwo-offer -->
        `;
    });
    html += `
            </li><!-- .wwo-slide -->
        </ul><!-- .wwo-slides-container -->
    </div><!-- .wwo-offer-container -->
    `;
    return html;
}

module.exports = { buildHtmlOffers };