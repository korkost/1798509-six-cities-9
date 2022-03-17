import { Cities } from '../../consts';
import City from '../city/city';

type CitiesListProps = {
  onCityItemHover: (listItemName: string) => void;
}

function CitiesList({onCityItemHover}: CitiesListProps): JSX.Element {
  const cities = Object.values(Cities);

  return (
    <ul className="locations__list tabs__list">
      {
        cities.map((city) =><City key={city} onCityItemHover={onCityItemHover} city={city} />)
      }
    </ul>
  );
}

export default CitiesList;
