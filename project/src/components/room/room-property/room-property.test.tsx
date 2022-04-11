import { configureMockStore } from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { AuthorizationStatus } from '../../../consts';
import { makeFakeOffer, makeFakeReview } from '../../../utils/mocks';
import HistoryRouter from '../../history-router/history-router';
import RoomProperty from './room-property';

const history = createMemoryHistory();
const mockOffers = [makeFakeOffer(), makeFakeOffer()];
const mockOffer = makeFakeOffer();
const mockStore = configureMockStore();
const mockComments = [makeFakeReview(), makeFakeReview()];
const mockId = '1';

describe('Component: FavoritesFull', () =>
{
  it('should render correctly', () => {
    render(
      <Provider store={mockStore({User: {authorizationStatus: AuthorizationStatus.NoAuth}, Data: {offersNearby: mockOffers, comments: mockComments}, Offers: {offerId: mockId}})}>
        <HistoryRouter history={history}>
          <RoomProperty currentOffer={mockOffer} />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByTestId('Header')).toBeInTheDocument();
    expect(screen.getByTestId('RoomCard')).toBeInTheDocument();
    expect(screen.getByTestId('Map')).toBeInTheDocument();
    expect(screen.getByText(/Other places in the neighbourhood/i)).toBeInTheDocument();
    expect(screen.getAllByTestId('PlaceCard')).toHaveLength(2);
  });
});
