import { Link } from 'react-router-dom';
import Header from '../../components/header/header';

function Error(): JSX.Element {
  return (
    <div className="page page--gray page--login">
      <Header />
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">
              <br />
                404
              <br />
              <small >Page not found</small>
            </h1>
            <h3>
              <Link to="/"
              className='header__logo-link'
              style={{ color: '#4481c3', fontStyle: 'italic' }}
              >
                Go to main page
              </Link>
            </h3>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Error;
