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
        if (debugGraphql) console.log('sessionString:', sessionString);
        await handleSessionData(sessionString, options, endpointData);
    } catch (error) {
        console.error('Error en runGraphql:', error);
    }
};

const handleSessionData = async (sessionString, options, endpointData) => {
    const proposalsQuery = buildProposalsQuery(sessionString, endpointData);
    try {
        if(debugGraphql) console.log('proposalsQuery', proposalsQuery);
        let proposalsData = await fetchProposalsData(options.graphqlConfig.endpointUrl, proposalsQuery);
        if (debugGraphql) console.log('Datos recibidos getProposals de GraphQL endpoint ' + options.graphqlConfig.endpointUrl + ':', proposalsData.data);

        if (proposalsData.errors && proposalsData.errors.length > 0) {
            if (debugGraphql) console.log('proposalsData.errors', proposalsData.errors);
            // If there are errors, delete the session cookie and run the query again
            // doing this when there is an error in the proposals query it will result in an infinite loop!!!
            // deleteCookie(options.sessionCookieName);
            // runGraphql(options, endpointData);
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