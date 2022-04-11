import {createSlice} from '@reduxjs/toolkit';
import { updateData } from '../../common';
import {defaultOffer, NameSpace} from '../../consts';
import {OffersData} from '../../types/state';

const initialState: OffersData = {
  offers: [],
  offer: defaultOffer,
  offersFavorite: [],
  offersNearby: [],
  comments: [],
  isDataLoaded: false,
  isOfferLoaded: false,
  isLoadedOffersNearby: false,
  isLoadedComments: false,
};

const offersData = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {
    loadOffers: (state, action) => {
      state.offers = action.payload;
      state.isDataLoaded = true;
    },
    loadOffer: (state, action) => {
      state.offer = action.payload;
      state.isOfferLoaded = true;
    },
    loadOffersFavorite: (state, action) => {
      state.offersFavorite = action.payload;
    },
    loadOffersNearby: (state, action) => {
      state.offersNearby = action.payload;
      state.isLoadedOffersNearby = true;
    },
    loadComments: (state, action) => {
      state.comments = action.payload;
      state.isLoadedComments = true;
    },
    resetComments: (state) => {
      state.comments = [];
    },
    updateFavorites: (state, action) => {
      state.offersFavorite = updateData(state.offersFavorite, action.payload);
      state.offers = updateData(state.offers, action.payload);
      state.offersNearby = updateData(state.offersNearby, action.payload);
      state.offer = action.payload;
    },
  },
});

const {
  loadOffers,
  loadOffersFavorite,
  loadOffersNearby,
  loadComments,
  resetComments,
  loadOffer,
  updateFavorites,
} = offersData.actions;

export {
  offersData,
  loadOffers,
  loadOffersFavorite,
  loadOffersNearby,
  loadComments,
  resetComments,
  loadOffer,
  updateFavorites
};
