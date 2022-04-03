import { Link } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../consts';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { logoutAction } from '../../store/api-actions';

function Navigation(): JSX.Element {
  const currentAuthorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const currentLogin = useAppSelector((state) => state.login);
  const dispatch = useAppDispatch();

  if (currentAuthorizationStatus !== AuthorizationStatus.Auth) {
    return (
      <nav className="header__nav">
        <ul className="header__nav-list">
          <li className="header__nav-item">
            <Link
              to={AppRoute.Login}
              onClick={() => { dispatch(logoutAction()); }}
              className="header__nav-link"
            >
              <span className="header__login">Sign in</span>
            </Link>
          </li>
        </ul>
      </nav>
    );
  }

  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        <li className="header__nav-item user">
          <Link
            to={AppRoute.Favorites}
            title='/favorites'
            className="header__nav-link header__nav-link--profile"
          >
            <div className="header__avatar-wrapper user__avatar-wrapper">
            </div>
            <span className="header__user-name user__name">{currentLogin}</span>
          </Link>
        </li>
        <li className="header__nav-item">
          <Link
            to={AppRoute.Root}
            onClick={(evt) => {
              evt.preventDefault();
              dispatch(logoutAction());
            }}
            className="header__nav-link"
          >
            <span className="header__signout">Sign out</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
