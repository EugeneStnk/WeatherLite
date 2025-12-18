import { Search, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

interface SearchHeaderProps {
  onSearch: (city: string) => void;
  onGeolocate: () => void;
}

export default function SearchHeader({ onSearch, onGeolocate }: SearchHeaderProps) {
  const [searchValue, setSearchValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      onSearch(searchValue.trim());
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center gap-4 flex-wrap">
          <h1 className="text-xl font-semibold text-primary" data-testid="text-app-title">
            WeatherLite
          </h1>
          <form onSubmit={handleSubmit} className="flex-1 flex items-center gap-2 min-w-[200px] max-w-md">
            <div className="relative flex-1">
              <Input
                type="search"
                placeholder="Введіть місто..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="pr-10"
                data-testid="input-search-city"
              />
            </div>
            <Button type="submit" size="icon" variant="default" data-testid="button-search">
              <Search className="w-4 h-4" />
            </Button>
            <Button type="button" size="icon" variant="outline" onClick={onGeolocate} data-testid="button-geolocate">
              <MapPin className="w-4 h-4" />
            </Button>
          </form>
        </div>
      </div>
    </header>
  );
}
