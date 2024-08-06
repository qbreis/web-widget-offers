'use strict';

// Main widget initialization function
async function initWidget(options) {
    console.log('Endpoint URL:', options.endpointUrl);
    try {
        const response = await fetch('https://www.karellis-reservation.com/wp-json/api-campings/v2/get_offers_v2');
        if (!response.ok) {
            throw new Error('Error fetching the data');
        }
        const data = await response.json();
        console.log('Data from WP endpoint:', data);
        await runGraphqlFunction();

        // Building the widget's HTML
        let html = `
            <div id="ww-main-container">
                <div id="wwo-offers-list"></div><!-- #wwo-offers-list -->
            </div><!-- #ww-main-container -->
        `;

        // Injecting the HTML into the specified container
        const container = document.getElementById(options.id);
        if (container) {
            container.innerHTML = html;
        } else {
            console.error(`Element with id ${options.id} not found.`);
        }
    } catch (error) {
        console.error('Error in initWidget:', error);
    }
}

const runGraphqlFunction = async () => {
    try {
        const sessionData = await fetchSessionDataFunction();
        console.log('Session Data:', sessionData.data.getSession.name);
        await handleSessionDataFunction(sessionData.data.getSession.name);
    } catch (error) {
        console.error('Error in runGraphqlFunction:', error);
    }
};

const fetchSessionDataFunction = async () => {
    const userName = 'web_fr';
    try {
        const response = await fetch('https://leskarellis.resalys.com/rsl/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: `query session($username: String! ) {
                    getSession(input: { 
                        username: $username
                    }) {
                        name
                    }
                }`,
                variables: { username: userName },
            })
        });

        if (!response.ok) {
            throw new Error('Error performing HTTP request to getSession');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error in fetchSessionDataFunction:', error);
        throw error;
    }
};

const handleSessionDataFunction = async (sessionName) => {
    try {
        const proposalsData = await fetchProposalsDataFunction(
            'https://leskarellis.resalys.com/rsl/graphql', 
            `query getProposal_c {
                method_1_0_05_08_2024: getProposals(
                    session: {
                        name: "${sessionName}"
                    }
                    input: {
                        criterias: {
                            nbDays: 7,
                            startDate: "2024-08-05",
                            nbAdults: 6,
                            propertyIds: [2,3,4,6,8,1,5,10],
                            nbChildren1: 2,
                            childrenBirthdate: ["2017-07-31", "2019-07-31"],
                        }
                    }
                ) {
                    proposals {
                        propertyId
                        proposalKey
                        price {
                            amount
                            currencyCode
                        }
                        nbDays
                        distribution {
                            roomTypes {
                                code
                                propertyId
                                categoryCode
                                categoryLabel
                                label
                                webLabel
                                paxMax
                                pax
                                quantity
                            }
                            roomNumbers
                        }
                    }
                }
                method_1_0_12_08_2024: getProposals(
                    session: {
                        name: "${sessionName}"
                    }
                    input: {
                        criterias: {
                            nbDays: 7,
                            startDate: "2024-08-12",
                            nbAdults: 6,
                            propertyIds: [2,3,4,6,8,1,5,10],
                            nbChildren1: 2,
                            childrenBirthdate: ["2017-07-31", "2019-07-31"],
                        }
                    }
                ) {
                    proposals {
                        propertyId
                        proposalKey
                        price {
                            amount
                            currencyCode
                        }
                        nbDays
                        distribution {
                            roomTypes {
                                code
                                propertyId
                                categoryCode
                                categoryLabel
                                label
                                webLabel
                                paxMax
                                pax
                                quantity
                            }
                            roomNumbers
                        }
                    }
                }
            }`
        );
        console.log('Proposals Data:', proposalsData.data);

        let transformedData = proposalsData.data;
        for (const key in transformedData) {
            if (transformedData.hasOwnProperty(key)) {
                transformedData[key].proposals.forEach(proposal => {
                    console.log('Proposal:', proposal);
                    console.log('proposal.propertyId:', proposal.propertyId);
                });
            }
        }
    } catch (error) {
        console.error('Error in handleSessionDataFunction:', error);
    }
};

const fetchProposalsDataFunction = async (endpointURL, graphqlQuery) => {
    try {
        const response = await fetch(endpointURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query: graphqlQuery })
        });

        if (!response.ok) {
            throw new Error('Error performing HTTP request');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error in fetchProposalsDataFunction:', error);
        throw error;
    }
};

module.exports = { initWidget };
