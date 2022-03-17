import { SortingType } from './consts';
import { Offer } from './types/offer';

const sortOffers = (offers: Offer[], city: string, type: string ) => {
  const filteredOffers = offers.filter((offer) => offer.city.name === city);
  switch (type) {
    case SortingType.PRICE_TO_HIGH:
      return filteredOffers.sort((a, b) => a.price-b.price );
      break;
    case SortingType.PRICE_TO_LOW:
      return filteredOffers.sort((a, b) => b.price-a.price );
      break;
    case SortingType.TOP:
      return filteredOffers.sort((a, b) => b.rating-a.rating );
      break;
    default:
      return filteredOffers;
  }
};

export {sortOffers};
