import { Sun, Cloud, CloudSun, CloudRain, CloudLightning, Snowflake } from 'lucide-react';

interface WeatherIconProps {
  condition: 'sunny' | 'cloudy' | 'partly-cloudy' | 'rainy' | 'stormy' | 'snowy';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const sizeClasses = {
  sm: 'w-6 h-6',
  md: 'w-10 h-10',
  lg: 'w-16 h-16',
  xl: 'w-24 h-24'
};

export default function WeatherIcon({ condition, size = 'md', className = '' }: WeatherIconProps) {
  const sizeClass = sizeClasses[size];
  const iconClass = `${sizeClass} ${className}`;

  switch (condition) {
    case 'sunny':
      return <Sun className={`${iconClass} text-yellow-500`} data-testid="icon-weather-sunny" />;
    case 'cloudy':
      return <Cloud className={`${iconClass} text-gray-400`} data-testid="icon-weather-cloudy" />;
    case 'partly-cloudy':
      return <CloudSun className={`${iconClass} text-yellow-400`} data-testid="icon-weather-partly-cloudy" />;
    case 'rainy':
      return <CloudRain className={`${iconClass} text-blue-400`} data-testid="icon-weather-rainy" />;
    case 'stormy':
      return <CloudLightning className={`${iconClass} text-purple-500`} data-testid="icon-weather-stormy" />;
    case 'snowy':
      return <Snowflake className={`${iconClass} text-blue-300`} data-testid="icon-weather-snowy" />;
    default:
      return <Sun className={`${iconClass} text-yellow-500`} data-testid="icon-weather-default" />;
  }
}
