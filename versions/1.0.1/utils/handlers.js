// handlers.js: Contains functions for data handling and processing functions

const debugHandlers = 0;
if(debugHandlers) console.log('debugHandlers is set to 1');

const { convertDateFormat } = require('./utils');

// Function to build the proposals query string dynamically
const buildProposalsQuery = (sessionName, endpointData) => {
    let returnProposalsQuery = "";
    let this_returnProposalsQuery = "";
    if (debugHandlers) console.log('endpointData has one item for each offer in wp data base', endpointData);
    endpointData.forEach((item, key) => {
        if (debugHandlers) console.log(`-----${key} will create method_${key}_X`, item);
        item.acf_data.forEach((acf, key2) => {
            if (debugHandlers) console.log('ACF Data for', item.get_the_title, ':', acf);

            // Example action: Log the start and end dates
            // if (debugHandlers) console.log('Offer Start Date:', convertDateFormat(acf['offer-date-start'])); // 01/08/2024
            // if (debugHandlers) console.log('Offer End Date:', acf['offer-date-end']);
            // if (debugHandlers) console.log('Number of Days:', acf['offer-number-of-days']);
            // if (debugHandlers) console.log('Day of week:', acf['offer-day-of-week']);

            // if (debugHandlers) console.log('item.propertyIds: ', item.propertyIds);

            // To loop between the given start and end dates inclusive, starting with the specified day of the week ("0" which corresponds to Sunday)
            // Initialize the date strings and day of week
            let offerDateStart = convertDateFormat(acf['offer-date-start']);
            let offerDateEnd = convertDateFormat(acf['offer-date-end']);
            let offerDayOfWeek = parseInt(acf['offer-day-of-week'], 10);
            // Parse the date strings into Date objects
            let thisStartDate = new Date(offerDateStart.split('/').reverse().join('-'));
            let thisEndDate = new Date(offerDateEnd.split('/').reverse().join('-'));
            // Create an array to store the matching dates
            let matchingDates = [];
            while (thisStartDate.getDay() !== offerDayOfWeek) {
                if (debugHandlers) console.log('thisStartDate.getDay(): '+thisStartDate.getDay(), offerDayOfWeek);

                if (typeof offerDayOfWeek !== 'number' || offerDayOfWeek < 0 || offerDayOfWeek > 6) {
                    console.error('offerDayOfWeek is not a valid day of the week. It should be an integer between 0 and 6, and type number, which now it is typeof '+typeof offerDayOfWeek+' and value '+offerDayOfWeek);
                    break;
                }
                thisStartDate.setDate(thisStartDate.getDate() + 1);
            }
            if (debugHandlers) console.log('First date found on dow '+offerDayOfWeek+' is '+thisStartDate);
            // Adjust the start date to the next occurrence of the specified day of the week
            while (thisStartDate.getDay() !== offerDayOfWeek) {
                thisStartDate.setDate(thisStartDate.getDate() + 1);
            }
            if (debugHandlers) console.log(`matching dates starting on dow ${offerDayOfWeek} - ${thisStartDate}`)

            // Loop through the dates, adding each matching date to the array
            while (thisStartDate <= thisEndDate) {
                matchingDates.push(new Date(thisStartDate));
                thisStartDate.setDate(thisStartDate.getDate() + 7);
            }
            if (debugHandlers) console.log('matchingDates:', matchingDates);

            // Format the dates as "dd/mm/yyyy" strings
            let formattedDates = matchingDates.map(date => {
                let day = String(date.getDate()).padStart(2, '0');
                let month = String(date.getMonth() + 1).padStart(2, '0');
                let year = date.getFullYear();

                if (debugHandlers) console.log(`matching dates starting on dow ${offerDayOfWeek} - ${day}/${month}/${year}`);
                //return `${day}/${month}/${year}`;
                const this_startDate = `${day}/${month}/${year}`;

                const this_nbDays = acf['offer-number-of-days'] || 7;
                const this_nbAdults = 2;
                // item.propertyIds is something like ["1", "2", "3"] we want [1, 2, 3]
                // const propertyIds = item.propertyIds.map(Number) || [];
                // item.propertyIds is something like {"1", "2", "3"} we want {1, 2, 3}
                
                
                // const this_propertyIds = Object.values(item.propertyIds).map(Number);

                if (debugHandlers) console.log('item.properties', item.properties);
                const this_propertyIds = item.properties.map(property => Number(property.ws_establishment_id));
                if (debugHandlers) console.log('this_propertyIds', this_propertyIds);

                // Extract necessary data from endpointData and construct the query string
                // This is a placeholder logic, adapt it to your actual data structure and requirements

                //const nbDays = endpointData.nbDays || 7;
                //const startDate = endpointData.startDate || "2024-07-12";
                //const nbAdults = endpointData.nbAdults || 2;
                //const nbChildren1 = endpointData.nbChildren1 || 3;
                //const nbChildren2 = endpointData.nbChildren2 || 1;
                //const maxResults = endpointData.maxResults || 300;
                //const childrenBirthdate = endpointData.childrenBirthdate || ["2020-07-12", "2020-07-12", "2020-07-12"];

                this_returnProposalsQuery += `
                    method_${key}_${key2}_${day}_${month}_${year}: getProposals(
                        session: {
                            name: "${sessionName}"
                        }
                        input: {
                            criterias: {
                                nbDays: ${this_nbDays},
                                startDate: "${year}-${month}-${day}",
                                nbAdults: ${this_nbAdults},
                                propertyIds: ${JSON.stringify(this_propertyIds)},
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
            if (debugHandlers) console.log('this_returnProposalsQuery', this_returnProposalsQuery);
        });
    });
    if (debugHandlers) console.log(`
        query getProposal111{
            ${returnProposalsQuery}
        }
    `);
    return `
        query getProposal111{
            ${this_returnProposalsQuery}
        }
    `;
};

const thisOffersProposalsCombinations = (proposalsData, endpointData) => {
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
    if (debugHandlers) console.log('transformedData', transformedData);
    if (debugHandlers) console.log('endpointData', endpointData);
    endpointData.forEach(thisOffer => {
        if (debugHandlers) console.log('thisOffer:', thisOffer.acf_data);
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
    if (debugHandlers) console.log('thisProposalsOffersArray:', thisProposalsOffersArray);

    const uniqueProposals = removeDuplicates(thisProposalsOffersArray);

    // return thisProposalsOffersArray;
    // return removeDuplicates(thisProposalsOffersArray);
    return groupByLowestPrice(removeDuplicates(thisProposalsOffersArray));
    
};

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
    buildProposalsQuery, 
    thisOffersProposalsCombinations 
};