// handlers.js: Contains functions for data handling and processing functions

const debugHandlers = 0;
if(debugHandlers) console.log('debugHandlers is set to 1');

const onlyDev = false;
if(onlyDev) console.log('versions/1.0.2/views/generateNavCategoriesHtml.js: onlyDev is set to 1');

const { convertDateFormat } = require('./utils');

// Function to build the proposals query string dynamically
const buildProposalsQuery = (sessionName, endpointData) => {
    let returnProposalsQuery = "";
    let this_returnProposalsQuery = "";
    const today = new Date();  // Get today's date

    if (debugHandlers) console.log('endpointData has one item for each offer in wp data base', endpointData);

    endpointData.forEach((item, key) => {
        if (debugHandlers) console.log(`-----${key} will create method_${key}_X`, item);
        item.acf_data.forEach((acf, key2) => {
            if (debugHandlers) console.log('ACF Data for', item.get_the_title, ':', acf);
            
            // To loop between the given start and end dates inclusive, starting with the specified day of the week ("0" which corresponds to Sunday)

            // Initialize the date strings and day of week
            let offerDateStart = convertDateFormat(acf['offer-date-start']);
            let offerDateEnd = convertDateFormat(acf['offer-date-end']);
            let offerDayOfWeek = parseInt(acf['offer-day-of-week'], 10);

            // Parse the date strings into Date objects
            let thisStartDate = new Date(offerDateStart.split('/').reverse().join('-'));
            let thisEndDate = new Date(offerDateEnd.split('/').reverse().join('-'));

            // Ignore items with offerDateStart before today
            if (thisStartDate < today) {
                if (debugHandlers) console.log('Ignoring item with offerDateStart before today:', offerDateStart);
                return;
            }

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
                const this_nbAdults = acf['offer-number-of-adults'] || 2;
                // item.propertyIds is something like ["1", "2", "3"] we want [1, 2, 3]
                // const propertyIds = item.propertyIds.map(Number) || [];
                // item.propertyIds is something like {"1", "2", "3"} we want {1, 2, 3}

                // const this_propertyIds = Object.values(item.propertyIds).map(Number);
                if (debugHandlers) console.log('item.acf_data[0].offers_establishments', item.acf_data[0].offers_establishments);

                /*
                let this_propertyIds = [];
                item.acf_data[0].offers_establishments.forEach((item) => {
                    this_propertyIds.push(Number(item.ws_establishment_id));
                });
                */

                let this_propertyIds = new Set();
                item.acf_data[0].offers_establishments.forEach((item) => {
                    this_propertyIds.add(Number(item.ws_establishment_id));
                });

                // Convert the Set back to an array if needed
                this_propertyIds = Array.from(this_propertyIds);

                if (debugHandlers) console.log('this_propertyIds', this_propertyIds);

                // Extract necessary data from endpointData and construct the query string
                // This is a placeholder logic, adapt it to your actual data structure and requirements

                // Assuming acf['offer-dob-children'] is an array of dates
                const childrenBirthdateArray = acf['offer-dob-children'].map(date => `"${date}"`);
                // Convert the array to the desired string format
                const childrenBirthdate = `[${childrenBirthdateArray.join(', ')}]`;

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
                                nbChildren1 : ${acf['offer-dob-children'].length},
                                childrenBirthdate : ${childrenBirthdate},
                                maxResults: ${onlyDev ? 5 : 3000},
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

                            priceWithoutDiscount {
                                amount
                                currencyCode
                            },

                            nbDays,

                            distribution {
                                roomTypes {
                                    code,
                                    propertyId
                                    code,
                                    categoryCode,
                                    categoryLabel,
                                    label,
                                    webLabel,
                                    paxMax,
                                    pax,
                                    propertyId, 
                                    quantity
                                }
                                roomNumbers
                            }

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

module.exports = { buildProposalsQuery };