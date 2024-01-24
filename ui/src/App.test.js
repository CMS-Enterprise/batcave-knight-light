import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { test, expect } from '@jest/globals';
import App from './App';

describe('App', () => {
  test('renders without crashing', async () => {
    const { unmount } = render(<App />);
    unmount();
  });

  test('renders app content', () => {
    render(<App />);
    const contentElement = screen.queryByTestId('myapp');
    expect(contentElement).toBeInTheDocument();
  });
});
