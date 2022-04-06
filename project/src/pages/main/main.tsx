import EmptyContainer from '../../components/empty-container/empty-container';
import CitiesList from '../../components/cities-list/cities-list';
import Header from '../../components/header/header';
import FullContainer from '../../components/full-container/full-container';
import {useAppSelector} from '../../hooks';
import {sortOffers} from '../../common';

function Main(): JSX.Element {
  const offers = useAppSelector(({DATA}) => DATA.offers);
  const city = useAppSelector(({OFFERS}) => OFFERS.city);
  const sortingType = useAppSelector(({OFFERS}) => OFFERS.sortingType);
  const sortedOffers = sortOffers(offers, city, sortingType);

  return (
    <div className="page page--gray page--main">
      {<Header />}
      <main className={`page__main page__main--index${!offers.length ? ' page__main--index-empty' : ''}`}>
        <h1 className="visually-hidden">Cities</h1>
        <CitiesList />
        <div className="cities">
          {sortedOffers.length > 0 ? <FullContainer offers={sortedOffers}/> : <EmptyContainer />}
        </div>
      </main>
    </div>
  );
}

export default Main;
