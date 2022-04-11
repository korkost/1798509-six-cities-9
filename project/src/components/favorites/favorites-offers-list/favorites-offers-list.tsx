import { RenderPlace } from '../../../settings';
import { Offer } from '../../../types/offer';
import PlaceCard from '../../place/place-card/place-card';

const articleClass = 'favorites__card';
const imgClass = 'favorites__image-wrapper';
const cardListPlace = RenderPlace.PlaceCard;

type FavoritesOffersProps = {
  city: string,
  offers: Offer[],
};

function FavoritesOffersList({ city, offers }: FavoritesOffersProps): JSX.Element {
  const getFavoriteOffersInCity = () => offers.filter((offer: Offer) => offer.city.name === city);

  return (
    <div className="favorites__places" data-testid="OffersList">
      {
        getFavoriteOffersInCity().map((offer: Offer) => (
          <PlaceCard key={offer.id} offer={offer} favorites articleClassChange={articleClass} imgClassChange={imgClass} renderPlace={cardListPlace} />
        ))
      }
    </div>
  );
}

export default FavoritesOffersList;
