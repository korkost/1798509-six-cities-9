import { Offer } from '../../types/offer';
import { v4 as uuidv4 } from 'uuid';
import { useAppSelector } from '../../hooks';
import FavoritesOffersList from '../favorites/favorites-offers-list';
import { changeСity } from '../../store/offers-process/offers-process';
import { store } from '../../store';
import { Link } from 'react-router-dom';

function FavoritesFull(): JSX.Element {
  const offersFavorite = useAppSelector(({DATA}) => DATA.offersFavorite);
  const citiesList = new Set(offersFavorite.map((offer: Offer)=>offer.city.name));

  return (
    <main className="page__main page__main--favorites">
      <div className="page__favorites-container container">
        <section className="favorites">
          <h1 className="favorites__title">Saved listing</h1>
          <ul className="favorites__list">
            {
              [...citiesList].map((city) => (
                <li
                  key={uuidv4()}
                  className="favorites__locations-items"
                  onClick={()=>{store.dispatch(changeСity(city));}}
                >
                  <div className="favorites__locations locations locations--current">
                    <div className="locations__item">
                      <Link to="/" className="locations__item-link" >
                        <span>{city}</span>
                      </Link>
                    </div>
                  </div>
                  <div className="favorites__places">
                    <FavoritesOffersList city={city} />
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
