import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks';

type CityProps = {
  city: string;
  onCityItemHover: (listItemName: string) => void;
}
function City({city, onCityItemHover}: CityProps): JSX.Element {
  const currentCity = useAppSelector((state) => state.city);

  return (
    <li onClick={() => onCityItemHover(city)}
      className="locations__item"
    >
      <Link to="" title='offer' className={`locations__item-link tabs__item ${currentCity===city&&'tabs__item--active'}`} >
        <span>{city}</span>
      </Link>
    </li>);
}

export default City;
