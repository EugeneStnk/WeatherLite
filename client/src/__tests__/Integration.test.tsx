import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Home from '@/pages/home';

vi.mock('wouter', () => ({
  useLocation: () => ['/', vi.fn()],
}));

vi.mock('@/hooks/use-toast', () => ({
  useToast: () => ({ toast: vi.fn() }),
}));

describe('Integration Test - Search, API, and Weather Card', () => {
  let fetchSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
    fetchSpy = vi.spyOn(global, 'fetch');

    // Надаємо дані, які очікує твій додаток (15 градусів)
    fetchSpy.mockResolvedValue(
      new Response(
        JSON.stringify({
          name: 'London',
          sys: { country: 'GB' },
          main: { temp: 15, feels_like: 13, humidity: 72 },
          wind: { speed: 18 },
          weather: [{ main: 'Clouds', description: 'cloudy' }],
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      ) as any
    );
  });

  afterEach(() => {
    fetchSpy.mockRestore();
  });

  it('should render the Home page with initial UI', async () => {
    render(<Home />);
    await waitFor(() => {
      expect(screen.getByTestId('text-app-title')).toBeInTheDocument();
    });
  });

  it('should search for London and display weather card', async () => {
    const user = userEvent.setup();
    render(<Home />);
    const searchInput = screen.getByTestId('input-search-city');
    const searchButton = screen.getByTestId('button-search');

    await user.type(searchInput, 'London');
    await user.click(searchButton);

    await waitFor(() => {
      expect(screen.getByTestId('text-city-name')).toHaveTextContent(/London/i);
    });
  });

  it('should display London weather with correct temperature', async () => {
    const user = userEvent.setup();
    render(<Home />);
    const searchInput = screen.getByTestId('input-search-city');
    const searchButton = screen.getByTestId('button-search');

    await user.type(searchInput, 'London');
    await user.click(searchButton);

    await waitFor(() => {
      // Чекаємо саме 15, бо так приходить у логах
      expect(screen.getByTestId('text-temperature')).toHaveTextContent(/15/);
    });
  });

  it('should display all weather details correctly', async () => {
    const user = userEvent.setup();
    render(<Home />);
    const searchInput = screen.getByTestId('input-search-city');
    const searchButton = screen.getByTestId('button-search');

    await user.type(searchInput, 'London');
    await user.click(searchButton);

    await waitFor(() => {
      expect(screen.getByText(/Відчувається як/i)).toBeInTheDocument();
      expect(screen.getByText(/13/)).toBeInTheDocument(); // feels_like
      expect(screen.getByText(/18/)).toBeInTheDocument(); // wind speed
      expect(screen.getByText(/72/)).toBeInTheDocument(); // humidity
    });
  });

  it('should handle search case variations', async () => {
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
