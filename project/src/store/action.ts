import { createAction } from '@reduxjs/toolkit';
import { Offer } from '../types/offer';
import { AppRoute, AuthorizationStatus } from '../consts';
import { Review } from '../types/review';

const ActionType = {
  CHANGE_CITY: 'CHANGE_CITY',
  GET_OFFER_ID: 'GET_OFFER_ID',
  RESET_OFFER_ID: 'RESET_OFFER_ID',
  CHANGE_SORTING: 'CHANGE_SORTING',
  LOAD_OFFERS: 'data/hotels',
  LOAD_OFFERS_NEARBY: 'LOAD_OFFERS_NEARBY',
  LOAD_COMMENTS: 'data/comments',
  RESET_COMMENTS: 'RESET_COMMENTS',
  REQUIRE_AUTHORIZATION: 'user/requireAuthorization',
  REDIRECT_TO_ROUTER: 'redirectToRoute',
  SET_USER: 'SET_USER',
  GET_RATING: 'GET_RATING',
};

const changeСity = createAction(ActionType.CHANGE_CITY,
  (value)=>({payload: value}));

const getOfferId = createAction(ActionType.GET_OFFER_ID,
  (value)=>({payload: value}));

const resetOfferId = createAction(ActionType.RESET_OFFER_ID);

const changeSorting = createAction(ActionType.CHANGE_SORTING,
  (value)=>({payload: value}));

const loadOffers = createAction<Offer[]>(ActionType.LOAD_OFFERS);

const loadOffersNearby = createAction<Offer[]>(ActionType.LOAD_OFFERS_NEARBY);

const loadComments = createAction<Review[]>(ActionType.LOAD_COMMENTS);

const resetComments = createAction(ActionType.RESET_COMMENTS);

const requireAuthorization = createAction<AuthorizationStatus>(ActionType.REQUIRE_AUTHORIZATION);

const setUser = createAction(ActionType.SET_USER, (value)=>({payload: value}));

const getRating = createAction(ActionType.GET_RATING, (value)=>({payload: value}));

export const redirectToRoute = createAction<AppRoute>(ActionType.REDIRECT_TO_ROUTER);

export {
  ActionType,
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
};
