import {createSlice} from '@reduxjs/toolkit';
import {Cities, NameSpace, SortingType} from '../../consts';
import {OffersProcess} from '../../types/state';

const initialState: OffersProcess = {
  city: Cities.Paris,
  offerId: 0,
  sortingType: SortingType.Popular,
  commentRating: 0,
};

const offersProcess = createSlice({
  name: NameSpace.Offers,
  initialState,
  reducers: {
    changeCity: (state, action) => {
      state.city = action.payload;
    },
    getOfferId: (state, action) => {
      state.offerId = action.payload;
    },
    resetOfferId: (state) => {
      state.offerId = 0;
    },
    changeSorting: (state, action) => {
      state.sortingType = action.payload;
    },
    getRating: (state, action) => {
      state.commentRating = action.payload;
    },
  },
});

const {
  changeCity,
  getOfferId,
  resetOfferId,
  changeSorting,
  getRating,
} = offersProcess.actions;

export {
  changeCity,
  offersProcess,
  getOfferId,
  resetOfferId,
  changeSorting,
  getRating
};
