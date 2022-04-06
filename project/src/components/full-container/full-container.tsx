import { useAppSelector } from '../../hooks';
import { Offer } from '../../types/offer';
import CardsList from '../cards-list/cards-list';
import Map from '../map/map';
import SortingOptions from '../sorting-options/sorting-options';

type FullContainerProps = {
  offers: Offer[];
};

function FullContainer({offers}: FullContainerProps): JSX.Element {
  const city = useAppSelector(({OFFERS}) => OFFERS.city);

  return (
    <div className="cities__places-container container">
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">{offers.length} places to stay in {city}</b>
        <SortingOptions />
        {<CardsList offers={offers} />}
      </section>
      <div className="cities__right-section">
        <section className="cities__map map">
          <Map offers={offers}/>
        </section>
      </div>
    </div>
  );}

export default FullContainer;
