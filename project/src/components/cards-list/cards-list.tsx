import PlaceCard from '../place-card/place-card';
import { Offer } from '../../types/offer';

type CardsListProps = {
  offers: Offer[];
  onListItemHover: (listItemName: number) => void;
}

function CardsList(props: CardsListProps): JSX.Element {
  const { offers, onListItemHover } = props;

  return (
    <div className="cities__places-list places__list tabs__content">
      {
        offers.map((offer) => <PlaceCard key={offer.id} offer={offer} articleClassChange={'cities__place-card'} imgClassChange={'cities__image-wrapper'} onListItemHover={onListItemHover} />)
      }
    </div>
  );
}

export default CardsList;
