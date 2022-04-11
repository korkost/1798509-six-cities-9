import { configureMockStore } from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { AuthorizationStatus } from '../../../consts';
import { makeFakeOffer } from '../../../utils/mocks';
import HistoryRouter from '../../history-router/history-router';
import FavoritesOffersList from './favorites-offers-list';

const mockStore = configureMockStore();
const mockCity = 'Paris';
const mockOffers = [makeFakeOffer(), makeFakeOffer()];
const history = createMemoryHistory();

describe('Component: FavoritesOffersList', () => {
  it('should render correctly', () => {

    render(
      <Provider store={mockStore({Offers: {city: mockCity}, Data: {offersFavorite: mockOffers}, User: {authorizationStatus: AuthorizationStatus.Auth}})}>
        <HistoryRouter history={history}>
          <FavoritesOffersList city={mockCity} offers={mockOffers} />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByTestId('OffersList')).toBeInTheDocument();
    expect(screen.getAllByTestId('PlaceCard')).toHaveLength(2);
  });
});
