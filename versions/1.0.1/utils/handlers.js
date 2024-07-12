// handlers.js: Contains functions for data handling and processing functions

const debugHandlers = 0;
if(debugHandlers) console.log('debugHandlers is set to 1');

const { convertDateFormat } = require('./utils');

// Function to build the proposals query string dynamically
const buildProposalsQuery = (sessionName, endpointData) => {
    let returnProposalsQuery = "";
    if (debugHandlers) console.log('endpointData has one item for each offer in wp data base', endpointData);
    endpointData.forEach((item, key) => {
        if (debugHandlers) console.log(`-----${key} will create method_${key}_X`, item);
        item.acf_data.forEach((acf, key2) => {
            if (debugHandlers) console.log('ACF Data for', item.get_the_title, ':', acf);

            // Example action: Log the start and end dates
            if (debugHandlers) console.log('Offer Start Date:', convertDateFormat(acf['offer-date-start'])); // 01/08/2024
            if (debugHandlers) console.log('Offer End Date:', acf['offer-date-end']);
            if (debugHandlers) console.log('Number of Days:', acf['offer-number-of-days']);

            if (debugHandlers) console.log('item.propertyIds: ', item.propertyIds);

            const nbDays = acf['offer-number-of-days'] || 7;
            const startDate = convertDateFormat(acf['offer-date-start']);
            const nbAdults = 2;
            // item.propertyIds is something like ["1", "2", "3"] we want [1, 2, 3]
            // const propertyIds = item.propertyIds.map(Number) || [];
            // item.propertyIds is something like {"1", "2", "3"} we want {1, 2, 3}
            const propertyIds = Object.values(item.propertyIds).map(Number);

            // Extract necessary data from endpointData and construct the query string
            // This is a placeholder logic, adapt it to your actual data structure and requirements

            //const nbDays = endpointData.nbDays || 7;
            //const startDate = endpointData.startDate || "2024-07-12";
            //const nbAdults = endpointData.nbAdults || 2;
            //const nbChildren1 = endpointData.nbChildren1 || 3;
            //const nbChildren2 = endpointData.nbChildren2 || 1;
            //const maxResults = endpointData.maxResults || 300;
            //const childrenBirthdate = endpointData.childrenBirthdate || ["2020-07-12", "2020-07-12", "2020-07-12"];

            returnProposalsQuery += `
                method_${key}_${key2}: getProposals(
                    session: {
                        name: "${sessionName}"
                    }
                    input: {
                        criterias: {
                            nbDays: ${nbDays},
                            startDate: "${startDate}",
                            nbAdults: ${nbAdults},
                            propertyIds: ${JSON.stringify(propertyIds)},
                        } 
                    }
                ){
                    proposals: proposals {
                    propertyId
                    proposalKey,
                    price {
                        amount,
                        currencyCode
                    },
                    nbDays
                }
            },
        `;
        });
        
    });

    if (debugHandlers) console.log(`
            query getProposal111{
                ${returnProposalsQuery}
            }
        `);
    return `
            query getProposal111{
                ${returnProposalsQuery}
            }
        `;

};

const offersProposalsCombinations = (proposalsData, endpointData) => {
    // Initialize the combined data array
    const proposalsOffersArray = [];
    if (debugHandlers) console.log('proposalsData.data', proposalsData.data);
    // Iterate over endpointData
    let counter = 0;
    endpointData.forEach(thisOffer => {
        if (debugHandlers) console.log('thisOffer:', thisOffer.acf_data);
        // Iterate over acf_data within each offer
        thisOffer.acf_data.forEach((acfItem, acfIndex) => {

            if (debugHandlers) console.log('proposalsData.data '+counter, 
                proposalsData.data[
                    Object.keys(proposalsData.data)[counter]
                ]
            );
            // Create a combined object for each acfItem
            const combinedObject = {
                offer: thisOffer,
                acfItem: acfItem,
                proposals: proposalsData.data[
                    Object.keys(proposalsData.data)[counter]
                ]
            };

            // Push the combined object to the array
            proposalsOffersArray.push(combinedObject);
        });

        counter++;
    });
    if (debugHandlers) console.log('proposalsOffersArray:', proposalsOffersArray);
    return proposalsOffersArray;
};

const getOffersProposalsList = (proposalsOffersArray) => {
    const offersProposalsArray = [];
    proposalsOffersArray.forEach(item => {
        const offer = item.offer;
        const proposals = item.proposals.proposals;
        proposals.forEach(proposal => {
            const offerProposalPair = {
                offer: offer,
                acfItem: item.acfItem,
                proposal: {
                    propertyId: proposal.propertyId,
                    proposalKey: proposal.proposalKey,
                    price: {
                    amount: proposal.price.amount,
                    currencyCode: proposal.price.currencyCode
                    },
                    nbDays: proposal.nbDays
                }
            };
            offersProposalsArray.push(offerProposalPair);
        });
    });
    return offersProposalsArray;
};

module.exports = { buildProposalsQuery, offersProposalsCombinations, getOffersProposalsList };