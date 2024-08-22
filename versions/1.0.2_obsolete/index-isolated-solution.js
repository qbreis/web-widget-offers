'use strict';

// Main widget initialization function
async function initWidget(options) {
    console.log('INIT WIDGET');
    try {
        // First fetch
        const response1 = await fetch('https://www.karellis-reservation.com/wp-json/api-campings/v2/get_offers_v2');
        if (!response1.ok) {
            throw new Error('Error fetching the data');
        } else {
            const data1 = await response1.json();
            console.log('FIRST FETCH: Data from WP endpoint https://www.karellis-reservation.com/wp-json/api-campings/v2/get_offers_v2:', data1);

            // Second fetch
            const userName = 'web_fr';
            const response2 = await fetch('https://leskarellis.resalys.com/rsl/graphql', {
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

            if (!response2.ok) {
                throw new Error('Error fetching the data');
            } else {

            
                const data2 = await response2.json();
                console.log('SECOND FETCH: Data from WP endpoint https://leskarellis.resalys.com/rsl/graphql:', data2);

                // Third fetch
                const sessionName = data2.data.getSession.name;
                const response3 = await fetch('https://leskarellis.resalys.com/rsl/graphql', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        query: `query getProposal_c {
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
                                        maxResults: 3000,
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
                            },
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
                                        maxResults: 3000,
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
                    })
                });

                if (!response3.ok) {
                    throw new Error('Error fetching the data');
                } else {
                    const data3 = await response3.json();
                    console.log('THIRD FETCH: Data from WP endpoint https://leskarellis.resalys.com/rsl/graphql:', data3);
                    console.log('proposalsData.data:', data3.data);

                    const transformedData = data3.data;
                    for (const key in transformedData) {
                        if (transformedData.hasOwnProperty(key)) {
                            transformedData[key].proposals.forEach(proposal => {
                                console.log('proposal.propertyId:', proposal.propertyId);
                            });
                        }
                    }

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
            }
        }

    } catch (error) {
        console.error('Error in initWidget:', error);
    }
}

module.exports = { initWidget };
