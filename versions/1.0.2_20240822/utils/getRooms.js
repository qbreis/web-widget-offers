// utils/getRooms.js

const debugGetRooms = 0;
if(debugGetRooms) console.log('debugGetRooms is set to 1');

const getRooms = (proposalDistribution, offers_establishments) => {

    let filteredAccommodations = [];
    for (const propertyData of offers_establishments) {
        if(Number(propertyData.ws_establishment_id) == Number(proposalDistribution.propertyId)) {
            // console.log(Number(propertyData.ws_establishment_id) + ' compared with ' + Number(proposalDistribution.propertyId));
            if(propertyData.accommodations) {
                if(debugGetRooms) console.log('proposalDistribution.distribution.roomTypes', proposalDistribution.distribution.roomTypes);
                for (const propertyAccommodations of propertyData.accommodations) {
                    // Check if the current accommodation code is in the roomTypes array
                    const accommodationCode = propertyAccommodations.acf_ws_accommodation_code;
                    //if(debugGetRooms) console.log('accommodationCode', accommodationCode);
                    
                    const roomTypeMatch = proposalDistribution.distribution.roomTypes.find(room => room.code === accommodationCode);
                    //if(debugGetRooms) console.log('roomTypeMatch', roomTypeMatch);
                    if (roomTypeMatch) {
                        // Check if the propertyAccommodations.ID is already in filteredAccommodations
                        const isAlreadyInFiltered = filteredAccommodations.some(accommodationAux => accommodationAux.ID === propertyAccommodations.ID);
                        if (!isAlreadyInFiltered) {
                            filteredAccommodations.push(propertyAccommodations);
                        }
                    }
                }
            }
        }
    }
    if(debugGetRooms) console.log('getRooms is returning filteredAccommodations', filteredAccommodations);
    return filteredAccommodations;
};

module.exports = getRooms;