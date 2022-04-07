import { configureMockStore } from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import HistoryRouter from '../../components/history-router/history-router';
import { AuthorizationStatus } from '../../consts';
import { makeFakeOffer, makeFakeReview, makeFakeUser } from '../../utils/mocks';
import Room from './room';

const mockStore = configureMockStore();
const mockUser = makeFakeUser();
const mockOffers = [ makeFakeOffer(), makeFakeOffer()];
const mockComments = [makeFakeReview(), makeFakeReview()];

describe('Component: Room', () => {

  it('should render correctly', () => {
    const history = createMemoryHistory();
    history.push(`/offer/${mockOffers[0].id}`);

    render(
      <Provider store={mockStore({
        User: {
          authorizationStatus: AuthorizationStatus.Auth,
          user: mockUser},
        Data: {
          offers: mockOffers,
          offer: mockOffers[0],
          offersFavorite: mockOffers,
          offersNearby: mockOffers,
          comments: mockComments,
          isDataLoaded: true,
          isOfferLoaded: true,
          isLoadedOffersNearby: true,
          isLoadedComments: true,
        },
        Offers: {
          offerId: mockOffers[0].id},
      })}
      >
        <HistoryRouter history={history} >
          <Room />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByTestId('RoomProperty')).toBeInTheDocument();
  });
});
