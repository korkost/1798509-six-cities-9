import { configureMockStore } from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { AuthorizationStatus } from '../../../consts';
import { makeFakeOffer } from '../../../utils/mocks';
import HistoryRouter from '../history-route/history-router';
import PlaceCardList from './place-card-list';

const mockStore = configureMockStore();
const moskOffers = [makeFakeOffer(), makeFakeOffer()];
const history = createMemoryHistory();

describe('Component: PlaceCardList', () => {
  it('should render correctly', () => {

    render(
      <Provider store={mockStore({Data: {offersFavorite: moskOffers}, User: {authorizationStatus: AuthorizationStatus.Auth}})}>
        <HistoryRouter history={history}>
          <PlaceCardList offers={moskOffers} />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByTestId('PlaceList')).toBeInTheDocument();
    expect(screen.getAllByTestId('PlaceCard')).toHaveLength(2);

  });
});
