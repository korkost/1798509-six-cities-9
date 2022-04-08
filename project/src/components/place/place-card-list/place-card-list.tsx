import PlaceCard from '../place-card/place-card';
import { Offer } from '../../../types/offer';
import { RenderPlace } from '../../../settings';

const articleClass = 'cities__place-card';
const imgClass = 'cities__image-wrapper';
const cardListPlace = RenderPlace.PlaceCard;

type PlaceCardListProps = {
  offers: Offer[];
}

function PlaceCardList({ offers }: PlaceCardListProps): JSX.Element {

  return (
    <div className="cities__places-list places__list tabs__content">
      {
        offers.map((offer) => (
          <PlaceCard
            key={offer.id}
            offer={offer}
            articleClassChange={articleClass}
            imgClassChange={imgClass}
            renderPlace={cardListPlace}
          />
        ))
      }
    </div>
  );
}

export default PlaceCardList;
