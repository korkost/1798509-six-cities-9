import { Link } from 'react-router-dom';
import { AppRoute } from '../../consts';

function NavigationSignIn(): JSX.Element {

  return (
    <li className="header__nav-item">
      <Link
        to={AppRoute.Login}
        className="header__nav-link"
      >
        <span className="header__login">Sign in</span>
      </Link>
    </li>
  );
}

export default NavigationSignIn;
