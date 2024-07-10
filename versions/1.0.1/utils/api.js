// utils/api.js - Contains functions related to fetching data from APIs.

// Define a function to fetch session data
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

module.exports = { fetchSessionData, fetchProposalsData };