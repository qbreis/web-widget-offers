// graphql.js: Contains functions related to constructing and handling GraphQL queries.

const { fetchSessionData, fetchProposalsData } = require('../utils/api.js');
const { buildProposalsQuery } = require('../utils/handlers.js');
const wwo_graphqlQueries = require('./graphqlQueries.js');

const runGraphql = async (options, endpointData) => {
    const username = 'web_fr';
    try {
        const sessionData = await fetchSessionData(username, options.graphqlConfig.endpointURL, wwo_graphqlQueries.getSession);
        await handleSessionData(sessionData, options, endpointData);
    } catch (error) {
        console.error('Error en runGraphql:', error);
    }
};

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

module.exports = { runGraphql, handleSessionData };