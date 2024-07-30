// versions/1.0.1/views/modal.js

const { getProposalsOffersArray } = require('../utils/proposalsOffersArray'); // Import the shared data module to retrieve the proposalsOffersArray.
const { getLanguageStrings } = require('../lang/languageManager');
const { formatDateRange, addDaysToDate } = require('../utils/utils');
const { getPropertyForProposal } = require('../utils/filter');

const debugModal = 0;
if(debugModal) console.log('debugModal is set to 1');

const initModal = () => {
    if(debugModal) console.log('Initializing modal.js');
    const wwoSingleElement = document.querySelectorAll('.wwo-single-element');
    const modalElement = document.getElementById('wwo-modal');
    const closeButton = document.querySelector('.wwo-modal-close');
    wwoSingleElement.forEach((item, index) => {
        item.addEventListener('click', () => {
            const itemDataSet = item.dataset;
            if(debugModal) console.log(`Proposal Key: ${itemDataSet.proposalKey}`);
            if(debugModal) console.log(`method: ${itemDataSet.method}`);

            const proposalsOffersArray = getProposalsOffersArray();
            if(debugModal) console.log('proposalsOffersArray:', proposalsOffersArray);

            // Filter the proposalsOffersArray based on the method
            const filteredOffers = proposalsOffersArray.filter(offer => offer.method === itemDataSet.method);
            if (debugModal) console.log('Filtered Offers:', filteredOffers);

            // Find the offer with the matching proposalKey
            const selectedOffer = filteredOffers.find(offer => offer.proposal.proposalKey === itemDataSet.proposalKey);
            if (debugModal) console.log('Selected Offer:', selectedOffer);

            if (debugModal) console.log('selectedOffer.proposal.distribution:', selectedOffer.proposal.distribution);

            if (debugModal) console.log('price is ' + selectedOffer.proposal.price.amount);

            if (debugModal) console.log('proposalKey is ' + selectedOffer.proposal.proposalKey);

            if (debugModal) console.log('formattedDate is ' + selectedOffer.proposal.formattedDate);
            if (debugModal) console.log('nbDays is ' + selectedOffer.proposal.nbDays);

            if (debugModal) console.log('propertyId is ' + selectedOffer.proposal.propertyId);

            const disponibilityRange = formatDateRange(
                selectedOffer.proposal.formattedDate,
                addDaysToDate(selectedOffer.proposal.formattedDate, selectedOffer.proposal.nbDays)
            );
            console.log('disponibilityRange:', disponibilityRange);

            const wwo_strings = getLanguageStrings();
            if (!wwo_strings) {
                console.error('Failed to get language strings in graphql/graphql');
                return;
            }



            let htmlBuffer = '';





            
            const thisProperty = getPropertyForProposal(selectedOffer);
            console.log('thisProperty:', thisProperty);
            console.log('acf_featured_image:', thisProperty.acf_featured_image);
            
            htmlBuffer += `
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
                        <span class="wwo-number-of-days">
                            ${selectedOffer.proposal.nbDays} ${wwo_strings.nights}
                        </span>
                    </div>
                </div><!-- .wwo-establishment-proposal -->
                `;



            
            selectedOffer.accommodation.forEach((item) => {
                if (debugModal) console.log('item', item);
                htmlBuffer += `
                <div class="wwo-room-type-proposal">
                    <h2>
                        <span class="wwo-proposals-counter wwo-room-quantity-${item.roomQuantity}">
                            ${item.roomQuantity} x
                        </span>
                        ${item.post_title}
                    </h2>
                    <div class="wwo-disponibility-range">
                        ${disponibilityRange}
                    </div>
                    <ul class="wwo-accommodation-details">
                        <li class="wwo-capacity">${item.webservice.ws_accommodation_pax_max} ${wwo_strings['beds']}</li>
                        <li class="wwo-beds">${item.webservice.ws_accommodation_nb_beds} ${wwo_strings['people-max']}</li>
                        <li class="wwo-size">${item.webservice.ws_accommodation_size_area} ${wwo_strings['square-meters']}</li>
                    </ul>
                    <div class="wwo-price">
                        ${selectedOffer.proposal.price.amount} €
                        <span class="wwo-number-of-days">${selectedOffer.proposal.nbDays} ${wwo_strings.nights}</span>
                    </div>
                    <div class="wwo-accommodation-featured-image">
                        <img src="${item.acf_featured_image.sizes['ud-thumb-500']}" alt="${item.acf_featured_image.alt}" width="200" height="200" />
                    </div>
                </div>
                `;
            });
            // Display the selected offer in the modal
            document.getElementById('wwo-modal-container').innerHTML = htmlBuffer;




            // Show the modal by adding the wwo-active class
            if (modalElement) {
                modalElement.classList.toggle('wwo-active');
            } else {
                console.error('Element with id wwo-modal not found.');
            }
        });
    });

    // Add event listener to the modal element to close it when clicking outside the modal content
    if (modalElement) {
        modalElement.addEventListener('click', (event) => {
            // Check if the clicked element is the modal itself and not the modal content
            if (event.target === modalElement) {
                modalElement.classList.remove('wwo-active');
            }
        });
    } else {
        console.error('Element with id wwo-modal not found.');
    }

    // Add event listener to the close button to close the modal when clicked
    if (closeButton) {
        closeButton.addEventListener('click', () => {
            modalElement.classList.remove('wwo-active');
        });
    } else {
        console.error('Element with class wwo-modal-close not found.');
    }
};

module.exports = { initModal };
