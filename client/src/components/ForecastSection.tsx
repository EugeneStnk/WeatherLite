import ForecastCard from './ForecastCard';
import type { ForecastDay } from '@/lib/mockData';

interface ForecastSectionProps {
  forecast: ForecastDay[];
}

export default function ForecastSection({ forecast }: ForecastSectionProps) {
  return (
    <section className="w-full max-w-4xl mx-auto">
      <h3 className="text-lg font-semibold mb-4" data-testid="text-forecast-heading">
        Прогноз на 5 днів
      </h3>
      <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory">
        {forecast.map((day, index) => (
          <div key={index} className="snap-start">
            <ForecastCard forecast={day} />
          </div>
        ))}
      </div>
    </section>
  );
}
