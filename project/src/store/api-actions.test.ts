import {Action} from 'redux';
import thunk, {ThunkDispatch} from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createAPI} from '../services/api';
import {
  fetchOfferAction,
  fetchCommentAction,
  checkAuthAction,
  loginAction,
  logoutAction,
  fetchOfferNearbyAction,
  fetchFavouriteAction,
  postCommentAction,
  getUserAction,
  postFavouriteAction,
  fetchRoomAction
} from './api-actions';
import {requireAuthorization, setUser} from './user-process/user-process';
import {APIRoute} from '../consts';
import {State} from '../types/state';
import {
  makeFakeNewReview,
  makeFakeOffer,
  makeFakeReview,
  makeNewStatus,
  makeUser
} from '../utils/mocks';
import {
  loadComments,
  loadOffer,
  loadOffers,
  loadOffersFavorite,
  loadOffersNearby,
  updateFavorites
} from './offers-data/offers-data';

const mockOffer = makeFakeOffer();
const mockUser = makeUser();
const mockOffers = [makeFakeOffer(), makeFakeOffer()];
const id = 1;
const mockComments = [makeFakeReview(), makeFakeReview()];
const mockStatus = makeNewStatus();


enum HTTP_CODE {
  OK = 200,
  NOT_CONTENT = 204,
}

describe('Async actions', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
      State,
      Action,
      ThunkDispatch<State, typeof api, Action>
    >(middlewares);

  it('should authorization status is «auth» when server return 200', async () => {
    const store = mockStore();
    mockAPI
      .onGet(APIRoute.Login)
      .reply(HTTP_CODE.OK, []);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(checkAuthAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain(requireAuthorization.toString());
  });

  it('should dispatch RequriedAuthorization and RedirectToRoute when POST /login', async () => {
    const fakeUser = makeUser();

    mockAPI
      .onPost(APIRoute.Login)
      .reply(HTTP_CODE.OK, {token: 'secret'});

    const store = mockStore();
    Storage.prototype.setItem = jest.fn();

    await store.dispatch(loginAction(fakeUser));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain(requireAuthorization.toString());
    expect(Storage.prototype.setItem).toBeCalledTimes(1);
    expect(Storage.prototype.setItem).toBeCalledWith('six-cities-token', 'secret');
  });

  it('should dispatch Load_Offers when GET / offers', async () => {
    mockAPI
      .onGet(APIRoute.Offers)
      .reply(HTTP_CODE.OK, mockOffers);

    const store = mockStore();

    await store.dispatch(fetchOfferAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain(loadOffers.toString());
  });

  it('should dispatch Load_Offer when GET / offer', async () => {
    mockAPI
      .onGet(`${APIRoute.Offers}/${id}`)
      .reply(HTTP_CODE.OK, mockOffer);

    const store = mockStore();

    await store.dispatch(fetchRoomAction(id));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain(loadOffer.toString());
  });

  it('should dispatch Load_Favorite_Offers when GET / favorite', async () => {
    mockAPI
      .onGet(APIRoute.Favorite)
      .reply(HTTP_CODE.OK, mockOffers);

    const store = mockStore();

    await store.dispatch(fetchFavouriteAction());
    const actions = store.getActions().map(({type}) => type);
    expect(actions).toContain(loadOffersFavorite.toString());
  });

  it('should dispatch Load_Offer_Nearby when GET / offerNearby', async () => {
    mockAPI
      .onGet(`${APIRoute.Offers}/${id}/nearby`)
      .reply(HTTP_CODE.OK, mockOffers);

    const store = mockStore();

    await store.dispatch(fetchOfferNearbyAction(id));
    const actions = store.getActions().map(({type}) => type);
    expect(actions).toContain(loadOffersNearby.toString());
  });

  it('should dispatch Load_Comment when GET / comments', async () => {
    mockAPI
      .onGet(`${APIRoute.Comments}/${id}`)
      .reply(HTTP_CODE.OK, mockComments);

    const store = mockStore();

    await store.dispatch(fetchCommentAction(id));
    const actions = store.getActions().map(({type}) => type);
    expect(actions).toContain(loadComments.toString());
  });

  it('should dispatch new comment when POST / comment', async () => {
    const mockNewComment = makeFakeNewReview();

    mockAPI
      .onPost(`${APIRoute.Comments}/${mockNewComment.id}`, mockNewComment.review)
      .reply(HTTP_CODE.OK, mockComments);

    const store = mockStore();

    await store.dispatch(postCommentAction(mockNewComment));
    await store.dispatch(fetchCommentAction(id));

    const actions = store.getActions().map(({type}) => type);
    expect(actions).toContain(loadComments.toString());
  });

  it('should post Favorite_Action when POST /FavoriteAction', async () => {
    mockAPI
      .onPost(`${APIRoute.Favorite}/${mockStatus.id}/${mockStatus.status}`)
      .reply(HTTP_CODE.OK, mockOffer);

    const store = mockStore();
    Storage.prototype.setItem = jest.fn();

    await store.dispatch(postFavouriteAction(mockStatus));

    const actions = store.getActions().map(({type}) => type);
    expect(actions).toContain(updateFavorites.toString());
  });

  it('should dispatch user when GET / login', async () => {
    mockAPI
      .onGet(APIRoute.Login)
      .reply(HTTP_CODE.OK, mockUser);

    const store = mockStore();
    await store.dispatch(getUserAction());
    const actions = store.getActions().map(({type}) => type);
    expect(actions).toContain(setUser.toString());
  });

  it('should dispatch Logout when Delete /logout', async () => {
    mockAPI
      .onDelete(APIRoute.Logout)
      .reply(HTTP_CODE.NOT_CONTENT);

    const store = mockStore();
    Storage.prototype.removeItem = jest.fn();

    await store.dispatch(logoutAction());

    const actions = store.getActions().map(({type}) => type);
    const token = 'six-cities-token';

    expect(actions).toContain(requireAuthorization.toString());
    expect(Storage.prototype.removeItem).toBeCalledTimes(1);
    expect(Storage.prototype.removeItem).toBeCalledWith(token);
  });
});
