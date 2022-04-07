import Header from '../../components/header/header';
import FavoritesFull from '../../components/favorites/favorites-full/favorites-full';
import FavoritesEmpty from '../../components/favorites/favorites-empty/favorites-empty';
import { useAppSelector } from '../../hooks';
import { store } from '../../store';
import { fetchFavoriteAction } from '../../store/api-actions';
import { useEffect } from 'react';
import { LogoType } from '../../settings';
import { getFavorite } from '../../store/offers-data/selectors';

function Favorites(): JSX.Element {
  useEffect(() => { store.dispatch(fetchFavoriteAction()); }, []);
  const offers = useAppSelector(getFavorite).filter(({isFavorite}) => isFavorite);

  return (
    <div data-testid="Favorites" className={`page ${offers.length ===0 ? 'page--favorites-empty' : ''}`}>
      <Header />
      {offers.length > 0 ? <FavoritesFull offers={offers}/> : <FavoritesEmpty />}
      <footer className="footer container">
        <a className="footer__logo-link" href="main.html">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width={LogoType.FOOTER.width} height={LogoType.FOOTER.height} />
        </a>
      </footer>
    </div>
  );
}

export default Favorites;
