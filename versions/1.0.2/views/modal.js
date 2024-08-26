// versions/1.0.1/views/modal.js

const { getProposalsOffersArray } = require('../utils/proposalsOffersArray'); // Import the shared data module to retrieve the proposalsOffersArray.
const { getLanguageStrings } = require('../lang/languageManager');
const { getUpselling } = require('./upselling');
const { getCrossSelling } = require('./crossSelling');
// const { getCrossSellingOld } = require('./crossSellingOld');
const { buildModalHtml } = require('./buildModalHtml');
const { getOptionsOffers } = require('../utils/optionsOffers');

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
    const toggleTitles = document.querySelectorAll('.wwo-offers-togle-title');

    // Add event listeners to toggle buttons
    toggleButtons.forEach(button => {
        button.addEventListener('click', handleToggleOffersList);
    });

    // Add event listeners to toggle titles
    toggleTitles.forEach(title => {
        title.addEventListener('click', handleToggleOffersList);
    });

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
        modalElement.classList.remove('wwo-active');
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

// TODO: I can move this function to separate file and import it where needed as it has nothing to do directly with "modal" functionality but with "offers" functionality
/*
function handleToggleOffersList() {
    console.log('Toggle offers list');

    // Get the closest parent container of the clicked element
    const container = this.closest('.wwo-open-close-disponibilities').previousElementSibling;

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
    const moreOffersBtn = this.closest('.wwo-open-close-disponibilities').querySelector('.wwo-more-offers');
    const lessOffersBtn = this.closest('.wwo-open-close-disponibilities').querySelector('.wwo-less-offers');
    moreOffersBtn.classList.toggle('active');
    lessOffersBtn.classList.toggle('active');
}

// Ensure the function is available globally
window.handleToggleOffersList = handleToggleOffersList; // Expose the function to the global scope
*/









module.exports = { initModal };