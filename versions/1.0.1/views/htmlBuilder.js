const debugHtmlBuilder = 1;
if(debugHtmlBuilder) console.log('debugHtmlBuilder is set to 1');

const { formatDateRange, addDaysToDate } = require('../utils/utils');

const buildHtmlOffers = (proposalsOffersArray) => {
    let html = `
        <div class="wwo-offer-container">
            <ul>
    `;
    proposalsOffersArray.forEach((item, key) => {
        if(debugHtmlBuilder) console.log('item in buildHtmlOffers', item);
        if(debugHtmlBuilder) console.log('--'+addDaysToDate(item.proposal.formattedDate, item.proposal.nbDays))
        let disponibilityRange = formatDateRange(
            item.proposal.formattedDate, 
            addDaysToDate(item.proposal.formattedDate, item.proposal.nbDays)
        );
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
                <div class="offer-categories">
                    Categories: 
                    ${item.offer.offers_categories.map(category => `${category.name}`).join(', ')}
                </div><!-- .offer-categories -->
            </li>
        `;
    });
    html += `
        </ul>
    </div><!-- .wwo-offer-container -->
    `;
    return html;
}

module.exports = { buildHtmlOffers };