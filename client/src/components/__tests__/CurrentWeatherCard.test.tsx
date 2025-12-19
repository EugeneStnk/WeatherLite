import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CurrentWeatherCard from '../CurrentWeatherCard';
import { mockWeatherData } from '@/lib/mockData';

describe('CurrentWeatherCard - Rendering', () => {
  it('should render weather card with correct city and country', () => {
    const mockToggleFavorite = vi.fn();

    render(
      <CurrentWeatherCard
        weather={mockWeatherData['sumy']}
        isFavorite={false}
        onToggleFavorite={mockToggleFavorite}
      />
    );

    const cityName = screen.getByTestId('text-city-name');
    const countryCode = screen.getByTestId('text-country-code');

    expect(cityName).toHaveTextContent('Суми');
    expect(countryCode).toHaveTextContent('UA');
  });

  it('should render temperature with correct format', () => {
    const mockToggleFavorite = vi.fn();

    render(
      <CurrentWeatherCard
        weather={mockWeatherData['sumy']}
        isFavorite={false}
        onToggleFavorite={mockToggleFavorite}
      />
    );

    const temperature = screen.getByTestId('text-temperature');
    expect(temperature).toHaveTextContent('+24°C');
  });

  it('should render all weather details', () => {
    const mockToggleFavorite = vi.fn();

    render(
      <CurrentWeatherCard
        weather={mockWeatherData['sumy']}
        isFavorite={false}
        onToggleFavorite={mockToggleFavorite}
      />
    );

    const feelsLike = screen.getByTestId('text-feels-like');
    const wind = screen.getByTestId('text-wind-speed');
    const humidity = screen.getByTestId('text-humidity');

    expect(feelsLike).toHaveTextContent('+22°C');
    expect(wind).toHaveTextContent('12 км/г');
    expect(humidity).toHaveTextContent('65%');
  });

  it('should render weather description', () => {
    const mockToggleFavorite = vi.fn();

    render(
      <CurrentWeatherCard
        weather={mockWeatherData['sumy']}
        isFavorite={false}
        onToggleFavorite={mockToggleFavorite}
      />
    );

    const description = screen.getByTestId('text-weather-description');
    expect(description).toHaveTextContent('Ясно');
  });

  it('should display favorite button as outlined when not favorited', () => {
    const mockToggleFavorite = vi.fn();

    render(
      <CurrentWeatherCard
        weather={mockWeatherData['sumy']}
        isFavorite={false}
        onToggleFavorite={mockToggleFavorite}
      />
    );

    const favoriteButton = screen.getByTestId('button-toggle-favorite');
    const star = favoriteButton.querySelector('svg');

    expect(favoriteButton).toHaveClass('text-muted-foreground');
    expect(star).toBeInTheDocument();
  });

  it('should display favorite button as filled when favorited', () => {
    const mockToggleFavorite = vi.fn();

    render(
      <CurrentWeatherCard
        weather={mockWeatherData['sumy']}
        isFavorite={true}
        onToggleFavorite={mockToggleFavorite}
      />
    );

    const favoriteButton = screen.getByTestId('button-toggle-favorite');
    expect(favoriteButton).toHaveClass('text-yellow-500');
  });

  it('should call onToggleFavorite when favorite button is clicked', async () => {
    const mockToggleFavorite = vi.fn();
    const user = userEvent.setup();

    render(
      <CurrentWeatherCard
        weather={mockWeatherData['sumy']}
        isFavorite={false}
        onToggleFavorite={mockToggleFavorite}
      />
    );

    const favoriteButton = screen.getByTestId('button-toggle-favorite');
    await user.click(favoriteButton);

    expect(mockToggleFavorite).toHaveBeenCalled();
  });

  it('should render different weather data when prop changes', () => {
    const mockToggleFavorite = vi.fn();

    const { rerender } = render(
      <CurrentWeatherCard
        weather={mockWeatherData['sumy']}
        isFavorite={false}
        onToggleFavorite={mockToggleFavorite}
      />
    );

    let cityName = screen.getByTestId('text-city-name');
    expect(cityName).toHaveTextContent('Суми');

    rerender(
      <CurrentWeatherCard
        weather={mockWeatherData['kyiv']}
        isFavorite={false}
        onToggleFavorite={mockToggleFavorite}
      />
    );

    cityName = screen.getByTestId('text-city-name');
    expect(cityName).toHaveTextContent('Київ');
  });

  it('should handle negative temperatures correctly', () => {
    const mockToggleFavorite = vi.fn();
    const negativeWeather = {
      ...mockWeatherData['sumy'],
      temperature: -5,
      feelsLike: -8,
    };

    render(
      <CurrentWeatherCard
        weather={negativeWeather}
        isFavorite={false}
        onToggleFavorite={mockToggleFavorite}
      />
    );

    const temperature = screen.getByTestId('text-temperature');
    const feelsLike = screen.getByTestId('text-feels-like');

    expect(temperature).toHaveTextContent('-5°C');
    expect(feelsLike).toHaveTextContent('-8°C');
  });
});
