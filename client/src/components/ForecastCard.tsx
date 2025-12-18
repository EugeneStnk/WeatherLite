import { Card, CardContent } from '@/components/ui/card';
import WeatherIcon from './WeatherIcon';
import type { ForecastDay } from '@/lib/mockData';

interface ForecastCardProps {
  forecast: ForecastDay;
}

export default function ForecastCard({ forecast }: ForecastCardProps) {
  return (
    <Card className="min-w-[120px] flex-shrink-0">
      <CardContent className="p-4 flex flex-col items-center gap-2">
        <span className="text-sm font-medium" data-testid={`text-forecast-day-${forecast.dayName}`}>
          {forecast.dayName}
        </span>
        <WeatherIcon condition={forecast.condition} size="md" />
        <div className="text-center">
          <span className="font-semibold" data-testid={`text-forecast-temp-day-${forecast.dayName}`}>
            {forecast.tempDay > 0 ? '+' : ''}{forecast.tempDay}°
          </span>
          <span className="text-muted-foreground mx-1">/</span>
          <span className="text-muted-foreground text-sm" data-testid={`text-forecast-temp-night-${forecast.dayName}`}>
            {forecast.tempNight > 0 ? '+' : ''}{forecast.tempNight}°
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
