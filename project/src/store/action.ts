import { createAction } from '@reduxjs/toolkit';
import { Offer } from '../types/offer';
import { ActionType, AppRoute, AuthorizationStatus } from '../consts';
import { Review } from '../types/review';

const changeСity = createAction(ActionType.CHANGE_CITY,
  (value)=>({payload: value}));

const getOfferId = createAction(ActionType.GET_OFFER_ID,
  (value)=>({payload: value}));

const resetOfferId = createAction(ActionType.RESET_OFFER_ID);

const changeSorting = createAction(ActionType.CHANGE_SORTING,
  (value)=>({payload: value}));

const loadOffer = createAction<Offer>(ActionType.LOAD_OFFER);

const loadOffers = createAction<Offer[]>(ActionType.LOAD_OFFERS);

const loadOffersNearby = createAction<Offer[]>(ActionType.LOAD_OFFERS_NEARBY);

const loadComments = createAction<Review[]>(ActionType.LOAD_COMMENTS);

const resetComments = createAction(ActionType.RESET_COMMENTS);

const requireAuthorization = createAction<AuthorizationStatus>(ActionType.REQUIRE_AUTHORIZATION);

const getLogin = createAction(ActionType.GET_LOGIN, (value)=>({payload: value}));

const getRating = createAction(ActionType.GET_RATING, (value)=>({payload: value}));

export const redirectToRoute = createAction<AppRoute>(ActionType.REDIRECT_TO_ROUTER);

export {
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
};
