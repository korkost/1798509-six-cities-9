import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import {render, screen} from '@testing-library/react';
import { Provider } from 'react-redux';
import { makeFakeOffer } from '../../utils/mocks';
import HistoryRouter from '../history-router/history-router';
import Map from '../map/map';

describe('Component: Map', () => {
  const history = createMemoryHistory();
  const mockStore = configureMockStore();
  const moskOffers = [makeFakeOffer(), makeFakeOffer()];

  const store = mockStore({
    Data: { offers: moskOffers, isDataLoaded: true },
    Offers: { city: 'Paris' },
  });

  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Map offers={moskOffers} />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText('OpenStreetMap')).toBeInTheDocument();
    expect(screen.getByTestId('Map')).toBeInTheDocument();
    expect(screen.getAllByRole('img')).toHaveLength(moskOffers.length);
  });

  it('should render correctly, if user hovered the cursor over the hotel', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Map offers={moskOffers} idNearbyOffer={moskOffers[0].id} />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByAltText('selected offer')).toBeInTheDocument();
  });
});
