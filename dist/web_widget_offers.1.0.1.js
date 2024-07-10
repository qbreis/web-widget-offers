(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.web_widget_offers = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';
// For more information about browser field, check out the browser field at https://github.com/substack/browserify-handbook#browser-field.

var styleElementsInsertedAtTop = [];

var insertStyleElement = function(styleElement, options) {
    var head = document.head || document.getElementsByTagName('head')[0];
    var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];

    options = options || {};
    options.insertAt = options.insertAt || 'bottom';

    if (options.insertAt === 'top') {
        if (!lastStyleElementInsertedAtTop) {
            head.insertBefore(styleElement, head.firstChild);
        } else if (lastStyleElementInsertedAtTop.nextSibling) {
            head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
        } else {
            head.appendChild(styleElement);
        }
        styleElementsInsertedAtTop.push(styleElement);
    } else if (options.insertAt === 'bottom') {
        head.appendChild(styleElement);
    } else {
        throw new Error('Invalid value for parameter \'insertAt\'. Must be \'top\' or \'bottom\'.');
    }
};

module.exports = {
    // Create a <link> tag with optional data attributes
    createLink: function(href, attributes) {
        var head = document.head || document.getElementsByTagName('head')[0];
        var link = document.createElement('link');

        link.href = href;
        link.rel = 'stylesheet';

        for (var key in attributes) {
            if ( ! attributes.hasOwnProperty(key)) {
                continue;
            }
            var value = attributes[key];
            link.setAttribute('data-' + key, value);
        }

        head.appendChild(link);
    },
    // Create a <style> tag with optional data attributes
    createStyle: function(cssText, attributes, extraOptions) {
        extraOptions = extraOptions || {};

        var style = document.createElement('style');
        style.type = 'text/css';

        for (var key in attributes) {
            if ( ! attributes.hasOwnProperty(key)) {
                continue;
            }
            var value = attributes[key];
            style.setAttribute('data-' + key, value);
        }

        if (style.sheet) { // for jsdom and IE9+
            style.innerHTML = cssText;
            style.sheet.cssText = cssText;
            insertStyleElement(style, { insertAt: extraOptions.insertAt });
        } else if (style.styleSheet) { // for IE8 and below
            insertStyleElement(style, { insertAt: extraOptions.insertAt });
            style.styleSheet.cssText = cssText;
        } else { // for Chrome, Firefox, and Safari
            style.appendChild(document.createTextNode(cssText));
            insertStyleElement(style, { insertAt: extraOptions.insertAt });
        }
    }
};

},{}],2:[function(require,module,exports){
var css = "body{font-family:BlinkMacSystemFont,-apple-system,\"Segoe UI\",Roboto,Oxygen,Ubuntu,Cantarell,\"Fira Sans\",\"Droid Sans\",\"Helvetica Neue\",Helvetica,Arial,sans-serif}#ww-main-container{max-width:1024px;margin:0 auto}#ww-main-container div,#ww-main-container label,#ww-main-container span{font-size:1rem}#ww-main-container p{margin:0!important;line-height:1.4rem;font-size:1.1rem}#ww-main-container{padding:2em;background-color:#f3f3f3}"; (require("browserify-css").createStyle(css, { "href": "versions\\1.0.1\\css\\style.css" }, { "insertAt": "bottom" })); module.exports = css;
},{"browserify-css":1}],3:[function(require,module,exports){
// graphql.js: Contains functions related to constructing and handling GraphQL queries.

const { fetchSessionData, fetchProposalsData } = require('../utils/api.js');
const { buildProposalsQuery } = require('../utils/handlers.js');
const wwo_graphqlQueries = require('./graphqlQueries.js');

const runGraphql = async (options, endpointData) => {
    const username = 'web_fr';
    try {
        const sessionData = await fetchSessionData(username, options.graphqlConfig.endpointURL, wwo_graphqlQueries.getSession);
        await handleSessionData(sessionData, options, endpointData);
    } catch (error) {
        console.error('Error en runGraphql:', error);
    }
};

const handleSessionData = async (data, options, endpointData) => {
    console.log('Datos recibidos getSession in refactored code:', data);
    console.log('getSession name:', data.data.getSession.name);

    const sessionName = data.data.getSession.name;
    const proposalsQuery = buildProposalsQuery(sessionName, endpointData);

    try {
        const proposalsData = await fetchProposalsData(options.graphqlConfig.endpointURL, proposalsQuery);
        console.log('Datos recibidos getProposals de GraphQL endpoint ' + options.graphqlConfig.endpointURL + ':', proposalsData);
    } catch (error) {
        console.error('Error fetching proposals data:', error);
    }
};

module.exports = { runGraphql, handleSessionData };
},{"../utils/api.js":7,"../utils/handlers.js":8,"./graphqlQueries.js":4}],4:[function(require,module,exports){
module.exports = {
    getSession: `
        query session($username: String! ) {
            getSession(input: { 
                username: $username
            }) {
                name
            }
        }
    `,
    getProposals: `
        query getProposal1($session : Session! , $input: ProposalsInput){
            Method1:getProposals(
                session : $session, 
                input : $input
            )
            {
                proposals : proposals {
                    propertyId
                    proposalKey,
                    price {
                        amount,
                        currencyCode
                    },
                    productOption {
                        code,
                        label
                    }
                }
            }
        }
    `,
};

},{}],5:[function(require,module,exports){
'use strict';

// Importing CSS
// const wwo_css = require('./css/style.css');
require('./css/style.css');

// Importing language strings
// const wwo_languagesStrings = require(`./lang/languages.js`);
const { getString } = require('./lang/languages.js');

// Importing GraphQL queries and utilities
const { runGraphql } = require('./graphql/graphql.js');


// Main widget initialization function
function initWidget(options) {
    console.log('Initializing widget with options:', options);

    // Fetch the corresponding language strings
    const WWO_STRINGS = getString(
        // Default to 'es' if no language is specified
        (options.language) ? options.language : 'es'
    );

    // Handle missing translations
    if (!WWO_STRINGS) {
        console.error(`No language strings found for language code: ${options.language || 'es'}`);
        return;
    }

    console.log('Language strings:', WWO_STRINGS);

    console.log('options.endpointUrl:', options.endpointUrl);

    fetch(options.endpointUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error fetching the data');
            }
            return response.json();
        })
        .then(data => {
            runGraphql(options, data);
            console.log('Data from WP endpoint ' + options.endpointUrl + ':', data);
        })
        .catch(error => {
            console.error('Error fetching data from options.endpointUrl:', error);
        });

    // Building the widget's HTML
    let html = `
        <div id="ww-main-container">
            wtd-contain-dispos-group in versions/1.0.4/index.js
            <p>${WWO_STRINGS.translation_example}</p>
            <p>options.endpointUrl: ${options.endpointUrl}</p>
        </div>
    `;

    // Injecting the HTML into the specified container
    const container = document.getElementById(options.id);
    if (container) {
        container.innerHTML = html;
    } else {
        console.error(`Element with id ${options.id} not found.`);
    }
}

// Define a function to fetch session data
/*
const fetchSessionData = async (username, endpointURL, graphqlQuery) => {
    try {
        const response = await fetch(endpointURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: graphqlQuery,
                variables: { username: username },
            })
        });

        if (!response.ok) {
            throw new Error('Error al realizar la solicitud HTTP a getSession');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error getSession:', error);
        throw error;
    }
};

// Define a function to fetch proposals data
const fetchProposalsData = async (endpointURL, graphqlQuery) => {
    try {
        const response = await fetch(endpointURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: graphqlQuery
            })
        });

        if (!response.ok) {
            throw new Error('Error al realizar la solicitud HTTP');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetchProposalsData:', error);
        throw error;
    }
};


// Function to handle the received data
const handleSessionData = async (data, options, endpointData) => {
    console.log('Datos recibidos getSession in refactored code:', data);
    console.log('getSession name:', data.data.getSession.name);

    const sessionName = data.data.getSession.name;
    const proposalsQuery = buildProposalsQuery(sessionName, endpointData);

    try {
        const proposalsData = await fetchProposalsData(options.graphqlConfig.endpointURL, proposalsQuery);
        console.log('Datos recibidos getProposals de GraphQL endpoint ' + options.graphqlConfig.endpointURL + ':', proposalsData);
    } catch (error) {
        console.error('Error fetching proposals data:', error);
    }
};
*/
/*
// Main function to execute the fetch and handle logic
const runGraphql = async (options, endpointData) => {


    



    const username = 'web_fr'; // Define the username variable
    try {
        const sessionData = await fetchSessionData(username, options.graphqlConfig.endpointURL, wwo_graphqlQueries.getSession);
        await handleSessionData(sessionData, options, endpointData);
    } catch (error) {
        console.error('Error en runGraphql:', error);
    }
};
*/
/*
function convertDateFormat(dateString) {
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
*/
module.exports = { initWidget };

},{"./css/style.css":2,"./graphql/graphql.js":3,"./lang/languages.js":6}],6:[function(require,module,exports){
function getString(wwo_languageCode){
    let wwo_translationChains = {};
    switch(wwo_languageCode){
        case 'es':
            wwo_translationChains = {
                'translation_example': 'Ejemplo de traducción',
                'code_lang': 'es-es',
                'days' : [
                    {'value': 1 , 'name': 'LUNES'},
                    {'value': 2 , 'name': 'MARTES'},
                    {'value': 3 , 'name': 'MIERCOLES'},
                    {'value': 4 , 'name': 'JUEVES'},
                    {'value': 5 , 'name': 'VIERNES'},
                    {'value': 6 , 'name': 'SABADO'},
                    {'value': 0 , 'name': 'DOMINGO'},
                ],
            }
            break;  
        case 'en':
            wwo_translationChains = {
                'translation_example': 'Translation example',
                'code_lang': 'en-gb',
                'days': [
                    {'value': 1 , 'name': 'MONDAY'},
                    {'value': 2 , 'name': 'TUESDAY'},
                    {'value': 3 , 'name': 'WEDNESDAY'},
                    {'value': 4 , 'name': 'THUESDAY'},
                    {'value': 5 , 'name': 'FRIDAY'},
                    {'value': 6 , 'name': 'SATURDAY'},
                    {'value': 0 , 'name': 'SUNDAY'},
                ],
            }
            break;
        case 'fr':
            wwo_translationChains = {
                'translation_example': 'Example de traduction',
                'code_lang': 'fr-fr',
                'days': [
                    {'value': 1 , 'name': 'LUNDI'},
                    {'value': 2 , 'name': 'MARDI'},
                    {'value': 3 , 'name': 'MERCREDI'},
                    {'value': 4 , 'name': 'JEUDI'},
                    {'value': 5 , 'name': 'VENDREDI'},
                    {'value': 6 , 'name': 'SAMEDI'},
                    {'value': 0 , 'name': 'DIMANCHE'},
                ],
        }
        break;
        
    }
    return wwo_translationChains;
}
module.exports = { getString };
},{}],7:[function(require,module,exports){
// utils/api.js - Contains functions related to fetching data from APIs.

// Define a function to fetch session data
const fetchSessionData = async (username, endpointURL, graphqlQuery) => {
    try {
        const response = await fetch(endpointURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: graphqlQuery,
                variables: { username: username },
            })
        });

        if (!response.ok) {
            throw new Error('Error al realizar la solicitud HTTP a getSession');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error getSession:', error);
        throw error;
    }
};

// Define a function to fetch proposals data
const fetchProposalsData = async (endpointURL, graphqlQuery) => {
    try {
        const response = await fetch(endpointURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: graphqlQuery
            })
        });

        if (!response.ok) {
            throw new Error('Error al realizar la solicitud HTTP');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetchProposalsData:', error);
        throw error;
    }
};

module.exports = { fetchSessionData, fetchProposalsData };
},{}],8:[function(require,module,exports){
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
},{"./utils.js":9}],9:[function(require,module,exports){
function convertDateFormat(dateString){
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
module.exports = { convertDateFormat };
},{}]},{},[5])(5)
});
