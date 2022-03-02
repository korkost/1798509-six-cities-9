import Header from '../../components/header/header';
import Navigation from '../../components/navigation/navigation';
import {Offer} from '../../types/offer';
import FavoriteCard from '../../components/favorite-card/favorite-card';

type FavoritesProps = {
  offers: Offer[];
};

function Favorites(props: FavoritesProps): JSX.Element {
  const {offers} = props;
  const favoriteOffers = offers.filter((offer) => offer.isFavorite);

  return (
    <div className="page">
      <Header navigation={<Navigation />}/>
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">
              Saved listing
            </h1>
            <ul className="favorites__list">
              <li className="favorites__locations-items">
                <div className="favorites__locations locations locations--current">
                  <div className="locations__item">
                    <a className="locations__item-link" href="/">
                      <span>Amsterdam</span>
                    </a>
                  </div>
                </div>
                <div className="favorites__places">
                  {
                    favoriteOffers.map((offer) => (
                      <FavoriteCard key={offer.id} offer={offer} />
                    ))
                  }
                </div>
              </li>
            </ul>
          </section>
        </div>
      </main>
      <footer className="footer container">
        <a className="footer__logo-link" href="main.html">
          <img
            className="footer__logo"
            src="img/logo.svg"
            alt="6 cities logo"
            width="64"
            height="33"
          />
        </a>
      </footer>
    </div>
  );
}

export default Favorites;
