import { configureMockStore } from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import { Provider } from 'react-redux';
import HistoryRouter from '../../components/history-router/history-router';
import { AuthorizationStatus } from '../../consts';
import { makeFakeOffer, makeFakeUser } from '../../utils/mocks';
import Favorites from './favorites';

const mockStore = configureMockStore();
const mockUser = makeFakeUser();
const history = createMemoryHistory();

describe('Component: Favorites', () => {
  it('should render correctly if user added offers to favorites', () => {
    const mockOffers = [{...makeFakeOffer(), isFavorite: true}, makeFakeOffer()];

    render(
      <Provider store={mockStore({User: {authorizationStatus:  AuthorizationStatus.Auth, user: mockUser}, Data: {offersFavorite: mockOffers}})}>
        <HistoryRouter history={history} >
          <Favorites />
        </HistoryRouter>,
      </Provider>,
    );

    expect(screen.getByTestId('Header')).toBeInTheDocument();
    expect(screen.getByTestId('FavoritesFull')).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('should render correctly if user did not add offers to favorites', () => {

    render(
      <Provider store={mockStore({User: {authorizationStatus:  AuthorizationStatus.Auth, user: mockUser}, Data: {offersFavorite: []}})}>
        <HistoryRouter history={history} >
          <Favorites />
        </HistoryRouter>,
      </Provider>,
    );

    expect(screen.getByText('Nothing yet saved.')).toBeInTheDocument();
    const descriptionElement = screen.getByText('Save properties to narrow down search or plan your future trips.');
    expect(descriptionElement).toBeInTheDocument();
  });
});
