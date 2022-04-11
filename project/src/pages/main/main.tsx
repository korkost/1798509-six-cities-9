import CitiesList from '../../components/cities-list/cities-list';
import Header from '../../components/header/header';
import MainEmpty from '../../components/main/main-empty/main-empty';
import MainFull from '../../components/main/main-full/main-full';
import {useAppSelector} from '../../hooks';
import {sortOffers} from '../../common';
import { getOffers } from '../../store/offers-data/selectors';
import { getCity, getSortingType } from '../../store/offers-process/selectors';

function Main(): JSX.Element {
  const offers = useAppSelector(getOffers);
  const city = useAppSelector(getCity);
  const sortingType = useAppSelector(getSortingType);
  const sortedOffers = sortOffers(offers, city, sortingType);

  return (
    <div className="page page--gray page--main">
      {<Header />}
      <main className={`page__main page__main--index${!offers.length ? ' page__main--index-empty' : ''}`}>
        <h1 className="visually-hidden">Cities</h1>
        <CitiesList />
        <div className="cities">
          {sortedOffers.length > 0 ? <MainFull offers={sortedOffers}/> : <MainEmpty />}
        </div>
      </main>
    </div>
  );
}

export default Main;
