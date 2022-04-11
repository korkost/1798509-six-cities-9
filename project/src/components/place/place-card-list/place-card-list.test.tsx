import { configureMockStore } from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { AuthorizationStatus } from '../../../consts';
import { makeFakeOffer } from '../../../utils/mocks';
import HistoryRouter from '../../history-router/history-router';
import PlaceCardList from './place-card-list';

const mockStore = configureMockStore();
const makeOffers = [makeFakeOffer(), makeFakeOffer()];
const history = createMemoryHistory();

describe('Component: PlaceCardList', () => {
  it('should render correctly', () => {

    render(
      <Provider store={mockStore({Data: {offersFavorite: makeOffers}, User: {authorizationStatus: AuthorizationStatus.Auth}})}>
        <HistoryRouter history={history}>
          <PlaceCardList offers={makeOffers} />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByTestId('PlaceList')).toBeInTheDocument();
    expect(screen.getAllByTestId('PlaceCard')).toHaveLength(2);

  });
});
