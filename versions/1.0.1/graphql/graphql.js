// graphql.js: Contains functions related to constructing and handling GraphQL queries.

const debugGraphql = 0;
if(debugGraphql) console.log('debugGraphql is set to 1');

const { fetchSessionData, fetchProposalsData } = require('../utils/api');
const { 
    buildProposalsQuery, 
    //offersProposalsCombinations, 
    //getOffersProposalsList, 
    thisOffersProposalsCombinations 
} = require('../utils/handlers');
const { 
    //buildHtmlFromOffersProposalsCombinations, 
    //buildHtmlOffersOutput,
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