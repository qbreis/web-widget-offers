const debugCrossSelling = 0;
if (debugCrossSelling) console.log('debugCrossSelling is set to 1');

const { formatDateRange, addDaysToDate, getRoomsQuantity } = require('../utils/utils');

const getCrossSelling = (proposalsOffersArray, selectedOffer, wwo_strings, widgetDisplayOptions, proposalUrl) => {

    let widgetDisplayLimit = widgetDisplayOptions.limit ? widgetDisplayOptions.limit : 30;
    if (debugCrossSelling) console.log('proposalsOffersArray', proposalsOffersArray);
    if (debugCrossSelling) console.log('selectedOffer.method', selectedOffer.method);

    // filter the proposalsOffersArray and exclude objects where the method is the same as the selectedOffer.method
    const filteredOffers = proposalsOffersArray.filter(item => item.method !== selectedOffer.method);
    if (debugCrossSelling) console.log('filteredOffers', filteredOffers);

    // Remove duplicates based on the 'id' property
    const uniqueFilteredOffers = filteredOffers.filter((offer, index, self) =>
        index === self.findIndex((t) => t.proposal.proposalKey === offer.proposal.proposalKey)
    );
    if (debugCrossSelling) console.log('uniqueFilteredOffers:', uniqueFilteredOffers);

    // Order from lower price to higher price
    const orderedOffers = uniqueFilteredOffers.sort((a, b) => a.proposal.price.amount - b.proposal.price.amount);
    if (debugCrossSelling) console.log('orderedOffers:', orderedOffers);

    // List all the offers that have the same range of dates and the same category except the selected offer
    let listOfOffersCrossSelling = '<ul class="wwo-list-of-offers">';
    let counter = 0;
    orderedOffers.forEach((offerItem) => {
        if ( counter < widgetDisplayLimit ) {
            counter++;
            let listOfAccommodations = `
                <div class="wwo-list-of-accommodations">
                `;


            if (debugCrossSelling) listOfAccommodations += '<pre>'+JSON.stringify(offerItem.proposal.distribution, null, 2)+'</pre>';

            offerItem.accommodation.forEach((accommodationItem) => {

                let quantity = getRoomsQuantity(offerItem.proposal.distribution.roomTypes, accommodationItem.acf_ws_accommodation_code);

                if (debugCrossSelling) listOfAccommodations += '<pre>'+JSON.stringify(accommodationItem, null, 2)+'</pre>';

                /* Dev note: To print accommodation code you can insert this code in the returned template
                `<strong>${accommodationItem.post_title} (${accommodationItem['acf_ws_accommodation_code']})</strong>`
                */

                listOfAccommodations += `
                <div class="wwo-accommodation-item">

                    <span class="wwo-proposals-counter wwo-room-quantity-${quantity}">
                        ${quantity} x
                    </span>

                    <strong>${accommodationItem.post_title}</strong> (${accommodationItem.acf_ws_accommodation_nb_beds} ${wwo_strings.beds}, ${accommodationItem.acf_ws_accommodation_pax_max} ${wwo_strings['people-max']}, ${accommodationItem.acf_ws_accommodation_size_area} ${wwo_strings['square-meters']})<br />
                </div>
                `;
            });
            listOfAccommodations += `
                <span style="font-size: 0.5em;">
                    <a 
                            href="${proposalUrl}${offerItem.proposal.proposalKey}"
                            target="_blank"
                            rel="noopener noreferrer">
                                ${offerItem.proposal.proposalKey}
                    </a><br />
                </span>
            </div><!-- .wwo-list-of-accommodations -->
            `;

            if (debugCrossSelling) console.log('offerItem.proposal.formattedDate', offerItem.proposal.formattedDate);

            const disponibilityRange = formatDateRange(
                offerItem.proposal.formattedDate,
                addDaysToDate(offerItem.proposal.formattedDate, offerItem.proposal.nbDays)
            );

            const numberOfChildrenDisplay = selectedOffer.acfItem['offer-children'].length !== undefined ? 
            `${selectedOffer.acfItem['offer-children'].length} ${wwo_strings.children}` : '';

            listOfOffersCrossSelling += `
                <li>
                    <div class="wwo-price-amount">
                        ${offerItem.proposal.price.amount} &euro;

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
                    ${disponibilityRange}<br />

                    ${listOfAccommodations}
                </li>
            `;
        }
    });
    listOfOffersCrossSelling += '</ul>';

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
        <h2>${wwo_strings['cross-selling-title']}:</h2>
        ${selectedOffer.offer.get_the_title}<br />
        ${listOfOffersCrossSelling}
        `;

}

module.exports = { getCrossSelling };