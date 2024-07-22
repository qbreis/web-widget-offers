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
var css = "#wwo-offers-list{display:flex;justify-content:center}.wwo-slider-wrapper{margin:1rem;position:relative;overflow:hidden;width:900px}.wwo-slides-container{width:900px;border:3px transparent solid;display:flex;overflow:scroll;scroll-behavior:smooth;list-style:none;margin:0;padding:0}.wwo-offer-item{background-color:#cfcfcf;margin:.5em;height:450px}.wwo-slide-arrow{position:absolute;display:flex;top:0;bottom:0;margin:auto;height:4rem;background-color:#fff;border:none;width:2rem;font-size:3rem;padding:0;cursor:pointer;opacity:.5;transition:opacity .1s}.wwo-slide-arrow:focus,.wwo-slide-arrow:hover{opacity:1}#wwo-slide-arrow-prev{left:0;padding-left:.25rem;border-radius:0 2rem 2rem 0}#wwo-slide-arrow-next{right:0;padding-left:.75rem;border-radius:2rem 0 0 2rem}.wwo-slide{width:100%;height:100%;flex:1 0 100%;display:flex}.wwo-slides-container{scrollbar-width:none;-ms-overflow-style:none}.wwo-slides-container::-webkit-scrollbar{width:0;height:0}.wwo-grid-container{margin:0;padding:0;list-style:none;display:flex;flex-wrap:wrap;justify-content:center}.wwo-grid-item{width:33.33%;min-width:33.33%}.wwo-grid-wrapper{margin:1rem;position:relative;width:900px}"; (require("browserify-css").createStyle(css, { "href": "versions\\1.0.1\\css\\carousel.css" }, { "insertAt": "bottom" })); module.exports = css;
},{"browserify-css":1}],3:[function(require,module,exports){
var css = "ul.wwo-categories-nav{margin:0;padding:0;list-style:none;display:flex;justify-content:center}ul.wwo-categories-nav li.wwo-category-nav-item{background-color:#ddd;padding:.5em;margin:.5em;cursor:pointer;transition:all .35s}ul.wwo-categories-nav li.wwo-category-nav-item.wwo-active,ul.wwo-categories-nav li.wwo-category-nav-item:hover{background-color:#aaa}ul.wwo-grid-container li.wwo-single-element,ul.wwo-offers-container li.wwo-single-element{display:none}ul.wwo-grid-container li.wwo-single-element.wwo-active,ul.wwo-offers-container li.wwo-single-element.wwo-active{display:block}"; (require("browserify-css").createStyle(css, { "href": "versions\\1.0.1\\css\\generateNavCategoriesHtml.css" }, { "insertAt": "bottom" })); module.exports = css;
},{"browserify-css":1}],4:[function(require,module,exports){
var css = "body{font-family:\"Helvetica Neue\",Helvetica,Arial,sans-serif}.wwo-featured-image-wrapper{height:200px;overflow:hidden}.wwo-offer-wrapper{padding:.5em}.wwo-featured-image{width:100%;height:100%;object-fit:cover}.offer-title{font-weight:700;font-size:1.2em}.wwo-no-offers{text-align:center;padding:1em}"; (require("browserify-css").createStyle(css, { "href": "versions\\1.0.1\\css\\style.css" }, { "insertAt": "bottom" })); module.exports = css;
},{"browserify-css":1}],5:[function(require,module,exports){
// graphql.js: Contains functions related to constructing and handling GraphQL queries.

const debugGraphql = 0;
if(debugGraphql) console.log('debugGraphql is set to 1');

const { fetchSessionData, fetchProposalsData } = require('../utils/api');
const { buildProposalsQuery } = require('../utils/handlers');
const { proposalsTransform } = require('../utils/proposalsTransform');
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
        const proposalsOffersArray = proposalsTransform(proposalsData, endpointData, options);

        //console.log('proposalsOffersArray', proposalsOffersArray);

        const htmlOffersOutput = buildHtmlOffers(proposalsOffersArray, options.displayMode);
        const containerOffersOutput = document.getElementById('wwo-offers-list');
        if (debugGraphql) console.log('options.displayMode', options.displayMode);
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
},{"../utils/api":10,"../utils/handlers":13,"../utils/proposalsTransform":14,"../views/carousel":16,"../views/htmlBuilder":18,"./graphqlQueries":6}],6:[function(require,module,exports){
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

},{}],7:[function(require,module,exports){
'use strict';

const debugIndex = 0;
if(debugIndex) console.log('debugIndex is set to 1');

require('./css/style.css');

// Importing language strings
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
                    <li><strong>id</strong>: ${options.id} &#8212; Es el id de la etiqueta HTML donde se implementa el widget.</li>
                    <li><strong>language</strong>: ${options.language}</li>
                    <li><strong>endpointUrl</strong>: <a href="${options.endpointUrl}" target="_blank">${options.endpointUrl}</a> &#8212; URL del punto de acceso para obtener las ofertas de WordPress.</li>
                    <li><strong>graphqlConfig.endpointUrl</strong>: ${options.graphqlConfig.endpointUrl} &#8212; URL del punto de acceso para obtener las disponibilidades por GraphQL.</li>
                    <li><strong>graphqlConfig.username</strong>: ${options.graphqlConfig.username}<br />
                    <li><strong>season</strong>: ${options.season} &#8212; winter | summer | both (default) <br />
                    <li><strong>displayMode</strong>: ${options.displayMode} &#8212; Cómo se muestran las ofertas, puede ser: grid | carousel.<br />
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

},{"./css/style.css":4,"./graphql/graphql":5,"./lang/languageManager":8}],8:[function(require,module,exports){
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
}

function getLanguageStrings() {
    if (!wwo_strings) {
        console.error('Language strings not initialized. Please call initLanguage first.');
        return null;
    }
    return wwo_strings;
}

module.exports = { initLanguage, getLanguageStrings };

},{"./languages":9}],9:[function(require,module,exports){
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
                'all' : 'Todos',
                'no_offers' : 'No hay ofertas disponibles',
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
                'all' : 'All',
                'no_offers' : 'No offers available',
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
                'all' : 'Tous',
                'no_offers' : 'Aucune offre disponible',
        }
        break;
        
    }
    return wwo_translationChains;
}
module.exports = { getString };
},{}],10:[function(require,module,exports){
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
},{}],11:[function(require,module,exports){
/**
 * Extracts unique categories from an array of proposal offers.
 * @param {Array} proposalsOffersArray - Array of proposal offers.
 * @returns {Array} Array of unique categories.
 */
const getUniqueCategories = (proposalsOffersArray) => {
    const uniqueCategories = new Set();
    proposalsOffersArray.forEach((item) => {
        item.offer.offers_categories.forEach((category) => {
            uniqueCategories.add(JSON.stringify(category));
        });
    });
    return Array.from(uniqueCategories).map(category => JSON.parse(category));
};

module.exports = { getUniqueCategories };
},{}],12:[function(require,module,exports){
const debugFilter = 0;
if(debugFilter) console.log('debugFilter is set to 1');

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

function filterOffersBySeason(offers, optionsSeason) {
    if(debugFilter) console.log('offers:', offers);
    if(debugFilter) console.log('optionsSeason:', optionsSeason);
    return offers.filter(offer => {
        // Show all offers if optionsSeason is 'both'
        if (optionsSeason === 'both') {
            return true;
        }
        // Include offers where season is 'both' or matches the specified season
        return offer.offer.acf_offers_season === 'both' || offer.offer.acf_offers_season === optionsSeason;
    });
}

module.exports = { 
    removeDuplicates, 
    groupByLowestPrice,
    filterOffersBySeason
};
},{}],13:[function(require,module,exports){
// handlers.js: Contains functions for data handling and processing functions

const debugHandlers = 0;
if(debugHandlers) console.log('debugHandlers is set to 1');

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

module.exports = { buildProposalsQuery };
},{"./utils":15}],14:[function(require,module,exports){
const debugProposalsTransform = 0;
if(debugProposalsTransform) console.log('debugProposalsTransform is set to 1');

const { removeDuplicates, groupByLowestPric, filterOffersBySeason } = require('./filter');

const proposalsTransform = (proposalsData, endpointData, options) => {

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
    if (debugProposalsTransform) console.log('transformedData', transformedData);
    if (debugProposalsTransform) console.log('endpointData', endpointData);
    endpointData.forEach(thisOffer => {
        if (debugProposalsTransform) console.log('thisOffer:', thisOffer.acf_data);
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
    if (debugProposalsTransform) console.log('thisProposalsOffersArray:', thisProposalsOffersArray);
    

    // const uniqueProposals = removeDuplicates(thisProposalsOffersArray);

    // return thisProposalsOffersArray;
    // return removeDuplicates(thisProposalsOffersArray);
    
    

    /*
    return groupByLowestPrice(
        removeDuplicates(thisProposalsOffersArray)
    );
    */


    return removeDuplicates(
        filterOffersBySeason(
            thisProposalsOffersArray, 
            options.season ? options.season : 'both'
        )
    );
    
};

module.exports = { 
    proposalsTransform
};
},{"./filter":12}],15:[function(require,module,exports){
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
},{"../lang/languageManager":8}],16:[function(require,module,exports){
// versions/1.0.1/views/carousel.js

const debugCarousel = 0;
if(debugCarousel) console.log('debugCarousel is set to 1');

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
        if(debugCarousel) console.log('maxScrollLeft', maxScrollLeft, wwo_slidesContainer.scrollLeft + slideWidth);
        if ((wwo_slidesContainer.scrollLeft + slideWidth - 10) > maxScrollLeft) {
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

},{"../css/carousel.css":2}],17:[function(require,module,exports){
/**
 * Generates HTML for navigation categories.
 * @param {Array} uniqueCategoriesArray - Array of unique categories.
 * @returns {string} HTML string for navigation categories.
 */

const debugGenerateNavCategoriesHtml = 0;
if(debugGenerateNavCategoriesHtml) console.log('debugGenerateNavCategoriesHtml is set to 1');

require('../css/generateNavCategoriesHtml.css');

const { getLanguageStrings } = require('../lang/languageManager');

const generateNavCategoriesHtml = (uniqueCategoriesArray) => {

    const wwo_strings = getLanguageStrings();
    if (!wwo_strings) {
        console.error('Failed to get language strings in graphql/graphql');
        return;
    }

    let navCategoriesHtml = `<ul class="wwo-categories-nav">`;

    if (uniqueCategoriesArray.length > 1) {
        navCategoriesHtml += `
            <li 
                class="wwo-category-nav-item wwo-active"
                data-category="all"
                >
                ${wwo_strings.all}
            </li>
        `;
    }

    uniqueCategoriesArray.forEach((item) => {
        navCategoriesHtml += `
            <li 
                class="
                    wwo-category-nav-item 
                    ${uniqueCategoriesArray.length === 1 ? 'wwo-active' : ''}
                "
                data-category="${item.slug}"
                >
                ${item.name}
            </li>
        `;
    });

    navCategoriesHtml += `</ul><!-- .wwo-categories-nav -->`;

    // Attach event listener to handle click events
    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('wwo-category-nav-item')) {

            // Remove 'wwo-active' class from all items
            document.querySelectorAll('.wwo-category-nav-item').forEach(item => {
                item.classList.remove('wwo-active');
            });

            // Add 'wwo-active' class to the clicked item
            event.target.classList.add('wwo-active');

            // Update the corresponding grid or carousel items based on category
            const clickedCategory = event.target.getAttribute('data-category');
            updateGridOrCarouselItems(clickedCategory);
            document.querySelectorAll('.wwo-single-element').forEach(item => {
                if(item.classList.contains(`wwo-family-${clickedCategory}`) || clickedCategory === 'all') {
                    item.classList.add('wwo-active');
                } else {
                    item.classList.remove('wwo-active');
                }
            });
        }
    });


    return navCategoriesHtml;
};

function updateGridOrCarouselItems(category) {
    const gridOrCarouselItems = document.querySelectorAll('.wwo-single-element, .wwo-slide');

    gridOrCarouselItems.forEach(item => {
        if (item.classList.contains(`wwo-family-${category}`)) {
            item.classList.add('wwo-active');
        } else {
            item.classList.remove('wwo-active');
        }
    });
}

module.exports = { generateNavCategoriesHtml };
},{"../css/generateNavCategoriesHtml.css":3,"../lang/languageManager":8}],18:[function(require,module,exports){
const debugHtmlBuilder = 0;
if (debugHtmlBuilder) console.log('debugHtmlBuilder is set to 1');

const { formatDateRange, addDaysToDate } = require('../utils/utils');
const { getUniqueCategories } = require('../utils/categoryUtils');
const { generateNavCategoriesHtml } = require('./generateNavCategoriesHtml');
const { getLanguageStrings } = require('../lang/languageManager');

const buildHtmlOffers = (proposalsOffersArray, displayMode) => {
    if (debugHtmlBuilder) console.log('proposalsOffersArray in buildHtmlOffers function', proposalsOffersArray);

    if (!proposalsOffersArray || proposalsOffersArray.length === 0) {
        const wwo_strings = getLanguageStrings();
        if (!wwo_strings) {
            console.error('Failed to get language strings in graphql/graphql');
            return;
        }
        return `<div class="wwo-offer-container wwo-slider-wrapper wwo-no-offers">${wwo_strings.no_offers}</div>`;
    }

    const uniqueCategoriesArray = getUniqueCategories(proposalsOffersArray);
    const navCategoriesHtml = generateNavCategoriesHtml(uniqueCategoriesArray);

    let html = generateContainerStartHtml(displayMode, navCategoriesHtml);
    
    proposalsOffersArray.forEach((item) => {
        const thisProperty = getPropertyForProposal(item);
        if (thisProperty) {
            html += generateOfferHtml(item, thisProperty, displayMode);
        }
    });

    html += generateContainerEndHtml(displayMode);
    return html;
};

const generateContainerStartHtml = (displayMode, navCategoriesHtml) => {
    return displayMode === 'carousel' ? `
        <div class="wwo-offer-container wwo-slider-wrapper">
            ${navCategoriesHtml}
            <button class="wwo-slide-arrow" id="wwo-slide-arrow-prev">
                &#8249;
            </button>
            <button class="wwo-offers-container wwo-slide-arrow" id="wwo-slide-arrow-next">
                &#8250;
            </button>
            <ul class="wwo-offers-container wwo-slides-container" id="wwo-slides-container">
        `
        :
        `
        <div class="wwo-offer-container wwo-grid-wrapper">
            ${navCategoriesHtml}
            <ul class="wwo-grid-container" id="wwo-grid-container">
        `;
};

const generateContainerEndHtml = (displayMode) => {
    return `
            </ul><!-- .${displayMode === 'carousel' ? 'wwo-slides-container' : 'wwo-grid-container'} -->
        </div><!-- .wwo-offer-container -->
    `;
};

const getPropertyForProposal = (item) => {
    for (const property of item.offer.properties) {
        if (property.ws_establishment_id * 1 === item.proposal.propertyId * 1) {
            return property;
        }
    }
    if (debugHtmlBuilder) console.log('No property found for proposal:', item.proposal);
    return null;
};

const generateOfferHtml = (item, property, displayMode) => {
    const categoryClasses = item.offer.offers_categories.map(category => `wwo-family-${category.slug}`).join(' ');
    const disponibilityRange = formatDateRange(
        item.proposal.formattedDate,
        addDaysToDate(item.proposal.formattedDate, item.proposal.nbDays)
    );

    return `
        <li class="wwo-single-element wwo-grid-item wwo-active ${categoryClasses}">
            <div class="${displayMode === 'carousel' ? `wwo-offer wwo-single-element ${categoryClasses}` : 'wwo-grid-element'}">
                <div class="wwo-offer-item">
                    <div class="wwo-featured-image-wrapper">
                        <img class="wwo-featured-image" src="${property.acf_featured_image.url}" alt="${property.acf_featured_image.alt}" />
                    </div>
                    <div class="wwo-offer-wrapper">
                        <div class="offer-title">
                            ${property.post_title}
                        </div>
                        <div class="wwo-disponibility-dates">
                            ${disponibilityRange}
                        </div>
                        <div class="wwo-offer-price">
                            <span class="wwo-offer-price-amount">${item.proposal.price.amount}</span> <span class="wwo-offer-price-currency">&euro;</span>
                        </div>
                    </div>
                    ${generateDebugHtml(item, property, categoryClasses)}
                </div>
            </div>
        </li>
    `;
};

const generateDebugHtml = (item, property, categoryClasses) => {
    // if (!debugHtmlBuilder) return '';
    return `
        <div style="border: 1px #000 solid;font-size: 0.7em;padding: 0.2em;">
            <span style="background-color: #000;color: #fff;">offers_categories</span>
            ${categoryClasses}
        </div>
        <div style="border: 1px #000 solid;font-size: 0.7em;padding: 0.2em;">
            <span style="background-color: #000;color: #fff;">proposalKey</span>
            ${item.proposal.proposalKey}
        </div>
        <div style="border: 1px #000 solid;font-size: 0.7em;padding: 0.2em;">
            offer.ID: ${item.offer.ID}<br />
            offer.acf_offers_season: ${item.offer.acf_offers_season}<br />
            proposal.propertyId: ${item.proposal.propertyId}<br />
        </div>
    `;
};

module.exports = { buildHtmlOffers };

},{"../lang/languageManager":8,"../utils/categoryUtils":11,"../utils/utils":15,"./generateNavCategoriesHtml":17}]},{},[7])(7)
});
