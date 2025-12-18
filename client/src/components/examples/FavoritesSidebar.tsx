import { useState } from 'react';
import FavoritesSidebar from '../FavoritesSidebar';
import { defaultFavorites } from '@/lib/mockData';

export default function FavoritesSidebarExample() {
  const [favorites, setFavorites] = useState(defaultFavorites);

  const handleSelectCity = (cityName: string) => {
    console.log('City selected:', cityName);
  };

  const handleRemoveFavorite = (id: string) => {
    setFavorites(favorites.filter(f => f.id !== id));
    console.log('Removed favorite:', id);
  };

  return (
    <div className="w-72">
      <FavoritesSidebar
        favorites={favorites}
        onSelectCity={handleSelectCity}
        onRemoveFavorite={handleRemoveFavorite}
      />
    </div>
  );
}
