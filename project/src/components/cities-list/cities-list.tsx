import { Cities } from '../../consts';
import City from '../city/city';

function CitiesList(): JSX.Element {
  const cities = Object.values(Cities);

  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {
            cities.map((city) =><City key={city} currentCity={city} />)
          }
        </ul>
      </section>
    </div>
  );
}

export default CitiesList;
