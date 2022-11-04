import { render, screen, waitFor } from '@testing-library/react';
import { client } from "../apollo";
import { ApolloProvider } from "@apollo/client";
import { Result } from './Result'

test('Check US:90210 query', async () => {
  render(<ApolloProvider client={client}><Result country='US' postCode='90210' /></ApolloProvider>);
  await waitFor(() => {
    expect(screen.getByText('California', {exact: false})).toBeInTheDocument()
  }, {timeout: 3000});
});

test('Check CA:v6z query', async () => {
  render(<ApolloProvider client={client}><Result country='CA' postCode='v6z' /></ApolloProvider>);
  await waitFor(() => {
    expect(screen.getByText('Vancouver', {exact: false})).toBeInTheDocument()
  }, {timeout: 3000});
});