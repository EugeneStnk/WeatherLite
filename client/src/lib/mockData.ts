// todo: remove mock functionality - replace with real API data

export interface WeatherData {
  city: string;
  country: string;
  temperature: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  condition: 'sunny' | 'cloudy' | 'partly-cloudy' | 'rainy' | 'stormy' | 'snowy';
  description: string;
}

export interface ForecastDay {
  dayName: string;
  condition: 'sunny' | 'cloudy' | 'partly-cloudy' | 'rainy' | 'stormy' | 'snowy';
  tempDay: number;
  tempNight: number;
}

export interface FavoriteCity {
  id: string;
  name: string;
  country: string;
}

// todo: remove mock functionality
export const mockWeatherData: Record<string, WeatherData> = {
  'sumy': {
    city: 'Суми',
    country: 'UA',
    temperature: 24,
    feelsLike: 22,
    humidity: 65,
    windSpeed: 12,
    condition: 'sunny',
    description: 'Ясно'
  },
  'kyiv': {
    city: 'Київ',
    country: 'UA',
    temperature: 21,
    feelsLike: 19,
    humidity: 70,
    windSpeed: 15,
    condition: 'partly-cloudy',
    description: 'Мінлива хмарність'
  },
  'lviv': {
    city: 'Львів',
    country: 'UA',
    temperature: 18,
    feelsLike: 16,
    humidity: 75,
    windSpeed: 10,
    condition: 'cloudy',
    description: 'Хмарно'
  },
  'odesa': {
    city: 'Одеса',
    country: 'UA',
    temperature: 26,
    feelsLike: 28,
    humidity: 80,
    windSpeed: 8,
    condition: 'sunny',
    description: 'Ясно'
  },
  'kharkiv': {
    city: 'Харків',
    country: 'UA',
    temperature: 22,
    feelsLike: 21,
    humidity: 60,
    windSpeed: 14,
    condition: 'partly-cloudy',
    description: 'Мінлива хмарність'
  }
};

// todo: remove mock functionality
export const mockForecast: ForecastDay[] = [
  { dayName: 'Понеділок', condition: 'sunny', tempDay: 24, tempNight: 16 },
  { dayName: 'Вівторок', condition: 'partly-cloudy', tempDay: 22, tempNight: 14 },
  { dayName: 'Середа', condition: 'cloudy', tempDay: 19, tempNight: 12 },
  { dayName: 'Четвер', condition: 'rainy', tempDay: 17, tempNight: 11 },
  { dayName: "П'ятниця", condition: 'partly-cloudy', tempDay: 20, tempNight: 13 }
];

// todo: remove mock functionality
export const defaultFavorites: FavoriteCity[] = [
  { id: '1', name: 'Київ', country: 'UA' },
  { id: '2', name: 'Львів', country: 'UA' }
];

export function getWeatherIcon(condition: string): string {
  switch (condition) {
    case 'sunny':
      return 'sun';
    case 'cloudy':
      return 'cloud';
    case 'partly-cloudy':
      return 'cloud-sun';
    case 'rainy':
      return 'cloud-rain';
    case 'stormy':
      return 'cloud-lightning';
    case 'snowy':
      return 'snowflake';
    default:
      return 'sun';
  }
}
