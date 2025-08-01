import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import About from './About';

describe('About Component', () => {
  beforeEach(() => {
    render(<About />);
  });

  test('renders the main title', () => {
    const titleElement = screen.getByText('About Us');
    expect(titleElement).toBeInTheDocument();
  });

  test('renders all section titles', () => {
    const missionTitle = screen.getByText('Our Mission');
    const storyTitle = screen.getByText('Our Story');
    const valuesTitle = screen.getByText('Our Values');
    const contactTitle = screen.getByText('Contact Information');

    expect(missionTitle).toBeInTheDocument();
    expect(storyTitle).toBeInTheDocument();
    expect(valuesTitle).toBeInTheDocument();
    expect(contactTitle).toBeInTheDocument();
  });

  test('renders mission description', () => {
    const missionText = screen.getByText(/We are dedicated to providing high-quality products/);
    expect(missionText).toBeInTheDocument();
  });

  test('renders story description', () => {
    const storyText = screen.getByText(/Founded with a passion for excellence/);
    expect(storyText).toBeInTheDocument();
  });

  test('renders all value items', () => {
    const qualityTitle = screen.getByText('Quality');
    const innovationTitle = screen.getByText('Innovation');
    const customerFirstTitle = screen.getByText('Customer First');

    expect(qualityTitle).toBeInTheDocument();
    expect(innovationTitle).toBeInTheDocument();
    expect(customerFirstTitle).toBeInTheDocument();
  });

  test('renders quality value description', () => {
    const qualityDescription = screen.getByText(/We never compromise on quality/);
    expect(qualityDescription).toBeInTheDocument();
  });

  test('renders innovation value description', () => {
    const innovationDescription = screen.getByText(/We constantly strive to bring the latest/);
    expect(innovationDescription).toBeInTheDocument();
  });

  test('renders customer first value description', () => {
    const customerDescription = screen.getByText(/Our customers are at the heart of everything/);
    expect(customerDescription).toBeInTheDocument();
  });

  test('renders contact information', () => {
    const emailInfo = screen.getByText(/Email:/);
    const phoneInfo = screen.getByText(/Phone:/);
    const addressInfo = screen.getByText(/Address:/);

    expect(emailInfo).toBeInTheDocument();
    expect(phoneInfo).toBeInTheDocument();
    expect(addressInfo).toBeInTheDocument();
  });

  test('has proper semantic structure', () => {
    const mainTitle = screen.getByRole('heading', { level: 1 });
    const sectionTitles = screen.getAllByRole('heading', { level: 2 });
    const valueTitles = screen.getAllByRole('heading', { level: 3 });

    expect(mainTitle).toBeInTheDocument();
    expect(sectionTitles).toHaveLength(4); // Mission, Story, Values, Contact
    expect(valueTitles).toHaveLength(3); // Quality, Innovation, Customer First
  });

  test('renders with correct CSS classes', () => {
    const container = screen.getByText('About Us').closest('div');
    expect(container).toHaveClass('aboutContainer');
  });
}); 