import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import userEvent from '@testing-library/user-event';
import SignIn from './sign-in';
import HistoryRouter from '../../components/history-router/history-router';
import { makeFakeUser } from '../../utils/mocks';
import { Routes, Route } from 'react-router-dom';
import { AuthorizationStatus } from '../../consts';

const mockStore = configureMockStore();
const mockUser = makeFakeUser();

describe('Component: SignIn', () => {
  const history = createMemoryHistory();

  it('should render "SignIn" when user navigate to "login" url', () => {

    render(
      <Provider store={mockStore({User: {authorizationStatus: AuthorizationStatus.NoAuth, user: mockUser}})}>
        <HistoryRouter history={history}>
          <SignIn />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
    expect(screen.getByTestId(/RandomCity/i)).toBeInTheDocument();

    userEvent.type(screen.getByTestId('Email'), 'keks@test.ru');
    userEvent.type(screen.getByTestId('Password'), 'keks123456');

    expect(screen.getByDisplayValue(/keks@test.ru/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/keks123456/i)).toBeInTheDocument();
  });

  it('should redirect to root url when user clicked to button "RandomCity"', () => {

    history.push('/fake');

    render(
      <Provider store={mockStore({User: {authorizationStatus: AuthorizationStatus.NoAuth, user: mockUser}})}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path='/*'
              element={<SignIn />}
            />
            <Route
              path="/"
              element={<h1>This is main page</h1>}
            />
          </Routes>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.queryByText(/This is main page/i)).not.toBeInTheDocument();
    userEvent.click(screen.getByTestId(/RandomCity/i));
    expect(screen.getByText(/This is main page/i)).toBeInTheDocument();
  });

  it('the button "Sign In" should be disabled if the user has entered invalid password.', () => {

    history.push('/fake');

    render(
      <Provider store={mockStore({User: {authorizationStatus: AuthorizationStatus.NoAuth, user: mockUser}})}>
        <HistoryRouter history={history}>
          <SignIn />
        </HistoryRouter>
      </Provider>,
    );

    userEvent.type(screen.getByTestId('Email'), 'keks@test.ru');
    expect(screen.getByDisplayValue(/keks/i)).toBeInTheDocument();
    expect(screen.getByTestId('SignInButton')).toBeDisabled();
  });
});
