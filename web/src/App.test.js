import {fireEvent, render, screen} from '@testing-library/react';
import App from './components/App/App';

test('renders the landing page', () => {
  render(<App />);

  expect(screen.getByRole('heading', {level: 1})).toHaveTextContent('Sales Report');
  expect(screen.getByRole('heading', {level: 2})).toHaveTextContent('Dashboard Products');
});

test('renders the upload page', () => {
  render(<App />);

  expect(screen.getByRole('tab', {selected:false})).toHaveTextContent('Upload');
  fireEvent.click(screen.getByRole('tab', {selected:false}))
  expect(screen.getByRole('heading', {level: 3})).toHaveTextContent('Select File to Upload');
});

test('check dashboard table', () => {
  render(<App />);
  let table = screen.getAllByRole('columnheader')
  expect(table.length).toBe(3);
  expect(table[0]).toBeEmptyDOMElement();
  expect(table[1]).toHaveTextContent('Product');
  expect(table[2]).toHaveTextContent('Total Collected');
});

test('check upload page', () => {
  render(<App />);

  expect(screen.getByRole('tab', {selected:false})).toHaveTextContent('Upload');
  fireEvent.click(screen.getByRole('tab', {selected:false}))
  expect(screen.getByTestId('btn-choose')).toHaveTextContent('Choose Files');
  expect(screen.getByTestId('btn-submit')).toBeDisabled()
});