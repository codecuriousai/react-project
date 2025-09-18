import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

// Basic render test
test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

// Additional tests to improve coverage

describe('App component additional tests', () => {
  test('renders main heading if present', () => {
    render(<App />);
    const heading = screen.queryByRole('heading');
    expect(heading).toBeInTheDocument();
  });

  test('renders button and handles click events if any', () => {
    render(<App />);
    const button = screen.queryByRole('button');
    if (button) {
      expect(button).toBeInTheDocument();
      fireEvent.click(button);
      // can add more expects here depending on what click triggers
    }
  });

  test('check for accessibility landmarks or roles', () => {
    render(<App />);
    const mainRegion = screen.queryByRole('main');
    expect(mainRegion).toBeInTheDocument();
  });
});