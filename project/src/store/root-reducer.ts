import {combineReducers} from '@reduxjs/toolkit';
import {NameSpace} from '../consts';
import {offersData} from '../store/offers-data/offers-data';
import {offersProcess} from './offers-process/offers-process';
import {userProcess} from './user-process/user-process';

export const rootReducer = combineReducers({
  [NameSpace.Data]: offersData.reducer,
  [NameSpace.Offers]: offersProcess.reducer,
  [NameSpace.User]: userProcess.reducer,
});
