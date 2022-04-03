import browserHistory from '../../browser-history';
import {Middleware} from 'redux';
import {reducer} from '../reducer';
import { ActionType } from '../../consts';

type Reducer = ReturnType<typeof reducer>;

export const redirect: Middleware<unknown, Reducer>=
  (_store) =>
    (next) =>
      (action) => {
        if (action.type === ActionType.REDIRECT_TO_ROUTER) {
          browserHistory.push(action.payload);
        }

        return next(action);
      };
