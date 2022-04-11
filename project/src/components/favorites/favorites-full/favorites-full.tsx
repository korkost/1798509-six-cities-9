import { Offer } from '../../../types/offer';
import { v4 as uuidv4 } from 'uuid';
import FavoritesOffersList from '../favorites-offers-list/favorites-offers-list';
import { changeCity } from '../../../store/offers-process/offers-process';
import { store } from '../../../store';
import { Link } from 'react-router-dom';

type FavoritesFullProps = {
  offers: Offer[],
};

function FavoritesFull({offers}: FavoritesFullProps): JSX.Element {
  const citiesList = new Set(offers.map((offer: Offer)=>offer.city.name));

  return (
    <main data-testid="FavoritesFull" className="page__main page__main--favorites">
      <div className="page__favorites-container container">
        <section className="favorites">
          <h1 className="favorites__title">Saved listing</h1>
          <ul className="favorites__list">
            {
              [...citiesList].map((city) => (
                <li
                  key={uuidv4()}
                  className="favorites__locations-items"
                  data-testid="CityFavorite"
                  onClick={()=>{store.dispatch(changeCity(city));}}
                >
                  <div className="favorites__locations locations locations--current">
                    <div className="locations__item">
                      <Link data-testid="CityButton"  to="/" className="locations__item-link" >
                        <span>{city}</span>
                      </Link>
                    </div>
                  </div>
                  <div className="favorites__places">
                    <FavoritesOffersList offers={offers} city={city} />
                  </div>
                </li>
              ))
            }
          </ul>
        </section>
      </div>
    </main>
  );}

export default FavoritesFull;
