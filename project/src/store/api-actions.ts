import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Offer } from '../types/offer';
import { AppDispatch, State } from '../types/state.js';
import { redirectToRoute } from './action';
import { saveToken, dropToken } from '../services/token';
import { APIRoute, AppRoute, AuthorizationStatus } from '../consts';
import { AuthData } from '../types/auth-data';
import { UserData } from '../types/user-data';
import { errorHandle } from '../services/error-handle';
import { NewReview, Review } from '../types/review';
import {
  loadComments,
  loadOffers,
  loadOffersFavorite,
  loadOffersNearby,
  resetComments,
  updateFavorites
} from './offers-data/offers-data';
import { requireAuthorization, setUser } from './user-process/user-process';
import { NewStatus } from '../types/favorite-status';

const ApiActionType = {
  FetchOffers: 'data/fetchOffers',
  FetchOffer: 'data/fetchOffer',
  FetchHotel: 'data/fetchHotel',
  FetchFavouriteOffers: 'data/fetchFavouriteOffers',
  FetchOffersNearby: 'data/fetchOffersNearby',
  FetchComments: 'data/loadComments',
  CheckAuth: 'user/checkAuth',
  PostComment: 'user/postComment',
  PostFavorite: 'user/postFavorite',
  Login: 'user/login',
  GetLogin: 'user/getLogin',
  LogOut: 'user/logout',
};

const fetchOfferAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  ApiActionType.FetchOffers,
  async (_arg, {dispatch, extra: api}) => {
    try {
      const { data } = await api.get<Offer[]>(APIRoute.Offers);
      dispatch(loadOffers(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

const fetchRoomAction = createAsyncThunk<void, number, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  ApiActionType.FetchOffer,
  async (currentId: number, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<Offer[]>(`${APIRoute.Offers}/${currentId}`);
      dispatch(loadOffer(data));
    } catch (error) {
      dispatch(redirectToRoute((AppRoute.Error)));
    }
  },
);

const fetchFavoriteAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  ApiActionType.FetchFavouriteOffers,
  async (_arg, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<Offer[]>(APIRoute.Favorite);
      dispatch(loadOffersFavorite(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

const fetchOfferNearbyAction = createAsyncThunk<void, number, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  ApiActionType.FetchOffersNearby,
  async (currentId: number, {dispatch, extra: api}) => {
    try {
      const { data } = await api.get<Offer[]>(`${APIRoute.Offers}/${currentId}/nearby`);
      dispatch(loadOffersNearby(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

const fetchCommentAction = createAsyncThunk<void, number, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  ApiActionType.FetchComments,
  async (currentId: number, {dispatch, extra: api}) => {
    try {
      const { data } = await api.get<Review[]>(`${APIRoute.Comments}/${currentId}`);
      dispatch(resetComments());
      dispatch(loadComments(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  ApiActionType.CheckAuth,
  async (_arg, {dispatch, extra: api}) => {
    try {
      await api.get(APIRoute.Login);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } catch (error) {
      errorHandle(error);
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

const postCommentAction = createAsyncThunk<void, NewReview, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  ApiActionType.PostComment,
  async (newReview: NewReview, {dispatch, extra: api}) => {
    try {
      await api.post<NewReview>(`${APIRoute.Comments}/${newReview.id}`, newReview.review);
      dispatch(fetchCommentAction(newReview.id));
    } catch (error) {
      errorHandle(error);
    }
  },
);

const postFavoriteAction = createAsyncThunk<void, NewStatus, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  ApiActionType.PostFavorite,
  async (newStatus: NewStatus, {dispatch, extra: api}) => {
    try {
      const {data} = await api.post<NewStatus>(`${APIRoute.Favorite}/${newStatus.id}/${newStatus.status}`);
      dispatch(updateFavorites(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  ApiActionType.Login,
  async ({login: email, password}: AuthData, {dispatch, extra: api}) => {
    try {
      const { data: { token } } = await api.post<UserData>(APIRoute.Login, { email, password });
      saveToken(token);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
      dispatch(redirectToRoute(AppRoute.Root));
    } catch (error) {
      errorHandle(error);
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

const getUserAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  ApiActionType.GetLogin,
  async (_arg, { dispatch, extra: api}) => {
    try {
      const {data} = await api.get<UserData>(APIRoute.Login);
      dispatch(setUser(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  ApiActionType.LogOut,
  async (_arg, { dispatch, extra: api}) => {
    try {
      await api.delete(APIRoute.Logout);
      dropToken();
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export {
  fetchOfferAction,
  fetchRoomAction,
  fetchCommentAction,
  checkAuthAction,
  loginAction,
  logoutAction,
  fetchOfferNearbyAction,
  fetchFavoriteAction,
  postCommentAction,
  getUserAction,
  postFavoriteAction,
  ApiActionType
};
