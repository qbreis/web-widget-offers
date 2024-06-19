'use strict';

// Importing CSS
const css = require('./css/style.css');

// Importing language strings
const ww_languagesStrings = require(`./lang/languages.js`);

// Main widget initialization function
function initWidget(options){
    console.log('Initializing widget with options:', options);

    // Fetch the corresponding language strings
    const WW_STRINGS = ww_languagesStrings.getString(
        // Default to 'es' if no language is specified
        (options.language) ? options.language : 'es'
    );

    // Handle missing translations
    if (!WW_STRINGS) {
        console.error(`No language strings found for language code: ${languageCode}`);
        return;
    }

    console.log('Language strings:', WW_STRINGS);








/*
    fetch(options.endpointUrl)
    .then(response => {
        // check if the response is ok
        if (!response.ok) {
            throw new Error('error fetching the data');
        }
        // parse the response
        return response.json();
    })
    .then(data => {
        console.log('data:', data);
    });
*/




//const helpers = require('./session.js');
//console.log('helpers.getSession():', helpers.getSession());







/*
INLINE WORKING JS SNIPPET TO UNDERSTAND THE FETCH API
fetch(
    'https://leskarellis.resalys.com/rsl/graphql', 
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
            query: `
                query session($username: String! ) {
                    getSession(input: { 
                        username: $username
                    }) {
                        name
                    }
                }
            `,
            variables: { username: 'web_fr' }
        }) // Convertir la consulta a formato JSON
    }
)
.then(response => {
    if (!response.ok) {
        throw new Error('Error al realizar la solicitud HTTP a getSession');
    }
    return response.json();
})
.then(data => {
    // Manejar los datos recibidos
    console.log('Datos recibidos getSession hardcoded kinda:', data);
})
.catch(error => {
    console.error('Error getSession:', error);
});
*/























const GRAPHQL_ENDPOINT = 'https://leskarellis.resalys.com/rsl/graphql';

// Define the GraphQL query as a string
const getSessionQuery = `
    query session($username: String!) {
        getSession(input: { username: $username }) {
            name
        }
    }
`;

// Define a function to fetch session data
const fetchSessionData = async (username) => {
    try {
        const response = await fetch(GRAPHQL_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: getSessionQuery,
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

// Function to handle the received data
const handleSessionData = (data) => {
    console.log('Datos recibidos getSession in refactored code:', data);
};

// Main function to execute the fetch and handle logic
const main = async () => {
    const username = 'web_fr'; // Define the username variable
    try {
        const data = await fetchSessionData(username);
        handleSessionData(data);
    } catch (error) {
        // Handle errors if needed
        console.error('Error en main:', error);
    }
};

// Execute the main function
main();

























    

    // Building the widget's HTML
    let html = `
        <div id="ww-main-container">
            wtd-contain-dispos-group in versions/1.0.4/index.js
            <p>${WW_STRINGS.translation_example}</p>
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

module.exports = {initWidget};