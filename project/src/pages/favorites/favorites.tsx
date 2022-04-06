import Header from '../../components/header/header';
import FavoritesFull from '../../components/favorites/favorites-full';
import FavoritesEmpty from '../../components/favorites/favorites-empty';
import { useAppSelector } from '../../hooks';
import { store } from '../../store';
import { fetchFavoriteAction } from '../../store/api-actions';
import { useEffect } from 'react';
import { LogoType } from '../../settings';

function Favorites(): JSX.Element {
  useEffect(() => { store.dispatch(fetchFavoriteAction()); }, []);
  const offersFavorite = useAppSelector(({ DATA }) => DATA.offersFavorite);

  return (
    <div className={`page ${offersFavorite.length === 0 ? 'page--favorites-empty' : ''}`}>
      <Header />
      {offersFavorite.length > 0 ? <FavoritesFull /> : <FavoritesEmpty />}
      <footer className="footer container">
        <a className="footer__logo-link" href="main.html">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width={LogoType.FOOTER.width} height={LogoType.FOOTER.height} />
        </a>
      </footer>
    </div>
  );
}

export default Favorites;
