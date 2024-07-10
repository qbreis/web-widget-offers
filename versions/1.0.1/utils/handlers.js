// handlers.js: Contains functions for data handling and processing functions

const { convertDateFormat } = require('./utils.js');

// Function to build the proposals query string dynamically
const buildProposalsQuery = (sessionName, endpointData) => {
    let returnProposalsQuery = "";
    endpointData.forEach((item, key) => {
        console.log('-----'+key, item);
        item.acf_data.forEach((acf, key2) => {
            console.log('ACF Data for', item.get_the_title, ':', acf);

            // Example action: Log the start and end dates
            console.log('Offer Start Date:', convertDateFormat(acf['offer-date-start'])); // 01/08/2024
            console.log('Offer End Date:', acf['offer-date-end']);
            console.log('Number of Days:', acf['offer-number-of-days']);

            console.log('item.propertyIds: ', item.propertyIds);

            const nbDays = acf['offer-number-of-days'] || 2;
            const startDate = convertDateFormat(acf['offer-date-start']);
            const nbAdults = 2;
            // item.propertyIds is something like ["1", "2", "3"] we want [1, 2, 3]
            const propertyIds = item.propertyIds.map(Number) || [];

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
/*
            returnProposalsQuery += `
                query getProposalsQuery {
                    proposalsSearch: getProposals(
                        session: { name: "${sessionName}" }
                        input: {
                            criterias: {
                                nbDays: ${nbDays},
                                startDate: "${startDate}",
                                nbAdults: ${nbAdults},
                                propertyIds: ${JSON.stringify(propertyIds)},
                                nbChildren1: ${nbChildren1},
                                nbChildren2: ${nbChildren2},
                                maxResults: ${maxResults},
                                childrenBirthdate: ${JSON.stringify(childrenBirthdate)}
                            }
                        }
                    ) {
                        proposals: proposals {
                            propertyId,
                            proposalKey,
                            price {
                                amount,
                                currencyCode
                            },
                            productOption {
                                code,
                                label
                            },
                            distribution {
                                roomTypes {
                                    code,
                                    propertyId,
                                    categoryCode,
                                    categoryLabel,
                                    label,
                                    webLabel,
                                    paxMax,
                                    pax,
                                    quantity
                                },
                                roomNumbers
                            },
                            nbDays
                        }
                    }
                },
            `;
*/






        });
        
    });

    console.log(`
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





















/*
const buildProposalsQuery = (sessionName, endpointData) => {
    let returnProposalsQuery = "";
    endpointData.forEach((item, key) => {
        item.acf_data.forEach((acf, key2) => {
            const nbDays = acf['offer-number-of-days'] || 2;
            const startDate = convertDateFormat(acf['offer-date-start']);
            const nbAdults = 2;
            const propertyIds = item.propertyIds.map(Number) || [];

            returnProposalsQuery += `
                method_${key}_${key2}: getProposals(
                    session: { name: "${sessionName}" }
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
                        proposalKey
                        price {
                            amount
                            currencyCode
                        }
                        nbDays
                    }
                },
            `;
        });
    });

    return `query getProposal111{ ${returnProposalsQuery} }`;
};
*/

module.exports = { buildProposalsQuery };