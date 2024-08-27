const debugUpselling = 0;
if (debugUpselling) console.log('debugUpselling is set to 1');

const { formatDateRange, addDaysToDate, getRoomsQuantity } = require('../utils/utils');
const { getOptionsOffers } = require('../utils/optionsOffers');

const getUpselling = (proposalsOffersArray, itemDataSet, selectedOffer, wwo_strings, widgetDisplayOptions, proposalUrl) => {

    // TODO: Params widgetDisplayOptions and proposalUrl are contained in the widgetOptions object!!!

    const widgetOptions = getOptionsOffers();

    let widgetDisplayLimit = widgetDisplayOptions.limit ? widgetDisplayOptions.limit : 30;
    if (debugUpselling) console.log('widgetDisplayOptions:', widgetDisplayOptions);
    if (debugUpselling) console.log('widgetDisplayOptions.limit:', aux);
    if (debugUpselling) console.log('selectedOffer:', selectedOffer);

    if (debugUpselling) console.log('proposalsOffersArray:', proposalsOffersArray);
    const filteredOffers = proposalsOffersArray.filter(offer => offer.method === itemDataSet.method);
    if (debugUpselling) console.log('Filtered Offers:', filteredOffers);

    // Remove duplicates based on the 'id' property
    const uniqueFilteredOffers = filteredOffers.filter((offer, index, self) =>
        index === self.findIndex((t) => t.proposal.proposalKey === offer.proposal.proposalKey)
    );
    if (debugUpselling) console.log('uniqueFilteredOffers:', uniqueFilteredOffers);

    // Order from lower price to higher price
    const orderedOffers = uniqueFilteredOffers.sort((a, b) => a.proposal.price.amount - b.proposal.price.amount);
    if (debugUpselling) console.log('orderedOffers:', orderedOffers);

    // console.log('orderedOffers:', orderedOffers);
    
    const disponibilityRange = formatDateRange(
        selectedOffer.proposal.formattedDate,
        addDaysToDate(selectedOffer.proposal.formattedDate, selectedOffer.proposal.nbDays)
    );

    // List all the offers that have the same range of dates and the same category except the selected offer
    let listOfOffersUpselling = '<ul class="wwo-list-of-offers">';
    let counter = -1;

    orderedOffers.forEach((offerItem) => {
        if ( offerItem.proposal.proposalKey !== selectedOffer.proposal.proposalKey && counter < widgetDisplayLimit ) {
            // console.log('offerItem.accommodation.length:', offerItem.accommodation.length);
            if (debugUpselling) console.log('offerItem:', offerItem);
            if( selectedOffer.proposal.propertyId === offerItem.proposal.propertyId ) {
                counter++;
                let listOfOffersUpsellingAccommodations = `
                    <div class="wwo-list-of-accommodations">
                `;

                if (debugUpselling) listOfOffersUpsellingAccommodations += '<pre>'+JSON.stringify(offerItem.proposal.distribution, null, 2)+'</pre>';

                listOfOffersUpsellingAccommodations += `<div class="wwo-accommodation-items">`;
                // console.log('offerItem:', offerItem);
                // console.log('offerItem.accommodation:', offerItem.accommodation);
                offerItem.accommodation.forEach((accommodationItem) => {
                    // console.log('accommodationItem:', accommodationItem);
                    let quantity = getRoomsQuantity(offerItem.proposal.distribution.roomTypes, accommodationItem.acf_ws_accommodation_code);

                    /* Dev note: To print accommodation code you can insert this code in the returned template
                    `<strong>${accommodationItem.post_title} (${accommodationItem['acf_ws_accommodation_code']})</strong>`
                    */

                    listOfOffersUpsellingAccommodations += `
                    <div class="wwo-accommodation-item">
                        <span class="wwo-proposals-counter wwo-room-quantity-${quantity}">
                            ${quantity} x
                        </span>
                        <strong>
                            ${accommodationItem.post_title}
                            <span class="wwo-accommodation-code"> (${accommodationItem['acf_ws_accommodation_code']})</span>
                        </strong>
                        <button class="wwo-show-accommodation-details" data-accommodation-code="${accommodationItem['acf_ws_accommodation_code']}">
                            ${wwo_strings['plus-info']}
                        </button>
                        <div class="wwo-accommodation-data">
                            (${accommodationItem.acf_ws_accommodation_nb_beds} ${wwo_strings.beds}, ${accommodationItem.acf_ws_accommodation_pax_max} ${wwo_strings['people-max']}, ${accommodationItem.acf_ws_accommodation_size_area} ${wwo_strings['square-meters']})
                        </div><!-- .wwo-accommodation-data -->
                    </div><!-- .wwo-accommodation-item -->
                    `;
                });
                listOfOffersUpsellingAccommodations += `</div><!-- .wwo-accommodation-items -->`;
                

                listOfOffersUpsellingAccommodations += `
                    <div class="wwo-price-amount">
                        ${offerItem.proposal.priceWithoutDiscount.amount !== offerItem.proposal.price.amount ? `
                            <div class="wwo-price-without-discount">
                                <span class="wwo-offer-price-amount">
                                    ${offerItem.proposal.priceWithoutDiscount.amount}
                                </span> <span class="wwo-offer-price-currency">&euro;</span>
                            </div>
                        ` : ``}
                        ${offerItem.proposal.price.amount} &euro;
                    </div><!-- .wwo-price-amount -->
                `;

                const numberOfChildrenDisplay = offerItem.acfItem['offer-children'].length !== undefined ? 
                    `${offerItem.acfItem['offer-children'].length} ${wwo_strings.children}` : '';
                listOfOffersUpsellingAccommodations += `
                    <div class="wwo-disponibility-extract">
                        <div class="wwo-disponibility-range">
                            ${disponibilityRange}
                        </div><!-- .wwo-disponibility-range -->
                        <div class="wwo-disponibility-details">

                            <div class="wwo-date-range-description">
                                <span class="wwo-details wwo-number-of-days">
                                    ${offerItem.proposal.nbDays} ${wwo_strings.nights}
                                </span>
                                <span class="wwo-details wwo-number-of-adults">
                                    ${offerItem.acfItem['offer-number-of-adults']} ${wwo_strings.adults}
                                </span>
                                ${numberOfChildrenDisplay ? `
                                    <span class="wwo-details wwo-number-of-adults">
                                        ${numberOfChildrenDisplay}
                                    </span>
                                ` : ''}
                            </div><!-- .wwo-date-range-description -->

                        </div><!-- .wwo-disponibility-details -->

                        <button 
                            class="wwo-offer-button-text" 
                            onclick="window.open('${proposalUrl}${offerItem.proposal.proposalKey}', '_blank', 'noopener noreferrer')"
                            >
                            ${wwo_strings.seeOffer}
                        </button>
                        
                    </div><!-- .wwo-disponibility-extract -->
                `;

                listOfOffersUpsellingAccommodations += `
                    </div><!-- .wwo-list-of-accommodations -->
                `;

                const activeClass = counter === 0 ? 'active' : '';
                listOfOffersUpselling += `
                    <li class="offer-item offer-item-${counter} ${activeClass}">
                        ${listOfOffersUpsellingAccommodations}
                    </li>
                `;
            }
        }
    });
    listOfOffersUpselling += '</ul>';
    listOfOffersUpselling += `
        <div class="wwo-open-close-disponibilities">
            <span class="wwo-more-offers active">${wwo_strings.moreOffers}</span>
            <span class="wwo-less-offers">${wwo_strings.lessOffers}</span>
        </div>
    `;

    if( counter === 0 ) {
        listOfOffersCrossSelling = `
        <ul class="wwo-list-of-offers no-offers-found">
            <li>
                ${wwo_strings['no-offers-found']}
            </li>
        </ul>
        `;
    }
    return `
        <div class="wwo-offers-list-section">
            <div class="wwo-offers-togle-title">
                ${wwo_strings['upselling-title']}
                <div class="wwo-open-close-disponibilities">
                    <span class="wwo-more-offers active">Plus d'offres</span>
                    <span class="wwo-less-offers"">Moins d'offres</span>
                </div><!-- .wwo-open-close-disponibilities -->
            </div><!-- .wwo-offers-togle-title -->
            ${widgetOptions.display.upselling.header ? `
                <div class="wwo-upselling-info">
                    ${selectedOffer.offer.get_the_title}<br />
                    ${selectedOffer.proposal.formattedDate} to ${addDaysToDate(selectedOffer.proposal.formattedDate, selectedOffer.proposal.nbDays)}<br />
                    ${disponibilityRange}<br />
                </div><!-- .wwo-upselling-info -->
            ` : ''}
            ${listOfOffersUpselling}
        </div><!-- .wwo-offers-list-section -->
    `;

};

module.exports = { getUpselling };