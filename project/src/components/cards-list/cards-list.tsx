import PlaceCard from '../place-card/place-card';
import { Offer } from '../../types/offer';

type CardsListProps = {
  offers: Offer[];
}

function CardsList({ offers }: CardsListProps): JSX.Element {

  return (
    <div className="cities__places-list places__list tabs__content">
      {
        offers.map((offer) => (
          <PlaceCard
            key={offer.id}
            offer={offer}
            articleClassChange='cities__place-card'
            imgClassChange='cities__image-wrapper'
            randerPlase={'PLAСE_CARD'}
          />
        ))
      }
    </div>
  );
}

export default CardsList;
