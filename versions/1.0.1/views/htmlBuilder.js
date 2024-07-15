const debugHtmlBuilder = 0;
if(debugHtmlBuilder) console.log('debugHtmlBuilder is set to 1');

const { getLanguageStrings } = require('../lang/languageManager');
const { formatDateRange } = require('../utils/utils');

const buildHtmlOffers = (proposalsOffersArray) => {
    let html = `
        <div class="wwo-offer-container">
            <ul>
    `;
    proposalsOffersArray.forEach((item, key) => {
        console.log('item in buildHtmlOffers', item);

        let disponibilityRange = formatDateRange(item.proposal.formattedDate, item.acfItem['offer-date-end']);//, wwo_strings);
        html += `
            <li style="border: 4px #c0c solid;margin: 0.5em 0;">
                <div class="wwo-disponibility-dates">
                    ${disponibilityRange}
                </div><!-- .wwo-disponibility-dates -->
                propertyId: ${item.proposal.propertyId}<br />
                ${item.proposal.price.amount} ${item.proposal.price.currencyCode}<br />
                proposalKey: ${item.proposal.proposalKey}<br />
                nbDays: ${item.proposal.nbDays}<br />
                date start: ${item.proposal.formattedDate}<br />
                ${item.offer.get_the_title}<br />
            </li>
        `;
    });
    html += `
        </ul>
    </div><!-- .wwo-offer-container -->
    `;
    return html;
}

const buildHtmlFromOffersProposalsCombinations = (proposalsOffersArray) => {
    if (debugHtmlBuilder) console.log('proposalsOffersArray', proposalsOffersArray);
    let html = 'ESTRUCTURA DE LAS DISPONIBILIDADES MOSTRADAS — SOLO PARA DESARROLLO:<br />';

    proposalsOffersArray.forEach((item, key) => {
        if (debugHtmlBuilder) console.log('item in buildHtmlFromOffersProposalsCombinations', item);
        if (debugHtmlBuilder) console.log('item.offer.acf_data', item.offer.acf_data);
        const wwo_strings = getLanguageStrings();
        if (!wwo_strings) {
            console.error('Failed to get language strings in graphql/graphql');
            return;
        }
        //if (debugHtmlBuilder) console.log('wwo_strings', wwo_strings);

        let dateStr = item.offer.acf_data[0]['offer-date-start'];

        let dateParts = dateStr.split('/');
        let date = new Date(`${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`);

        if (debugHtmlBuilder) wwo_strings.translation_example['dows-short'];
        let dayOfWeek = wwo_strings['dows-short'][date.getUTCDay()];
        html += `
            <div class="ww-offer-container">
                <h2>
                    ${item.offer.get_the_title} (WP post ID: ${item.offer.ID})
                    &nbsp;-&nbsp;
                    From <span class="wwo-day-of-week">${dayOfWeek}</span> ${item.acfItem['offer-date-start']} to ${item.acfItem['offer-date-end']}
                </h2>
                <p>
                    Se deben mostrar las disponibilidades entre las fechas indicadas en el título.<br />
                    Que empiecen en día de la semana: ${item.acfItem['offer-day-of-week']}
                </p>
                <h3>Proposals:</h3>
                <ul>
        `;
        if (debugHtmlBuilder) console.log('item.proposals.proposals', item.proposals.proposals);
        item.proposals.proposals.forEach((proposal, key2) => {
            html += `
                    <li style="border: 1px #000 solid;margin: 0.5em 0;">
                        propertyId: ${proposal.propertyId}<br />
                        price.amount: ${proposal.price.amount}<br />
                        proposalKey: ${proposal.proposalKey}<br />
                        nbDays: ${proposal.nbDays}<br />
                    </li>
            `;
        });

        html += `
                </ul>
            </div>
        `;
    });
    return html;
}


const buildHtmlOffersOutput = (offersProposalsList) => {
    let html = '';
    if(debugHtmlBuilder) console.log('offersProposalsList', offersProposalsList);

    html += `
        <div class="wwo-offer-container">
            <ul>
    `;

    offersProposalsList.forEach((item, key) => {
        if (debugHtmlBuilder) console.log('item', item);
        const wwo_strings = getLanguageStrings();
        if (!wwo_strings) {
            console.error('Failed to get language strings in graphql/graphql.js');
            return;
        }





        
        let disponibilityRange = formatDateRange(item.acfItem['offer-date-start'], item.acfItem['offer-date-end']);//, wwo_strings);


        html += `
                <li style="border: 4px #c0c solid;margin: 0.5em 0;">


                    <div class="wwo-disponibility-dates">
                        ${disponibilityRange}
                    </div><!-- .wwo-disponibility-dates -->




                    item.offer.get_the_title: ${item.offer.get_the_title}<br />
                    
                    proposal propertyId: ${item.proposal.propertyId}<br />
                    proposal price amount: ${item.proposal.price.amount}<br />
                    proposal nbDays: ${item.proposal.nbDays}<br />
                    proposal proposalKey: ${item.proposal.proposalKey}<br />
                </li>
        `;

    });

    html += `
            </ul>
        </div><!-- .wwo-offer-container -->
    `;

    return html;
}

module.exports = { 
    buildHtmlFromOffersProposalsCombinations, 
    buildHtmlOffersOutput,
    buildHtmlOffers
};