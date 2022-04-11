import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import { Route, Routes } from 'react-router-dom';
import HistoryRouter from '../../history-router/history-router';
import LogoHeader from './logo-header';
import userEvent from '@testing-library/user-event';

const history = createMemoryHistory();

describe('Component: LogoHeader', () => {

  it('should render correctly', () => {

    render(
      <HistoryRouter history={history} >
        <LogoHeader />
      </HistoryRouter>,
    );

    expect(screen.getByRole('link')).toBeInTheDocument();
    expect(screen.getByAltText('6 cities logo')).toBeInTheDocument();

  });

  it('should redirect to root url when user clicked to link', () => {
    history.push('/fake');

    render(
      <HistoryRouter history={history}>
        <Routes>
          <Route
            path="/"
            element={<h1>This is main page</h1>}
          />
          <Route
            path='*'
            element={<LogoHeader />}
          />
        </Routes>
      </HistoryRouter>);

    expect(screen.queryByText(/This is main page/i)).not.toBeInTheDocument();
    userEvent.click(screen.getByRole('link'));
    expect(screen.getByText(/This is main page/i)).toBeInTheDocument();
  });
});
