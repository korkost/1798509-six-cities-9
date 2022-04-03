import Header from '../../components/header/header';
import Navigation from '../../components/navigation/navigation';
import { Offer } from '../../types/offer';
import FavoritesFull from '../../components/favorites-full/favorites-full';
import FavoritesEmpty from '../../components/favorites-empty/favorites-empty';


type FavoritesProps = {
  offers: Offer[];
};

function Favorites(props: FavoritesProps): JSX.Element {
  const {offers} = props;
  const favoriteOffers = offers.filter((offer) => offer.isFavorite);

  return (
    <div className="page">
      <Header navigation={<Navigation />}/>
      {favoriteOffers.length>0? <FavoritesFull offers={offers} /> : <FavoritesEmpty />}
      <footer className="footer container">
        <a className="footer__logo-link" href="main.html">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
        </a>
      </footer>
    </div>
  );
}

export default Favorites;
