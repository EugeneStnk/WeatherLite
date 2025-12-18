import ForecastCard from '../ForecastCard';
import { mockForecast } from '@/lib/mockData';

export default function ForecastCardExample() {
  return <ForecastCard forecast={mockForecast[0]} />;
}
