import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../store';
import { store } from '../store';
import { Offer } from '../types/offer';
import { redirectToRoute } from './action';
import { saveToken, dropToken } from '../services/token';
import { APIRoute, AppRoute, AuthorizationStatus } from '../consts';
import { AuthData } from '../types/auth-data';
import { UserData } from '../types/user-data';
import { errorHandle } from '../services/error-handle';
import { NewReview, Review } from '../types/review';
import { loadComments, loadOffers, loadOffersFavorite, loadOffersNearby, resetComments } from './offers-data/offers-data';
import { requireAuthorization, setUser } from './user-process/user-process';
import { NewStatus } from '../types/favorite-status';

const fetchOfferAction = createAsyncThunk(
  'data/fetchOffers',
  async () => {
    try {
      const { data } = await api.get<Offer[]>(APIRoute.Offers);
      store.dispatch(loadOffers(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

const fetchFavoriteAction = createAsyncThunk(
  'data/fetchFavoritOffers',
  async () => {
    try {
      const {data} = await api.get<Offer[]>(APIRoute.Favorite);
      store.dispatch(loadOffersFavorite(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

const fetchOfferNearbyAction = createAsyncThunk(
  'data/fetchOffersNearby',
  async (currentId: number) => {
    try {
      const { data } = await api.get<Offer[]>(`${APIRoute.Offers}/${currentId}/nearby`);
      store.dispatch(loadOffersNearby(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

const fetchCommentAction = createAsyncThunk(
  'data/fetchComments',
  async (currentId: number) => {
    try {
      const { data } = await api.get<Review[]>(`${APIRoute.Comments}/${currentId}`);
      store.dispatch(resetComments());
      store.dispatch(loadComments(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

const checkAuthAction = createAsyncThunk(
  'user/checkAuth',
  async () => {
    try {
      await api.get(APIRoute.Login);
      store.dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } catch (error) {
      errorHandle(error);
      store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

const postCommentAction = createAsyncThunk(
  'user/postComment',
  async (newReview: NewReview) => {
    try {
      await api.post<NewReview>(`${APIRoute.Comments}/${newReview.id}`, newReview.review);
      store.dispatch(fetchCommentAction(newReview.id));
    } catch (error) {
      errorHandle(error);
    }
  },
);

const postFavoriteAction = createAsyncThunk(
  'user/postComment',
  async (newStatus: NewStatus) => {
    try {
      await api.post<NewStatus>(`${APIRoute.Favorite}/${newStatus.id}/${newStatus.status}`);
    } catch (error) {
      errorHandle(error);
    }
  },
);

const loginAction = createAsyncThunk(
  'user/login',
  async ({ login: email, password }: AuthData) => {
    try {
      const { data: { token } } = await api.post<UserData>(APIRoute.Login, { email, password });
      saveToken(token);
      store.dispatch(requireAuthorization(AuthorizationStatus.Auth));
      store.dispatch(redirectToRoute(AppRoute.Root));
    } catch (error) {
      errorHandle(error);
      store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

const getUserAction = createAsyncThunk(
  'user/login',
  async () => {
    try {
      const {data} = await api.get<UserData>(APIRoute.Login);
      store.dispatch(setUser(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

const logoutAction = createAsyncThunk(
  'user/logout',
  async () => {
    try {
      await api.delete(APIRoute.Logout);
      dropToken();
      store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export {
  fetchOfferAction,
  fetchCommentAction,
  checkAuthAction,
  loginAction,
  logoutAction,
  fetchOfferNearbyAction,
  fetchFavoriteAction,
  postCommentAction,
  getUserAction,
  postFavoriteAction
};
