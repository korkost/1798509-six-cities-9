import browserHistory from '../../services/browser-history';
import {Middleware} from 'redux';
import {reducer} from '../reducer';
import { ActionType } from '../action';

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
