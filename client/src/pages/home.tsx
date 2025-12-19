import { useState, useCallback, useEffect } from 'react';
import SearchHeader from '@/components/SearchHeader';
import CurrentWeatherCard from '@/components/CurrentWeatherCard';
import ForecastSection from '@/components/ForecastSection';
import FavoritesSidebar from '@/components/FavoritesSidebar';
import { mockWeatherData, mockForecast, defaultFavorites, type FavoriteCity, type WeatherData } from '@/lib/mockData';
import { useToast } from '@/hooks/use-toast';

const FAVORITES_STORAGE_KEY = 'weatherlite_favorites';

export default function Home() {
  // todo: remove mock functionality
  const [currentWeather, setCurrentWeather] = useState<WeatherData>(mockWeatherData['sumy']);
  const [favorites, setFavorites] = useState<FavoriteCity[]>(defaultFavorites);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const { toast } = useToast();

  // Load favorites from localStorage on mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem(FAVORITES_STORAGE_KEY);
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites));
      } catch {
        setFavorites(defaultFavorites);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
    }
  }, [favorites, isLoaded]);

  const isFavorite = favorites.some(
    f => f.name.toLowerCase() === currentWeather.city.toLowerCase()
  );

  const handleSearch = useCallback((city: string) => {
    const cityKey = city.toLowerCase();
    const cityMappings: Record<string, string> = {
      'суми': 'sumy',
      'київ': 'kyiv',
      'львів': 'lviv',
      'одеса': 'odesa',
      'харків': 'kharkiv',
      'sumy': 'sumy',
      'kyiv': 'kyiv',
      'lviv': 'lviv',
      'odesa': 'odesa',
      'kharkiv': 'kharkiv',
      'london': 'london',
      'лондон': 'london'
    };

    const mappedKey = cityMappings[cityKey];
    if (mappedKey && mockWeatherData[mappedKey]) {
      setCurrentWeather(mockWeatherData[mappedKey]);
      toast({
        title: 'Місто знайдено',
        description: `Погода для ${mockWeatherData[mappedKey].city} завантажена`,
      });
    } else {
      toast({
        title: 'Місто не знайдено',
        description: 'Спробуйте інше місто (Київ, Львів, Суми, Одеса, Харків, London)',
        variant: 'destructive',
      });
    }
  }, [toast]);

  const handleGeolocate = useCallback(() => {
    // todo: remove mock functionality - implement real geolocation
    setCurrentWeather(mockWeatherData['sumy']);
    toast({
      title: 'Геолокація',
      description: 'Визначено ваше місцезнаходження: Суми',
    });
  }, [toast]);

  const handleToggleFavorite = useCallback(() => {
    if (isFavorite) {
      setFavorites(prev => prev.filter(f => f.name.toLowerCase() !== currentWeather.city.toLowerCase()));
      toast({
        title: 'Видалено з улюблених',
        description: `${currentWeather.city} видалено зі списку улюблених міст`,
      });
    } else {
      const newFavorite: FavoriteCity = {
        id: Date.now().toString(),
        name: currentWeather.city,
        country: currentWeather.country,
      };
      setFavorites(prev => [...prev, newFavorite]);
      toast({
        title: 'Додано до улюблених',
        description: `${currentWeather.city} додано до списку улюблених міст`,
      });
    }
  }, [currentWeather, isFavorite, toast]);

  const handleSelectCity = useCallback((cityName: string) => {
    handleSearch(cityName);
    setIsMobileSidebarOpen(false);
  }, [handleSearch]);

  const handleRemoveFavorite = useCallback((id: string) => {
    setFavorites(prev => prev.filter(f => f.id !== id));
    toast({
      title: 'Видалено',
      description: 'Місто видалено з улюблених',
    });
  }, [toast]);

  return (
    <div className="min-h-screen bg-background">
      <SearchHeader onSearch={handleSearch} onGeolocate={handleGeolocate} />
      
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main Content */}
          <main className="flex-1 flex flex-col gap-8">
            <CurrentWeatherCard
              weather={currentWeather}
              isFavorite={isFavorite}
              onToggleFavorite={handleToggleFavorite}
            />
            <ForecastSection forecast={mockForecast} />
          </main>

          {/* Sidebar - Desktop */}
          <aside className="hidden lg:block w-72 flex-shrink-0">
            <div className="sticky top-24">
              <FavoritesSidebar
                favorites={favorites}
                onSelectCity={handleSelectCity}
                onRemoveFavorite={handleRemoveFavorite}
              />
            </div>
          </aside>

          {/* Mobile Favorites Toggle */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
              className="w-full py-3 px-4 bg-muted rounded-lg text-sm font-medium flex items-center justify-center gap-2"
              data-testid="button-toggle-mobile-sidebar"
            >
              {isMobileSidebarOpen ? 'Сховати улюблені' : 'Показати улюблені міста'}
            </button>
            {isMobileSidebarOpen && (
              <div className="mt-4">
                <FavoritesSidebar
                  favorites={favorites}
                  onSelectCity={handleSelectCity}
                  onRemoveFavorite={handleRemoveFavorite}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
