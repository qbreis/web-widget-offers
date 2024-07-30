// utils/getRooms.js

const debugGetRooms = 0;
if(debugGetRooms) console.log('debugGetRooms is set to 1');

const getRooms = (proposalDistribution, endpointData) => {
    if(debugGetRooms) console.log('debugGetRooms endpointData[0].properties', endpointData[0].properties);
    if(debugGetRooms) console.log('debugGetRooms proposalDistribution.distribution.roomTypes', proposalDistribution.distribution.roomTypes);

    // extract all accommodation codes from the roomTypes array
    //const accommodationCodes = proposalDistribution.distribution.roomTypes.map(room => room.code);
    //if(debugGetRooms) console.log('debugGetRooms accommodationCodes', accommodationCodes);
    if(debugGetRooms) console.log('proposalDistribution.propertyId', proposalDistribution.propertyId);

    let filteredAccommodations = [];
    for (const propertyData of endpointData[0].properties) {
        // console.log('---'+propertyData.ws_establishment_id+' compared with '+proposalDistribution.propertyId);
        if(Number(propertyData.ws_establishment_id) == Number(proposalDistribution.propertyId)) {
            if(debugGetRooms) console.log('propertyData.accommodations', propertyData.accommodations);
            if(propertyData.accommodations) {
                for (const propertyAccommodations of propertyData.accommodations) {
                    // Check if the current accommodation code is in the roomTypes array
                    const accommodationCode = propertyAccommodations.webservice.ws_accommodation_code;
                    const roomTypeMatch = proposalDistribution.distribution.roomTypes.find(room => room.code === accommodationCode);
                    
                    if (roomTypeMatch) {
                        for (const proposalDistributionItem of proposalDistribution.distribution.roomTypes) {
                            if(roomTypeMatch.code === proposalDistributionItem.code) {
                                propertyAccommodations.roomQuantity = proposalDistributionItem.quantity;
                            }
                        }
                        filteredAccommodations.push(propertyAccommodations);
                    }
                }
            }
        }
    }
    return filteredAccommodations;
};

module.exports = getRooms;
