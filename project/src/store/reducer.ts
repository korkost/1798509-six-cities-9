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
  setUser,
  getRating,
  loadOffersNearby
} from './action';
import {
  Cities,
  SortingType,
  AuthorizationStatus
} from '../consts';
import { InitalState } from '../types/initalState';

const initalState: InitalState = {
  city: Cities.PARIS,
  offerId: 0,
  sortingType: SortingType.POPULAR,
  offers: [],
  offersNearby: [],
  comments: [],
  authorizationStatus: AuthorizationStatus.Unknown,
  isDataLoaded: false,
  user: {},
  commentRating: 0,
};

const reducer = createReducer(initalState, (builder) => {
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
    .addCase(setUser, (state, action) => {
      state.user = action.payload;
    })
    .addCase(getRating, (state, action) => {
      state.commentRating = action.payload;
    });
});

export {reducer};
