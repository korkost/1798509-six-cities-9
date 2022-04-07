import { configureMockStore } from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { AuthorizationStatus } from '../../consts';
import { makeFakeOffer } from '../../utils/mocks';
import HistoryRouter from '../history-route/history-router';
import FavoritesFull from './favorites-full';
import userEvent from '@testing-library/user-event';
import { Route, Routes } from 'react-router-dom';

const mockOffers = [makeFakeOffer(), makeFakeOffer()];
const mockStore = configureMockStore();

describe('Component: FavoritesFull', () => {
  const history = createMemoryHistory();
  it('should render correctly', () => {

    render(
      <Provider store={mockStore({User: {authorizationStatus: AuthorizationStatus.NoAuth}, Data: {offersFavorite: mockOffers}})}>
        <HistoryRouter history={history}>
          <FavoritesFull offers={mockOffers}/>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText('Saved listing')).toBeInTheDocument();
    expect(screen.getByTestId('OffersList')).toBeInTheDocument();
  });

  it('should redirect to root url when user clicked to button "City"', () => {

    history.push('/fake');

    render(
      <Provider store={mockStore({User: {authorizationStatus: AuthorizationStatus.NoAuth}, Data: {offersFavorite: mockOffers}})}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path='*'
              element={<FavoritesFull offers={mockOffers}/>}
            />
            <Route
              path="/"
              element={<h1>This is main page</h1>}
            />
          </Routes>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.queryByText(/This is main page/i)).not.toBeInTheDocument();
    userEvent.click(screen.getByTestId(/CityButton/i));
    expect(screen.getByText(/This is main page/i)).toBeInTheDocument();
  });
});
