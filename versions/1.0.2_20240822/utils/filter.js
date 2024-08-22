const debugFilter = 0;
if(debugFilter) console.log('debugFilter is set to 1');

// Function to remove duplicates
function removeDuplicates(proposals) {
    const uniqueProposals = new Map();

    proposals.forEach((item) => {
        const proposal = item.proposal;
        //const key = `${proposal.proposalKey}-${proposal.propertyId}-${proposal.nbDays}-${proposal.price.amount}-${proposal.formattedDate}-${item.offer.acf_offers_season}`;
        const key = `${proposal.proposalKey}-${proposal.propertyId}-${proposal.nbDays}-${proposal.price.amount}-${proposal.formattedDate}-${item.offer.acf_offers_season}-${item.offer.ID}`;
        if (!uniqueProposals.has(key)) {
            uniqueProposals.set(key, item);
        }
    });

    return Array.from(uniqueProposals.values());
}

function filterOffersBySeason(offers, optionsSeason) {
    if(debugFilter) console.log('offers:', offers);
    if(debugFilter) console.log('optionsSeason:', optionsSeason);
    return offers.filter(offer => {
        // Show all offers if optionsSeason is 'both'
        if (optionsSeason === 'both') {
            return true;
        }
        // Include offers where season is 'both' or matches the specified season
        return offer.offer.acf_offers_season === 'both' || offer.offer.acf_offers_season === optionsSeason;
    });
}

const getPropertyForProposal = (item) => {
    if(debugFilter) console.log('item in getPropertyForProposal function:', item, 'there are '+item.acfItem.offers_establishments.length+' offers_establishments');
    for (const property of item.acfItem.offers_establishments) {
        if(debugFilter) console.log('property.ws_establishment_id:', Number(property.ws_establishment_id), Number(item.proposal.propertyId));

        if (Number(property.ws_establishment_id) === Number(item.proposal.propertyId)) {
            return property;
        }
    }
    if(debugFilter) console.log('No property with ws_establishment_id = '+item.proposal.propertyId+' found for proposal:', item.proposal);
    return null;
};

function markLowestPriceOffers(offers) {
    // Step 1: Group offers by propertyId and offer.post_name
    const groupedOffers = offers.reduce((acc, offer) => {
        // const key = `${offer.method}_${offer.proposal.propertyId}_${offer.offer.post_name}`;
        const key = `${offer.proposal.propertyId}_${offer.offer.post_name}`;
        if (!acc[key]) {
            acc[key] = [];
        }
        acc[key].push(offer);
        return acc;
    }, {});
  
    // Step 2: Iterate over each group to find the minimum price and mark the lowest price offer
    for (const key in groupedOffers) {
        const group = groupedOffers[key];
        const minPrice = Math.min(...group.map(offer => offer.proposal.price.amount));
    
        let lowestPriceMarked = false;
    
        group.forEach(offer => {
            if (offer.proposal.price.amount === minPrice && !lowestPriceMarked) {
                offer["lowest-price"] = true;
                lowestPriceMarked = true;
            } else {
                offer["lowest-price"] = false;
            }
        });
    }
  
    return offers;
  }

module.exports = { 
    removeDuplicates, 
    filterOffersBySeason,
    getPropertyForProposal,
    markLowestPriceOffers
};