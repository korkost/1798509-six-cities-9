import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '.';
import { store } from '.';
import { Offer } from '../types/offer';
import { loadComments, loadOffers, loadOffersNearby, redirectToRoute, requireAuthorization, resetComments } from './action';
import { saveToken, dropToken } from '../services/token';
import { APIRoute, AppRoute, AuthorizationStatus } from '../consts';
import { AuthData } from '../types/auth-data';
import { UserData } from '../types/user-data';
import { errorHandle } from '../services/error-handle';
import { NewReview, Review } from '../types/review';
import { useAppSelector } from '../hooks';

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

const fetchOfferNearbyAction = createAsyncThunk(
  'data/fetchOffersNearby',
  async () => {
    try {
      const currentId = useAppSelector((state) => state.offerId);
      const { data } = await api.get<Offer[]>(`${APIRoute.Offers}/${currentId}/nearby`);
      store.dispatch(loadOffersNearby(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

const fetchCommentAction = createAsyncThunk(
  'data/fetchComments',
  async () => {
    try {
      const currentId = useAppSelector((state) => state.offerId);
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
  async ({ comment, rating }: NewReview) => {
    try {
      const currentId = useAppSelector((state) => state.offerId);
      await api.post<NewReview>(`${APIRoute.Comments}/${currentId}`, { comment, rating });
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
  postCommentAction
};
