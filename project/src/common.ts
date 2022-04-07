import { offersType, PlaceType, SortingType } from './consts';
import { Offer } from './types/offer';

const correctType = (type: string) => {
  switch (type) {
    case PlaseType.Apartment:
      return offersType.APPARTMENT;
      break;
    case PlaseType.Room:
      return offersType.ROOM;
      break;
    case PlaseType.House:
      return offersType.HOUSE;
      break;
    case PlaseType.Hotel:
      return offersType.HOTEL;
      break;
  }
};

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

const updateData = (offers: Offer[], offer: Offer) => {
  const index = offers.findIndex((item) => item.id === offer.id);
  if (index === -1) {
    return offers;
  }

  return [
    ...offers.slice(0, index),
    offer,
    ...offers.slice(index + 1),
  ];
};

export {
  sortOffers,
  paintRating,
  correctType,
  updateData
};
