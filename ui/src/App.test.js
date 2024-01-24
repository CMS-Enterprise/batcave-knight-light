import { act, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { test, expect } from '@jest/globals';
import App from './App';

describe('App', () => {
  test('renders without crashing', async () => {
    await act(async () => {
      const { unmount } = render(<App />);
      unmount();
    });
  });

  test('renders app content', async () => {
    let ummountFunction;
    await act(async () => {
      const { unmount } = render(<App />);
      ummountFunction = unmount;
    });

    const contentElement = screen.queryByTestId('myapp');
    expect(contentElement).toBeInTheDocument();

    await act(async () => {
      ummountFunction();
    });
  });
});
