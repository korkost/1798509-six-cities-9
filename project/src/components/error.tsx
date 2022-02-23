import {Link} from 'react-router-dom';
import Header from './header';
import Navigation from './navigation';

function Error(): JSX.Element {
  return (
    <div className="page page--gray page--login">
      <Header navigation={<Navigation />}/>
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1>
              <br />
              404
              <br />
              <small>Page not found</small>
            </h1>
            <Link to="/" className='header__logo-link'>Go to main page</Link>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href="/">
                <span>Amsterdam</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Error;
