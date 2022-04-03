import { Offer } from '../../types/offer';
import FavoriteCard from '../favorite-card/favorite-card';
import { v4 as uuidv4 } from 'uuid';

type FavoritesFullProps = {
  offers: Offer[];
};

function FavoritesFull({offers}: FavoritesFullProps): JSX.Element {
  const favoriteOffers = offers.filter((offer) => offer.isFavorite);
  const citiesList = new Set(favoriteOffers.map((offer)=>offer.city.name));

  const getFavoriteOffersInCity = (city: string): typeof offers => favoriteOffers.filter((offer) => offer.city.name===city);

  return (
    <main className="page__main page__main--favorites">
      <div className="page__favorites-container container">
        <section className="favorites">
          <h1 className="favorites__title">Saved listing</h1>
          <ul className="favorites__list">
            {
              [...citiesList].map((city) => (
                <li key={uuidv4()} className="favorites__locations-items">
                  <div className="favorites__locations locations locations--current">
                    <div className="locations__item">
                      <a className="locations__item-link" href="/">
                        <span>{city}</span>
                      </a>
                    </div>
                  </div>
                  <div className="favorites__places">
                    {
                      getFavoriteOffersInCity(city).map((offer) => (
                        <FavoriteCard key={offer.id} offer={offer} />
                      ))
                    }
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
