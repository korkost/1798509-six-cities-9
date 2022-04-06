import { AuthorizationStatus } from '../../consts';
import { useAppSelector } from '../../hooks';
import LogoHeader from '../header/logo-header';
import NavigationSignIn from '../navigation/navigation-sign-in';
import NavigationSignOut from '../navigation/navigation-sign-out';

function Header(): JSX.Element {
  const { authorizationStatus } = useAppSelector(({ USER }) => USER);

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <LogoHeader />
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              {authorizationStatus === AuthorizationStatus.Auth ? <NavigationSignOut /> : <NavigationSignIn />}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
