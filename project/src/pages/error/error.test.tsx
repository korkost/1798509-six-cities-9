import { configureMockStore } from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import { Provider } from 'react-redux';
import HistoryRouter from '../../components/history-router/history-router';
import { AuthorizationStatus } from '../../consts';
import { makeFakeUser } from '../../utils/mocks';
import Error from './error';

const mockStore = configureMockStore();
const mockUser = makeFakeUser;

describe('Component: Error', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <Provider store={mockStore({User: {authorizationStatus:  AuthorizationStatus.Auth, user: mockUser}})}>
        <HistoryRouter history={history} >
          <Error />
        </HistoryRouter>,
      </Provider>,
    );

    const headerElement = screen.getByText('Page not found');
    const linkElement = screen.getByText('Go to main page');

    expect(screen.getByTestId('Header')).toBeInTheDocument();
    expect(headerElement).toBeInTheDocument();
    expect(linkElement).toBeInTheDocument();
  });
});
