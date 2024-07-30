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
