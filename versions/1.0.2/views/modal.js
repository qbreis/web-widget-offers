// versions/1.0.1/views/modal.js

const { getProposalsOffersArray } = require('../utils/proposalsOffersArray'); // Import the shared data module to retrieve the proposalsOffersArray.
const { getLanguageStrings } = require('../lang/languageManager');
const { getUpselling } = require('./upselling');
const { getCrossSelling } = require('./crossSelling');
// const { getCrossSellingOld } = require('./crossSellingOld');
const { buildModalHtml } = require('./buildModalHtml');
const { getOptionsOffers } = require('../utils/optionsOffers');
const { buildImageGalleryHtml, buildAccommodationDetailsHtml } = require('../utils/utils');

const debugModal = 0;
if (debugModal) console.log('debugModal is set to 1');

const initModal = () => {
    if (debugModal) console.log('Initializing modal.js');

    // Inject the modal HTML into the body
    const modalHtml = `
        <div id="wwo-modal" class="wwo-modal">
            <div class="wwo-modal-content">
                <span class="wwo-modal-close">&times;</span>
                <div id="wwo-modal-container">
                    <p>Modal content goes here...</p>
                </div><!-- #wwo-modal-container -->
            </div><!-- .wwo-modal-content -->
        </div><!-- #wwo-modal -->
    `;
    document.body.insertAdjacentHTML('beforeend', modalHtml);

    const wwoSingleElement = document.querySelectorAll('.wwo-single-element');
    const modalElement = document.getElementById('wwo-modal');
    const closeButton = document.querySelector('.wwo-modal-close');

    if (!modalElement) {
        console.error('Element with id wwo-modal not found.');
        return;
    }
    if (!closeButton) {
        console.error('Element with class wwo-modal-close not found.');
        return;
    }

    wwoSingleElement.forEach((item) => {
        item.addEventListener('click', () => handleItemClick(item));
    });

    modalElement.addEventListener('click', (event) => handleModalClick(event, modalElement));
    closeButton.addEventListener('click', () => closeModal(modalElement));
};

const handleItemClick = (item) => {

    const itemDataSet = item.dataset;
    logDebugData(itemDataSet);

    const widgetOptions = getOptionsOffers();
    const widgetDisplayOptions = widgetOptions.display || false;
    if(debugModal) console.log('widgetDisplayOptions:', widgetDisplayOptions);
    const widgetDisplayUpsellingOptions = widgetDisplayOptions?.upselling || false;
    const widgetDisplayCrossSellingOptions = widgetDisplayOptions?.crossSelling || false;
    if(debugModal) console.log('widgetDisplayCrossSellingOptions:', widgetDisplayCrossSellingOptions);
    if(debugModal) console.log('widgetOptions:', widgetOptions);

    const proposalsOffersArray = getProposalsOffersArray();
    if (debugModal) console.log('proposalsOffersArray:', proposalsOffersArray);

    // console.log('proposalsOffersArray:', proposalsOffersArray);

    const selectedOffer = findSelectedOffer(proposalsOffersArray, itemDataSet);
    if (!selectedOffer) return;

    const wwo_strings = getLanguageStrings();
    if (!wwo_strings) {
        console.error('Failed to get language strings in graphql/graphql');
        return;
    }
    let htmlBuffer = buildModalHtml(selectedOffer, wwo_strings);

    if(widgetDisplayUpsellingOptions.active) {
        htmlBuffer += getUpselling(proposalsOffersArray, itemDataSet, selectedOffer, wwo_strings, widgetDisplayUpsellingOptions, widgetOptions.proposalUrl);
    }
    if(widgetDisplayCrossSellingOptions.active) {
        htmlBuffer += getCrossSelling(proposalsOffersArray, selectedOffer, wwo_strings, widgetDisplayCrossSellingOptions, widgetOptions.proposalUrl);
        // htmlBuffer += getCrossSellingOld(proposalsOffersArray, selectedOffer, wwo_strings, widgetDisplayCrossSellingOptions, widgetOptions.proposalUrl);
    }

    document.getElementById('wwo-modal-container').innerHTML = htmlBuffer;
    document.getElementById('wwo-modal').classList.toggle('wwo-active');

    // TODO: Move following code to a separate file and import it where needed as it has nothing to do directly with "modal" functionality but with "offers" functionality PLUS refactor function itself couple o times...
    // Attach event listeners for the toggle buttons and the title
    const toggleButtons = document.querySelectorAll('.wwo-open-close-disponibilities');
    // Add event listeners to toggle buttons
    toggleButtons.forEach(button => {
        button.addEventListener('click', handleToggleOffersList);
    });

    const toggleTitles = document.querySelectorAll('.wwo-offers-togle-title');
    // Add event listeners to toggle titles
    toggleTitles.forEach(title => {
        title.addEventListener('click', handleToggleOffersList);
    });

    const toggleAccommodationMoreInfo = document.querySelectorAll('.wwo-show-accommodation-details');
    // Add event listeners to accommodation more info buttons
    toggleAccommodationMoreInfo.forEach(title => {
        title.addEventListener('click', handleToggleAccommodationMoreInfo);
    });







    // Function to toggle accommodation more info
    function handleToggleAccommodationMoreInfo(event) {
        // console.log('Toggle accommodation more info');
        if (debugModal) console.log('accommodation code is... ', event.currentTarget.dataset.accommodationCode);
        if (debugModal) console.log('proposalsOffersArray', proposalsOffersArray);


        // Find the first matching accommodation in proposalsOffersArray with acf_ws_accommodation_code === the clicked accommodation code (event.currentTarget.dataset.accommodationCode)
        const firstMatchingAccommodation = proposalsOffersArray.flatMap(offer => 
            offer.accommodation
        ).find(accommodation => 
            accommodation.acf_ws_accommodation_code === event.currentTarget.dataset.accommodationCode
        );
        
        if (debugModal) console.log('firstMatchingAccommodation', firstMatchingAccommodation);

        // Select the existing <div> with class "wwo-modal-content"
        //var container = document.querySelector('.wwo-modal-content');
        var container = document.getElementById('wwo-modal');

        // Create a new <div> element
        var newDiv = document.createElement('div');
        newDiv.id = 'accommodation-details';

        newDiv.innerHTML = `
            <div class="wwo-modal-content">
                <span class="wwo-modal-close wwo-modal-accommodation-details">&times;</span>
                <div class="wwo-room-type-info">
                    <div class="wwo-wrapper">
                        <h2>
                            ${firstMatchingAccommodation.post_title}
                            <span class="wwo-accommodation-code"> (${firstMatchingAccommodation.acf_ws_accommodation_code})</span>
                        </h2>
                        <ul class="wwo-accommodation-details">
                            <li class="wwo-size">${firstMatchingAccommodation.acf_ws_accommodation_size_area} ${wwo_strings['square-meters']}</li>
                            <li class="wwo-capacity">${firstMatchingAccommodation.acf_ws_accommodation_nb_beds} ${wwo_strings['beds']}</li>
                            <li class="wwo-beds">${firstMatchingAccommodation.acf_ws_accommodation_pax_max} ${wwo_strings['people-max']}</li>
                        </ul>
                        ${buildImageGalleryHtml(firstMatchingAccommodation.acf_accommodation_image_gallery)}
                    </div><!-- .wwo-wrapper -->
                </div><!-- .wwo-room-type-info -->
                <div class="wwo-room-type-description-visible">
                    ${buildAccommodationDetailsHtml(firstMatchingAccommodation.acf_accommodation_details)}
                </div><!-- .wwo-room-type-description-visible -->
            </div><!-- .wwo-modal-content -->
        `;

        //  Append the new <div> to the existing <div>
        if (container) { // Check if the container exists
            container.appendChild(newDiv);
            const modalAccommodationDetailsClose = document.querySelectorAll('.wwo-modal-close.wwo-modal-accommodation-details');
            modalAccommodationDetailsClose.forEach(button => {
                button.addEventListener('click', handleModalAccommodationDetailsClose);
            });
            function handleModalAccommodationDetailsClose(event) {
                var divToRemove = document.getElementById('accommodation-details');
                if (divToRemove) {
                    divToRemove.remove(); // This removes the element from the DOM
                } else {
                    console.error('Element with id "accommodation-details" not found.');
                }
            }
        } else {
            console.error('Container with class "wwo-modal-content" not found.');
        }

    }

    // Function to toggle offers list
    function handleToggleOffersList(event) {
        let container;
        let moreOffersBtn;
        let lessOffersBtn;

        // Check if the clicked element is a title
        if (event.currentTarget.classList.contains('wwo-offers-togle-title')) {
            // Find the closest `.wwo-list-of-offers` after the title
            container = event.currentTarget.nextElementSibling;
            // Find the `.wwo-open-close-disponibilities` inside the title
            moreOffersBtn = event.currentTarget.querySelector('.wwo-more-offers');
            lessOffersBtn = event.currentTarget.querySelector('.wwo-less-offers');

            container.nextElementSibling.querySelector('.wwo-more-offers').classList.toggle('active');
            container.nextElementSibling.querySelector('.wwo-less-offers').classList.toggle('active');
        } else {
            // console.log('Click on more!!!');
            // If not a title, find the previous sibling which should be `.wwo-list-of-offers`
            container = event.currentTarget.previousElementSibling;
            moreOffersBtn = event.currentTarget.querySelector('.wwo-more-offers');
            lessOffersBtn = event.currentTarget.querySelector('.wwo-less-offers');

            container.previousElementSibling.querySelector('.wwo-more-offers').classList.toggle('active');
            container.previousElementSibling.querySelector('.wwo-less-offers').classList.toggle('active');
        }

        // If the container is not found, exit the function
        if (!container) {
            console.error('Container element not found.');
            return;
        }

        // Get all the <li> elements within this container
        const listItems = container.querySelectorAll('.offer-item');

        // Loop through each <li> element
        listItems.forEach((item, index) => {
            if (index === 0) {
                // Always keep the first <li> active
                item.classList.add('active');
            } else {
                // Toggle the 'active' class for other <li> elements
                item.classList.toggle('active');
            }
        });

        // Toggle the visibility of more/less offers buttons
        if (moreOffersBtn && lessOffersBtn) {
            moreOffersBtn.classList.toggle('active');
            lessOffersBtn.classList.toggle('active');
        }
    }

    document.querySelectorAll('.wwo-room-type-proposal-switch').forEach(button => {
        button.addEventListener('click', handleToggleRoomTypeProposal);
    });
    function handleToggleRoomTypeProposal(event) {
        // console.log('Toggle room type proposal');
        document.querySelectorAll('.wwo-room-type-proposal').forEach(element => {
            element.classList.remove('active');

            // Select the corresponding .wwo-room-type-proposal element
            const proposalElement = document.querySelector(
                `.wwo-room-type-proposal[data-accommodation-code="${event.currentTarget.dataset.accommodationCode}"]`
            );
            // Add the 'active' class to the selected element
            if (proposalElement) {
                proposalElement.classList.add('active');
            }
        });
    }

    document.querySelectorAll('.wwo-room-type-description-switch').forEach(button => {
        button.addEventListener('click', handleToggleRoomTypeDescription);
    });
    function handleToggleRoomTypeDescription(event) {
        // console.log('Toggle handleToggleRoomTypeDescription');

        // Find the closest .wwo-room-type-description element to the clicked button
        const descriptionElement = event.currentTarget.closest('.wwo-room-type-description-toggle').previousElementSibling;

        if (descriptionElement) {
            // Toggle the 'active' class on the .wwo-room-type-description element
            descriptionElement.classList.toggle('active');
        }

        // Toggle the button text between "Plus d'infos" and "Moins d'infos"
        const button = event.currentTarget;
        if (descriptionElement.classList.contains('active')) {
            button.textContent = wwo_strings['less-info'];
        } else {
            button.textContent = wwo_strings['more-info'];
        }

    }

};

const handleModalClick = (event, modalElement) => {
    if (event.target === modalElement) {

        /* check if there is accommodation-details div */
        var divToRemove = document.getElementById('accommodation-details');
        if (divToRemove) {
            divToRemove.remove(); // This removes the element from the DOM
        } else {
            modalElement.classList.remove('wwo-active');
        }
    }
};

const closeModal = (modalElement) => {
    modalElement.classList.remove('wwo-active');
};

const logDebugData = (itemDataSet) => {
    if (debugModal) {
        console.log(`Dataset Proposal Key: ${itemDataSet.proposalKey}`);
        console.log(`Dataset method: ${itemDataSet.method}`);
        console.log(`Dataset offerId: ${itemDataSet.offerId}`);
    }
};

const findSelectedOffer = (proposalsOffersArray, itemDataSet) => {
    const filteredOffers = proposalsOffersArray.filter(offer => offer.method === itemDataSet.method);
    if (debugModal) console.log('Filtered Offers:', filteredOffers);

    const selectedOffer = filteredOffers.find(offer => 
        offer.proposal.proposalKey === itemDataSet.proposalKey &&
        offer.method === itemDataSet.method &&
        String(offer.offer.ID) === String(itemDataSet.offerId)
    );

    if (debugModal) console.log('Selected Offer:', selectedOffer);
    return selectedOffer;
};

module.exports = { initModal };