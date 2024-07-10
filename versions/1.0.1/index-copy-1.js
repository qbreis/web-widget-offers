'use strict';

// Importing CSS
const wwo_css = require('./css/style.css');

// Importing language strings
const wwo_languagesStrings = require(`./lang/languages.js`);

// Importing GraphQL queries
const wwo_graphqlQueries = require(`./graphql/graphqlQueries.js`);

// Main widget initialization function
function initWidget(options){
    console.log('Initializing widget with options:', options);

    // Fetch the corresponding language strings
    const WWO_STRINGS = wwo_languagesStrings.getString(
        // Default to 'es' if no language is specified
        (options.language) ? options.language : 'es'
    );

    // Handle missing translations
    if (!WWO_STRINGS) {
        console.error(`No language strings found for language code: ${languageCode}`);
        return;
    }

    console.log('Language strings:', WWO_STRINGS);








    console.log('options.endpointUrl:', options.endpointUrl);

    let optionsEndpointUrl = options.endpointUrl;
    fetch(optionsEndpointUrl)
    .then(response => {
        // check if the response is ok
        if (!response.ok) {
            throw new Error('error fetching the data');
        }
        // parse the response
        return response.json();
    })
    .then(data => {
        
        runGraphql();
        


        console.log('data from WP endpoint '+optionsEndpointUrl+':', data);
        /*
        data.forEach(item => {
            item.acf_data.forEach(acf => {
                console.log('ACF Data for', item.get_the_title, ':', acf);
    
                // Example action: Log the start and end dates
                console.log('Offer Start Date:', acf['offer-date-start']);
                console.log('Offer End Date:', acf['offer-date-end']);
                console.log('Number of Days:', acf['offer-number-of-days']);
            });
        });
        */
    });





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























// Define a function to fetch session data
const fetchSessionData = async (username) => {
    try {
        const response = await fetch(options.graphqlConfig.endpointURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: wwo_graphqlQueries.getSession,
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
    console.log('getSession name:', data.data.getSession.name );



    

    let optionsGraphqlConfigEndpointURL = options.graphqlConfig.endpointURL;
    console.log('optionsGraphqlConfigEndpointURL:', optionsGraphqlConfigEndpointURL);
    console.log('data.data.getSession.name:', data.data.getSession.name);

    let aux = `
        query getProposalsTest{
            Marecherche6 : getProposals(
                session : {name : "${data.data.getSession.name}"}
                input : {
                    criterias : {
                        nbDays : 7,
                        startDate : "2024-07-12",
                        nbAdults : 2
                        propertyIds : [],
                        nbChildren1 : 3,
                        nbChildren2 : 1,
                        maxResults : 300,
                        childrenBirthdate : ["2020-07-12", "2020-07-12", "2020-07-12"]
                    } 
                }
            ){
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
                    },
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
                    productOption {
                        code
                        label
                    }
                    nbDays
                }
            }
        }
    `;
    options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
            query: aux 
        }) // Convertir la consulta a formato JSON
    };

    console.log('optionsGraphqlConfigEndpointURL:', optionsGraphqlConfigEndpointURL);
    
    fetch(optionsGraphqlConfigEndpointURL, options)
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al realizar la solicitud HTTP');
        }
        return response.json();
    })
    .then(data => {
        // Manejar los datos recibidos
        console.log('Datos recibidos getProposals de GraphQL endpoint '+optionsGraphqlConfigEndpointURL+':', data);
        //console.log(typeof(data.errors));


    })
    .catch(error => {
        wtd_loader_content.classList.add('wtd-display-none');  
        console.error('Error:');
        console.error(error);
        return;
    });






















};

// Main function to execute the fetch and handle logic
const runGraphql = async () => {
    const username = 'web_fr'; // Define the username variable
    try {
        const data = await fetchSessionData(username);
        
        handleSessionData(data);


    } catch (error) {
        // Handle errors if needed
        console.error('Error en runGraphql:', error);
    }
};


























    

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

module.exports = {initWidget};