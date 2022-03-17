import { createReducer } from '@reduxjs/toolkit';
import {
  changeСity,
  getOfferId,
  resetOfferId,
  openSorting,
  changeSorting
} from './action';
import { Cities, SortingType } from '../consts';

const initialState = {
  city: Cities.PARIS,
  offerId: 0,
  openSorting: false,
  sortingType: SortingType.POPULAR,
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
    .addCase(openSorting, (state) => {
      state.openSorting = !state.openSorting;
    })
    .addCase(changeSorting, (state, action) => {
      state.sortingType = action.payload;
    });
});

export { reducer };
