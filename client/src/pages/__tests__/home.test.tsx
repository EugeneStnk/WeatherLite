import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Home from '../home';

// Mock wouter
vi.mock('wouter', () => ({
  useLocation: () => ['/', vi.fn()],
}));

// Mock the toast hook
vi.mock('@/hooks/use-toast', () => ({
  useToast: () => ({
    toast: vi.fn(),
  }),
}));

const FAVORITES_STORAGE_KEY = 'weatherlite_favorites';

describe('Home - LocalStorage Persistence', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('should initialize localStorage with default favorites on mount', async () => {
    localStorage.clear();
    render(<Home />);

    await waitFor(
      () => {
        const savedData = localStorage.getItem(FAVORITES_STORAGE_KEY);
        expect(savedData).toBeTruthy();
        const parsed = JSON.parse(savedData!);
        expect(Array.isArray(parsed)).toBe(true);
        expect(parsed.length).toBeGreaterThan(0);
      },
      { timeout: 3000 }
    );
  });

  it('should save favorites to localStorage when a city is added', async () => {
    const user = userEvent.setup();
    render(<Home />);

    await waitFor(
      () => {
        expect(screen.getByTestId('text-city-name')).toHaveTextContent('Суми');
      },
      { timeout: 3000 }
    );

    const favoriteButton = screen.getByTestId('button-toggle-favorite');
    await user.click(favoriteButton);

    await waitFor(
      () => {
        const savedData = localStorage.getItem(FAVORITES_STORAGE_KEY);
        expect(savedData).toBeTruthy();
        const parsed = JSON.parse(savedData!);
        expect(Array.isArray(parsed)).toBe(true);
        expect(parsed.some((fav: any) => fav.name === 'Суми')).toBe(true);
      },
      { timeout: 3000 }
    );
  });

  it('should handle corrupted localStorage data gracefully by using defaults', async () => {
    localStorage.setItem(FAVORITES_STORAGE_KEY, 'invalid json');

    render(<Home />);

    await waitFor(
      () => {
        const savedData = localStorage.getItem(FAVORITES_STORAGE_KEY);
        expect(savedData).toBeTruthy();
        const parsed = JSON.parse(savedData!);
        expect(Array.isArray(parsed)).toBe(true);
      },
      { timeout: 3000 }
    );
  });

  it('should search for a city and update current weather display', async () => {
    const user = userEvent.setup();
    render(<Home />);

    await waitFor(
      () => {
        expect(screen.getByTestId('text-city-name')).toHaveTextContent('Суми');
      },
      { timeout: 3000 }
    );

    const searchInput = screen.getByTestId('input-search-city');
    const searchButton = screen.getByTestId('button-search');

    await user.type(searchInput, 'Київ');
    await user.click(searchButton);

    await waitFor(
      () => {
        expect(screen.getByTestId('text-city-name')).toHaveTextContent('Київ');
      },
      { timeout: 3000 }
    );
  });

  it('should persist selected city in weather display', async () => {
    const user = userEvent.setup();
    render(<Home />);

    await waitFor(
      () => {
        expect(screen.getByTestId('text-city-name')).toBeInTheDocument();
      },
      { timeout: 3000 }
    );

    const searchInput = screen.getByTestId('input-search-city');
    const searchButton = screen.getByTestId('button-search');

    await user.type(searchInput, 'Одеса');
    await user.click(searchButton);

    await waitFor(
      () => {
        const cityDisplay = screen.getByTestId('text-city-name');
        expect(cityDisplay).toHaveTextContent('Одеса');
      },
      { timeout: 3000 }
    );
  });
});
