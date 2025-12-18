import { X, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { FavoriteCity } from '@/lib/mockData';

interface FavoritesSidebarProps {
  favorites: FavoriteCity[];
  onSelectCity: (cityName: string) => void;
  onRemoveFavorite: (id: string) => void;
}

export default function FavoritesSidebar({ favorites, onSelectCity, onRemoveFavorite }: FavoritesSidebarProps) {
  return (
    <Card className="h-fit">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <MapPin className="w-5 h-5" />
          Улюблені міста
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        {favorites.length === 0 ? (
          <p className="text-sm text-muted-foreground py-4 text-center" data-testid="text-no-favorites">
            Немає улюблених міст
          </p>
        ) : (
          <ul className="space-y-2">
            {favorites.map((city) => (
              <li key={city.id}>
                <div
                  className="flex items-center justify-between gap-2 p-2 rounded-lg hover-elevate active-elevate-2 cursor-pointer group"
                  onClick={() => onSelectCity(city.name)}
                  data-testid={`favorite-city-${city.id}`}
                >
                  <span className="text-sm font-medium truncate" data-testid={`text-favorite-name-${city.id}`}>
                    {city.name}, {city.country}
                  </span>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="w-7 h-7 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive"
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemoveFavorite(city.id);
                    }}
                    data-testid={`button-remove-favorite-${city.id}`}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
