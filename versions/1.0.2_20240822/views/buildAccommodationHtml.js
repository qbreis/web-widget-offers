const { getRoomsQuantity } = require('../utils/utils');

const buildAccommodationHtml = (item, disponibilityRange, selectedOffer, wwo_strings, numberOfChildrenDisplay) => {

    let quantity = getRoomsQuantity(selectedOffer.proposal.distribution.roomTypes, item.acf_ws_accommodation_code);

    /* Dev note: To print object in html insert this code in the returned template
    <pre>${JSON.stringify(selectedOffer.proposal.distribution, null, 2)}</pre>
    */

    /* Dev note: To see accommodation code insert this code in the returned template
    ${item.post_title} - ${item.acf_ws_accommodation_code}
    */
    return `
        <div class="wwo-room-type-proposal">
            <h2>
                <span class="wwo-proposals-counter wwo-room-quantity-${quantity}">
                    ${quantity} x
                </span>
                ${item.post_title}
            </h2>
            <div class="wwo-disponibility-range">
                ${disponibilityRange}
            </div>
            <ul class="wwo-accommodation-details">
                <li class="wwo-capacity">${item.acf_ws_accommodation_pax_max} ${wwo_strings['beds']}</li>
                <li class="wwo-beds">${item.acf_ws_accommodation_nb_beds} ${wwo_strings['people-max']}</li>
                <li class="wwo-size">${item.acf_ws_accommodation_size_area} ${wwo_strings['square-meters']}</li>
            </ul>
            <div class="wwo-price">
                ${selectedOffer.proposal.price.amount} €
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
            <div class="wwo-accommodation-featured-image">
                <img src="${item.acf_featured_image.sizes['ud-thumb-500']}" alt="${item.acf_featured_image.alt}" width="200" height="200" />
            </div>
        </div>
    `;
};

module.exports = { buildAccommodationHtml };