// utils/proposalsTransform.js

const { removeDuplicates, filterOffersBySeason } = require('./filter');
const transformData = require('./transformData');
const getRooms = require('./getRooms');

const debugProposalsTransform = 0;
if(debugProposalsTransform) console.log('debugProposalsTransform is set to 1');

const proposalsTransform = (proposalsData, endpointData, options) => {
    const transformedData = transformData(proposalsData.data);
    const thisProposalsOffersArray = [];
    if (debugProposalsTransform) console.log('transformedData', transformedData);
    if (debugProposalsTransform) console.log('endpointData', endpointData);
    endpointData.forEach(thisOffer => {
        if (debugProposalsTransform) console.log('thisOffer:', thisOffer);
        thisOffer.acf_data.forEach((acfItem, acfIndex) => {
            for (const key in transformedData) {
                if (transformedData.hasOwnProperty(key)) {
                    transformedData[key].proposals.forEach(proposal => {
                        if (debugProposalsTransform) console.log('proposal', proposal);
                        if (debugProposalsTransform) console.log('proposal.distribution[\'roomTypes\'][0]', proposal.distribution['roomTypes'][0]);
                        if (debugProposalsTransform) console.log('proposal.distribution[\'roomTypes\'][0].code', proposal.distribution['roomTypes'][0].code);
                        let accommodations = getRooms(proposal, thisOffer.acf_data[0].offers_establishments);
                        const combinedObject = {
                            offer: thisOffer,
                            acfItem: acfItem,
                            method: key,
                            proposal: proposal,
                            accommodation: accommodations,
                        };
                        if (debugProposalsTransform) console.log('add combinedObject:', combinedObject);
                        thisProposalsOffersArray.push(combinedObject);
                    });
                }
            }
        });
    });
    if (debugProposalsTransform) console.log('thisProposalsOffersArray:', thisProposalsOffersArray);

    if (debugProposalsTransform) console.log('returning removeDuplicates',
        removeDuplicates(
            filterOffersBySeason(
                thisProposalsOffersArray, 
                options.season ? options.season : 'both'
            )
        )
    )

    return removeDuplicates(
        filterOffersBySeason(
            thisProposalsOffersArray, 
            options.season ? options.season : 'both'
        )
    );
};

module.exports = { 
    proposalsTransform
};
