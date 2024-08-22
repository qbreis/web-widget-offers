const debugUpselling = 0;
if (debugUpselling) console.log('debugUpselling is set to 1');

const { formatDateRange, addDaysToDate, getRoomsQuantity } = require('../utils/utils');

const getUpselling = (proposalsOffersArray, itemDataSet, selectedOffer, wwo_strings, widgetDisplayOptions, proposalUrl) => {

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

    const disponibilityRange = formatDateRange(
        selectedOffer.proposal.formattedDate,
        addDaysToDate(selectedOffer.proposal.formattedDate, selectedOffer.proposal.nbDays)
    );

    // List all the offers that have the same range of dates and the same category except the selected offer
    let listOfOffersUpselling = '<ul class="wwo-list-of-offers">';
    let counter = 0;
    orderedOffers.forEach((offerItem) => {
        if ( offerItem.proposal.proposalKey !== selectedOffer.proposal.proposalKey && counter < widgetDisplayLimit ) {
            if (debugUpselling) console.log('offerItem:', offerItem);
            if( selectedOffer.proposal.propertyId === offerItem.proposal.propertyId ) {
                counter++;
                let listOfOffersUpsellingAccommodations = `
                <div class="wwo-list-of-accommodations">
                `;

                if (debugUpselling) listOfOffersUpsellingAccommodations += '<pre>'+JSON.stringify(offerItem.proposal.distribution, null, 2)+'</pre>';

                offerItem.accommodation.forEach((accommodationItem) => {

                    let quantity = getRoomsQuantity(offerItem.proposal.distribution.roomTypes, accommodationItem.acf_ws_accommodation_code);

                    /* Dev note: To print accommodation code you can insert this code in the returned template
                    `<strong>${accommodationItem.post_title} (${accommodationItem['acf_ws_accommodation_code']})</strong>`
                    */
                    listOfOffersUpsellingAccommodations += `
                    <div class="wwo-accommodation-item">
                        <span class="wwo-proposals-counter wwo-room-quantity-${quantity}">
                            ${quantity} x
                        </span>
                        
                        <strong>${accommodationItem.post_title}</strong> (${accommodationItem.acf_ws_accommodation_nb_beds} ${wwo_strings.beds}, ${accommodationItem.acf_ws_accommodation_pax_max} ${wwo_strings['people-max']}, ${accommodationItem.acf_ws_accommodation_size_area} ${wwo_strings['square-meters']})<br />
                    </div>
                    `;
                });
                listOfOffersUpsellingAccommodations += `
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


                listOfOffersUpselling += `
                <li>
                    <div class="wwo-price-amount">
                        ${offerItem.proposal.price.amount} &euro;
                    </div>
                    ${listOfOffersUpsellingAccommodations}
                </li>
                `;
            }
        }
    });
    listOfOffersUpselling += '</ul>';
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
        <h2>${wwo_strings['upselling-title']}:</h2>
        ${selectedOffer.offer.get_the_title}<br />
        ${selectedOffer.proposal.formattedDate} to ${addDaysToDate(selectedOffer.proposal.formattedDate, selectedOffer.proposal.nbDays)}<br />
        ${disponibilityRange}<br />
        ${listOfOffersUpselling}
        `;

};

module.exports = { getUpselling };