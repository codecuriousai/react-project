import React from 'react';
import { render, screen } from '@testing-library/react';
import Blog from './Blog';
import { MemoryRouter } from 'react-router-dom';

describe('Blog Page', () => {
  it('renders blog heading and content correctly', () => {
    render(
      <MemoryRouter>
        <Blog />
      </MemoryRouter>
    );

    // Check main heading
    expect(screen.getByText('Welcome to Our Blog')).toBeInTheDocument();

    // Check articles
    expect(screen.getByText('Why React is Awesome')).toBeInTheDocument();
    expect(screen.getByText('Tips for Writing Clean Code')).toBeInTheDocument();
  });
});
