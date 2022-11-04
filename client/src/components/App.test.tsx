import { render, screen, waitFor } from '@testing-library/react';
import App from './App';


test('Check app running and rendering something meaningful', () => {
  render(<App />);
  const linkElement = screen.getByText(/Zip code info receiver/i);
  expect(linkElement).toBeInTheDocument();
});