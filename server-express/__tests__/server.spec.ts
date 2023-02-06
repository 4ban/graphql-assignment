import { ApolloServer } from 'apollo-server-express';

import { resolvers } from "../src/graphql/resolvers";
import { typeDefs } from "../src/graphql/schema";

const testServer = new ApolloServer({
  typeDefs,
  resolvers,
});

describe('Queries', () => {
  it('should return hello world', async () => {
    const query = `
      query {
        test {
          name
        }
      }
    `

    const check = {
      "data": {
        "test": {
          "name": "Hello world!"
        }
      }
    }

    const response = await testServer.executeOperation({
      query
    })

    expect(response.data).toEqual(check.data)
  })

  it('should return data for US:90210', async () => {
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

  expect(response.data?.info).toEqual(check)
  })
})