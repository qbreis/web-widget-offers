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
var css = "#wwo-offers-list{display:flex;justify-content:center}.wwo-slider-wrapper{margin:1rem;position:relative;overflow:hidden;width:900px}.wwo-slides-container{width:900px;border:3px transparent solid;display:flex;overflow:scroll;scroll-behavior:smooth;list-style:none;margin:0;padding:0;width:100%}.wwo-offer-item{background-color:#cfcfcf;margin:.5em;height:550px;border-radius:20px;overflow:hidden}.wwo-slide-arrow{position:absolute;display:flex;top:0;bottom:0;margin:auto;height:4rem;background-color:#fff;border:none;width:2rem;font-size:3rem;padding:0;cursor:pointer;opacity:.5;transition:opacity .1s;z-index:1}.wwo-slide-arrow:focus,.wwo-slide-arrow:hover{opacity:1}#wwo-slide-arrow-prev{left:0;padding-left:.25rem;border-radius:0 2rem 2rem 0}#wwo-slide-arrow-next{right:0;padding-left:.75rem;border-radius:2rem 0 0 2rem}.wwo-slide{width:100%;height:100%;flex:1 0 100%;display:flex}.wwo-slides-container{scrollbar-width:none;-ms-overflow-style:none}.wwo-slides-container::-webkit-scrollbar{width:0;height:0}.wwo-grid-container{margin:0;padding:0;list-style:none;display:flex;flex-wrap:wrap;justify-content:center}.wwo-grid-item{width:33.33%;min-width:33.33%}.wwo-grid-wrapper{margin:1rem;position:relative;width:900px}.wwo-single-element{cursor:pointer}@media screen and (max-width:1000px){.wwo-grid-item{width:50%;min-width:50%}}@media screen and (max-width:700px){.wwo-grid-item{width:100%;min-width:100%}}"; (require("browserify-css").createStyle(css, { "href": "versions\\1.0.2\\css\\carousel.css" }, { "insertAt": "bottom" })); module.exports = css;
},{"browserify-css":1}],3:[function(require,module,exports){
var css = "ul.wwo-categories-nav{margin:0;padding:0;list-style:none;display:flex;justify-content:center}ul.wwo-categories-nav li.wwo-category-nav-item{background-color:#ddd;padding:.5em;margin:.5em;cursor:pointer;transition:all .35s}ul.wwo-categories-nav li.wwo-category-nav-item.wwo-active,ul.wwo-categories-nav li.wwo-category-nav-item:hover{background-color:#aaa}ul.wwo-grid-container li.wwo-single-element,ul.wwo-offers-container li.wwo-single-element{display:none}ul.wwo-grid-container li.wwo-single-element.wwo-active,ul.wwo-offers-container li.wwo-single-element.wwo-active{display:block}li.wwo-single-element{opacity:.3}li.wwo-single-element.wwo-lowest-price{opacity:1}"; (require("browserify-css").createStyle(css, { "href": "versions\\1.0.2\\css\\generateNavCategoriesHtml.css" }, { "insertAt": "bottom" })); module.exports = css;
},{"browserify-css":1}],4:[function(require,module,exports){
var css = ".wwo-modal{background-color:rgba(0,0,0,.8);position:fixed;z-index:100;width:100vw;height:100vh;top:0;left:0;opacity:0;pointer-events:none;transition:all .35s}.wwo-modal.wwo-active{opacity:1;pointer-events:auto}.wwo-modal .wwo-modal-content{background-color:#fff;width:50%;height:100%;overflow-y:auto;position:absolute;top:0;right:-50%;transition:all .35s}.wwo-modal.wwo-active .wwo-modal-content{right:0}.wwo-modal-close{cursor:pointer;position:fixed;top:0;right:.5em;font-size:2em;width:50px;height:50px;display:flex;justify-content:center;align-items:center}#wwo-modal-container{padding:1em;padding-top:0;margin-top:50px}.wwo-establishment-proposal,.wwo-room-type-proposal{background-color:#cfcfcf;padding:1em;margin:1em 0;border-radius:20px}.wwo-room-type-data,.wwo-room-type-info{padding:1em}.wwo-room-type-data .wwo-my-selection-title{font-weight:700;font-size:1.1em;padding:1em 0}.wwo-room-type-data .wwo-my-selection-room-title{font-weight:700}.wwo-proposals-counter{background-color:rgba(0,0,0,.5);border-radius:10px;padding:.2em .4em;margin:0 .2em 0 0;color:#fff}.wwo-room-quantity-1{background-color:#e1e1e1;color:#000}.wwo-price{font-size:2em;background-color:rgba(0,0,0,.5);border-radius:10px;padding:.2em .4em;margin:0 .2em 0 0;color:#fff;margin:.5em 0;text-align:center}.wwo-offer-button-text,.wwo-room-type-proposal-link{background-color:#e1e1e1;border:0;border-radius:5px;text-transform:uppercase;font-weight:700;width:100%;padding:.5em;cursor:pointer}.wwo-details{font-size:1rem}.wwo-details:after{content:', '}.wwo-details:last-child:after{content:''}.wwo-accommodation-details{list-style:none;padding:0;margin:0;display:flex;flex-wrap:wrap;align-items:center}.wwo-accommodation-details li{background-color:#e1e1e1;border-radius:5px;padding:.2em .4em;margin:0 .5em 0 0}.wwo-disponibility-dates,.wwo-disponibility-range{color:rgba(0,0,0,.5);padding:.5em 0}.wwo-modal-header{display:flex;align-items:center;padding:1em}.wwo-offer-season,.wwo-offer-title{font-size:1.5em;font-weight:700;padding:.5em 0}.wwo-offer-season{text-transform:capitalize}.wwo-list-of-offers{list-style:none;padding:0;margin:0}.wwo-list-of-offers .wwo-list-of-accommodations .wwo-accommodation-item{padding:.2em 0;margin-bottom:.5em}.wwo-list-of-offers li{background-color:#cfcfcf;padding:1em;border-bottom:1px solid #e1e1e1}.wwo-offers-togle-title{font-size:1.1em;font-weight:700;background-color:#cfcfcf;padding:.5em;cursor:pointer;border-bottom:1px solid #e1e1e1}.wwo-offers-list-section{margin:1em 0}.wwo-price-amount{font-size:1.5em;font-weight:700}.wwo-image-gallery{list-style:none;padding:0;margin:0;display:flex;flex-wrap:wrap;align-items:center}.wwo-image-gallery li{height:200px;width:50%;background-color:rgba(255,0,0,.5)}.wwo-image-gallery li:nth-child(n+4){display:none}@media screen and (max-width:1000px){.wwo-modal-content{width:65%!important}}@media screen and (max-width:700px){.wwo-modal-content{width:100%!important}}.wwo-room-type-proposal{display:flex;align-items:center;justify-content:center}.wwo-list-of-offers li .wwo-list-of-accommodations{display:flex;align-items:center;justify-content:space-between}.wwo-list-of-offers li .wwo-list-of-accommodations .wwo-accommodation-items{width:40%}.wwo-list-of-offers li .wwo-list-of-accommodations .wwo-price-amount{width:20%;text-align:center}.wwo-list-of-offers li .wwo-list-of-accommodations .wwo-disponibility-extract{width:40%}.wwo-accommodation-items .wwo-accommodation-item .wwo-accommodation-data{display:none}.wwo-list-of-offers .offer-item{opacity:.5;height:0;overflow:hidden;padding:0 1em;transition:all .2s;border-bottom:0}.wwo-list-of-offers .offer-item.active{opacity:1;height:auto;padding:1em;border-bottom:1px solid #e1e1e1}.wwo-open-close-disponibilities{display:flex;justify-content:center;align-items:center;color:#fff;padding:.5em;cursor:pointer;background-color:rgba(0,0,0,.5)}.wwo-open-close-disponibilities span{display:none}.wwo-open-close-disponibilities span.active{display:block}.wwo-offers-togle-title{position:relative;padding-right:calc(40px + .5em)}.wwo-offers-togle-title .wwo-open-close-disponibilities{position:absolute;right:0;top:0;display:block;justify-content:center;align-items:center;color:#fff;padding:0;cursor:pointer;background-color:rgba(0,0,0,.5)}.wwo-offers-togle-title .wwo-open-close-disponibilities .wwo-less-offers,.wwo-offers-togle-title .wwo-open-close-disponibilities .wwo-more-offers{width:40px;height:40px;overflow:hidden;text-indent:45px;white-space:nowrap}.wwo-offers-togle-title .wwo-open-close-disponibilities .wwo-less-offers:after,.wwo-offers-togle-title .wwo-open-close-disponibilities .wwo-more-offers:after{position:absolute;right:10px;top:5px;font-size:1.5em}.wwo-offers-togle-title .wwo-open-close-disponibilities .wwo-more-offers:after{content:'+'}.wwo-offers-togle-title .wwo-open-close-disponibilities .wwo-less-offers:after{content:'-';right:15px;top:2px}"; (require("browserify-css").createStyle(css, { "href": "versions\\1.0.2\\css\\modal.css" }, { "insertAt": "bottom" })); module.exports = css;
},{"browserify-css":1}],5:[function(require,module,exports){
var css = "#web-widget-container,#wwo-modal{font-family:\"Helvetica Neue\",Helvetica,Arial,sans-serif}.wwo-offer-container.wwo-environment-preprod .wwo-debug-container,.wwo-offer-container.wwo-environment-preproduction .wwo-debug-container,.wwo-offer-container.wwo-environment-prod .wwo-debug-container,.wwo-offer-container.wwo-environment-production .wwo-debug-container{display:none!important}.wwo-offer-container.wwo-environment-dev .wwo-offer-item{height:800px}.wwo-featured-image-wrapper{height:200px;overflow:hidden}.wwo-offer-wrapper{padding:.5em}.wwo-featured-image{width:100%;height:100%;object-fit:cover}.offer-title{font-weight:700;font-size:1.2em}.wwo-no-offers{text-align:center;padding:1em}"; (require("browserify-css").createStyle(css, { "href": "versions\\1.0.2\\css\\style.css" }, { "insertAt": "bottom" })); module.exports = css;
},{"browserify-css":1}],6:[function(require,module,exports){
// graphql.js: Contains functions related to constructing and handling GraphQL queries.

const debugGraphql = 0;
if(debugGraphql) console.log('debugGraphql is set to 1');

const { fetchSessionData, fetchProposalsData } = require('../utils/api');
const { buildProposalsQuery } = require('../utils/handlers');
const { proposalsTransform } = require('../utils/proposalsTransform');
const { buildHtmlOffers } = require('../views/htmlBuilder');
const { initCarousel } = require('../views/carousel');
const { initModal } = require('../views/modal');

const { setProposalsOffersArray } = require('../utils/proposalsOffersArray'); // Import the shared data module to store the proposalsOffersArray.
const { deleteCookie } = require('../utils/cookies');
const wwo_graphqlQueries = require('./graphqlQueries');

/*
endpointData:

[
    {
        "get_the_title": "Nos cours de séjours",
        "ID": 649,
        "acf_data": [
            {
                "offer-date-start": "05/08/2024",
                "offer-date-end": "11/08/2024",
                "offer-number-of-days": "7",
                "offer-day-of-week": "1",
                "offer-number-of-adults": "3",
                "offer-children": [
                    {
                        "age_de_lenfant": "3"
                    },
                    {
                        "age_de_lenfant": "7"
                    },
                    {
                        "age_de_lenfant": "7"
                    }
                ],
                "offer-dob-children": [
                    "2021-07-31",
                    "2017-07-31",
                    "2017-07-31"
                ],
                "offers_establishments": [
                    {
                        "ID": 657,
                        "post_author": "1",
                        "post_date": "2024-03-11 17:40:59",
                        "post_date_gmt": "2024-03-11 16:40:59",
                        "post_content": "",
                        "post_title": "Azureva Vacances",
                        "post_excerpt": "",
                        "post_status": "publish",
                        "comment_status": "closed",
                        "ping_status": "closed",
                        "post_password": "",
                        "post_name": "ski-azureva-vacances",
                        "to_ping": "",
                        "pinged": "",
                        "post_modified": "2024-05-02 09:16:01",
                        "post_modified_gmt": "2024-05-02 07:16:01",
                        "post_content_filtered": "",
                        "post_parent": 0,
                        "guid": "http://localhost/leskarellis-2/documents/?post_type=establishment&#038;p=657",
                        "menu_order": 10,
                        "post_type": "establishment",
                        "post_mime_type": "",
                        "comment_count": "0",
                        "filter": "raw",
                        "ws_establishment_id": "5",
                        "acf_h1_title": "",
                        "acf_h1_subtitle": "",
                        "acf_featured_image": false
                    },

                    ...
                
                ]
            }
        ],
        "acf_offers_season": "both",
        "acf_offers_description_content": "<p>dddd</p>\n",
        "post_name": "ski-arc-en-ciel"
    },

    ...

]
*/
const runGraphql = async (options, endpointData) => {
    try {
        const sessionString = await fetchSessionData(options, wwo_graphqlQueries.getSession);
        if (debugGraphql) console.log('sessionString', sessionString);
        await handleSessionData(sessionString, options, endpointData);
    } catch (error) {
        console.error('Error en runGraphql:', error);
    }
};

const handleSessionData = async (sessionString, options, endpointData) => {
    const proposalsQuery = buildProposalsQuery(sessionString, endpointData);
    try {
        let proposalsData = await fetchProposalsData(options.graphqlConfig.endpointUrl, proposalsQuery);
        if (debugGraphql) console.log('Datos recibidos getProposals de GraphQL endpoint ' + options.graphqlConfig.endpointUrl + ':', proposalsData.data);

        if (proposalsData.errors && proposalsData.errors.length > 0) {
            if (debugGraphql) console.log('proposalsData.errors', proposalsData.errors);
            
            deleteCookie(options.sessionCookieName);
            runGraphql(options, endpointData);
            return;
        }

        if (debugGraphql) console.log('offers in endpointData:', endpointData);

        // To create a new object that combines offers from endpointData with proposals from proposalsData, you can iterate through each offer in endpointData and then iterate through acf_data within each offer. During this process, you can match and combine relevant proposals from proposalsData. 
        const proposalsOffersArray = proposalsTransform(proposalsData, endpointData, options);

        if (debugGraphql) console.log('proposalsOffersArray', proposalsOffersArray);

        setProposalsOffersArray(proposalsOffersArray); // Set the proposalsOffersArray using the shared data module

        const htmlOffersOutput = buildHtmlOffers(proposalsOffersArray, options, endpointData);
        
        const containerOffersOutput = document.getElementById('wwo-offers-list');
        if (debugGraphql) console.log('options.display.mode', options.display.mode);
        if (containerOffersOutput) {
            containerOffersOutput.innerHTML = htmlOffersOutput;
            if(options.display.mode === 'carousel' || options.display.mode === 'slides' || options.display.mode === 'slide') initCarousel();
        } else {
            console.error(`Element with id wwo-offers-list not found.`);
        }
        initModal();

    } catch (error) {
        console.error('Error fetching proposals data:', error);
    }
};

module.exports = { runGraphql, handleSessionData };
},{"../utils/api":11,"../utils/cookies":12,"../utils/handlers":15,"../utils/proposalsOffersArray":17,"../utils/proposalsTransform":18,"../views/carousel":23,"../views/htmlBuilder":26,"../views/modal":27,"./graphqlQueries":7}],7:[function(require,module,exports){
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

},{}],8:[function(require,module,exports){
'use strict';

const debugIndex = 0;
if (debugIndex) console.log('debugIndex is set to 1');

const { setOptionsOffers } = require('./utils/optionsOffers');
require('./css/style.css');
// require('./css/modal.css');

// Importing language strings
const { initLanguage, getLanguageStrings } = require('./lang/languageManager');

// Importing GraphQL queries and utilities
const { runGraphql } = require('./graphql/graphql');

// Importing modal initialization
const { initModal } = require('./views/modal');

// Main widget initialization function
function initWidget(options) {
    setOptionsOffers(options);
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
            if (debugIndex) console.log('Data from WP endpoint ' + options.endpointUrl + ':', data);
            runGraphql(options, data); // versions\1.0.2\graphql\graphql.js
        })
        .catch(error => {
            console.error('Error fetching data from options.endpointUrl:', error);
        });

    // Building the widget's HTML
    let html = `<div id="ww-main-container">`;
    if (['development', 'dev'].includes(options.environment)) {
        html += `
            <div style="border: 2px #ccc solid;margin: 1em 0;padding: 0.5em;">
                <h2>Widget options (v. 1.0.2)</h2>
                <ul>
                    <li><strong>id</strong>: ${options.id} &#8212; Es el id de la etiqueta HTML donde se implementa el widget.</li>
                    <li><strong>language</strong>: ${options.language}</li>
                    <li><strong>endpointUrl</strong>: <a href="${options.endpointUrl}" target="_blank">${options.endpointUrl}</a> &#8212; URL del punto de acceso para obtener las ofertas de WordPress.</li>
                    <li><strong>graphqlConfig.endpointUrl</strong>: ${options.graphqlConfig.endpointUrl} &#8212; URL del punto de acceso para obtener las disponibilidades por GraphQL.</li>
                    <li><strong>graphqlConfig.username</strong>: ${options.graphqlConfig.username}<br />
                    <li><strong>sessionCookieName</strong>: ${options.sessionCookieName} &#8212; Name of the cookie to store the session name string to query GraphQL. By default this name will be just 'session'.<br />
                    <li><strong>season</strong>: ${options.season} &#8212; winter | summer | both (default) <br />
                    <li><strong>display.mode</strong>: ${options.display.mode} &#8212; Cómo se muestran las ofertas, puede ser: grid | carousel.<br />
                    <li><strong>display.upselling.active</strong>: ${options.display.upselling?.active} &#8212; If "upselling" offers are displayed. By default they are not shown.<br />
                    <li><strong>display.upselling.limit</strong>: ${options.display.upselling?.limit} &#8212; How many offers must be shown. By default 30.<br />
                    <li><strong>display.crossSelling.active</strong>: ${options.display.crossSelling?.active} &#8212; If "cross-selling" offers are displayed. By default they are not shown.<br />
                    <li><strong>display.upselling.limit</strong>: ${options.display.crossSelling?.limit} &#8212; How many offers must be shown. Limit of cross-selling offers for each range of dates, this is different from upselling limit, which is for the same only one range of dates. By default, it is set to 30.<br />
                </ul>
            </div><!-- .widget-options -->
        `;
    }

    html += `
        <div id="wwo-offers-list"></div><!-- #wwo-offers-list -->
        <!--
        <div id="ww-offers-list"></div>
        -->
    `;

    html += `</div><!-- #ww-main-container -->`;

    // Injecting the main widget HTML into the specified container
    const container = document.getElementById(options.id);
    if (container) {
        container.innerHTML = html;
    } else {
        console.error(`Element with id ${options.id} not found.`);
    }

    // Initialize the modal
    initModal();
}

module.exports = { initWidget };

},{"./css/style.css":5,"./graphql/graphql":6,"./lang/languageManager":9,"./utils/optionsOffers":16,"./views/modal":27}],9:[function(require,module,exports){
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

},{"./languages":10}],10:[function(require,module,exports){
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
                'square-meters' : 'm2',
                'people-max' : 'personas máx.',
                'beds': 'camas',
                'nights': 'noches',
                'adults': 'adultos',
                'children': 'niños',
                'summer': 'verano',
                'winter': 'invierno',
                'upselling-title': 'Ofertas filtradas para mismas fechas y misma categoría',
                'cross-selling-title': 'Ofertas filtradas para otras fechas y misma categoría',
                'no-offers-found': 'No se han encontrado ofertas para las fechas seleccionadas.',
                'priceFrom': 'Desde',
                'seeOffer': 'Reservar',
                'mySelection': 'Mi selección',
                'viewAvailabilityFrom': 'Ver Disponibilidad del',
                'fromPrice': 'Desde',
                'moreOffers': 'Más ofertas',
                'lessOffers': 'Menos ofertas',
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
                'square-meters' : 'm2',
                'people-max' : 'pers max',
                'beds': 'beds',
                'nights': 'nights',
                'adults': 'adults',
                'children': 'children',
                'summer': 'summer',
                'winter': 'winter',
                'upselling-title': 'Filtered Offers for same range of dates and same category',
                'cross-selling-title': 'Filtered Offers for other range of dates and same category',
                'no-offers-found': 'No offers found for the selected dates.',
                'priceFrom': 'From',
                'seeOffer': 'Book',
                'mySelection': 'My selection',
                'viewAvailabilityFrom': 'View Availability from',
                'fromPrice': 'From',
                'moreOffers': 'More offers',
                'lessOffers': 'Less offers',
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
                'square-meters' : 'm2',
                'people-max' : 'pers max',
                'beds': 'lits',
                'nights': 'nuits',
                'adults': 'adultes',
                'children': 'enfants',
                'summer': 'été',
                'winter': 'hiver',
                'upselling-title': 'Autres hébergements Disponibilités sur ces dates',
                'cross-selling-title': 'Offres filtrées pour d\'autres dates et même catégorie',
                'no-offers-found': 'Aucune offre trouvée pour les dates sélectionnées.',
                'priceFrom': 'À partir de',
                'seeOffer': 'Réservez',
                'mySelection': 'Ma sélection',
                'viewAvailabilityFrom': 'Voir Les Disponibilités du',
                'fromPrice': 'A partir de',
                'moreOffers': 'Plus d\'offres',
                'lessOffers': 'Moins d\'offres',
        }
        break;
        
    }
    return wwo_translationChains;
}
module.exports = { getString };
},{}],11:[function(require,module,exports){
// utils/api.js - Contains functions related to fetching data from APIs.

const { checkCookieExistence, setCookie, getCookie } = require('../utils/cookies');

// Define a function to fetch session data as asynchronous function designed to fetch session data for a given username from a specified GraphQL endpoint
const fetchSessionData = async (options, graphqlQuery) => {
    try {
        let sessionCookieName = options.sessionCookieName || 'session';

        if (checkCookieExistence(sessionCookieName)) { 
            // if there is cookie 'session' then get the value of the cookie and return it.
            return getCookie(sessionCookieName);
        }

        // Fetch data if 'session' cookie is not found
        const response = await fetch(options.graphqlConfig.endpointUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: graphqlQuery,
                variables: { username: options.graphqlConfig.username },
            })
        });

        if (!response.ok) {
            throw new Error('Error al realizar la solicitud HTTP a getSession');
        }

        const data = await response.json();
        const sessionNameValue = data.data.getSession.name;

        // Store the session value in a cookie 'session, so next time we do not need to fetch it again.
        setCookie(sessionCookieName, sessionNameValue, 1);

        return sessionNameValue;
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
},{"../utils/cookies":12}],12:[function(require,module,exports){
const getCookie = function(name) {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith(name + '=')) {
            return cookie.substring(name.length + 1);
        }
    }
    return null;
}

const setCookie = function(name, value, daysToExpire) {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + daysToExpire);
    const cookie = `${name}=${value};expires=${expirationDate.toUTCString()};path=/;SameSite=Lax`;
    document.cookie = cookie;
}

const checkCookieExistence = function(name) {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith(name + '=')) {
            return true;
        }
    }
    return false;
}

const deleteCookie = function(name) {
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/';
}

module.exports = { getCookie, setCookie, checkCookieExistence, deleteCookie };
},{}],13:[function(require,module,exports){
const debugFilter = 0;
if(debugFilter) console.log('debugFilter is set to 1');

// Function to remove duplicates
function removeDuplicates(proposals) {
    const uniqueProposals = new Map();

    proposals.forEach((item) => {
        const proposal = item.proposal;
        //const key = `${proposal.proposalKey}-${proposal.propertyId}-${proposal.nbDays}-${proposal.price.amount}-${proposal.formattedDate}-${item.offer.acf_offers_season}`;
        const key = `${proposal.proposalKey}-${proposal.propertyId}-${proposal.nbDays}-${proposal.price.amount}-${proposal.formattedDate}-${item.offer.acf_offers_season}-${item.offer.ID}`;
        if (!uniqueProposals.has(key)) {
            uniqueProposals.set(key, item);
        }
    });

    return Array.from(uniqueProposals.values());
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

const getPropertyForProposal = (item) => {
    if(debugFilter) console.log('item in getPropertyForProposal function:', item, 'there are '+item.acfItem.offers_establishments.length+' offers_establishments');
    for (const property of item.acfItem.offers_establishments) {
        if(debugFilter) console.log('property.ws_establishment_id:', Number(property.ws_establishment_id), Number(item.proposal.propertyId));

        if (Number(property.ws_establishment_id) === Number(item.proposal.propertyId)) {
            return property;
        }
    }
    if(debugFilter) console.log('No property with ws_establishment_id = '+item.proposal.propertyId+' found for proposal:', item.proposal);
    return null;
};

function markLowestPriceOffers(offers) {
    // Step 1: Group offers by propertyId and offer.post_name
    const groupedOffers = offers.reduce((acc, offer) => {
        // const key = `${offer.method}_${offer.proposal.propertyId}_${offer.offer.post_name}`;
        const key = `${offer.proposal.propertyId}_${offer.offer.post_name}`;
        if (!acc[key]) {
            acc[key] = [];
        }
        acc[key].push(offer);
        return acc;
    }, {});
  
    // Step 2: Iterate over each group to find the minimum price and mark the lowest price offer
    for (const key in groupedOffers) {
        const group = groupedOffers[key];
        const minPrice = Math.min(...group.map(offer => offer.proposal.price.amount));
    
        let lowestPriceMarked = false;
    
        group.forEach(offer => {
            if (offer.proposal.price.amount === minPrice && !lowestPriceMarked) {
                offer["lowest-price"] = true;
                lowestPriceMarked = true;
            } else {
                offer["lowest-price"] = false;
            }
        });
    }
  
    return offers;
  }

module.exports = { 
    removeDuplicates, 
    filterOffersBySeason,
    getPropertyForProposal,
    markLowestPriceOffers
};
},{}],14:[function(require,module,exports){
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
},{}],15:[function(require,module,exports){
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
},{"./utils":20}],16:[function(require,module,exports){

let optionsOffers = [];

const setOptionsOffers = (data) => {

    optionsOffers = data;
};

const getOptionsOffers = () => {
    return optionsOffers;
};

module.exports = {
    setOptionsOffers,
    getOptionsOffers
};

},{}],17:[function(require,module,exports){
// sharedData.js

const { markLowestPriceOffers } = require('../utils/filter');

/*
To access the proposalsOffersArray in the modal.js component when an element is clicked, you'll need to make proposalsOffersArray available to modal.js. There are a few ways to achieve this:

    - Using a global variable: This is the simplest but least recommended way because it can lead to potential issues with global state.

    - Passing data via a shared service/module: This is a better approach where you use a shared service or module to store and retrieve data.

    - Event-driven approach: Emitting events and passing data through event listeners.

Here's an example of how you can use a shared service/module to store and retrieve the proposalsOffersArray:
*/

let proposalsOffersArray = [];

const setProposalsOffersArray = (data) => {

    proposalsOffersArray = markLowestPriceOffers(data);
};

const getProposalsOffersArray = () => {
    return proposalsOffersArray;
};

module.exports = {
    setProposalsOffersArray,
    getProposalsOffersArray
};

},{"../utils/filter":13}],18:[function(require,module,exports){
// utils/proposalsTransform.js

const { removeDuplicates, filterOffersBySeason } = require('./filter');
const transformData = require('./transformData');
const getRooms = require('./getRooms');

const debugProposalsTransform = 0;
if(debugProposalsTransform) console.log('debugProposalsTransform is set to 1');

const proposalsTransform = (proposalsData, endpointData, options) => {
    const transformedData = transformData(proposalsData.data);
    const thisProposalsOffersArray = [];
    if (debugProposalsTransform) console.log('transformedData', transformedData);
    if (debugProposalsTransform) console.log('endpointData', endpointData);
    endpointData.forEach(thisOffer => {
        if (debugProposalsTransform) console.log('thisOffer:', thisOffer);
        thisOffer.acf_data.forEach((acfItem, acfIndex) => {
            for (const key in transformedData) {
                if (transformedData.hasOwnProperty(key)) {
                    transformedData[key].proposals.forEach(proposal => {
                        if (debugProposalsTransform) console.log('proposal', proposal);
                        if (debugProposalsTransform) console.log('proposal.distribution[\'roomTypes\'][0]', proposal.distribution['roomTypes'][0]);
                        if (debugProposalsTransform) console.log('proposal.distribution[\'roomTypes\'][0].code', proposal.distribution['roomTypes'][0].code);
                        let accommodations = getRooms(proposal, thisOffer.acf_data[0].offers_establishments);
                        const combinedObject = {
                            offer: thisOffer,
                            acfItem: acfItem,
                            method: key,
                            proposal: proposal,
                            accommodation: accommodations,
                        };
                        if (debugProposalsTransform) console.log('add combinedObject:', combinedObject);
                        thisProposalsOffersArray.push(combinedObject);
                    });
                }
            }
        });
    });
    if (debugProposalsTransform) console.log('thisProposalsOffersArray:', thisProposalsOffersArray);

    if (debugProposalsTransform) console.log('returning removeDuplicates',
        removeDuplicates(
            filterOffersBySeason(
                thisProposalsOffersArray, 
                options.season ? options.season : 'both'
            )
        )
    )

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

},{"./filter":13,"./getRooms":14,"./transformData":19}],19:[function(require,module,exports){
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

},{}],20:[function(require,module,exports){
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
    date.setDate(date.getDate() + parseInt(nbDays, 10));

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
        `<span class="wwo-date wwo-date-start">${dayStart} ${monthStart}</span> <span class="wwo-to">${wwo_strings['to']}</span> <span class="wwo-date wwo-date-end">${dayEnd} ${monthEnd} ${yearEnd}</span>` :
        `<span class="wwo-date wwo-date-start">${dayStart} ${monthStart}</span> ${yearStart} <span class="wwo-to">${wwo_strings['to']}</span> <span class="wwo-date wwo-date-end">${dayEnd} ${monthEnd} ${yearEnd}</span>`;
 
    return `<span class="wwo-from">${wwo_strings['from']}</span> <span class="wwo-day-of-week">${dayOfWeek}</span> ${returnDateRange}`;
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
},{"../lang/languageManager":9}],21:[function(require,module,exports){
const { getRoomsQuantity } = require('../utils/utils');
const { getOptionsOffers } = require('../utils/optionsOffers');

const buildAccommodationHtml = (item, disponibilityRange, selectedOffer, wwo_strings, numberOfChildrenDisplay) => {

    const widgetOptions = getOptionsOffers();

    let quantity = getRoomsQuantity(selectedOffer.proposal.distribution.roomTypes, item.acf_ws_accommodation_code);

    /* Dev note: To print object in html insert this code in the returned template
    <pre>${JSON.stringify(selectedOffer.proposal.distribution, null, 2)}</pre>
    */

    /* Dev note: To see accommodation code insert this code in the returned template
    ${item.post_title} - ${item.acf_ws_accommodation_code}
    */
    
    // console.log('acf_accommodation_details: ', item.acf_accommodation_details);
    // console.log('acf_accommodation_image_gallery: ', item.acf_accommodation_image_gallery);

    return `
        <div class="wwo-room-type-proposal">
            <div class="wwo-room-type-info">
                <h2>
                    <span class="wwo-proposals-counter wwo-room-quantity-${quantity}">
                        ${quantity} x
                    </span>
                    ${item.post_title}
                </h2>
                <ul class="wwo-accommodation-details">
                    <li class="wwo-size">${item.acf_ws_accommodation_size_area} ${wwo_strings['square-meters']}</li>
                    <li class="wwo-capacity">${item.acf_ws_accommodation_pax_max} ${wwo_strings['beds']}</li>
                    <li class="wwo-beds">${item.acf_ws_accommodation_nb_beds} ${wwo_strings['people-max']}</li>
                </ul>
                <div class="wwo-accommodation-featured-image">
                    ${item.acf_featured_image ? `
                        <img src="${item.acf_featured_image.sizes['ud-thumb-500']}" alt="${item.acf_featured_image.alt}" width="200" height="200" />
                    ` : ''}
                </div>
                ${widgetOptions.display.modal.imageGallery ? buildImageGalleryHtml(item.acf_accommodation_image_gallery) : ''}
                ${widgetOptions.display.modal.accommodationDetails ? buildAccommodationDetailsHtml(item.acf_accommodation_details) : ''}
            </div><!-- .wwo-room-type-info -->
            <div class="wwo-room-type-data">
                <div class="wwo-my-selection-title">
                    ${wwo_strings.mySelection}
                </div>
                <div class="wwo-my-selection-room-title">
                    ${item.post_title}
                </div>
                <div class="wwo-disponibility-range">
                    ${disponibilityRange}
                </div>
                <div class="wwo-date-range-description">
                    <span class="wwo-details wwo-number-of-days">
                        ${selectedOffer.proposal.nbDays} ${wwo_strings.nights}
                    </span>
                    <span class="wwo-details wwo-number-of-adults">
                        ${selectedOffer.acfItem['offer-number-of-adults']} ${wwo_strings.adults}
                    </span>
                    ${numberOfChildrenDisplay ? `
                        <span class="wwo-details wwo-number-of-adults">
                            ${numberOfChildrenDisplay}
                        </span>
                    ` : ''}
                </div>
                <div class="wwo-price">
                    ${selectedOffer.proposal.price.amount} €
                </div>
                <button 
                    class="wwo-room-type-proposal-link"
                    onclick="window.open('${widgetOptions.proposalUrl}${selectedOffer.proposal.proposalKey}', '_blank')"
                    >
                    ${wwo_strings.seeOffer}
                </button>
            </div><!-- .wwo-room-type-data -->
        </div><!-- .wwo-room-type-proposal -->
    `;
};

const buildImageGalleryHtml = (imageGallery) => {
    let codeHtml = '<ul class="wwo-image-gallery">';
    imageGallery.forEach((item) => {
        codeHtml += `<li><img src="${item.sizes['ud-thumb-500']}" alt="${item.alt || item.name}" width="200" height="200" /></li>`;
    });
    codeHtml += '</ul>';
    return codeHtml;
};

const buildAccommodationDetailsHtml = (details) => {
    let codeHtml = '<ul class="wwo-accommodation-details-list">';
    details.forEach((item) => {
        codeHtml += `
            <li class="wwo-detail-type wwo-type-${item.tipo_de_detalle}">
                <span class="wwo-detail-type-name">${item.tipo_de_detalle}</span>
                <div class="wwo-details-description" style="border: 2px #000 solid;">
                    ${item.alojamiento_especificaciones_tecnicas_descripcion}
                </div>
            </li>
        `;
    });
    codeHtml += '</ul>';
    return codeHtml;
};


module.exports = { buildAccommodationHtml };
},{"../utils/optionsOffers":16,"../utils/utils":20}],22:[function(require,module,exports){
const { formatDateRange, addDaysToDate } = require('../utils/utils');
const { getPropertyForProposal } = require('../utils/filter');
const { buildAccommodationHtml } = require('./buildAccommodationHtml');
const { getOptionsOffers } = require('../utils/optionsOffers');

const getOfferSeasonDisplay = (season, wwo_strings) => {
    switch (season) {
        case 'summer':
            return ` - ${wwo_strings.summer}`;
        case 'winter':
            return ` - ${wwo_strings.winter}`;
        case 'both':
        default:
            return '';
    }
};

const buildModalHtml = (selectedOffer, wwo_strings) => {

    const widgetOptions = getOptionsOffers();

    const disponibilityRange = formatDateRange(
        selectedOffer.proposal.formattedDate,
        addDaysToDate(selectedOffer.proposal.formattedDate, selectedOffer.proposal.nbDays)
    );

    const thisProperty = getPropertyForProposal(selectedOffer);
    const numberOfChildrenDisplay = selectedOffer.acfItem['offer-children'].length !== undefined ? 
        `${selectedOffer.acfItem['offer-children'].length} ${wwo_strings.children}` : '';

    const offerSeasonDisplay = getOfferSeasonDisplay(selectedOffer.offer.acf_offers_season, wwo_strings);

    let htmlBuffer = `
        ${widgetOptions.display.modal.header ? `
            <div class="wwo-modal-header">
                <div class="wwo-offer-title">
                    ${selectedOffer.offer.get_the_title}
                </div>
                <div class="wwo-offer-season">
                    ${offerSeasonDisplay}
                </div>
            </div><!-- .wwo-modal-header -->
        ` : ''}
        ${widgetOptions.display.modal.establishment ? `
            <div class="wwo-establishment-proposal">
                <h2>
                    ${thisProperty.post_title}
                </h2>
                <div class="wwo-disponibility-dates">
                    ${disponibilityRange}
                </div>
                <div class="wwo-establishment-featured-image">
                    <img src="${thisProperty.acf_featured_image.sizes['ud-thumb-500']}" alt="${thisProperty.acf_featured_image.alt}" width="200" height="200" />
                </div>
                <div class="wwo-price">
                    <span class="wwo-offer-price-amount">
                        ${selectedOffer.proposal.price.amount}
                    </span>
                    &nbsp;
                    <span class="wwo-offer-price-currency">
                        &euro;
                    </span>
                    <span class="wwo-details wwo-number-of-days">
                        ${selectedOffer.proposal.nbDays} ${wwo_strings.nights}
                    </span>
                    <span class="wwo-details wwo-number-of-adults">
                        ${selectedOffer.acfItem['offer-number-of-adults']} ${wwo_strings.adults}
                    </span>
                    <span class="wwo-details wwo-number-of-adults">
                        ${numberOfChildrenDisplay}
                    </span>
                </div>
            </div><!-- .wwo-establishment-proposal -->
        ` : ''}
    `;

    selectedOffer.accommodation.forEach((item) => {
        // if (debugModal) console.log('item', item);
        htmlBuffer += buildAccommodationHtml(item, disponibilityRange, selectedOffer, wwo_strings, numberOfChildrenDisplay);
    });

    return htmlBuffer;
};

module.exports = { buildModalHtml };
},{"../utils/filter":13,"../utils/optionsOffers":16,"../utils/utils":20,"./buildAccommodationHtml":21}],23:[function(require,module,exports){
// versions/1.0.1/views/carousel.js

const debugCarousel = 0;
if(debugCarousel) console.log('debugCarousel is set to 1');

const wwo_css_modal = require('../css/modal.css');
const wwo_css_carousel = require('../css/carousel.css');

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

    function getSlideWidth() {
        const containerWidth = wwo_slidesContainer.clientWidth;
        if (window.innerWidth > 1000) {
            return containerWidth / 3;
        } else if (window.innerWidth > 700) {
            return containerWidth / 2;
        } else {
            return containerWidth / 1;
        }
    }

    nextButton.addEventListener('click', () => {
        const slideWidth = getSlideWidth();//wwo_slidesContainer.clientWidth / 3; // One third of the container width
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
        const slideWidth = getSlideWidth();//wwo_slidesContainer.clientWidth / 3; // One third of the container width

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
},{"../css/carousel.css":2,"../css/modal.css":4}],24:[function(require,module,exports){
const debugCrossSelling = 0;
if (debugCrossSelling) console.log('debugCrossSelling is set to 1');

const { formatDateRange, addDaysToDate, getRoomsQuantity } = require('../utils/utils');
const { getOptionsOffers } = require('../utils/optionsOffers');

const getCrossSelling = (proposalsOffersArray, selectedOffer, wwo_strings, widgetDisplayOptions, proposalUrl) => {

    // TODO: Params widgetDisplayOptions and proposalUrl are contained in the widgetOptions object!!!
    // TODO: Same thing with wwo_strings which I can get from getLanguageStrings()!!!

    const widgetOptions = getOptionsOffers();

    let widgetDisplayLimit = widgetDisplayOptions.limit ? widgetDisplayOptions.limit : 30;
    if (debugCrossSelling) console.log('proposalsOffersArray', proposalsOffersArray);
    if (debugCrossSelling) console.log('selectedOffer.method', selectedOffer.method);

    // filter the proposalsOffersArray and exclude objects where the method is the same as the selectedOffer.method
    const filteredOffers = proposalsOffersArray.filter(item => item.method !== selectedOffer.method);
    if (debugCrossSelling) console.log('filteredOffers', filteredOffers);

    // Remove duplicates based on the 'id' property
    const uniqueFilteredOffers = filteredOffers.filter((offer, index, self) =>
        index === self.findIndex((t) => t.proposal.proposalKey === offer.proposal.proposalKey)
    );
    if (debugCrossSelling) console.log('uniqueFilteredOffers:', uniqueFilteredOffers);

    /*
    I have one array object uniqueFilteredOffers like this:
    [
        0: {
            "offer": {
                "get_the_title": "Nos cours de séjours",
                "post_name": "nos-cours-de-sejours",
            },
            "proposal": {
                "nbDays": 7,
                "formattedDate": "21/12/2024"
            }

        },
        ...
    ]´

    and i want to reorder chronologically by formattedDate from the most recent to the most far away in time.... how can i do that?
    */

    const chronologicalFilteredOffers = uniqueFilteredOffers;

    // TODO: Make out of this code a function that can be reused in other parts of the code if needed

    chronologicalFilteredOffers.sort((a, b) => {
        // Parse the formattedDate into Date objects
        const dateA = new Date(a.proposal.formattedDate.split('/').reverse().join('-'));
        const dateB = new Date(b.proposal.formattedDate.split('/').reverse().join('-'));
    
        // Sort by descending order (most recent first)
        // return dateB - dateA;

        // Sort by ascending order (earliest date first)
        return dateA - dateB;
    });

    /*
    Now i want new array for each formattedDate containing all offers with same formattedDate.
    To create a new array where each sub-array contains all offers with the same formattedDate, I can use a combination of reduce and map methods in JavaScript.
    */
    // TODO: Again, make out of this code a function that can be reused in other parts of the code if needed
    // Grouping by formattedDate and nbDays
    const groupedByDateAndDays = chronologicalFilteredOffers.reduce((accumulatorArray, current) => {
        const { formattedDate, nbDays } = current.proposal;
        const key = `${formattedDate}_${nbDays}`; // Combining formattedDate and nbDays as a key
    
        if (!accumulatorArray[key]) {
            accumulatorArray[key] = [];
        }
        accumulatorArray[key].push(current);
        return accumulatorArray;
    }, {});

    // Convert the grouped object into an array of objects with formattedDate, nbDays, and offers,
    // sort each sub-array by proposal.price.amount, and limit to widgetDisplayLimit elements
    const groupedArray = Object.keys(groupedByDateAndDays).map(key => {
        const [formattedDate, nbDays] = key.split('_');
        const sortedOffers = groupedByDateAndDays[key]
            .sort((a, b) => a.proposal.price.amount - b.proposal.price.amount)
            .slice(0, widgetDisplayLimit);
        const lowestPrice = sortedOffers[0]?.proposal.price.amount; // The lowest price will be the first in the sorted array

        return {
            formattedDate: formattedDate,
            nbDays: parseInt(nbDays, 10),
            formattedDateEnd: addDaysToDate(formattedDate, nbDays),
            lowestPrice: lowestPrice,
            offers: sortedOffers,
        };
    });

    let listOfOffersCrossSellingOutput = '';

    groupedArray.forEach((group) => {
        // console.log('group:', group);
        listOfOffersCrossSellingOutput += `
        <div class="wwo-offers-list-section">
            <div class="wwo-offers-togle-title">
                ${wwo_strings.viewAvailabilityFrom} ${group.formattedDate} ${wwo_strings.to} ${group.formattedDateEnd} | ${wwo_strings.fromPrice} ${group.lowestPrice}€
                <div class="wwo-open-close-disponibilities">
                    <span class="wwo-more-offers active">Plus d'offres</span>
                    <span class="wwo-less-offers"">Moins d'offres</span>
                </div><!-- .wwo-open-close-disponibilities -->
            </div><!-- .wwo-offers-togle-title -->
            <ul class="wwo-list-of-offers">
        `;

        group.offers.forEach((offerItem, index) => {
            // Determine if the current item should have the 'active' class
            const activeClass = index === 0 ? 'active' : '';
            listOfOffersCrossSellingOutput += `
                <li class="offer-item offer-item-${index} ${activeClass}">
                    <div class="wwo-list-of-accommodations">
                        <div class="wwo-accommodation-items">
                        `;
            offerItem.accommodation.forEach((accommodationItem) => {
                let quantity = getRoomsQuantity(offerItem.proposal.distribution.roomTypes, accommodationItem.acf_ws_accommodation_code);
                listOfOffersCrossSellingOutput += `
                            <div class="wwo-accommodation-item">
                                <span class="wwo-proposals-counter wwo-room-quantity-${quantity}">
                                    ${quantity} x
                                </span>
                                <strong>${accommodationItem.post_title}</strong>
                                <div class="wwo-accommodation-data">
                                    (${accommodationItem.acf_ws_accommodation_nb_beds} ${wwo_strings.beds}, ${accommodationItem.acf_ws_accommodation_pax_max} ${wwo_strings['people-max']}, ${accommodationItem.acf_ws_accommodation_size_area} ${wwo_strings['square-meters']})
                                </div><!-- .wwo-accommodation-data -->
                            </div><!-- .wwo-accommodation-item -->
                        `;
                    });
                listOfOffersCrossSellingOutput += `
                        </div><!-- .wwo-accommodation-items -->
                `;
                listOfOffersCrossSellingOutput += `
                        <div class="wwo-price-amount">
                            ${offerItem.proposal.price.amount} &euro;
                        </div><!-- .wwo-price-amount -->
                `;
                listOfOffersCrossSellingOutput += `
                        <div class="wwo-disponibility-extract">
                            <div class="wwo-disponibility-range">
                                ${formatDateRange(
                                    offerItem.proposal.formattedDate,
                                    addDaysToDate(offerItem.proposal.formattedDate, offerItem.proposal.nbDays)
                                )}
                            </div><!-- .wwo-disponibility-range -->
                            <div class="wwo-disponibility-details">
                                <div class="wwo-date-range-description">
                                    <span class="wwo-details wwo-number-of-days">
                                        ${offerItem.proposal.nbDays} ${wwo_strings.nights}
                                    </span>
                                    <span class="wwo-details wwo-number-of-adults">
                                        ${offerItem.acfItem['offer-number-of-adults']} ${wwo_strings.adults}
                                    </span>
                                    ${offerItem.acfItem['offer-children'].length ? `
                                        <span class="wwo-details wwo-number-of-adults">
                                            ${offerItem.acfItem['offer-children'].length} ${wwo_strings.children}
                                        </span>
                                    ` : ''}
                                </div><!-- .wwo-date-range-description -->
                            </div><!-- .wwo-disponibility-details -->
                            <button 
                                class="wwo-offer-button-text" 
                                onclick="window.open('${proposalUrl}${offerItem.proposal.proposalKey}', '_blank', 'noopener noreferrer');">
                                    ${wwo_strings.seeOffer}
                            </button>
                        </div><!-- .wwo-disponibility-extract -->
                    </div><!-- .wwo-list-of-accommodations -->
                </li>
            `;
        });
        listOfOffersCrossSellingOutput += `
            </ul><!-- .wwo-list-of-offers -->
            <div class="wwo-open-close-disponibilities">
                <span class="wwo-more-offers active">${wwo_strings.moreOffers}</span>
                <span class="wwo-less-offers">${wwo_strings.lessOffers}</span>
            </div>
        </div><!-- .wwo-offers-list-section -->
        `;
    });

    return listOfOffersCrossSellingOutput;
}

module.exports = { getCrossSelling };
},{"../utils/optionsOffers":16,"../utils/utils":20}],25:[function(require,module,exports){
/**
 * Generates HTML for navigation categories.
 * @param {Array} uniqueCategoriesArray - Array of unique categories.
 * @returns {string} HTML string for navigation categories.
 */

const onlyDev = false;
if(onlyDev) console.log('versions/1.0.2/views/generateNavCategoriesHtml.js: onlyDev is set to 1');

const debugGenerateNavCategoriesHtml = 0;
if(debugGenerateNavCategoriesHtml) console.log('debugGenerateNavCategoriesHtml is set to 1');

require('../css/generateNavCategoriesHtml.css');
const { getLanguageStrings } = require('../lang/languageManager');

const generateNavCategoriesHtml = (endpointData) => {

    const wwo_strings = getLanguageStrings();
    if (!wwo_strings) {
        console.error('Failed to get language strings in graphql/graphql');
        return;
    }
    let navCategoriesHtml = `<ul class="wwo-categories-nav">`;
    if(debugGenerateNavCategoriesHtml) console.log('endpointData in generateNavCategoriesHtml function', endpointData);
    
    let isFirstItem = true;
    if ( onlyDev ) {
        /** Development */
        isFirstItem = false; // in production set to false and remove next line assignment
        navCategoriesHtml += `
                <li 
                    class="wwo-category-nav-item wwo-active"
                    data-category="all"
                    >
                    ${wwo_strings.all}
                </li>
            `;
    } else {
        /** production */
        isFirstItem = true;
    }

    

    endpointData.forEach((item) => {
        // console.log('item in generateNavCategoriesHtml function', item);
        navCategoriesHtml += `
            <li 
                class="
                    wwo-category-nav-item 
                    ${isFirstItem ? 'wwo-active' : ''}
                "
                data-category="${item.post_name}"
                >
                ${item.get_the_title}
            </li>
        `;
        isFirstItem = false;  // Set flag to false after the first iteration
    });
    navCategoriesHtml += `</ul><!-- .wwo-categories-nav -->`;

    // Attach event listener to handle click events
    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('wwo-category-nav-item')) {
            if(debugGenerateNavCategoriesHtml) console.log('click on .wwo-category-nav-item');
            // Remove 'wwo-active' class from all items
            document.querySelectorAll('.wwo-category-nav-item').forEach(item => {
                item.classList.remove('wwo-active');
            });
            // Add 'wwo-active' class to the clicked item
            event.target.classList.add('wwo-active');
            // Update the corresponding grid or carousel items based on category
            const clickedCategory = event.target.getAttribute('data-category');
            if(debugGenerateNavCategoriesHtml) console.log('clickedCategory: '+clickedCategory);
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
},{"../css/generateNavCategoriesHtml.css":3,"../lang/languageManager":9}],26:[function(require,module,exports){
const debugHtmlBuilder = 0;
if (debugHtmlBuilder) console.log('debugHtmlBuilder is set to 1');

const onlyDev = false;
if(onlyDev) console.log('versions/1.0.2/views/htmlBuilder.js: onlyDev is set to 1');

const { formatDateRange, addDaysToDate } = require('../utils/utils');
const { generateNavCategoriesHtml } = require('./generateNavCategoriesHtml');
const { getLanguageStrings } = require('../lang/languageManager');
const { getPropertyForProposal } = require('../utils/filter');

/**
 * Function to build the HTML string for the offers.
 * 
 * @param {*} proposalsOffersArray - Array of proposals and offers. Each item in the array is an object with the following structure:
 * {
 *    offer: { ID, acf_offers_season, offers_categories },
 *    acfItem: { offer-date-start, offer-date-end, offer-day-of-week },
 *    method: key,
 *    proposal: { proposalKey, propertyId, price, formattedDate, nbDays },
 *    accommodation: [ { post_title, post_content, post_excerpt, ID } ]
 * }
 * 
 * Each proposal has a propertyId that matches the ID of a property in the offer.properties array.
 * 
 * Each property in the offer.properties array has the following structure:
 * {
 *   ws_establishment_id,
 *   post_title,
 *   acf_featured_image: { url, alt }
 * }
 * 
 * @param {*} options - Display mode for the offers. Can be 'carousel' or 'grid'. it is in options.display.mode.
 * @param {*} displayAllOffers - If true, all offers are displayed. If false, only the lowest price offer for each property is displayed. Default is false.
 * @returns - HTML string with the offers.
 */
const buildHtmlOffers = (proposalsOffersArray, options, endpointData, displayAllOffers = onlyDev) => {
    if (debugHtmlBuilder) console.log('proposalsOffersArray in buildHtmlOffers function', proposalsOffersArray);

    const wwo_strings = getLanguageStrings();
    if (!wwo_strings) {
        console.error('Failed to get language strings in graphql/graphql');
        return;
    }
    if (!proposalsOffersArray || proposalsOffersArray.length === 0) {
        return `<div class="wwo-offer-container wwo-slider-wrapper wwo-no-offers">${wwo_strings.no_offers}</div>`;
    }
    const navCategoriesHtml = generateNavCategoriesHtml(endpointData);
    let html = generateContainerStartHtml(options, navCategoriesHtml);
    proposalsOffersArray.forEach((item) => {
        const thisProperty = getPropertyForProposal(item);
        if (thisProperty) {
            if (item['lowest-price'] || displayAllOffers) {
                html += generateOfferHtml(
                    item, 
                    thisProperty, 
                    options, 
                    item['lowest-price'], 
                    endpointData[0].post_name, // We want to know which is the first active category selected.
                    wwo_strings,
                );
            }
        }

    });
    html += generateContainerEndHtml();
    return html;
};

const generateContainerStartHtml = (options, navCategoriesHtml) => {
    return options.display.mode === 'carousel' ? `
        <div class="wwo-offer-container wwo-slider-wrapper wwo-environment-${options.environment}">
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

const generateContainerEndHtml = () => {
    return `
            </ul>
        </div><!-- .wwo-offer-container -->
    `;
};

const generateOfferHtml = (item, property, options, lowestPrice, firstCategorySelected, wwo_strings) => {
    const categoryClasses = item.offer.post_name;//offers_categories.map(category => `wwo-family-${category.slug}`).join(' ');
    const disponibilityRange = formatDateRange(
        item.proposal.formattedDate,
        addDaysToDate(item.proposal.formattedDate, item.proposal.nbDays)
    );
    const lowestPriceClasses = lowestPrice ? 'wwo-lowest-price' : '';

    const activeCss = firstCategorySelected === categoryClasses ? 'wwo-active' : '';
    return `
        <li 
            class="wwo-single-element wwo-grid-item ${activeCss} wwo-family-${categoryClasses} ${lowestPriceClasses}"
            data-proposal-key="${item.proposal.proposalKey}"
            data-method="${item.method}"
            data-offer-id="${item.offer.ID}"
            >
            <div class="${options.display.mode === 'carousel' ? `wwo-offer wwo-single-element ${categoryClasses}` : 'wwo-grid-element'}">
                <div class="wwo-offer-item">
                    <div class="wwo-featured-image-wrapper">
                        ${property.acf_featured_image ? `
                            <img class="wwo-featured-image" src="${property.acf_featured_image.url}" alt="${property.acf_featured_image.alt}" />
                        ` : ''}
                    </div>
                    <div class="wwo-offer-wrapper">
                        <div class="offer-title">
                            ${property.post_title}
                        </div>
                        <div class="wwo-disponibility-dates">
                            ${disponibilityRange}
                        </div>
                        <div class="wwo-offer-footer">
                            <div class="wwo-offer-description">
                                ${wwo_strings.priceFrom}
                            </div><!-- .wwo-offer-description -->
                            <div class="wwo-offer-price">
                                <span class="wwo-offer-price-amount">${item.proposal.price.amount}</span> <span class="wwo-offer-price-currency">&euro;</span>
                            </div><!-- .wwo-offer-price -->
                            <div class="wwo-offer-button">
                                <button class="wwo-offer-button-text">${wwo_strings.seeOffer}</button>
                            </div><!-- .wwo-offer-button -->
                        </div><!-- .wwo-offer-footer -->
                    </div><!-- .wwo-offer-wrapper -->
                    ${generateDebugHtml(item, categoryClasses)}
                </div>
            </div>
        </li>
    `;
};

const generateDebugHtml = (item, categoryClasses) => {

    let accommodations = '<ul>';
    for (const element of item.accommodation) {
        accommodations += `<li>${element.post_title}</li>`;
    }
    accommodations += `</ul>`;

    return `
        <div class="wwo-debug-container">
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
                proposal.propertyId: ${item.proposal.propertyId}<br />
                offer.acf_offers_season: ${item.offer.acf_offers_season}<br />
                offer-children: ${item.acfItem['offer-children'].length}<br />
                offer-number-of-adults: ${item.acfItem['offer-number-of-adults']}<br />
                offer-number-of-days: ${item.acfItem['offer-number-of-days']}<br />
            </div>
            <div style="border: 1px #000 solid;font-size: 0.7em;padding: 0.2em;">
                <span style="background-color: #000;color: #fff;">accommodations</span>
                ${accommodations}
            </div>
        </div><!-- .wwo-debug-container -->
    `;
};

module.exports = { buildHtmlOffers };

},{"../lang/languageManager":9,"../utils/filter":13,"../utils/utils":20,"./generateNavCategoriesHtml":25}],27:[function(require,module,exports){
// versions/1.0.1/views/modal.js

const { getProposalsOffersArray } = require('../utils/proposalsOffersArray'); // Import the shared data module to retrieve the proposalsOffersArray.
const { getLanguageStrings } = require('../lang/languageManager');
const { getUpselling } = require('./upselling');
const { getCrossSelling } = require('./crossSelling');
// const { getCrossSellingOld } = require('./crossSellingOld');
const { buildModalHtml } = require('./buildModalHtml');
const { getOptionsOffers } = require('../utils/optionsOffers');

const debugModal = 0;
if (debugModal) console.log('debugModal is set to 1');

const initModal = () => {
    if (debugModal) console.log('Initializing modal.js');

    // Inject the modal HTML into the body
    const modalHtml = `
        <div id="wwo-modal" class="wwo-modal">
            <div class="wwo-modal-content">
                <span class="wwo-modal-close">&times;</span>
                <div id="wwo-modal-container">
                    <p>Modal content goes here...</p>
                </div><!-- #wwo-modal-container -->
            </div><!-- .wwo-modal-content -->
        </div><!-- #wwo-modal -->
    `;
    document.body.insertAdjacentHTML('beforeend', modalHtml);

    const wwoSingleElement = document.querySelectorAll('.wwo-single-element');
    const modalElement = document.getElementById('wwo-modal');
    const closeButton = document.querySelector('.wwo-modal-close');

    if (!modalElement) {
        console.error('Element with id wwo-modal not found.');
        return;
    }
    if (!closeButton) {
        console.error('Element with class wwo-modal-close not found.');
        return;
    }

    wwoSingleElement.forEach((item) => {
        item.addEventListener('click', () => handleItemClick(item));
    });

    modalElement.addEventListener('click', (event) => handleModalClick(event, modalElement));
    closeButton.addEventListener('click', () => closeModal(modalElement));
};

const handleItemClick = (item) => {

    const itemDataSet = item.dataset;
    logDebugData(itemDataSet);

    const widgetOptions = getOptionsOffers();
    const widgetDisplayOptions = widgetOptions.display || false;
    if(debugModal) console.log('widgetDisplayOptions:', widgetDisplayOptions);
    const widgetDisplayUpsellingOptions = widgetDisplayOptions?.upselling || false;
    const widgetDisplayCrossSellingOptions = widgetDisplayOptions?.crossSelling || false;
    if(debugModal) console.log('widgetDisplayCrossSellingOptions:', widgetDisplayCrossSellingOptions);
    if(debugModal) console.log('widgetOptions:', widgetOptions);

    const proposalsOffersArray = getProposalsOffersArray();
    if (debugModal) console.log('proposalsOffersArray:', proposalsOffersArray);

    const selectedOffer = findSelectedOffer(proposalsOffersArray, itemDataSet);
    if (!selectedOffer) return;

    const wwo_strings = getLanguageStrings();
    if (!wwo_strings) {
        console.error('Failed to get language strings in graphql/graphql');
        return;
    }
    let htmlBuffer = buildModalHtml(selectedOffer, wwo_strings);

    if(widgetDisplayUpsellingOptions.active) {
        htmlBuffer += getUpselling(proposalsOffersArray, itemDataSet, selectedOffer, wwo_strings, widgetDisplayUpsellingOptions, widgetOptions.proposalUrl);
    }
    if(widgetDisplayCrossSellingOptions.active) {
        htmlBuffer += getCrossSelling(proposalsOffersArray, selectedOffer, wwo_strings, widgetDisplayCrossSellingOptions, widgetOptions.proposalUrl);
        // htmlBuffer += getCrossSellingOld(proposalsOffersArray, selectedOffer, wwo_strings, widgetDisplayCrossSellingOptions, widgetOptions.proposalUrl);
    }

    document.getElementById('wwo-modal-container').innerHTML = htmlBuffer;
    document.getElementById('wwo-modal').classList.toggle('wwo-active');

    // TODO: Move following code to a separate file and import it where needed as it has nothing to do directly with "modal" functionality but with "offers" functionality PLUS refactor function itself couple o times...
    // Attach event listeners for the toggle buttons and the title
    const toggleButtons = document.querySelectorAll('.wwo-open-close-disponibilities');
    const toggleTitles = document.querySelectorAll('.wwo-offers-togle-title');

    // Add event listeners to toggle buttons
    toggleButtons.forEach(button => {
        button.addEventListener('click', handleToggleOffersList);
    });

    // Add event listeners to toggle titles
    toggleTitles.forEach(title => {
        title.addEventListener('click', handleToggleOffersList);
    });

    // Function to toggle offers list
    function handleToggleOffersList(event) {
        let container;
        let moreOffersBtn;
        let lessOffersBtn;

        // Check if the clicked element is a title
        if (event.currentTarget.classList.contains('wwo-offers-togle-title')) {
            // Find the closest `.wwo-list-of-offers` after the title
            container = event.currentTarget.nextElementSibling;
            // Find the `.wwo-open-close-disponibilities` inside the title
            moreOffersBtn = event.currentTarget.querySelector('.wwo-more-offers');
            lessOffersBtn = event.currentTarget.querySelector('.wwo-less-offers');

            container.nextElementSibling.querySelector('.wwo-more-offers').classList.toggle('active');
            container.nextElementSibling.querySelector('.wwo-less-offers').classList.toggle('active');
        } else {
            console.log('Click on more!!!');
            // If not a title, find the previous sibling which should be `.wwo-list-of-offers`
            container = event.currentTarget.previousElementSibling;
            moreOffersBtn = event.currentTarget.querySelector('.wwo-more-offers');
            lessOffersBtn = event.currentTarget.querySelector('.wwo-less-offers');

            container.previousElementSibling.querySelector('.wwo-more-offers').classList.toggle('active');
            container.previousElementSibling.querySelector('.wwo-less-offers').classList.toggle('active');
        }

        // If the container is not found, exit the function
        if (!container) {
            console.error('Container element not found.');
            return;
        }

        // Get all the <li> elements within this container
        const listItems = container.querySelectorAll('.offer-item');

        // Loop through each <li> element
        listItems.forEach((item, index) => {
            if (index === 0) {
                // Always keep the first <li> active
                item.classList.add('active');
            } else {
                // Toggle the 'active' class for other <li> elements
                item.classList.toggle('active');
            }
        });

        // Toggle the visibility of more/less offers buttons
        if (moreOffersBtn && lessOffersBtn) {
            moreOffersBtn.classList.toggle('active');
            lessOffersBtn.classList.toggle('active');
        }
    }

};

const handleModalClick = (event, modalElement) => {
    if (event.target === modalElement) {
        modalElement.classList.remove('wwo-active');
    }
};

const closeModal = (modalElement) => {
    modalElement.classList.remove('wwo-active');
};

const logDebugData = (itemDataSet) => {
    if (debugModal) {
        console.log(`Dataset Proposal Key: ${itemDataSet.proposalKey}`);
        console.log(`Dataset method: ${itemDataSet.method}`);
        console.log(`Dataset offerId: ${itemDataSet.offerId}`);
    }
};

const findSelectedOffer = (proposalsOffersArray, itemDataSet) => {
    const filteredOffers = proposalsOffersArray.filter(offer => offer.method === itemDataSet.method);
    if (debugModal) console.log('Filtered Offers:', filteredOffers);

    const selectedOffer = filteredOffers.find(offer => 
        offer.proposal.proposalKey === itemDataSet.proposalKey &&
        offer.method === itemDataSet.method &&
        String(offer.offer.ID) === String(itemDataSet.offerId)
    );

    if (debugModal) console.log('Selected Offer:', selectedOffer);
    return selectedOffer;
};

// TODO: I can move this function to separate file and import it where needed as it has nothing to do directly with "modal" functionality but with "offers" functionality
/*
function handleToggleOffersList() {
    console.log('Toggle offers list');

    // Get the closest parent container of the clicked element
    const container = this.closest('.wwo-open-close-disponibilities').previousElementSibling;

    // Get all the <li> elements within this container
    const listItems = container.querySelectorAll('.offer-item');

    // Loop through each <li> element
    listItems.forEach((item, index) => {
        if (index === 0) {
            // Always keep the first <li> active
            item.classList.add('active');
        } else {
            // Toggle the 'active' class for other <li> elements
            item.classList.toggle('active');
        }
    });

    // Toggle the visibility of more/less offers buttons
    const moreOffersBtn = this.closest('.wwo-open-close-disponibilities').querySelector('.wwo-more-offers');
    const lessOffersBtn = this.closest('.wwo-open-close-disponibilities').querySelector('.wwo-less-offers');
    moreOffersBtn.classList.toggle('active');
    lessOffersBtn.classList.toggle('active');
}

// Ensure the function is available globally
window.handleToggleOffersList = handleToggleOffersList; // Expose the function to the global scope
*/









module.exports = { initModal };
},{"../lang/languageManager":9,"../utils/optionsOffers":16,"../utils/proposalsOffersArray":17,"./buildModalHtml":22,"./crossSelling":24,"./upselling":28}],28:[function(require,module,exports){
const debugUpselling = 0;
if (debugUpselling) console.log('debugUpselling is set to 1');

const { formatDateRange, addDaysToDate, getRoomsQuantity } = require('../utils/utils');
const { getOptionsOffers } = require('../utils/optionsOffers');

const getUpselling = (proposalsOffersArray, itemDataSet, selectedOffer, wwo_strings, widgetDisplayOptions, proposalUrl) => {

    // TODO: Params widgetDisplayOptions and proposalUrl are contained in the widgetOptions object!!!

    const widgetOptions = getOptionsOffers();

    let widgetDisplayLimit = widgetDisplayOptions.limit ? widgetDisplayOptions.limit : 30;
    if (debugUpselling) console.log('widgetDisplayOptions:', widgetDisplayOptions);
    if (debugUpselling) console.log('widgetDisplayOptions.limit:', aux);
    if (debugUpselling) console.log('selectedOffer:', selectedOffer);

    if (debugUpselling) console.log('proposalsOffersArray:', proposalsOffersArray);
    const filteredOffers = proposalsOffersArray.filter(offer => offer.method === itemDataSet.method);
    if (debugUpselling) console.log('Filtered Offers:', filteredOffers);

    // Remove duplicates based on the 'id' property
    const uniqueFilteredOffers = filteredOffers.filter((offer, index, self) =>
        index === self.findIndex((t) => t.proposal.proposalKey === offer.proposal.proposalKey)
    );
    if (debugUpselling) console.log('uniqueFilteredOffers:', uniqueFilteredOffers);

    // Order from lower price to higher price
    const orderedOffers = uniqueFilteredOffers.sort((a, b) => a.proposal.price.amount - b.proposal.price.amount);
    if (debugUpselling) console.log('orderedOffers:', orderedOffers);

    const disponibilityRange = formatDateRange(
        selectedOffer.proposal.formattedDate,
        addDaysToDate(selectedOffer.proposal.formattedDate, selectedOffer.proposal.nbDays)
    );

    // List all the offers that have the same range of dates and the same category except the selected offer
    let listOfOffersUpselling = '<ul class="wwo-list-of-offers">';
    let counter = -1;
    orderedOffers.forEach((offerItem) => {
        if ( offerItem.proposal.proposalKey !== selectedOffer.proposal.proposalKey && counter < widgetDisplayLimit ) {
            if (debugUpselling) console.log('offerItem:', offerItem);
            if( selectedOffer.proposal.propertyId === offerItem.proposal.propertyId ) {
                counter++;
                let listOfOffersUpsellingAccommodations = `
                    <div class="wwo-list-of-accommodations">
                `;

                if (debugUpselling) listOfOffersUpsellingAccommodations += '<pre>'+JSON.stringify(offerItem.proposal.distribution, null, 2)+'</pre>';

                listOfOffersUpsellingAccommodations += `<div class="wwo-accommodation-items">`;
                offerItem.accommodation.forEach((accommodationItem) => {

                    let quantity = getRoomsQuantity(offerItem.proposal.distribution.roomTypes, accommodationItem.acf_ws_accommodation_code);

                    /* Dev note: To print accommodation code you can insert this code in the returned template
                    `<strong>${accommodationItem.post_title} (${accommodationItem['acf_ws_accommodation_code']})</strong>`
                    */




                
                    listOfOffersUpsellingAccommodations += `
                    <div class="wwo-accommodation-item">
                        <span class="wwo-proposals-counter wwo-room-quantity-${quantity}">
                            ${quantity} x
                        </span>
                        
                        <strong>${accommodationItem.post_title}</strong>
                        <div class="wwo-accommodation-data">
                            (${accommodationItem.acf_ws_accommodation_nb_beds} ${wwo_strings.beds}, ${accommodationItem.acf_ws_accommodation_pax_max} ${wwo_strings['people-max']}, ${accommodationItem.acf_ws_accommodation_size_area} ${wwo_strings['square-meters']})
                        </div><!-- .wwo-accommodation-data -->
                    </div><!-- .wwo-accommodation-item -->
                    `;
                });
                listOfOffersUpsellingAccommodations += `</div><!-- .wwo-accommodation-items -->`;
                

                listOfOffersUpsellingAccommodations += `
                    <div class="wwo-price-amount">
                        ${offerItem.proposal.price.amount} &euro;
                    </div><!-- .wwo-price-amount -->
                `;

                const numberOfChildrenDisplay = offerItem.acfItem['offer-children'].length !== undefined ? 
                    `${offerItem.acfItem['offer-children'].length} ${wwo_strings.children}` : '';
                listOfOffersUpsellingAccommodations += `
                    <div class="wwo-disponibility-extract">
                        <div class="wwo-disponibility-range">
                            ${disponibilityRange}
                        </div><!-- .wwo-disponibility-range -->
                        <div class="wwo-disponibility-details">

                            <div class="wwo-date-range-description">
                                <span class="wwo-details wwo-number-of-days">
                                    ${offerItem.proposal.nbDays} ${wwo_strings.nights}
                                </span>
                                <span class="wwo-details wwo-number-of-adults">
                                    ${offerItem.acfItem['offer-number-of-adults']} ${wwo_strings.adults}
                                </span>
                                ${numberOfChildrenDisplay ? `
                                    <span class="wwo-details wwo-number-of-adults">
                                        ${numberOfChildrenDisplay}
                                    </span>
                                ` : ''}
                            </div><!-- .wwo-date-range-description -->

                        </div><!-- .wwo-disponibility-details -->

                        <button 
                            class="wwo-offer-button-text" 
                            onclick="window.open('${proposalUrl}${offerItem.proposal.proposalKey}', '_blank', 'noopener noreferrer')"
                            >
                            ${wwo_strings.seeOffer}
                        </button>
                        
                    </div><!-- .wwo-disponibility-extract -->
                `;

                listOfOffersUpsellingAccommodations += `
                    </div><!-- .wwo-list-of-accommodations -->
                `;

                const activeClass = counter === 0 ? 'active' : '';
                listOfOffersUpselling += `
                    <li class="offer-item offer-item-${counter} ${activeClass}">
                        ${listOfOffersUpsellingAccommodations}
                    </li>
                `;
            }
        }
    });
    listOfOffersUpselling += '</ul>';
    listOfOffersUpselling += `
        <div class="wwo-open-close-disponibilities">
            <span class="wwo-more-offers active">${wwo_strings.moreOffers}</span>
            <span class="wwo-less-offers">${wwo_strings.lessOffers}</span>
        </div>
    `;

    if( counter === 0 ) {
        listOfOffersCrossSelling = `
        <ul class="wwo-list-of-offers no-offers-found">
            <li>
                ${wwo_strings['no-offers-found']}
            </li>
        </ul>
        `;
    }
    return `
        <div class="wwo-offers-list-section">
            <div class="wwo-offers-togle-title">
                ${wwo_strings['upselling-title']}
                <div class="wwo-open-close-disponibilities">
                    <span class="wwo-more-offers active">Plus d'offres</span>
                    <span class="wwo-less-offers"">Moins d'offres</span>
                </div><!-- .wwo-open-close-disponibilities -->
            </div><!-- .wwo-offers-togle-title -->
            ${widgetOptions.display.upselling.header ? `
                <div class="wwo-upselling-info">
                    ${selectedOffer.offer.get_the_title}<br />
                    ${selectedOffer.proposal.formattedDate} to ${addDaysToDate(selectedOffer.proposal.formattedDate, selectedOffer.proposal.nbDays)}<br />
                    ${disponibilityRange}<br />
                </div><!-- .wwo-upselling-info -->
            ` : ''}
            ${listOfOffersUpselling}
        </div><!-- .wwo-offers-list-section -->
    `;

};

module.exports = { getUpselling };
},{"../utils/optionsOffers":16,"../utils/utils":20}]},{},[8])(8)
});
