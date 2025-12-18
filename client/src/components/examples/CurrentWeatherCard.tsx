import { useState } from 'react';
import CurrentWeatherCard from '../CurrentWeatherCard';
import { mockWeatherData } from '@/lib/mockData';

export default function CurrentWeatherCardExample() {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <CurrentWeatherCard
      weather={mockWeatherData['sumy']}
      isFavorite={isFavorite}
      onToggleFavorite={() => {
        setIsFavorite(!isFavorite);
        console.log('Favorite toggled:', !isFavorite);
      }}
    />
  );
}
