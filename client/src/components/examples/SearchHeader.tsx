import SearchHeader from '../SearchHeader';

export default function SearchHeaderExample() {
  const handleSearch = (city: string) => {
    console.log('Search triggered for:', city);
  };

  const handleGeolocate = () => {
    console.log('Geolocation triggered');
  };

  return <SearchHeader onSearch={handleSearch} onGeolocate={handleGeolocate} />;
}
