// Function to remove duplicates
function removeDuplicates(proposals) {
    const uniqueProposals = new Map();

    proposals.forEach((item) => {
        const proposal = item.proposal;
        const key = `${proposal.proposalKey}-${proposal.propertyId}-${proposal.nbDays}-${proposal.price.amount}-${proposal.formattedDate}-${item.offer.acf_offers_season}`;
        if (!uniqueProposals.has(key)) {
            uniqueProposals.set(key, item);
        }
    });

    return Array.from(uniqueProposals.values());
}

function groupByLowestPrice(proposals) {
    const groupedProposals = new Map();

    proposals.forEach((item) => {
        const { proposal, offer } = item;
        const { propertyId, price } = proposal;
        const key = `${offer.ID}-${offer.acf_offers_season}-${propertyId}`;

        if (!groupedProposals.has(key)) {
            groupedProposals.set(key, item);
        } else {
            const currentLowest = groupedProposals.get(key);
            if (price.amount < currentLowest.proposal.price.amount) {
                groupedProposals.set(key, item);
            }
        }
    });

    return Array.from(groupedProposals.values());
}

module.exports = { 
    removeDuplicates, 
    groupByLowestPrice 
};