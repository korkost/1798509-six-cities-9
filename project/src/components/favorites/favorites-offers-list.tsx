import {useAppSelector} from '../../hooks';
import {Offer} from '../../types/offer';
import PlaceCard from '../place-card/place-card';

type FavoritesOffersProps = {
  city: string
};

function FavoritesOffersList({city}: FavoritesOffersProps): JSX.Element {
  const offersFavorite = useAppSelector(({DATA}) => DATA.offersFavorite);
  const getFavoriteOffersInCity = () => offersFavorite.filter((offer: Offer) => offer.city.name===city);

  return (
    <div className="favorites__places">
      {
        getFavoriteOffersInCity().map((offer: Offer) => (
          <PlaceCard key={offer.id} offer={offer} favorites articleClassChange={'favorites__card'} imgClassChange={'favorites__image-wrapper'} randerPlase={'PLAСE_CARD'} />
        ))
      }
    </div>
  );
}

export default FavoritesOffersList;
