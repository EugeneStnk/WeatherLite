import WeatherIcon from '../WeatherIcon';

export default function WeatherIconExample() {
  return (
    <div className="flex flex-wrap gap-4 items-center">
      <WeatherIcon condition="sunny" size="xl" />
      <WeatherIcon condition="cloudy" size="lg" />
      <WeatherIcon condition="partly-cloudy" size="md" />
      <WeatherIcon condition="rainy" size="sm" />
    </div>
  );
}
