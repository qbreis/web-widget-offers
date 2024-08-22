const debugCrossSelling = 0;
if (debugCrossSelling) console.log('debugCrossSelling is set to 1');

const { formatDateRange, addDaysToDate, getRoomsQuantity } = require('../utils/utils');
const { getOptionsOffers } = require('../utils/optionsOffers');

const getCrossSelling = (proposalsOffersArray, selectedOffer, wwo_strings, widgetDisplayOptions, proposalUrl) => {

    // TODO: Params widgetDisplayOptions and proposalUrl are contained in the widgetOptions object!!!
    // TODO: Same thing with wwo_strings which I can get from getLanguageStrings()!!!

    const widgetOptions = getOptionsOffers();

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

    /*
    I have one array object uniqueFilteredOffers like this:
    [
        0: {
            "offer": {
                "get_the_title": "Nos cours de séjours",
                "post_name": "nos-cours-de-sejours",
            },
            "proposal": {
                "nbDays": 7,
                "formattedDate": "21/12/2024"
            }

        },
        ...
    ]´

    and i want to reorder chronologically by formattedDate from the most recent to the most far away in time.... how can i do that?
    */

    const chronologicalFilteredOffers = uniqueFilteredOffers;

    // TODO: Make out of this code a function that can be reused in other parts of the code if needed

    chronologicalFilteredOffers.sort((a, b) => {
        // Parse the formattedDate into Date objects
        const dateA = new Date(a.proposal.formattedDate.split('/').reverse().join('-'));
        const dateB = new Date(b.proposal.formattedDate.split('/').reverse().join('-'));
    
        // Sort by descending order (most recent first)
        // return dateB - dateA;

        // Sort by ascending order (earliest date first)
        return dateA - dateB;
    });

    /*
    Now i want new array for each formattedDate containing all offers with same formattedDate.
    To create a new array where each sub-array contains all offers with the same formattedDate, I can use a combination of reduce and map methods in JavaScript.
    */
    // TODO: Again, make out of this code a function that can be reused in other parts of the code if needed
    // Grouping by formattedDate and nbDays
    const groupedByDateAndDays = chronologicalFilteredOffers.reduce((accumulatorArray, current) => {
        const { formattedDate, nbDays } = current.proposal;
        const key = `${formattedDate}_${nbDays}`; // Combining formattedDate and nbDays as a key
    
        if (!accumulatorArray[key]) {
            accumulatorArray[key] = [];
        }
        accumulatorArray[key].push(current);
        return accumulatorArray;
    }, {});

    // Convert the grouped object into an array of objects with formattedDate, nbDays, and offers,
    // sort each sub-array by proposal.price.amount, and limit to widgetDisplayLimit elements
    const groupedArray = Object.keys(groupedByDateAndDays).map(key => {
        const [formattedDate, nbDays] = key.split('_');
        const sortedOffers = groupedByDateAndDays[key]
            .sort((a, b) => a.proposal.price.amount - b.proposal.price.amount)
            .slice(0, widgetDisplayLimit);
        const lowestPrice = sortedOffers[0]?.proposal.price.amount; // The lowest price will be the first in the sorted array

        return {
            formattedDate: formattedDate,
            nbDays: parseInt(nbDays, 10),
            formattedDateEnd: addDaysToDate(formattedDate, nbDays),
            lowestPrice: lowestPrice,
            offers: sortedOffers,
        };
    });

    let listOfOffersCrossSellingOutput = '';

    groupedArray.forEach((group) => {
        // console.log('group:', group);
        listOfOffersCrossSellingOutput += `
        <div class="wwo-offers-list-section">
            <div class="wwo-offers-togle-title">
                ${wwo_strings.viewAvailabilityFrom} ${group.formattedDate} ${wwo_strings.to} ${group.formattedDateEnd} | ${wwo_strings.fromPrice} ${group.lowestPrice}€
                <div class="wwo-open-close-disponibilities">
                    <span class="wwo-more-offers active">Plus d'offres</span>
                    <span class="wwo-less-offers"">Moins d'offres</span>
                </div><!-- .wwo-open-close-disponibilities -->
            </div><!-- .wwo-offers-togle-title -->
            <ul class="wwo-list-of-offers">
        `;

        group.offers.forEach((offerItem, index) => {
            // Determine if the current item should have the 'active' class
            const activeClass = index === 0 ? 'active' : '';
            listOfOffersCrossSellingOutput += `
                <li class="offer-item offer-item-${index} ${activeClass}">
                    <div class="wwo-list-of-accommodations">
                        <div class="wwo-accommodation-items">
                        `;
            offerItem.accommodation.forEach((accommodationItem) => {
                let quantity = getRoomsQuantity(offerItem.proposal.distribution.roomTypes, accommodationItem.acf_ws_accommodation_code);
                listOfOffersCrossSellingOutput += `
                            <div class="wwo-accommodation-item">
                                <span class="wwo-proposals-counter wwo-room-quantity-${quantity}">
                                    ${quantity} x
                                </span>
                                <strong>${accommodationItem.post_title}</strong>
                                <div class="wwo-accommodation-data">
                                    (${accommodationItem.acf_ws_accommodation_nb_beds} ${wwo_strings.beds}, ${accommodationItem.acf_ws_accommodation_pax_max} ${wwo_strings['people-max']}, ${accommodationItem.acf_ws_accommodation_size_area} ${wwo_strings['square-meters']})
                                </div><!-- .wwo-accommodation-data -->
                            </div><!-- .wwo-accommodation-item -->
                        `;
                    });
                listOfOffersCrossSellingOutput += `
                        </div><!-- .wwo-accommodation-items -->
                `;
                listOfOffersCrossSellingOutput += `
                        <div class="wwo-price-amount">
                            ${offerItem.proposal.price.amount} &euro;
                        </div><!-- .wwo-price-amount -->
                `;
                listOfOffersCrossSellingOutput += `
                        <div class="wwo-disponibility-extract">
                            <div class="wwo-disponibility-range">
                                ${formatDateRange(
                                    offerItem.proposal.formattedDate,
                                    addDaysToDate(offerItem.proposal.formattedDate, offerItem.proposal.nbDays)
                                )}
                            </div><!-- .wwo-disponibility-range -->
                            <div class="wwo-disponibility-details">
                                <div class="wwo-date-range-description">
                                    <span class="wwo-details wwo-number-of-days">
                                        ${offerItem.proposal.nbDays} ${wwo_strings.nights}
                                    </span>
                                    <span class="wwo-details wwo-number-of-adults">
                                        ${offerItem.acfItem['offer-number-of-adults']} ${wwo_strings.adults}
                                    </span>
                                    ${offerItem.acfItem['offer-children'].length ? `
                                        <span class="wwo-details wwo-number-of-adults">
                                            ${offerItem.acfItem['offer-children'].length} ${wwo_strings.children}
                                        </span>
                                    ` : ''}
                                </div><!-- .wwo-date-range-description -->
                            </div><!-- .wwo-disponibility-details -->
                            <button 
                                class="wwo-offer-button-text" 
                                onclick="window.open('${proposalUrl}${offerItem.proposal.proposalKey}', '_blank', 'noopener noreferrer');">
                                    ${wwo_strings.seeOffer}
                            </button>
                        </div><!-- .wwo-disponibility-extract -->
                    </div><!-- .wwo-list-of-accommodations -->
                </li>
            `;
        });
        listOfOffersCrossSellingOutput += `
            </ul><!-- .wwo-list-of-offers -->
            <div class="wwo-open-close-disponibilities">
                <span class="wwo-more-offers active">${wwo_strings.moreOffers}</span>
                <span class="wwo-less-offers">${wwo_strings.lessOffers}</span>
            </div>
        </div><!-- .wwo-offers-list-section -->
        `;
    });

    return listOfOffersCrossSellingOutput;
}

module.exports = { getCrossSelling };