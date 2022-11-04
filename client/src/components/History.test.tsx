import { render, screen, waitFor } from '@testing-library/react';
import { client } from "../apollo";
import { ApolloProvider } from "@apollo/client";
import { History } from './History'
import { Result } from './Result'

test('Check proper history component rendering', () => {
  const { container } = render(<History />);
  // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
  const div = container.getElementsByClassName('MuiBox-root');
  expect(div.length).toBe(1);
});

test('Check that query saved into history', async () => {
  render(<ApolloProvider client={client}><Result country='US' postCode='90210' /><History /></ApolloProvider>);
  
  await waitFor(() => {
    expect(screen.getByText('Clear history')).toBeInTheDocument()
  }, {timeout: 3000});
});