import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import { Route, Routes } from 'react-router-dom';
import HistoryRouter from '../../history-router/history-router';
import userEvent from '@testing-library/user-event';
import NavigationSignIn from './navigation-sign-in';

const history = createMemoryHistory();

describe('Component: NavigationSignIn', () => {

  it('should render correctly', () => {

    render(
      <HistoryRouter history={history} >
        <NavigationSignIn />
      </HistoryRouter>,
    );

    expect(screen.getByRole('link')).toBeInTheDocument();
  });

  it('should redirect to url when user clicked to link', () => {
    history.push('/fake');

    render(
      <HistoryRouter history={history}>
        <Routes>
          <Route
            path="/login"
            element={<h1>This is SignIn page</h1>}
          />
          <Route
            path='*'
            element={<NavigationSignIn />}
          />
        </Routes>
      </HistoryRouter>);

    expect(screen.queryByText(/This is SignIn page/i)).not.toBeInTheDocument();
    userEvent.click(screen.getByRole('link'));
    expect(screen.getByText(/This is SignIn page/i)).toBeInTheDocument();
  });
});
