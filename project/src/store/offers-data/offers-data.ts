import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../consts';
import {OffersData} from '../../types/state';

const initialState: OffersData = {
  offers: [],
  offersFavorite: [],
  offersNearby: [],
  comments: [],
  isDataLoaded: false,
};

const offersData = createSlice({
  name: NameSpace.data,
  initialState,
  reducers: {
    loadOffers: (state, action) => {
      state.offers = action.payload;
      state.isDataLoaded = true;
    },
    loadOffersFavorite: (state, action) => {
      state.offersFavorite = action.payload;
    },
    loadOffersNearby: (state, action) => {
      state.offersNearby = action.payload;
    },
    loadComments: (state, action) => {
      state.comments = action.payload;
    },
    resetComments: (state) => {
      state.comments = [];
    },
  },
});

const {
  loadOffers,
  loadOffersFavorite,
  loadOffersNearby,
  loadComments,
  resetComments,
} = offersData.actions;

export {
  offersData,
  loadOffers,
  loadOffersFavorite,
  loadOffersNearby,
  loadComments,
  resetComments
};
