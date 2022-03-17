import { Offer } from '../../types/offer';
import CardsList from '../cards-list/cards-list';
import Map from '../map/map';
import SortingOptions from '../sorting-options/sorting-options';

type FullContainerProps = {
  offers: Offer[];
  onListItemHover: (listItemName: number) => void;
  currentCity: string;
  selectedPoint: number;
}

function FullContainer({offers, onListItemHover, currentCity, selectedPoint}: FullContainerProps): JSX.Element {

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
          <Map offers={offers} selectedPoint={selectedPoint} />
        </section>
      </div>
    </div>
  );}

export default FullContainer;
