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
