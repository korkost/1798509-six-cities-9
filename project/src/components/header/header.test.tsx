import {configureMockStore} from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import HistoryRouter from '../history-router/history-router';
import {AuthorizationStatus} from '../../consts';
import {makeFakeUser} from '../../utils/mocks';
import Header from './header';

const mockStore = configureMockStore();
const mockUser = makeFakeUser();

describe('Component: Header', () => {

  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <Provider store={mockStore({User: {authorizationStatus: AuthorizationStatus.Auth, user: mockUser}})}>
        <HistoryRouter history={history} >
          <Header />
        </HistoryRouter>,
      </Provider>,
    );

    expect(screen.getByTestId('Header')).toBeInTheDocument();
  });

  it('should render correctly, if authorizationStatus=Auth', () => {
    const history = createMemoryHistory();

    render(
      <Provider store={mockStore({User: {authorizationStatus: AuthorizationStatus.Auth, user: mockUser}})}>
        <HistoryRouter history={history} >
          <Header />
        </HistoryRouter>,
      </Provider>,
    );

    expect(screen.getByTestId('Header')).toBeInTheDocument();
    expect(screen.getAllByRole('link')).toHaveLength(3);
    expect(screen.getByTestId('SignOut')).toBeInTheDocument();
  });

  it('should render correctly, if authorizationStatus=NoAuth', () => {
    const history = createMemoryHistory();

    render(
      <Provider store={mockStore({User: {authorizationStatus: AuthorizationStatus.NoAuth, user: mockUser}})}>
        <HistoryRouter history={history} >
          <Header />
        </HistoryRouter>,
      </Provider>,
    );

    expect(screen.getByTestId('Header')).toBeInTheDocument();
    expect(screen.getAllByRole('link')).toHaveLength(2);
    expect(screen.getByText('Sign in')).toBeInTheDocument();
  });
});
