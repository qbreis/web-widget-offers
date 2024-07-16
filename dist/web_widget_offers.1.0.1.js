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
var css = "#wwo-offers-list{display:flex;justify-content:center}.wwo-slider-wrapper{margin:1rem;position:relative;overflow:hidden;width:900px;height:900px}.wwo-slides-container{height:calc(100vh - 2rem);width:100%;display:flex;overflow:scroll;scroll-behavior:smooth;list-style:none;margin:0;padding:0}.wwo-offer{width:33.33%}.wwo-offer-item{background-color:#cfcfcf;margin:.5em}.wwo-slide-arrow{position:absolute;display:flex;top:0;bottom:0;margin:auto;height:4rem;background-color:#fff;border:none;width:2rem;font-size:3rem;padding:0;cursor:pointer;opacity:.5;transition:opacity .1s}.wwo-slide-arrow:focus,.wwo-slide-arrow:hover{opacity:1}#wwo-slide-arrow-prev{left:0;padding-left:.25rem;border-radius:0 2rem 2rem 0}#wwo-slide-arrow-next{right:0;padding-left:.75rem;border-radius:2rem 0 0 2rem}.wwo-slide{width:100%;height:100%;flex:1 0 100%;display:flex}.wwo-slides-container{scrollbar-width:none;-ms-overflow-style:none}.wwo-slides-container::-webkit-scrollbar{width:0;height:0}.wwo-grid-container{margin:0;padding:0;list-style:none;display:flex;flex-wrap:wrap}.wwo-grid-item{width:33.33%}.wwo-grid-wrapper{margin:1rem;position:relative;width:900px}"; (require("browserify-css").createStyle(css, { "href": "versions\\1.0.1\\css\\carousel.css" }, { "insertAt": "bottom" })); module.exports = css;
},{"browserify-css":1}],3:[function(require,module,exports){
var css = "body{font-family:\"Helvetica Neue\",Helvetica,Arial,sans-serif}.wwo-featured-image-wrapper{height:200px;overflow:hidden}.wwo-offer-wrapper{padding:.5em}.wwo-featured-image{width:100%;height:100%;object-fit:cover}.offer-title{font-weight:700;font-size:1.2em}"; (require("browserify-css").createStyle(css, { "href": "versions\\1.0.1\\css\\style.css" }, { "insertAt": "bottom" })); module.exports = css;
},{"browserify-css":1}],4:[function(require,module,exports){
// graphql.js: Contains functions related to constructing and handling GraphQL queries.

const debugGraphql = 0;
if(debugGraphql) console.log('debugGraphql is set to 1');

const { fetchSessionData, fetchProposalsData } = require('../utils/api');
const { buildProposalsQuery, thisOffersProposalsCombinations } = require('../utils/handlers');
const { buildHtmlOffers } = require('../views/htmlBuilder');
const { initCarousel } = require('../views/carousel');

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
        const htmlOffersOutput = buildHtmlOffers(proposalsOffersArray, options.displayMode);
        const containerOffersOutput = document.getElementById('wwo-offers-list');
        console.log('options.displayMode', options.displayMode);
        if (containerOffersOutput) {
            containerOffersOutput.innerHTML = htmlOffersOutput;
            if(options.displayMode === 'carousel' || options.displayMode === 'slides' || options.displayMode === 'slide') initCarousel();
        } else {
            console.error(`Element with id wwo-offers-list not found.`);
        }
    } catch (error) {
        console.error('Error fetching proposals data:', error);
    }
};

module.exports = { runGraphql, handleSessionData };
},{"../utils/api":9,"../utils/handlers":10,"../views/carousel":12,"../views/htmlBuilder":13,"./graphqlQueries":5}],5:[function(require,module,exports){
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
    /*
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
    */
};

},{}],6:[function(require,module,exports){
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
            <div id="wwo-offers-list"></div>
            <div id="ww-offers-list"></div>
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

},{"./css/style.css":3,"./graphql/graphql":4,"./lang/languageManager":7}],7:[function(require,module,exports){
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

},{"./languages":8}],8:[function(require,module,exports){
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
},{}],9:[function(require,module,exports){
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
},{}],10:[function(require,module,exports){
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
    let counter = 0;
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
    return thisProposalsOffersArray;
};

module.exports = { 
    buildProposalsQuery, 
    thisOffersProposalsCombinations 
};
},{"./utils":11}],11:[function(require,module,exports){
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
},{"../lang/languageManager":7}],12:[function(require,module,exports){
// versions/1.0.1/views/carousel.js

const wwo_css = require('../css/carousel.css');

const initCarousel = () => {
    // versions/1.0.1/views/carousel.js

    const wwo_slidesContainer = document.getElementById('wwo-slides-container');
    const prevButton = document.getElementById('wwo-slide-arrow-prev');
    const nextButton = document.getElementById('wwo-slide-arrow-next');

    function smoothScroll(element, target, duration) {
        const start = element.scrollLeft;
        const change = target - start;
        const startTime = performance.now();
    
        function animateScroll(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeInOutQuad = progress * (2 - progress); // Ease-in-out effect
            element.scrollLeft = start + change * easeInOutQuad;
    
            if (progress < 1) {
                requestAnimationFrame(animateScroll);
            }
        }
    
        requestAnimationFrame(animateScroll);
    }

    
    nextButton.addEventListener('click', () => {
        const slideWidth = wwo_slidesContainer.clientWidth / 3; // One third of the container width
        const maxScrollLeft = wwo_slidesContainer.scrollWidth - wwo_slidesContainer.clientWidth;

        nextButton.disabled = true;
        
        if (wwo_slidesContainer.scrollLeft + slideWidth > maxScrollLeft) {
            // If we're at the end, loop back to the start
            // wwo_slidesContainer.scrollLeft = 0;
            smoothScroll(wwo_slidesContainer, 0, 10); // 500ms duration for smooth scroll
        } else {
            // wwo_slidesContainer.scrollLeft += slideWidth;
            smoothScroll(wwo_slidesContainer, wwo_slidesContainer.scrollLeft + slideWidth, 200);
        }

        // Re-enable the button after the scroll duration
        setTimeout(() => {
            nextButton.disabled = false;
        }, 500); // Same duration as the smooth scroll

    });

    prevButton.addEventListener('click', () => {
        const slideWidth = wwo_slidesContainer.clientWidth / 3; // One third of the container width

        nextButton.disabled = true;

        if (wwo_slidesContainer.scrollLeft - slideWidth < 0) {
            // If we're at the start, loop back to the end
            // wwo_slidesContainer.scrollLeft = wwo_slidesContainer.scrollWidth - wwo_slidesContainer.clientWidth;
            smoothScroll(wwo_slidesContainer, wwo_slidesContainer.scrollWidth - wwo_slidesContainer.clientWidth, 10);
        } else {
            // wwo_slidesContainer.scrollLeft -= slideWidth;
            smoothScroll(wwo_slidesContainer, wwo_slidesContainer.scrollLeft - slideWidth, 200);
        }
        // Re-enable the button after the scroll duration
        setTimeout(() => {
            nextButton.disabled = false;
        }, 500); // Same duration as the smooth scroll
    });

};

module.exports = { initCarousel };

},{"../css/carousel.css":2}],13:[function(require,module,exports){
const debugHtmlBuilder = 1;
if(debugHtmlBuilder) console.log('debugHtmlBuilder is set to 1');

const { formatDateRange, addDaysToDate } = require('../utils/utils');

const buildHtmlOffers = (proposalsOffersArray, displayMode) => {

    let html = displayMode === 'carousel' ? `
    <div class="wwo-offer-container wwo-slider-wrapper">
        <button class="wwo-slide-arrow" id="wwo-slide-arrow-prev">
            &#8249;
        </button>
        <button class="wwo-slide-arrow" id="wwo-slide-arrow-next">
            &#8250;
        </button>
        <ul class="wwo-slides-container" id="wwo-slides-container">
    `
    :
    `
    <div class="wwo-offer-container wwo-grid-wrapper">
        <ul class="wwo-grid-container" id="wwo-grid-container">
    `
    ;
    /*
    let html = `
    <div class="wwo-offer-container wwo-slider-wrapper">
        <button class="wwo-slide-arrow" id="wwo-slide-arrow-prev">
            &#8249;
        </button>
        <button class="wwo-slide-arrow" id="wwo-slide-arrow-next">
            &#8250;
        </button>
        <ul class="wwo-slides-container" id="wwo-slides-container">
    `;
    */
    proposalsOffersArray.forEach((item, key) => {
        if (displayMode === 'carousel') {
            if (key % 3 === 0) {
                if (key !== 0) {
                    html += `</li>`; // Close previous slide
                }
                html += `<li class="wwo-slide">`; // Start new slide
            } 
        } else {
            html += `<li class="wwo-grid-item">`;
        }

        if(debugHtmlBuilder) console.log('item in buildHtmlOffers', item);
        if(debugHtmlBuilder) console.log('--'+addDaysToDate(item.proposal.formattedDate, item.proposal.nbDays))
        let disponibilityRange = formatDateRange(
            item.proposal.formattedDate, 
            addDaysToDate(item.proposal.formattedDate, item.proposal.nbDays)
        );

        let thisProperty = null;
        item.offer.properties.forEach(property => {
            if(!thisProperty) {
                if (property.ws_establishment_id * 1 === item.proposal.propertyId * 1) {
                    thisProperty = property;
                }
            }
        });
        if(debugHtmlBuilder) console.log('thisProperty:', thisProperty);

        html += `
            <div class="${displayMode === 'carousel' ? 'wwo-offer' : 'wwo-grid-element'}">
                <div class="wwo-offer-item ${item.offer.offers_categories.map(category => `wwo-family-${category.name}`).join(', ')}">

                    <div class="wwo-featured-image-wrapper">
                        <img class="wwo-featured-image" src="${thisProperty.acf_featured_image.url}" alt="${thisProperty.acf_featured_image.alt}" />
                    </div><!-- .wwo-featured-image-wrapper -->
                    <div class="wwo-offer-wrapper">
                        <div class="offer-title">
                            ${thisProperty.post_title}
                        </div><!-- .offer-title -->
                        <div class="wwo-disponibility-dates">
                            ${disponibilityRange}
                        </div><!-- .wwo-disponibility-dates -->
                        <div class="wwo-offer-price">
                            <span class="wwo-offer-price-amount">${item.proposal.price.amount}</span> <span class="wwo-offer-price-currency">&euro;</span>
                        </div><!-- .offer-price -->
                    </div><!-- .wwo-offer-wrapper -->

<div style="display: none;">
                    <div class="offer-proposal">
                        <b>PROPOSAL</b><br />
                        <div class="wwo-disponibility-dates">
                            ${disponibilityRange}
                        </div><!-- .wwo-disponibility-dates -->
                        propertyId: ${item.proposal.propertyId}<br />
                        ${item.proposal.price.amount} ${item.proposal.price.currencyCode}<br />
                        proposalKey: ${item.proposal.proposalKey}<br />
                        nbDays: ${item.proposal.nbDays}<br />
                        date start: ${item.proposal.formattedDate}<br />
                    </div><!-- .offer-proposal -->
                    <div class="offer-categories" style="border: 2px #ccc solid;margin: 1em;">
                        <b>OFFER</b><br />
                        get_the_title: ${item.offer.get_the_title}<br />
                        Categories: ${item.offer.offers_categories.map(category => `${category.name}`).join(', ')}<br />
                        acf_offers_descirtion_content: ${item.offer.acf_offers_descirtion_content}<br />
                        acf_offers_season: ${item.offer.acf_offers_season}<br />
                    </div><!-- .offer-categories -->
                    <div class="offer-establishment" style="border: 2px #ccc solid;margin: 1em;">
                        <b>ESTABLISHMENT</b><br />
                        Establishment: ${thisProperty.post_title}<br />
                        guid: ${thisProperty.guid}<br />
                        acf_h1_title: ${thisProperty.acf_h1_title}<br />
                        acf_h1_subtitle: ${thisProperty.acf_h1_subtitle}<br />
                        acf_featured_image.alt: ${thisProperty.acf_featured_image.alt}<br />
                        acf_featured_image.caption: ${thisProperty.acf_featured_image.caption}<br />
                        acf_featured_image.url: ${thisProperty.acf_featured_image.url}<br />
                    </div><!-- .offer-establishment -->
</div>

                </div><!-- .wwo-offer-item -->
            </div><!-- .wwo-offer -->
        `;
    });
    html += `
            </li><!-- .wwo-slide -->
        </ul><!-- .wwo-slides-container -->
    </div><!-- .wwo-offer-container -->
    `;
    return html;
}

module.exports = { buildHtmlOffers };
},{"../utils/utils":11}]},{},[6])(6)
});
