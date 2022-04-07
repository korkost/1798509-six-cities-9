import {configureMockStore} from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import HistoryRouter from '../../components/history-router/history-router';
import { AuthorizationStatus } from '../../consts';
import {makeFakeOffer, makeFakeUser} from '../../utils/mocks';
import Main from './main';

const mockStore = configureMockStore();
const mockUser = makeFakeUser();
const mockCity = 'Paris';
const mockOffers = [makeFakeOffer(), makeFakeOffer()];
const history = createMemoryHistory();

describe('Component: Main', () => {
  it('should render correctly if there are offers in the active city', () => {

    render(
      <Provider store={mockStore({Data: {offers: mockOffers}, Offers: {city: mockCity}, User: {authorizationStatus: AuthorizationStatus.Auth, user: mockUser}})}>
        <HistoryRouter history={history} >
          <Main />
        </HistoryRouter>,
      </Provider>,
    );

    expect(screen.getByTestId('Header')).toBeInTheDocument();
    expect(screen.getByText('Cities')).toBeInTheDocument();
    expect(screen.getByTestId('CitiesList')).toBeInTheDocument();
    expect(screen.getAllByTestId('City')).toHaveLength(6);
    expect(screen.getByText(`${mockOffers.length} places to stay in ${mockCity}`)).toBeInTheDocument();
    expect(screen.getByText('Sort by')).toBeInTheDocument();
    expect(screen.getAllByTestId('SortingItem')).toHaveLength(4);
    expect(screen.getAllByTestId('PlaceCard')).toHaveLength(2);
    expect(screen.getByTestId('Map')).toBeInTheDocument();
  });

  it('should render correctly if there are no offers in the active city', () => {

    render(
      <Provider store={mockStore({ Data: {offers: []}, Offers: {city: mockCity}, User: {authorizationStatus: AuthorizationStatus.Auth, user: mockUser}})}>
        <HistoryRouter history={history} >
          <Main />
        </HistoryRouter>,
      </Provider>,
    );

    expect(screen.getByTestId('Header')).toBeInTheDocument();
    expect(screen.getByText('Cities')).toBeInTheDocument();
    expect(screen.getByTestId('CitiesList')).toBeInTheDocument();
    expect(screen.getAllByTestId('City')).toHaveLength(6);
    expect(screen.getByText('No places to stay available')).toBeInTheDocument();
    const descriptionElement = screen.getByText(`We could not find any property available at the moment in ${mockCity}`);
    expect(descriptionElement).toBeInTheDocument();
  });
});
