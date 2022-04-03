import { useAppSelector } from '../../hooks';
import { Offer } from '../../types/offer';
import CardsList from '../cards-list/cards-list';
import Map from '../map/map';
import SortingOptions from '../sorting-options/sorting-options';

type FullContainerProps = {
  offers: Offer[];
  onListItemHover: (listItemName: number) => void;
}

function FullContainer({offers, onListItemHover}: FullContainerProps): JSX.Element {
  const currentCity = useAppSelector((state) => state.city);

  return (
    <div className="cities__places-container container">
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">{offers.length} places to stay in {currentCity}</b>
        <SortingOptions />
        {<CardsList offers={offers} onListItemHover={onListItemHover} />}
      </section>
      <div className="cities__right-section">
        <section className="cities__map map">
          <Map offers={offers}/>
        </section>
      </div>
    </div>
  );}

export default FullContainer;
