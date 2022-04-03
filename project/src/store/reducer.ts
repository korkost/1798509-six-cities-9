import { createReducer } from '@reduxjs/toolkit';
import {
  changeСity,
  getOfferId,
  resetOfferId,
  changeSorting,
  loadOffers,
  requireAuthorization,
  loadComments,
  resetComments,
  getLogin,
  getRating,
  loadOffersNearby,
  loadOffer
} from './action';
import {
  Cities,
  SortingType,
  AuthorizationStatus,
  DEFAULT_OFFER
} from '../consts';
import { Offer } from '../types/offer';
import { Review } from '../types/review';

type InitalState = {
  city: string,
  offerId: number,
  sortingType: string,
  offer: Offer,
  offers: Offer[],
  offersNearby: Offer[],
  comments: Review[],
  authorizationStatus: AuthorizationStatus,
  isDataLoaded: boolean,
  login: string,
  commentRating: number,
}

const initialState: InitalState = {
  city: Cities.PARIS,
  offerId: 0,
  sortingType: SortingType.POPULAR,
  offer: DEFAULT_OFFER,
  offers: [],
  offersNearby: [],
  comments: [],
  authorizationStatus: AuthorizationStatus.Unknown,
  isDataLoaded: false,
  login: '',
  commentRating: 0,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeСity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(getOfferId, (state, action) => {
      state.offerId = action.payload;
    })
    .addCase(resetOfferId, (state) => {
      state.offerId = 0;
    })
    .addCase(changeSorting, (state, action) => {
      state.sortingType = action.payload;
    })
    .addCase(loadOffer, (state, action) => {
      state.offer = action.payload;
    })
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
      state.isDataLoaded = true;
    })
    .addCase(loadOffersNearby, (state, action) => {
      state.offersNearby = action.payload;
    })
    .addCase(loadComments, (state, action) => {
      state.comments = action.payload;
    })
    .addCase(resetComments, (state) => {
      state.comments = [];
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(getLogin, (state, action) => {
      state.login = action.payload;
    })
    .addCase(getRating, (state, action) => {
      state.commentRating = action.payload;
    });
});

export {reducer};
