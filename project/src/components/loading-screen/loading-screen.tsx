import './loading-screen.css';

function LoadingScreen(): JSX.Element {
  return (
    <div className="page page--gray">
      <main className="page__main">
        <div className="container">
          <section>
            <p className="login__title loading-title">
              <br />
              <br />
                Loading...
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}

export default LoadingScreen;
