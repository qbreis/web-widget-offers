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

module.exports = { convertDateFormat, formatDateRange, addDaysToDate };