const GET_SESSION = `
    query session($username: String! ) {
      getSession(input: { 
          username: $username
          }) {
        name
      }
    }
`;

const GET_PROPOSALS = `
  query getProposal1($session : Session! , $input: ProposalsInput){
      Method1:getProposals(
              session : $session, 
              input : $input
              )
            {
              proposals : proposals {
                propertyId
                proposalKey,
                price {
                    amount,
                    currencyCode
                },
                productOption {
                    code,
                    label
                }
              }
           }
      }
`;
const GET_PROPOSALS_METHOD = `
      getProposals(
              session : $session, 
              input : $input
              )
            {
              proposals : proposals {
                propertyId
                proposalKey,
                price {
                    amount,
                    currencyCode
                },
                productOption {
                    code,
                    label
                }
              }
          }
`;

module.exports = {GET_SESSION, GET_PROPOSALS, GET_PROPOSALS_METHOD};
