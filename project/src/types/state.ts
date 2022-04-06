import { store } from '../store/index.js';
import { AuthorizationStatus } from '../consts';
import { Offer } from './offer.js';
import { Review } from './review.js';

type OffersData = {
  offers: Offer[],
  offersFavorite: [],
  offersNearby: Offer[],
  comments: Review[],
  isDataLoaded: boolean,
};

type OffersProcess = {
  city: string,
  offerId: number,
  sortingType: string,
  commentRating: number,
};

type UserProcess = {
  authorizationStatus: AuthorizationStatus,
  user: Record<string, never>,
};

type State = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;

export type {
  OffersData,
  OffersProcess,
  UserProcess,
  State,
  AppDispatch
};
