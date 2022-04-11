import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import App from './app';
import HistoryRouter from '../components/history-router/history-router';
import { AppRoute, AuthorizationStatus } from '../consts';
import {
  makeFakeOffer,
  makeFakeReview,
  makeFakeUser
} from '../utils/mocks';
import { generatePath } from 'react-router-dom';

const mockStore = configureMockStore();
const mockUser = makeFakeUser;
const mockOffers = [makeFakeOffer(), makeFakeOffer()];
const mockOffer = makeFakeOffer();
const mockComments = [makeFakeReview(), makeFakeReview()];

const store = mockStore({
  User: {
    authorizationStatus: AuthorizationStatus.Auth,
    user: mockUser
  },
  Data: {
    offers: mockOffers,
    offer: mockOffer,
    offersFavorite: mockOffers,
    offersNearby: mockOffers,
    comments: mockComments,
    isDataLoaded: true,
    isOfferLoaded: true,
    isLoadedOffersNearby: true,
    isLoadedComments: true,
  },
  Offers: { offerId: 1 },
});

const history = createMemoryHistory();

const fakeApp = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <App />
    </HistoryRouter>
  </Provider>
);

describe('Application Routing', () => {
  it('should render "Main" when user navigate to "/"', () => {
    history.push(AppRoute.Root);

    render(fakeApp);

    expect(screen.getByText(/places to stay/i)).toBeInTheDocument();
  });

  it('should render "SignIn" when user navigate to "/login", if authorizationStatus = AuthorizationStatus.NoAuth,', () => {
    history.push(AppRoute.Login);

    const newStore = mockStore({
      User: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        user: mockUser
      },
      Data: {
        offers: mockOffers,
        offer: mockOffer,
        offersFavorite: mockOffers,
        offersNearby: mockOffers,
        comments: mockComments,
        isDataLoaded: true,
        isOfferLoaded: true,
        isLoadedOffersNearby: true,
        isLoadedComments: true,
      },
      Offers: { offerId: 1 },
    });

    render(
      <Provider store={newStore}>
        <HistoryRouter history={history}>
          <App />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
  });

  it('should render "Favorites" when user navigate to "/favorites"', () => {
    history.push(AppRoute.Favorites);

    render(fakeApp);

    expect(screen.getByTestId(/FavoritesFooter/i)).toBeInTheDocument();
  });

  it('should render "Room" when user navigate to "/offer"', () => {
    history.push(generatePath(AppRoute.Hotel, { id: String(mockOffers[0].id) }));

    render(fakeApp);

    expect(screen.getByText('What\'s inside')).toBeInTheDocument();
    expect(screen.getByText('Meet the host')).toBeInTheDocument();
    expect(screen.getByText('Other places in the neighbourhood')).toBeInTheDocument();
  });

  it('should render "Error" when user navigate to non-existent route', () => {
    history.push('/non-existent-route');

    render(fakeApp);

    expect(screen.getByText('Page not found')).toBeInTheDocument();
    expect(screen.getByText('Go to main page')).toBeInTheDocument();
  });
});
