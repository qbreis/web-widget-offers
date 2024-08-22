'use strict';

// Main widget initialization function
function initWidget(options) {
    console.log(options.endpointUrl);
    fetch('https://www.karellis-reservation.com/wp-json/api-campings/v2/get_offers_v2')
    .then(response => {
        if (!response.ok) {
            throw new Error('Error fetching the data');
        }
        return response.json();
    })
    .then(data => {
        console.log('Data from WP endpoint https://www.karellis-reservation.com/wp-json/api-campings/v2/get_offers_v2:', data);
        runGraphqlFunction(); // versions\1.0.2\graphql\graphql.js
    })
    .catch(error => {
        console.error('Error fetching data from options.endpointUrl:', error);
    });

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
}

const runGraphqlFunction = async () => {
    try {
        const sessionData = await fetchSessionDataFunction();
        console.log('sessionData', sessionData.data.getSession.name);
        await handleSessionDataFunction(sessionData.data.getSession.name);
    } catch (error) {
        console.error('Error en runGraphql:', error);
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
                }
            `,
                variables: { username: 'web_fr' },
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

const handleSessionDataFunction = async (sessionName) => {
    try {
        const proposalsData = await fetchProposalsDataFunction(
            'https://leskarellis.resalys.com/rsl/graphql', 



            `query getProposal_c{
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
                                nbChildren1 : 2,
                                childrenBirthdate : ["2017-07-31", "2019-07-31"],
                            } 
                        }
                    ){
                        proposals: proposals {
                            propertyId
                            proposalKey,
                            price {
                                amount,
                                currencyCode
                            },
                            nbDays,

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

                        }
                    },
                
                    method_1_0_12_08_2024: getProposals(
                        session: {
                            name: "leskarellis_Kfb3pmDhDXIVdXnU"
                        }
                        input: {
                            criterias: {
                                nbDays: 7,
                                startDate: "2024-08-12",
                                nbAdults: 6,
                                propertyIds: [2,3,4,6,8,1,5,10],
                                nbChildren1 : 2,
                                childrenBirthdate : ["2017-07-31", "2019-07-31"],
                            } 
                        }
                    ){
                        proposals: proposals {
                            propertyId
                            proposalKey,
                            price {
                                amount,
                                currencyCode
                            },
                            nbDays,

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

                        }
                    }
        },`






        );
        console.log('proposalsData.data:', proposalsData.data);


        let transformedData = proposalsData.data;
        for (const key in transformedData) {
            if (transformedData.hasOwnProperty(key)) {
                transformedData[key].proposals.forEach(
                    proposal => {
                        console.log('proposal.propertyId:', proposal.propertyId);
                    }
                );
            }
        }






    } catch (error) {
        console.error('Error fetching proposals data:', error);
    }
};

const fetchProposalsDataFunction = async (endpointURL, graphqlQuery) => {
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

module.exports = { initWidget };
