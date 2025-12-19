import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchHeader from '../SearchHeader';

describe('SearchHeader - Search Validation', () => {
  it('should render the search input with correct placeholder', () => {
    const mockSearch = vi.fn();
    const mockGeolocate = vi.fn();

    render(<SearchHeader onSearch={mockSearch} onGeolocate={mockGeolocate} />);

    const input = screen.getByPlaceholderText('Введіть місто...');
    expect(input).toBeInTheDocument();
  });

  it('should call onSearch with valid city name', async () => {
    const mockSearch = vi.fn();
    const mockGeolocate = vi.fn();
    const user = userEvent.setup();

    render(<SearchHeader onSearch={mockSearch} onGeolocate={mockGeolocate} />);

    const input = screen.getByTestId('input-search-city');
    const submitButton = screen.getByTestId('button-search');

    await user.type(input, 'Київ');
    await user.click(submitButton);

    expect(mockSearch).toHaveBeenCalledWith('Київ');
  });

  it('should NOT call onSearch with empty input', async () => {
    const mockSearch = vi.fn();
    const mockGeolocate = vi.fn();
    const user = userEvent.setup();

    render(<SearchHeader onSearch={mockSearch} onGeolocate={mockGeolocate} />);

    const submitButton = screen.getByTestId('button-search');
    await user.click(submitButton);

    expect(mockSearch).not.toHaveBeenCalled();
  });

  it('should NOT call onSearch with only whitespace', async () => {
    const mockSearch = vi.fn();
    const mockGeolocate = vi.fn();
    const user = userEvent.setup();

    render(<SearchHeader onSearch={mockSearch} onGeolocate={mockGeolocate} />);

    const input = screen.getByTestId('input-search-city');
    const submitButton = screen.getByTestId('button-search');

    await user.type(input, '   ');
    await user.click(submitButton);

    expect(mockSearch).not.toHaveBeenCalled();
  });

  it('should accept city names with special Ukrainian characters', async () => {
    const mockSearch = vi.fn();
    const mockGeolocate = vi.fn();
    const user = userEvent.setup();

    render(<SearchHeader onSearch={mockSearch} onGeolocate={mockGeolocate} />);

    const input = screen.getByTestId('input-search-city');
    const submitButton = screen.getByTestId('button-search');

    await user.type(input, 'Львів');
    await user.click(submitButton);

    expect(mockSearch).toHaveBeenCalledWith('Львів');
  });

  it('should call onGeolocate when geolocation button is clicked', async () => {
    const mockSearch = vi.fn();
    const mockGeolocate = vi.fn();
    const user = userEvent.setup();

    render(<SearchHeader onSearch={mockSearch} onGeolocate={mockGeolocate} />);

    const geoButton = screen.getByTestId('button-geolocate');
    await user.click(geoButton);

    expect(mockGeolocate).toHaveBeenCalled();
  });

  it('should trim whitespace from input before searching', async () => {
    const mockSearch = vi.fn();
    const mockGeolocate = vi.fn();
    const user = userEvent.setup();

    render(<SearchHeader onSearch={mockSearch} onGeolocate={mockGeolocate} />);

    const input = screen.getByTestId('input-search-city');
    const submitButton = screen.getByTestId('button-search');

    await user.type(input, '  Київ  ');
    await user.click(submitButton);

    expect(mockSearch).toHaveBeenCalledWith('Київ');
  });
});
