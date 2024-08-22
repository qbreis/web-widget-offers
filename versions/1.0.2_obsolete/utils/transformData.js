// utils/transformData.js

/**
 * The transformData function is designed to process and transform an input data object by identifying specific keys that match a date pattern,
 * formatting the dates, and then embedding these formatted dates into the associated proposals.
 * 
 * The function iterates over the keys of the input data object, checks if they match a date pattern in the format dd_mm_yyyy, and if so,
 * converts the underscores in the date to slashes to reformat it to dd/mm/yyyy. It then adds this formatted date to each proposal
 * under the same key.
 * 
 * @param {Object} data - The input data object containing proposals, with keys potentially in the format of dates (dd_mm_yyyy).
 * @returns {Object} transformedData - The transformed data object with proposals including the formatted date.
 * 
 * Example input:
 *  {
 *     '01_01_2021': {
 *        proposals: [
 *          { id: 1, price: 100 },
 *          { id: 2, price: 200 }
 *        ]
 *     },
 *     '02_01_2021': {
 *        proposals: [
 *           { id: 3, price: 300 },
 *           { id: 4, price: 400 }
 *        ]
 *     }
 *  }
 * 
 * Example output:
 *  {
 *     '01_01_2021': {
 *        proposals: [
 *           { id: 1, price: 100, formattedDate: '01/01/2021' },
 *           { id: 2, price: 200, formattedDate: '01/01/2021' }
 *        ]
 *  },
 *     '02_01_2021': {
 *        proposals: [
 *           { id: 3, price: 300, formattedDate: '02/01/2021' },
 *           { id: 4, price: 400, formattedDate: '02/01/2021' }
 *        ]
 *     }
 *  }
 * 
 */

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

module.exports = transformData;
