import { configureMockStore } from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../../consts';
import { makeFakeOffer, makeFakeUser } from '../../../utils/mocks';
import HistoryRouter from '../../history-router/history-router';
import PlaceCard from './place-card';

const mockStore = configureMockStore();
const mockOffer = makeFakeOffer();
const articleClass = 'cities__place-card';
const imgClass = 'cities__image-wrapper';
const mockUser = makeFakeUser();

describe('Component: PlaceCard', () => {
  const history = createMemoryHistory();

  it('should render correctly', () => {

    render(
      <Provider store={mockStore({User: {authorizationStatus: AuthorizationStatus.Auth, user: mockUser}})}>
        <HistoryRouter history={history} >
          <PlaceCard offer={mockOffer} articleClassChange={articleClass} imgClassChange={imgClass} renderPlace={'PlaceCard'} />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getAllByRole('link')).toHaveLength(2);
    expect(screen.getByAltText('Place')).toBeInTheDocument();
    expect(screen.getByText(/€/i)).toBeInTheDocument();
    expect(screen.getByText(/night/i)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByText(/Rating/i)).toBeInTheDocument();
    expect(screen.getByTestId('title')).toBeInTheDocument();
  });

  it('should redirect to SignIn url when user clicked to button, AuthorizationStatus===NoAuth', () => {

    history.push('/');

    render(
      <Provider store={mockStore({User: {authorizationStatus: AuthorizationStatus.NoAuth, user: {}}})}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path='/'
              element={<PlaceCard offer={mockOffer} articleClassChange={articleClass} imgClassChange={imgClass} renderPlace={'PlaceCard'} />}
            />
            <Route
              path={AppRoute.Login}
              element={<h1>This is page SignIn</h1>}
            />
          </Routes>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.queryByText(/This is page SignIn/i)).not.toBeInTheDocument();
    userEvent.click(screen.getByRole('button'));
    expect(screen.getByText(/This is page SignIn/i)).toBeInTheDocument();
  });

  it('should redirect to Room url when user clicked on image', () => {

    history.push('/');

    render(
      <Provider store={mockStore({User: {authorizationStatus: AuthorizationStatus.Auth, user: {}}})}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path='/'
              element={<PlaceCard offer={mockOffer} articleClassChange={articleClass} imgClassChange={imgClass} renderPlace={'PlaceCard'} />}
            />
            <Route
              path={AppRoute.Hotel}
              element={<h1>This is page Room</h1>}
            />
          </Routes>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.queryByText(/This is page Room/i)).not.toBeInTheDocument();
    userEvent.click(screen.getByTestId('ImageLink'));
    expect(screen.getByText(/This is page Room/i)).toBeInTheDocument();
  });

  it('should redirect to Room url when user clicked on title', () => {

    history.push('/');

    render(
      <Provider store={mockStore({User: {authorizationStatus: AuthorizationStatus.Auth, user: {}}})}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path='/'
              element={<PlaceCard offer={mockOffer} articleClassChange={articleClass} imgClassChange={imgClass} renderPlace={'PlaceCard'} />}
            />
            <Route
              path={AppRoute.Hotel}
              element={<h1>This is page Room</h1>}
            />
          </Routes>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.queryByText(/This is page Room/i)).not.toBeInTheDocument();
    userEvent.click(screen.getByTestId('TitleLink'));
    expect(screen.getByText(/This is page Room/i)).toBeInTheDocument();
  });
});
