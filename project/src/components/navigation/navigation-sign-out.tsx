import { memo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../consts';
import { useAppSelector } from '../../hooks';
import { store } from '../../store';
import { getUserAction, logoutAction } from '../../store/api-actions';

function NavigationSignOut(): JSX.Element {
  useEffect(()=>{store.dispatch(getUserAction());}, []);
  const user = useAppSelector(({USER}) => USER.user);

  return (
    <>
      <li className="header__nav-item user">
        <Link
          to={AppRoute.Favorites}
          title='/favorites'
          className="header__nav-link header__nav-link--profile"
        >
          <div className="header__avatar-wrapper user__avatar-wrapper">
            <img className="header__avatar user__avatar" src={user.avatarUrl} alt={user.name} />
          </div>
          <span className="header__user-name user__name">{user.email}</span>
        </Link>
      </li>
      <li className="header__nav-item">
        <Link
          to={AppRoute.Root}
          onClick={(evt) => {
            evt.preventDefault();
            store.dispatch(logoutAction());
          } }
          className="header__nav-link"
        >
          <span className="header__signout">Sign out</span>
        </Link>
      </li>
    </>
  );
}

export default memo(NavigationSignOut);
