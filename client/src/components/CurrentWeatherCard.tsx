import { Star, Wind, Droplets, Thermometer } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import WeatherIcon from './WeatherIcon';
import type { WeatherData } from '@/lib/mockData';

interface CurrentWeatherCardProps {
  weather: WeatherData;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export default function CurrentWeatherCard({ weather, isFavorite, onToggleFavorite }: CurrentWeatherCardProps) {
  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardContent className="p-6 md:p-8">
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold" data-testid="text-city-name">
              {weather.city}
            </h2>
            <span className="text-muted-foreground" data-testid="text-country-code">
              {weather.country}
            </span>
          </div>
          <Button
            size="icon"
            variant="ghost"
            onClick={onToggleFavorite}
            className={isFavorite ? 'text-yellow-500' : 'text-muted-foreground'}
            data-testid="button-toggle-favorite"
          >
            <Star className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
          </Button>
        </div>

        <div className="flex flex-col items-center gap-4 mb-8">
          <WeatherIcon condition={weather.condition} size="xl" />
          <div className="text-center">
            <div className="text-5xl md:text-6xl font-bold" data-testid="text-temperature">
              {weather.temperature > 0 ? '+' : ''}{weather.temperature}°C
            </div>
            <p className="text-muted-foreground mt-1" data-testid="text-weather-description">
              {weather.description}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="flex flex-col items-center gap-2 p-3 rounded-lg bg-muted/50">
            <Thermometer className="w-5 h-5 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Відчувається як</span>
            <span className="font-medium" data-testid="text-feels-like">
              {weather.feelsLike > 0 ? '+' : ''}{weather.feelsLike}°C
            </span>
          </div>
          <div className="flex flex-col items-center gap-2 p-3 rounded-lg bg-muted/50">
            <Wind className="w-5 h-5 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Вітер</span>
            <span className="font-medium" data-testid="text-wind-speed">
              {weather.windSpeed} км/г
            </span>
          </div>
          <div className="flex flex-col items-center gap-2 p-3 rounded-lg bg-muted/50">
            <Droplets className="w-5 h-5 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Вологість</span>
            <span className="font-medium" data-testid="text-humidity">
              {weather.humidity}%
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
