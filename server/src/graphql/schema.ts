export const typeDefs = `#graphql
  type Place {
    placeName: String
    state: String
    longitude: String
    latitude: String
    stateAbbreviation: String
  }

  type Country {
    country: String!
    postCode : String!
    places: [Place]
  }

  type Query {
    info(country: String!, postCode: String!): Country
  }
`;

export default typeDefs