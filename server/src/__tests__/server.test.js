import { ApolloServer } from "@apollo/server";

import { resolvers } from "../graphql/resolvers";
import { typeDefs } from "../graphql/schema";

const testServer = new ApolloServer({
  typeDefs,
  resolvers,
});

// Test name as defined by developer
test("Test getting info for US:90210", async () => {
  const query = `
    query getInfo($country: String!, $postCode: String!) {
      info(country: $country, postCode: $postCode) {
        country
        postCode
        places {
          placeName
          state
          stateAbbreviation
          latitude
          longitude
        }
      }
    }
  `;

  const check = {
    country: "United States",
    postCode: "90210",
    places: [
      {
        placeName: "Beverly Hills",
        state: "California",
        stateAbbreviation: "CA",
        latitude: "34.0901",
        longitude: "-118.4065",
      },
    ],
  };

  const response = await testServer.executeOperation({
    query: query,
    variables: { country: "US", postCode: "90210" },
  });

  console.log("response:", response);
  expect(response).toStrictEqual(check);
});
