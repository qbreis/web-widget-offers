const debugProposalsTransform = 0;
if(debugProposalsTransform) console.log('debugProposalsTransform is set to 1');

const { removeDuplicates, groupByLowestPric, filterOffersBySeason } = require('./filter');

const proposalsTransform = (proposalsData, endpointData, options) => {

    const transformData = (data) => {
        const transformedData = {};
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                const dateMatch = key.match(/(\d{2}_\d{2}_\d{4})/);
                if (dateMatch) {
                    const formattedDate = dateMatch[1].replace(/_/g, '/');
                    const proposals = data[key].proposals.map(proposal => {
                        return {
                            ...proposal,
                            formattedDate: formattedDate
                        };
                    });
                    transformedData[key] = { proposals };
                }
            }
        }
        return transformedData;
    };
    const transformedData = transformData(proposalsData.data);
    const thisProposalsOffersArray = [];
    if (debugProposalsTransform) console.log('transformedData', transformedData);
    if (debugProposalsTransform) console.log('endpointData', endpointData);
    endpointData.forEach(thisOffer => {
        if (debugProposalsTransform) console.log('thisOffer:', thisOffer.acf_data);
        thisOffer.acf_data.forEach((acfItem, acfIndex) => {
            for (const key in transformedData) {
                if (transformedData.hasOwnProperty(key)) {
                    transformedData[key].proposals.forEach(proposal => {
                        const combinedObject = {
                            offer: thisOffer,
                            acfItem: acfItem,
                            method: key,
                            proposal: proposal,
                        };
                        thisProposalsOffersArray.push(combinedObject);
                    });
                }
            }
        });
    });
    if (debugProposalsTransform) console.log('thisProposalsOffersArray:', thisProposalsOffersArray);
    

    // const uniqueProposals = removeDuplicates(thisProposalsOffersArray);

    // return thisProposalsOffersArray;
    // return removeDuplicates(thisProposalsOffersArray);
    
    

    /*
    return groupByLowestPrice(
        removeDuplicates(thisProposalsOffersArray)
    );
    */


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