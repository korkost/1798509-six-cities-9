import EmptyContainer from '../../components/empty-container/empty-container';
import CitiesList from '../../components/cities-list/cities-list';
import Header from '../../components/header/header';
import Navigation from '../../components/navigation/navigation';
import { Offer } from '../../types/offer';
import { useAppDispatch } from '../../hooks';
import FullContainer from '../../components/full-container/full-container';
import {
  changeСity,
  getOfferId,
  resetOfferId
} from '../../store/action';

type MainProps = {
  offers: Offer[];
}

function Main({ offers }: MainProps): JSX.Element {

  const dispatch = useAppDispatch();
  const onListItemHover = (listItemName: number) => {
    dispatch(getOfferId(listItemName));
    const currentPoint = offers.find((offer) =>
      offer.id === listItemName,
    );
    currentPoint ? dispatch(getOfferId(listItemName)) : dispatch(resetOfferId());
  };

  const onCityItemHover = (cityName: string) => {
    dispatch(changeСity(cityName));
  };

  return (
    <div className="page page--gray page--main">
      {<Header navigation={<Navigation />} />}
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CitiesList onCityItemHover={onCityItemHover} />
          </section>
        </div>
        <div className="cities">
          {offers.length > 0 ? <FullContainer offers={offers} onListItemHover={onListItemHover} /> : <EmptyContainer />}
        </div>
      </main>
    </div>
  );
}

export default Main;
