/**
 * Extracts unique categories from an array of proposal offers.
 * @param {Array} proposalsOffersArray - Array of proposal offers.
 * @returns {Array} Array of unique categories.
 */
const getUniqueCategories = (proposalsOffersArray) => {
    const uniqueCategories = new Set();
    proposalsOffersArray.forEach((item) => {
        item.offer.offers_categories.forEach((category) => {
            uniqueCategories.add(JSON.stringify(category));
        });
    });
    return Array.from(uniqueCategories).map(category => JSON.parse(category));
};

module.exports = { getUniqueCategories };