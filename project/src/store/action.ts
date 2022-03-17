import { createAction } from '@reduxjs/toolkit';

const Action = {
  CHANGE_CITY: 'CHANGE_CITY',
  GET_OFFER_ID: 'GET_OFFER_ID',
  RESET_OFFER_ID: 'RESET_OFFER_ID',
  OPEN_SORTING: 'OPEN_SORTING',
  CHANGE_SORTING: 'CHANGE_SORTING',
};

const changeСity = createAction(Action.CHANGE_CITY,
  (value)=>({payload: value}));
const getOfferId = createAction(Action.GET_OFFER_ID,
  (value)=>({payload: value}));
const resetOfferId = createAction(Action.RESET_OFFER_ID);
const openSorting = createAction(Action.OPEN_SORTING);
const changeSorting = createAction(Action.CHANGE_SORTING,
  (value)=>({payload: value}));


export {changeСity, getOfferId, resetOfferId, openSorting, changeSorting};
