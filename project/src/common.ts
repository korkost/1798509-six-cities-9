import { offersType, SortingType } from './consts';
import { Offer } from './types/offer';

const sortOffers = (offers: Offer[], city: string, type: string ) => {
  const filteredOffers = offers.filter((offer) => offer.city.name === city);
  switch (type) {
    case SortingType.PRICE_TO_HIGH:
      return filteredOffers.sort((a, b) => a.price - b.price );
      break;
    case SortingType.PRICE_TO_LOW:
      return filteredOffers.sort((a, b) => b.price - a.price );
      break;
    case SortingType.TOP:
      return filteredOffers.sort((a, b) => b.rating - a.rating );
      break;
    default:
      return filteredOffers;
  }
};

const paintRating = (rating: number) => Math.round(rating)*20;

const correctType = (type: string) => {
  switch (type) {
    case 'apartment':
      return offersType.APPARTMENT;
      break;
    case 'room':
      return offersType.ROOM;
      break;
    case 'house':
      return offersType.HOUSE;
      break;
    case 'hotel':
      return offersType.HOTEL;
      break;
  }
};

export {sortOffers, paintRating, correctType};
