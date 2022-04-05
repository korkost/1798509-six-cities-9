import { AuthorizationStatus } from '../consts';
import { Offer } from './offer';
import { Review } from './review';

type InitalState = {
  city: string,
  offerId: number,
  sortingType: string,
  offers: Offer[],
  offersNearby: Offer[],
  comments: Review[],
  authorizationStatus: AuthorizationStatus,
  isDataLoaded: boolean,
  user: Record<string, never>,
  commentRating: number,
};

export type {InitalState};
