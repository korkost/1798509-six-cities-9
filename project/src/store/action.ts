import { createAction } from '@reduxjs/toolkit';
import { AppRoute } from '../consts';

export const ActionType = {
  RedirectToRoute: 'user/redirectToRoute',
};

export const redirectToRoute = createAction<AppRoute>(ActionType.RedirectToRoute);
