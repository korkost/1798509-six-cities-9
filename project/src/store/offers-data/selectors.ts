import {NameSpace} from '../../consts';
import {Offer} from '../../types/offer';
import {Review} from '../../types/review';
import {State} from '../../types/state';

const getOffers = (state: State): Offer[] => state[NameSpace.Data].offers;
const getOffer = (state: State): Offer => state[NameSpace.Data].offer;
const getNearby = (state: State): Offer[] => state[NameSpace.Data].offersNearby;
const getFavorite = (state: State): Offer[] => state[NameSpace.Data].offersFavorite;
const getComments = (state: State): Review[] => state[NameSpace.Data].comments;
const getDataLoaded = (state: State): boolean => state[NameSpace.Data].isDataLoaded;
const getOfferLoaded = (state: State): boolean => state[NameSpace.Data].isOfferLoaded;
const getLoadedOffersNearby = (state: State): boolean => state[NameSpace.Data].isLoadedOffersNearby;
const getLoadedComments = (state: State): boolean => state[NameSpace.Data].isLoadedComments;

export {
  getOffers,
  getOffer,
  getNearby,
  getFavorite,
  getComments,
  getDataLoaded,
  getOfferLoaded,
  getLoadedOffersNearby,
  getLoadedComments
};
