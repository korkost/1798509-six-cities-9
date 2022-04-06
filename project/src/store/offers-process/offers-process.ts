import {createSlice} from '@reduxjs/toolkit';
import {Cities, NameSpace, SortingType} from '../../consts';
import {OffersProcess} from '../../types/state';

const initialState: OffersProcess = {
  city: Cities.PARIS,
  offerId: 0,
  sortingType: SortingType.POPULAR,
  commentRating: 0,
};

const offersProcess = createSlice({
  name: NameSpace.offers,
  initialState,
  reducers: {
    changeСity: (state, action) => {
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
  changeСity,
  getOfferId,
  resetOfferId,
  changeSorting,
  getRating,
} = offersProcess.actions;

export {
  offersProcess,
  changeСity,
  getOfferId,
  resetOfferId,
  changeSorting,
  getRating
};
