// versions/1.0.1/views/modal.js

const { getProposalsOffersArray } = require('../utils/proposalsOffersArray'); // Import the shared data module to retrieve the proposalsOffersArray.
const { getLanguageStrings } = require('../lang/languageManager');
const { getUpselling } = require('./upselling');
const { getCrossSelling } = require('./crossSelling');
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
    }

    document.getElementById('wwo-modal-container').innerHTML = htmlBuffer;
    document.getElementById('wwo-modal').classList.toggle('wwo-active');
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

module.exports = { initModal };