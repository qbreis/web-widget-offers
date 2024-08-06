const { getLanguageStrings } = require('../lang/languageManager');

//function convertDateFormat(dateString){
const convertDateFormat = (dateString) => {
    // Split the date string into day, month, and year
    const parts = dateString.split('/');
    
    // Construct a new Date object (month - 1 because months are zero-based in Date objects)
    const dateObject = new Date(parts[2], parts[1] - 1, parts[0]);
    
    // Extract year, month, and day from the Date object
    const year = dateObject.getFullYear();
    const month = ('0' + (dateObject.getMonth() + 1)).slice(-2); // Adding 1 because months are zero-based
    const day = ('0' + dateObject.getDate()).slice(-2);
    
    // Construct the ISO 8601 date format (yyyy-mm-dd)
    const isoDateString = `${year}-${month}-${day}`;
    
    return isoDateString;
}

const addDaysToDate = (startDate, nbDays) => {
    // Parse the start date (assuming the date is in "dd/MM/yyyy" format)
    let parts = startDate.split('/');
    let date = new Date(parts[2], parts[1] - 1, parts[0]); // year, month, day

    // Add the number of days
    date.setDate(date.getDate() + nbDays);

    // Format the new date as "dd/MM/yyyy"
    let newDate = ('0' + date.getDate()).slice(-2) + '/' + 
                  ('0' + (date.getMonth() + 1)).slice(-2) + '/' + 
                  date.getFullYear();
    
    return newDate;
}

const formatDateRange = (dateStartString, dateEndString) => {

    const wwo_strings = getLanguageStrings();
    if (!wwo_strings) {
        console.error('Failed to get language strings in graphql/graphql');
        return;
    }

    let dateStartParts = dateStartString.split('/');
    let dateStart = new Date(`${dateStartParts[2]}-${dateStartParts[1]}-${dateStartParts[0]}`);
    
    // console.log('---', dateStart.getUTCDay(), wwo_strings['dows-short']);
    let dayOfWeek = wwo_strings['dows-short'][dateStart.getUTCDay()];

    let dateEndParts = dateEndString.split('/');
    let dateEnd = new Date(`${dateEndParts[2]}-${dateEndParts[1]}-${dateEndParts[0]}`);
    
    wwo_strings['monts-short']
    let dayEnd = String(dateEnd.getUTCDate()).padStart(2, '0');
    let monthEnd = wwo_strings['monts-short'][dateEnd.getUTCMonth()];
    let yearEnd = dateEnd.getUTCFullYear();

    let dayStart = String(dateStart.getUTCDate()).padStart(2, '0');
    let monthStart = wwo_strings['monts-short'][dateStart.getUTCMonth()];
    let yearStart = dateStart.getUTCFullYear();

    let returnDateRange = (yearStart === yearEnd) ? 
        `<span class="wwo-date wwo-date-start">${dayStart} ${monthStart}</span> ${wwo_strings['to']} <span class="wwo-date wwo-date-end">${dayEnd} ${monthEnd} ${yearEnd}</span>` :
        `<span class="wwo-date wwo-date-start">${dayStart} ${monthStart}</span> ${yearStart} ${wwo_strings['to']} <span class="wwo-date wwo-date-end">${dayEnd} ${monthEnd} ${yearEnd}</span>`;
 
    return `${wwo_strings['from']} <span class="wwo-day-of-week">${dayOfWeek}</span> ${returnDateRange}`;
}

/**
 * Function to get the quantity of rooms available for a specific accommodation code.
 *
 * @param {Object} roomTypes - The object containing an array of room type information.
 * @param {string} accommodationCode - The code of the accommodation to look up.
 * @returns {number} - The quantity of rooms available for the specified accommodation code.
 *
 * Example:
 * const accommodationCode = "TPLS";
 * const roomTypes = {
 *   "roomTypes": [
 *     {
 *       "code": "TPLS",
 *       "propertyId": 5,
 *       "categoryCode": "CHA",
 *       "categoryLabel": "Hôtel Club",
 *       "label": "Chambre triple 3 pers.",
 *       "webLabel": "",
 *       "paxMax": 3,
 *       "pax": 3,
 *       "quantity": 2
 *     }
 *   ],
 *   "roomNumbers": [
 *     null,
 *     null
 *   ]
 * };
 * const quantity = getRoomsQuantity(roomTypes.roomTypes, accommodationCode); // quantity will be 2
 * 
 * Function is called in:
 *      versions/1.0.2/views/upselling.js
 *      versions/1.0.2/views/crossSelling.js
 *      versions/1.0.2/views/buildAccommodationHtml.js
 */
const getRoomsQuantity = (roomTypes, accommodationCode) => {
    // Initialize quantity to 0
    let quantity = 0;

    // Iterate through each room type in the array
    roomTypes.forEach((roomType) => {
        // Check if the accommodation code matches the current room type code
        if (accommodationCode === roomType.code) {
            // If a match is found, set the quantity to the room type's quantity
            quantity = roomType.quantity;
        }
    });

    // Return the found quantity, or 0 if no match was found
    return quantity;
};

module.exports = { convertDateFormat, formatDateRange, addDaysToDate, getRoomsQuantity };