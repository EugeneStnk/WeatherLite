import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Home from '@/pages/home';

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

describe('Integration Test - Search, API, and Weather Card', () => {
  let fetchSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();

    // Mock global fetch
    fetchSpy = vi.spyOn(global, 'fetch');

    // Надаємо фейкові дані, які співпадають з логікою твого компонента
    fetchSpy.mockResolvedValue(
      new Response(
        JSON.stringify({
          name: 'London',
          sys: { country: 'GB' },
          main: { temp: 24, feels_like: 22, humidity: 65 },
          wind: { speed: 12 },
          weather: [{ main: 'Clouds', description: 'cloudy' }],
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      ) as any
    );
  });

  afterEach(() => {
    fetchSpy.mockRestore();
  });

  it('should render the Home page with initial weather data', async () => {
    render(<Home />);
    await waitFor(() => {
      expect(screen.getByTestId('text-app-title')).toBeInTheDocument();
    });
  });

  it('should search for London and display weather card with correct data', async () => {
    const user = userEvent.setup();
    render(<Home />);

    const searchInput = screen.getByTestId('input-search-city');
    const searchButton = screen.getByTestId('button-search');

    await user.type(searchInput, 'London');
    await user.click(searchButton);

    await waitFor(() => {
      expect(screen.getByTestId('text-city-name')).toHaveTextContent('London');
    });
  });

  it('should display London weather with correct temperature from mock data', async () => {
    const user = userEvent.setup();
    render(<Home />);

    const searchInput = screen.getByTestId('input-search-city');
    const searchButton = screen.getByTestId('button-search');

    await user.type(searchInput, 'London');
    await user.click(searchButton);

    await waitFor(() => {
      // Використовуємо регулярний вираз /24/, бо компонент може додавати "+" або "°C"
      expect(screen.getByTestId('text-temperature')).toHaveTextContent(/24/);
    });
  });

  it('should display London weather card with country code GB', async () => {
    const user = userEvent.setup();
    render(<Home />);

    const searchInput = screen.getByTestId('input-search-city');
    const searchButton = screen.getByTestId('button-search');

    await user.type(searchInput, 'London');
    await user.click(searchButton);

    await waitFor(() => {
      expect(screen.getByTestId('text-country-code')).toHaveTextContent('GB');
    });
  });

  it('should display all weather details for London search result', async () => {
    const user = userEvent.setup();
    render(<Home />);

    const searchInput = screen.getByTestId('input-search-city');
    const searchButton = screen.getByTestId('button-search');

    await user.type(searchInput, 'London');
    await user.click(searchButton);

    await waitFor(() => {
      // Використовуємо регулярні вирази, щоб знайти числа незалежно від форматування
      expect(screen.getByText(/Відчувається як/i)).toBeInTheDocument();
      expect(screen.getByText(/22/)).toBeInTheDocument(); // Температура feels_like
      expect(screen.getByText(/Вітер/i)).toBeInTheDocument();
      expect(screen.getByText(/12/)).toBeInTheDocument(); // Швидкість вітру
      expect(screen.getByText(/Вологість/i)).toBeInTheDocument();
      expect(screen.getByText(/65/)).toBeInTheDocument(); // Вологість
    });
  });

  it('should verify fetch was mocked', async () => {
    expect(fetchSpy).toBeDefined();
  });

  it('should handle search with different case variations', async () => {
    const user = userEvent.setup();
    render(<Home />);
    const searchInput = screen.getByTestId('input-search-city');
    const searchButton = screen.getByTestId('button-search');

    await user.type(searchInput, 'london');
    await user.click(searchButton);

    await waitFor(() => {
      expect(screen.getByTestId('text-city-name')).toHaveTextContent(/London/i);
    });
  });
});
