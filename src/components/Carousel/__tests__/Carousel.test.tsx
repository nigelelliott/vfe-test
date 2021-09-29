import React from 'react';
import { render, screen } from '@testing-library/react';
import Carousel from '../Carousel';
import mockData from './mock-data.json';

window.IntersectionObserver = class MockIntersectionObserver {
  readonly root: Element | null;

  readonly rootMargin: string;

  readonly thresholds: ReadonlyArray<number>;

  constructor() {
    this.root = null;
    this.rootMargin = '';
    this.thresholds = [];
  }

  disconnect() {}

  observe() {}

  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }

  unobserve() {}
};

it('should render a carousel', () => {
  render(<Carousel data={mockData} />);
  const container = screen.getByTestId('container');

  expect(container).toBeInTheDocument();
});

it('should render the correct number of slides', () => {
  render(<Carousel data={mockData} />);
  const container = screen.getByTestId('container');

  expect(container.children.length).toEqual(mockData.length);
});

// TODO: Add more tests!
