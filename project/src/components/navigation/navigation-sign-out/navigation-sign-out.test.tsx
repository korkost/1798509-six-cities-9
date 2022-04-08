import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../../history-router/history-router';
import NavigationSignOut from './navigation-sign-out';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { AppRoute, AuthorizationStatus } from '../../../consts';
import { makeFakeUser } from '../../../utils/mocks';
import { Provider } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

const mockStore = configureMockStore();
const mockUser = makeFakeUser();

describe('Component: NavigationSignOut', () => {
  const history = createMemoryHistory();

  it('should render correctly', () => {

    render(
      <Provider store={mockStore({User: {authorizationStatus: AuthorizationStatus.Auth, user: mockUser}})}>
        <HistoryRouter history={history} >
          <NavigationSignOut />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByAltText(`${mockUser.name}`)).toBeInTheDocument();
    expect(screen.getByText(`${mockUser.email}`)).toBeInTheDocument();
    expect(screen.getByText('Sign out')).toBeInTheDocument();
  });

  it('should redirect to Favorite url when user clicked to mockUser.email', () => {

    history.push('/');

    render (
      <Provider store={mockStore({User: {authorizationStatus: AuthorizationStatus.Auth, user: mockUser}})}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={AppRoute.Favorites}
              element={<h1>This is page Favorites</h1>}
            />
            <Route
              path='/'
              element={<NavigationSignOut />}
            />
          </Routes>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.queryByText(/This is page Favorites/i)).not.toBeInTheDocument();
    userEvent.click(screen.getByText(`${mockUser.email}`));
    expect(screen.getByText(/This is page Favorites/i)).toBeInTheDocument();
  });
});
