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
    //initModal();
}

module.exports = { initWidget };
