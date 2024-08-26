// utils/api.js - Contains functions related to fetching data from APIs.

const { checkCookieExistence, setCookie, getCookie } = require('../utils/cookies');

// Define a function to fetch session data as asynchronous function designed to fetch session data for a given username from a specified GraphQL endpoint
const fetchSessionData = async (options, graphqlQuery) => {
    // console.log('fetchSessionData');
    try {
        let sessionCookieName = options.sessionCookieName || 'session';

        if (checkCookieExistence(sessionCookieName)) { 
            // console.log(`there is cookie '${sessionCookieName}' then get the value of the cookie (${getCookie(sessionCookieName)}) and return it.`);
            // if there is cookie 'session' then get the value of the cookie and return it.
            return getCookie(sessionCookieName);
        } else {

            // console.log(`when there is not cookie '${sessionCookieName}' then fetch data.`);

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
        }
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