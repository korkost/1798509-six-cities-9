import { configureMockStore } from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { AuthorizationStatus } from '../../../consts';
import { makeFakeOffer } from '../../../utils/mocks';
import HistoryRouter from '../../history-router/history-router';
import MainFull from './main-full';


const mockCity = 'Paris';
const moskOffers = [makeFakeOffer(), makeFakeOffer()];
const mockStore = configureMockStore();
const history = createMemoryHistory();

describe('Component: MainFull', () => {
  it('should render correctly', () => {
    render(
      <Provider store={mockStore({Data: {offers: moskOffers}, Offers: {city: mockCity}, User: {authorizationStatus: AuthorizationStatus.Auth}})}>
        <HistoryRouter history={history}>
          <MainFull offers={moskOffers} />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(`${moskOffers.length} places to stay in ${mockCity}`)).toBeInTheDocument();
    expect(screen.getByText('Sort by')).toBeInTheDocument();
    expect(screen.getAllByTestId('SortingItem')).toHaveLength(4);
    expect(screen.getAllByTestId('PlaceCard')).toHaveLength(2);
    expect(screen.getByTestId('Map')).toBeInTheDocument();
  });
});
