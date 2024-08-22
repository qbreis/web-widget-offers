// sharedData.js

const { markLowestPriceOffers } = require('../utils/filter');

/*
To access the proposalsOffersArray in the modal.js component when an element is clicked, you'll need to make proposalsOffersArray available to modal.js. There are a few ways to achieve this:

    - Using a global variable: This is the simplest but least recommended way because it can lead to potential issues with global state.

    - Passing data via a shared service/module: This is a better approach where you use a shared service or module to store and retrieve data.

    - Event-driven approach: Emitting events and passing data through event listeners.

Here's an example of how you can use a shared service/module to store and retrieve the proposalsOffersArray:
*/

let proposalsOffersArray = [];

const setProposalsOffersArray = (data) => {

    proposalsOffersArray = markLowestPriceOffers(data);
};

const getProposalsOffersArray = () => {
    return proposalsOffersArray;
};

module.exports = {
    setProposalsOffersArray,
    getProposalsOffersArray
};
