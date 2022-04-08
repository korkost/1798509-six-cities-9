import {
  ChangeEvent,
  FormEvent,
  useCallback,
  useRef,
  useState
} from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/header/header';
import { AuthorizationStatus, Cities } from '../../consts';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { store } from '../../store';
import { loginAction } from '../../store/api-actions';
import { changeСity } from '../../store/offers-process/offers-process';
import { AuthData } from '../../types/auth-data';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import Main from '../main/main';

function SignIn(): JSX.Element {
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useAppDispatch();
  const [isValidPassvord, setIsValidPassword] = useState(false);
  const checkValidity = (password: string) => /^[0-9]+[A-Z]+|[A-Z]+[0-9]+$/i.test(password) ? setIsValidPassword(true) : setIsValidPassword(false);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  const onSubmit = (authData: AuthData) => {
    dispatch(loginAction(authData));
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (loginRef.current !== null && passwordRef.current !== null) {
      onSubmit({
        login: loginRef.current.value,
        password: passwordRef.current.value,
      });
    }
  };

  const handlePasswordChange = (evt: ChangeEvent<HTMLInputElement>) => {
    evt.preventDefault();
    passwordRef.current !== null && checkValidity(passwordRef.current.value);
  };

  const cities = Object.values(Cities);
  const randomCity = cities[Math.floor(Math.random() * cities.length)];
  const handleCityChange = useCallback(()=>store.dispatch(changeСity(randomCity)),[randomCity]);

  if (authorizationStatus===AuthorizationStatus.Auth) {
    return <Main/>;
  }

  return (
    <div className="page page--gray page--login">
      {<Header />}
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form onSubmit={handleSubmit} className="login__form form" action="#" method="post">
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  ref={loginRef}
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email" required
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  ref={passwordRef}
                  onChange={handlePasswordChange}
                  data-testid="Password"
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  autoComplete="on" required
                />
              </div>
              <button
                className="login__submit form__submit button"
                type="submit"
                disabled={!isValidPassvord}
                data-testid="SignInButton"
              >
                Sign in
              </button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link
                to="/"
                className="locations__item-link"
                onClick={handleCityChange}
                data-testid="RandomCity"
              >
                <span>{randomCity}</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default SignIn;
