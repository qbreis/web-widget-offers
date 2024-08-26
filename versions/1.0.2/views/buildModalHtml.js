const { formatDateRange, addDaysToDate } = require('../utils/utils');
const { getPropertyForProposal } = require('../utils/filter');
const { buildAccommodationHtml } = require('./buildAccommodationHtml');
const { getOptionsOffers } = require('../utils/optionsOffers');

const getOfferSeasonDisplay = (season, wwo_strings) => {
    switch (season) {
        case 'summer':
            return ` - ${wwo_strings.summer}`;
        case 'winter':
            return ` - ${wwo_strings.winter}`;
        case 'both':
        default:
            return '';
    }
};

const buildModalHtml = (selectedOffer, wwo_strings) => {

    const widgetOptions = getOptionsOffers();

    const disponibilityRange = formatDateRange(
        selectedOffer.proposal.formattedDate,
        addDaysToDate(selectedOffer.proposal.formattedDate, selectedOffer.proposal.nbDays)
    );

    const thisProperty = getPropertyForProposal(selectedOffer);
    const numberOfChildrenDisplay = selectedOffer.acfItem['offer-children'].length !== undefined ? 
        `${selectedOffer.acfItem['offer-children'].length} ${wwo_strings.children}` : '';

    const offerSeasonDisplay = getOfferSeasonDisplay(selectedOffer.offer.acf_offers_season, wwo_strings);

    let htmlBuffer = `
        ${widgetOptions.display.modal.header ? `
            <div class="wwo-modal-header">
                <div class="wwo-offer-title">
                    ${selectedOffer.offer.get_the_title}
                </div>
                <div class="wwo-offer-season">
                    ${offerSeasonDisplay}
                </div>
            </div><!-- .wwo-modal-header -->
        ` : ''}
        ${widgetOptions.display.modal.establishment ? `
            <div class="wwo-establishment-proposal">
                <h2>
                    ${thisProperty.post_title}
                </h2>
                <div class="wwo-disponibility-dates">
                    ${disponibilityRange}
                </div>
                <div class="wwo-establishment-featured-image">
                    <img src="${thisProperty.acf_featured_image.sizes['ud-thumb-500']}" alt="${thisProperty.acf_featured_image.alt}" width="200" height="200" />
                </div>
                <div class="wwo-price">
                    <span class="wwo-offer-price-amount">
                        ${selectedOffer.proposal.price.amount}
                    </span>
                    &nbsp;
                    <span class="wwo-offer-price-currency">
                        &euro;
                    </span>
                    <span class="wwo-details wwo-number-of-days">
                        ${selectedOffer.proposal.nbDays} ${wwo_strings.nights}
                    </span>
                    <span class="wwo-details wwo-number-of-adults">
                        ${selectedOffer.acfItem['offer-number-of-adults']} ${wwo_strings.adults}
                    </span>
                    <span class="wwo-details wwo-number-of-adults">
                        ${numberOfChildrenDisplay}
                    </span>
                </div>
            </div><!-- .wwo-establishment-proposal -->
        ` : ''}
    `;

    htmlBuffer += `<div class="wwo-room-types-container" data-accommodation-length="${selectedOffer.accommodation.length}">`;

    let counter = 0;
    selectedOffer.accommodation.forEach((item) => {
        // if (debugModal) console.log('item', item);
        counter ++;
        htmlBuffer += buildAccommodationHtml(item, disponibilityRange, selectedOffer, wwo_strings, numberOfChildrenDisplay, counter);
    });

    htmlBuffer += '</div><!-- .wwo-room-types-container -->';

    return htmlBuffer;
};

module.exports = { buildModalHtml };