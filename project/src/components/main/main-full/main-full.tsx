import { useAppSelector } from '../../../hooks';
import { Offer } from '../../../types/offer';
import Map from '../../map/map';
import SortingList from '../../sorting-list/sorting-list';
import PlaceCardList from '../../place/place-card-list/place-card-list';
import { getCity } from '../../../store/offers-process/selectors';

type MainFullProps = {
  offers: Offer[];
};

function MainFull({offers }: MainFullProps): JSX.Element {
  const city = useAppSelector(getCity);

  return (
    <div className="cities__places-container container">
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">{offers.length} places to stay in {city}</b>
        <SortingList />
        {<PlaceCardList offers={offers} />}
      </section>
      <div className="cities__right-section">
        <section className="cities__map map">
          <Map offers={offers}/>
        </section>
      </div>
    </div>
  );}

export default MainFull;
