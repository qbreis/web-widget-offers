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
var css = "body{font-family:\"Helvetica Neue\",Helvetica,Arial,sans-serif}"; (require("browserify-css").createStyle(css, { "href": "versions\\1.0.1\\css\\style.css" }, { "insertAt": "bottom" })); module.exports = css;
},{"browserify-css":1}],3:[function(require,module,exports){
// graphql.js: Contains functions related to constructing and handling GraphQL queries.

const debugGraphql = 0;
if(debugGraphql) console.log('debugGraphql is set to 1');

const { fetchSessionData, fetchProposalsData } = require('../utils/api');
const { buildProposalsQuery, offersProposalsCombinations, getOffersProposalsList, thisOffersProposalsCombinations } = require('../utils/handlers');
const { 
    buildHtmlFromOffersProposalsCombinations, 
    buildHtmlOffersOutput,
    buildHtmlOffers
} = require('../views/htmlBuilder');

const wwo_graphqlQueries = require('./graphqlQueries');

const runGraphql = async (options, endpointData) => {
    // console.log('endpointData in runGraphql:', endpointData);
    const username = 'web_fr';
    try {
        const sessionData = await fetchSessionData(username, options.graphqlConfig.endpointUrl, wwo_graphqlQueries.getSession);
        await handleSessionData(sessionData, options, endpointData);
    } catch (error) {
        console.error('Error en runGraphql:', error);
    }
};

const handleSessionData = async (data, options, endpointData) => {
    // console.log('endpointData in handleSessionData:', endpointData);
    // if (debugGraphql) console.log('Datos recibidos getSession in refactored code:', data);
    if (debugGraphql) console.log('getSession name:', data.data.getSession.name);
    const sessionName = data.data.getSession.name;
    const proposalsQuery = buildProposalsQuery(sessionName, endpointData);
    try {
        const proposalsData = await fetchProposalsData(options.graphqlConfig.endpointUrl, proposalsQuery);
        if (debugGraphql) console.log('-------------------Datos recibidos getProposals de GraphQL endpoint ' + options.graphqlConfig.endpointUrl + ':', proposalsData.data);





        






        if (debugGraphql) console.log('offers in endpointData:', endpointData);

        /*
        To create a new object that combines offers from endpointData with proposals from proposalsData, you can iterate through each offer in endpointData and then iterate through acf_data within each offer. During this process, you can match and combine relevant proposals from proposalsData. 
        */


        const proposalsOffersArray = thisOffersProposalsCombinations(proposalsData, endpointData);
        console.log('proposalsOffersArray', proposalsOffersArray);
        const htmlOffersOutput = buildHtmlOffers(proposalsOffersArray);
        const containerOffersOutput = document.getElementById('wwo-offers-list');
        if (containerOffersOutput) {
            containerOffersOutput.innerHTML = htmlOffersOutput;
        } else {
            console.error(`Element with id wwo-offers-list not found.`);
        }


//        const proposalsOffersArray = offersProposalsCombinations(proposalsData, endpointData);
//        if (debugGraphql) console.log('proposalsOffersArray...', proposalsOffersArray);
        


        

        /*
        transform proposalsOffersArray into offersProposalsArray where each offer is paired with each proposal, you can iterate through proposalsOffersArray and create a new array offersProposalsArray with the desired structure. Here's how you can achieve this:
        */
//        const offersProposalsList = getOffersProposalsList(proposalsOffersArray);
//        if (debugGraphql) console.log('offersProposalsList', offersProposalsList);



        /*
        const htmlOffersOutput = buildHtmlOffersOutput(offersProposalsList);
        const containerOffersOutput = document.getElementById('wwo-offers-list');
        if (containerOffersOutput) {
            containerOffersOutput.innerHTML = htmlOffersOutput;
        } else {
            console.error(`Element with id wwo-offers-list not found.`);
        }
        */



        /*
        const htmlOffers = buildHtmlFromOffersProposalsCombinations(proposalsOffersArray);
        const containerOfers = document.getElementById('ww-offers-list');
        if (containerOfers) {
            containerOfers.innerHTML = htmlOffers;
        } else {
            console.error(`Element with id ww-offers-list not found.`);
        }
        */
        
    } catch (error) {
        console.error('Error fetching proposals data:', error);
    }
};

module.exports = { runGraphql, handleSessionData };
},{"../utils/api":8,"../utils/handlers":9,"../views/htmlBuilder":11,"./graphqlQueries":4}],4:[function(require,module,exports){
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

const debugIndex = 0;
if(debugIndex) console.log('debugIndex is set to 1');

require('./css/style.css');

// Importing language strings
// const { getString } = require('./lang/languages.js');
const { initLanguage, getLanguageStrings } = require('./lang/languageManager');

// Importing GraphQL queries and utilities
const { runGraphql } = require('./graphql/graphql');

// Main widget initialization function
function initWidget(options) {
    if (debugIndex) console.log('Initializing widget with options:', options);

    initLanguage(options);
    const wwo_strings = getLanguageStrings();
    if (!wwo_strings) {
        console.error('Failed to initialize language strings in index.js');
        return;
    }
    /*
    // Fetch the corresponding language strings
    const wwo_strings = getString(
        // Default to 'es' if no language is specified
        (options.language) ? options.language : 'es'
    );

    // Handle missing translations
    if (!wwo_strings) {
        console.error(`No language strings found for language code: ${options.language || 'es'}`);
        return;
    }
    */


    if (debugIndex) console.log('Language strings:', wwo_strings);

    if (debugIndex) console.log('options.endpointUrl:', options.endpointUrl);

    fetch(options.endpointUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error fetching the data');
            }
            return response.json();
        })
        .then(data => {
            runGraphql(options, data);
            if (debugIndex) console.log('Data from WP endpoint ' + options.endpointUrl + ':', data);
        })
        .catch(error => {
            console.error('Error fetching data from options.endpointUrl:', error);
        });

    // Building the widget's HTML
    let html = `
        <div id="ww-main-container">
            <div style="border: 2px #ccc solid;margin: 1em 0;padding: 0.5em;">
                <h2>Widget options</h2>
                <ul>
                    <li>id: <strong>${options.id}</strong> &#8212; Es el id de la etiqueta HTML donde se implementa el widget.</li>
                    <li>language: <strong>${options.language}</strong></li>
                    <li>endpointUrl: <strong>${options.endpointUrl}</strong> &#8212; URL del punto de acceso para obtener las ofertas de WordPress.</li>
                    <li>graphqlConfig.endpointUrl: <strong>${options.graphqlConfig.endpointUrl}</strong> &#8212; URL del punto de acceso para obtener las disponibilidades por GraphQL.</li>
                </ul>
                <p>${wwo_strings.translation_example}</p>
            </div>
            <div id="wwo-offers-list" style="border: 2px #f0c solid;"></div>
            <div id="ww-offers-list" style="border: 2px #f0c solid;"></div>
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

module.exports = { initWidget };

},{"./css/style.css":2,"./graphql/graphql":3,"./lang/languageManager":6}],6:[function(require,module,exports){
// languageManager.js
const { getString } = require('./languages');

let wwo_strings = null;

function initLanguage(options = {}) {
    wwo_strings = getString(options.language || 'es');

    // Handle missing translations
    if (!wwo_strings) {
        console.error(`No language strings found for language code: ${options.language || 'es'}`);
        return;
    }

    if (options.debug) console.log('Language strings:', wwo_strings);
}

function getLanguageStrings() {
    if (!wwo_strings) {
        console.error('Language strings not initialized. Please call initLanguage first.');
        return null;
    }
    return wwo_strings;
}

module.exports = { initLanguage, getLanguageStrings };

},{"./languages":7}],7:[function(require,module,exports){
function getString(wwo_languageCode){
    let wwo_translationChains = {};
    switch(wwo_languageCode){
        case 'es':
            wwo_translationChains = {
                'translation_example': 'Ejemplo de traducción',
                'code_lang': 'es-es',
                'dows' : ['domingo', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado'],
                'dows-short' : ['dom', 'lun', 'mar', 'mie', 'jue', 'vie', 'sab'],
                'months' : ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
                'monts-short' : ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
                'from' : 'desde',
                'to' : 'hasta',
            }
            break;  
        case 'en':
            wwo_translationChains = {
                'translation_example': 'Translation example',
                'code_lang': 'en-gb',
                'dows' : ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'],
                'dows-short' : ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'],
                'months' : ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'],
                'monts-short' : ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'],
                'from' : 'from',
                'to' : 'to',
            }
            break;
        case 'fr':
            wwo_translationChains = {
                'translation_example': 'Example de traduction',
                'code_lang': 'fr-fr',
                'dows' : ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'],
                'dows-short' : ['dim', 'lun', 'mar', 'mer', 'jeu', 'ven', 'sam'],
                'months' : ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'],
                'monts-short' : ['jan', 'fév', 'mar', 'avr', 'mai', 'juin', 'juil', 'août', 'sep', 'oct', 'nov', 'déc'],
                'from' : 'du',
                'to' : 'au',
        }
        break;
        
    }
    return wwo_translationChains;
}
module.exports = { getString };
},{}],8:[function(require,module,exports){
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
},{}],9:[function(require,module,exports){
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

            console.log('matchingDates:', matchingDates);

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
                const this_propertyIds = Object.values(item.propertyIds).map(Number);

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

const offersProposalsCombinations = (proposalsData, endpointData) => {






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
    console.log('transformedData', transformedData);











    // Initialize the combined data array
    const proposalsOffersArray = [];

    const thisProposalsOffersArray = [];
    if (debugHandlers) console.log('transformedData', transformedData);
    if (debugHandlers) console.log('endpointData', endpointData);
    // Iterate over endpointData
    let counter = 0;
    endpointData.forEach(thisOffer => {
        if (debugHandlers) console.log('thisOffer:', thisOffer.acf_data);
        console.log('thisOffer:', thisOffer.acf_data);
        thisOffer.acf_data.forEach((acfItem, acfIndex) => {
            const methodString = Object.keys(transformedData)[counter];
            const combinedObject = {
                offer: thisOffer,
                acfItem: acfItem,
                method: methodString,
                proposals: transformedData[
                    Object.keys(transformedData)[counter]
                ]
            };
            proposalsOffersArray.push(combinedObject);
        });
        counter++;
    });
    if (debugHandlers) console.log('proposalsOffersArray:', proposalsOffersArray);
    return proposalsOffersArray;
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
    console.log('transformedData', transformedData);
    const thisProposalsOffersArray = [];
    if (debugHandlers) console.log('transformedData', transformedData);
    if (debugHandlers) console.log('endpointData', endpointData);
    let counter = 0;
    endpointData.forEach(thisOffer => {
        if (debugHandlers) console.log('thisOffer:', thisOffer.acf_data);
        console.log('thisOffer:', thisOffer.acf_data);
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
    console.log('thisProposalsOffersArray:', thisProposalsOffersArray);
    return thisProposalsOffersArray;
};


















const getOffersProposalsList = (proposalsOffersArray) => {

    if (debugHandlers) console.log('proposalsOffersArray in getOffersProposalsList', proposalsOffersArray);
    const offersProposalsArray = [];
    proposalsOffersArray.forEach(item => {
        const offer = item.offer;
        const proposals = item.proposals.proposals;
        proposals.forEach(proposal => {
            
            const offerProposalPair = {
                offer: offer,
                acfItem: item.acfItem,
                // formattedDate : item.formattedDate,
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

module.exports = { buildProposalsQuery, offersProposalsCombinations, getOffersProposalsList, thisOffersProposalsCombinations };
},{"./utils":10}],10:[function(require,module,exports){
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

const formatDateRange = (dateStartString, dateEndString) => {

    const wwo_strings = getLanguageStrings();
    if (!wwo_strings) {
        console.error('Failed to get language strings in graphql/graphql');
        return;
    }

    let dateStartParts = dateStartString.split('/');
    let dateStart = new Date(`${dateStartParts[2]}-${dateStartParts[1]}-${dateStartParts[0]}`);
    
    console.log('---', dateStart.getUTCDay(), wwo_strings['dows-short']);
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
        `${dayStart} ${monthStart} ${wwo_strings['to']} ${dayEnd} ${monthEnd} ${yearEnd}` :
        `${dayStart} ${monthStart} ${yearStart} ${wwo_strings['to']} ${dayEnd} ${monthEnd} ${yearEnd}`;
 
    return `<span class="wwo-day-of-week">${dayOfWeek}</span> ${returnDateRange}`; //`<span class="wwo-day-of-week">${dayOfWeek}</span> ${returnDateRange}`;
        
}

module.exports = { convertDateFormat, formatDateRange };
},{"../lang/languageManager":6}],11:[function(require,module,exports){
const debugHtmlBuilder = 0;
if(debugHtmlBuilder) console.log('debugHtmlBuilder is set to 1');

const { getLanguageStrings } = require('../lang/languageManager');
const { formatDateRange } = require('../utils/utils');

const buildHtmlOffers = (proposalsOffersArray) => {
    let html = `
        <div class="wwo-offer-container">
            <ul>
    `;
    proposalsOffersArray.forEach((item, key) => {
        console.log('item in buildHtmlOffers', item);

        let disponibilityRange = formatDateRange(item.proposal.formattedDate, item.acfItem['offer-date-end']);//, wwo_strings);
        html += `
            <li style="border: 4px #c0c solid;margin: 0.5em 0;">
                <div class="wwo-disponibility-dates">
                    ${disponibilityRange}
                </div><!-- .wwo-disponibility-dates -->
                propertyId: ${item.proposal.propertyId}<br />
                ${item.proposal.price.amount} ${item.proposal.price.currencyCode}<br />
                proposalKey: ${item.proposal.proposalKey}<br />
                nbDays: ${item.proposal.nbDays}<br />
                date start: ${item.proposal.formattedDate}<br />
                ${item.offer.get_the_title}<br />
            </li>
        `;
    });
    html += `
        </ul>
    </div><!-- .wwo-offer-container -->
    `;
    return html;
}

const buildHtmlFromOffersProposalsCombinations = (proposalsOffersArray) => {
    if (debugHtmlBuilder) console.log('proposalsOffersArray', proposalsOffersArray);
    let html = 'ESTRUCTURA DE LAS DISPONIBILIDADES MOSTRADAS — SOLO PARA DESARROLLO:<br />';

    proposalsOffersArray.forEach((item, key) => {
        if (debugHtmlBuilder) console.log('item in buildHtmlFromOffersProposalsCombinations', item);
        if (debugHtmlBuilder) console.log('item.offer.acf_data', item.offer.acf_data);
        const wwo_strings = getLanguageStrings();
        if (!wwo_strings) {
            console.error('Failed to get language strings in graphql/graphql');
            return;
        }
        //if (debugHtmlBuilder) console.log('wwo_strings', wwo_strings);

        let dateStr = item.offer.acf_data[0]['offer-date-start'];

        let dateParts = dateStr.split('/');
        let date = new Date(`${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`);

        if (debugHtmlBuilder) wwo_strings.translation_example['dows-short'];
        let dayOfWeek = wwo_strings['dows-short'][date.getUTCDay()];
        html += `
            <div class="ww-offer-container">
                <h2>
                    ${item.offer.get_the_title} (WP post ID: ${item.offer.ID})
                    &nbsp;-&nbsp;
                    From <span class="wwo-day-of-week">${dayOfWeek}</span> ${item.acfItem['offer-date-start']} to ${item.acfItem['offer-date-end']}
                </h2>
                <p>
                    Se deben mostrar las disponibilidades entre las fechas indicadas en el título.<br />
                    Que empiecen en día de la semana: ${item.acfItem['offer-day-of-week']}
                </p>
                <h3>Proposals:</h3>
                <ul>
        `;
        if (debugHtmlBuilder) console.log('item.proposals.proposals', item.proposals.proposals);
        item.proposals.proposals.forEach((proposal, key2) => {
            html += `
                    <li style="border: 1px #000 solid;margin: 0.5em 0;">
                        propertyId: ${proposal.propertyId}<br />
                        price.amount: ${proposal.price.amount}<br />
                        proposalKey: ${proposal.proposalKey}<br />
                        nbDays: ${proposal.nbDays}<br />
                    </li>
            `;
        });

        html += `
                </ul>
            </div>
        `;
    });
    return html;
}


const buildHtmlOffersOutput = (offersProposalsList) => {
    let html = '';
    if(debugHtmlBuilder) console.log('offersProposalsList', offersProposalsList);

    html += `
        <div class="wwo-offer-container">
            <ul>
    `;

    offersProposalsList.forEach((item, key) => {
        if (debugHtmlBuilder) console.log('item', item);
        const wwo_strings = getLanguageStrings();
        if (!wwo_strings) {
            console.error('Failed to get language strings in graphql/graphql.js');
            return;
        }





        
        let disponibilityRange = formatDateRange(item.acfItem['offer-date-start'], item.acfItem['offer-date-end']);//, wwo_strings);


        html += `
                <li style="border: 4px #c0c solid;margin: 0.5em 0;">


                    <div class="wwo-disponibility-dates">
                        ${disponibilityRange}
                    </div><!-- .wwo-disponibility-dates -->




                    item.offer.get_the_title: ${item.offer.get_the_title}<br />
                    
                    proposal propertyId: ${item.proposal.propertyId}<br />
                    proposal price amount: ${item.proposal.price.amount}<br />
                    proposal nbDays: ${item.proposal.nbDays}<br />
                    proposal proposalKey: ${item.proposal.proposalKey}<br />
                </li>
        `;

    });

    html += `
            </ul>
        </div><!-- .wwo-offer-container -->
    `;

    return html;
}

module.exports = { 
    buildHtmlFromOffersProposalsCombinations, 
    buildHtmlOffersOutput,
    buildHtmlOffers
};
},{"../lang/languageManager":6,"../utils/utils":10}]},{},[5])(5)
});
