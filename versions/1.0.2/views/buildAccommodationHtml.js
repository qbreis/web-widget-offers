const { getRoomsQuantity } = require('../utils/utils');
const { getOptionsOffers } = require('../utils/optionsOffers');

const buildAccommodationHtml = (item, disponibilityRange, selectedOffer, wwo_strings, numberOfChildrenDisplay, counter) => {
    // console.log('counter', counter);
    // console.log('selectedOffer', selectedOffer);
    const widgetOptions = getOptionsOffers();

    let quantity = getRoomsQuantity(selectedOffer.proposal.distribution.roomTypes, item.acf_ws_accommodation_code);

    

    /* Dev note: To print object in html insert this code in the returned template
    <pre>${JSON.stringify(selectedOffer.proposal.distribution, null, 2)}</pre>
    */

    /* Dev note: To see accommodation code insert this code in the returned template
    ${item.post_title} - ${item.acf_ws_accommodation_code}
    */
    
    // console.log('acf_accommodation_details: ', item.acf_accommodation_details);
    // console.log('acf_accommodation_image_gallery: ', item.acf_accommodation_image_gallery);

    let proposalsRoomsList = `
        <ul>
            ${selectedOffer.accommodation.map((itemRoom, index) => `
                <li>
                    <span 
                        class="
                        wwo-proposals-counter 
                        wwo-room-quantity-${getRoomsQuantity(selectedOffer.proposal.distribution.roomTypes, itemRoom.acf_ws_accommodation_code)}
                        ">
                        ${getRoomsQuantity(selectedOffer.proposal.distribution.roomTypes, itemRoom.acf_ws_accommodation_code)} x
                    </span>
                    ${itemRoom.post_title}
                    <span class="wwo-accommodation-code"> (${itemRoom.acf_ws_accommodation_code})</span>
                    ${
                        itemRoom.acf_ws_accommodation_code !== item.acf_ws_accommodation_code 
                        ? 
                        `
                        <button class="wwo-room-type-proposal-switch" data-accommodation-code="${itemRoom.acf_ws_accommodation_code}">
                            + info
                        </button>
                        ` 
                        : ''
                    }
                </li>
            `).join('')}
        </ul>
    `;

    return `
        <div class="wwo-room-type-proposal ${counter === 1 ? 'active' : ''}" data-accommodation-code="${item['acf_ws_accommodation_code']}">
            <div class="wwo-room-type-info">
                <div class="wwo-wrapper">
                    <h2>
                        <span class="wwo-proposals-counter wwo-room-quantity-${quantity}">
                            ${quantity} x
                        </span>
                        ${item.post_title}
                        <span class="wwo-accommodation-code"> (${item['acf_ws_accommodation_code']})</span>
                    </h2>
                    <ul class="wwo-accommodation-details">
                        <li class="wwo-size">${item.acf_ws_accommodation_size_area} ${wwo_strings['square-meters']}</li>
                        <li class="wwo-capacity">${item.acf_ws_accommodation_pax_max} ${wwo_strings['beds']}</li>
                        <li class="wwo-beds">${item.acf_ws_accommodation_nb_beds} ${wwo_strings['people-max']}</li>
                    </ul>
                    ${widgetOptions.display.modal.featuredImage ? `
                        <div class="wwo-accommodation-featured-image">
                            ${item.acf_featured_image ? `
                                <img src="${item.acf_featured_image.sizes['ud-thumb-500']}" alt="${item.acf_featured_image.alt}" width="200" height="200" />
                            ` : ''}
                        </div>
                    ` : ''}
                    ${widgetOptions.display.modal.imageGallery ? buildImageGalleryHtml(item.acf_accommodation_image_gallery) : ''}
                </div><!-- .wwo-wrapper -->
            </div><!-- .wwo-room-type-info -->
            <div class="wwo-room-type-data">
                <div class="wwo-wrapper">
                    <div class="wwo-my-selection-title">
                        ${wwo_strings.mySelection}
                    </div>
                    <div class="wwo-my-selection-room-title">

                        ${proposalsRoomsList}

                    </div>
                    <div class="wwo-disponibility-range">
                        ${disponibilityRange}
                    </div>
                    <div class="wwo-date-range-description">
                        <span class="wwo-details wwo-number-of-days">
                            ${selectedOffer.proposal.nbDays} ${wwo_strings.nights}
                        </span>
                        <span class="wwo-details wwo-number-of-adults">
                            ${selectedOffer.acfItem['offer-number-of-adults']} ${wwo_strings.adults}
                        </span>
                        ${numberOfChildrenDisplay ? `
                            <span class="wwo-details wwo-number-of-adults">
                                ${numberOfChildrenDisplay}
                            </span>
                        ` : ''}
                    </div>
                    ${selectedOffer.proposal.priceWithoutDiscount.amount !== selectedOffer.proposal.price.amount ? `
                        <div class="wwo-price-without-discount">
                            <span class="wwo-offer-price-amount">
                                ${selectedOffer.proposal.priceWithoutDiscount.amount}
                            </span> <span class="wwo-offer-price-currency">&euro;</span>
                        </div>
                    ` : ``}
                    <div class="wwo-price">
                        ${selectedOffer.proposal.price.amount} €
                    </div>
                    <button 
                        class="wwo-room-type-proposal-link"
                        onclick="window.open('${widgetOptions.proposalUrl}${selectedOffer.proposal.proposalKey}', '_blank')"
                        >
                        ${wwo_strings.seeOffer}
                    </button>
                </div><!-- .wwo-wrapper -->
            </div><!-- .wwo-room-type-data -->
            <div class="wwo-room-type-description">
                ${widgetOptions.display.modal.accommodationDetails ? buildAccommodationDetailsHtml(item.acf_accommodation_details) : ''}
            </div>
            <div class="wwo-room-type-description-toggle">
                <button class="wwo-room-type-description-switch">
                    ${wwo_strings['more-info']}
                </button>
            </div><!-- .wwo-room-type-description-toggle -->
        </div><!-- .wwo-room-type-proposal -->
    `;
};

const buildImageGalleryHtml = (imageGallery) => {
    if (!Array.isArray(imageGallery) || imageGallery.length === 0) {
        return '';
    }
    let codeHtml = '<ul class="wwo-image-gallery">';
    imageGallery.forEach((item) => {
        codeHtml += `<li><img src="${item.sizes['ud-thumb-500']}" alt="${item.alt || item.name}" width="200" height="200" /></li>`;
    });
    codeHtml += '</ul>';
    return codeHtml;
};

const buildAccommodationDetailsHtml = (details) => {
    if (!Array.isArray(details) || details.length === 0) {
        return '';
    }
    let codeHtml = '<ul class="wwo-accommodation-details-list">';
    details.forEach((item) => {
        codeHtml += `
            <li class="wwo-detail-type wwo-type-${item.tipo_de_detalle}">
                <span class="wwo-detail-type-name">${item.tipo_de_detalle}</span>
                <div class="wwo-details-description">
                    ${item.alojamiento_especificaciones_tecnicas_descripcion}
                </div>
            </li>
        `;
    });
    codeHtml += '</ul>';
    return codeHtml;
};


module.exports = { buildAccommodationHtml };