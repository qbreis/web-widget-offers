
let optionsOffers = [];

const setOptionsOffers = (data) => {

    optionsOffers = data;
};

const getOptionsOffers = () => {
    return optionsOffers;
};

module.exports = {
    setOptionsOffers,
    getOptionsOffers
};
