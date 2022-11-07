export const typeDefs = `#graphql
  type Place {
    placeName: String
    state: String
    longitude: String
    latitude: String
    stateAbbreviation: String
    test: String
  }

  type Country {
    country: String!
    postCode : String!
    places: [Place]
  }

  type Test {
    name: String
  }

  type Query {
    info(country: String!, postCode: String!): Country
    test: Test
  }
`;

export default typeDefs