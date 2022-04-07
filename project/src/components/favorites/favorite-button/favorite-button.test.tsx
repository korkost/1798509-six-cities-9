import { configureMockStore } from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../consts';
import HistoryRouter from '../history-route/history-router';
import FavoriteButton from './favorite-button';
import * as Redux from 'react-redux';

const mockId = 1;
const mockRenderPlace = 'PlaceCard';
const mockStore = configureMockStore();

describe('Component: FavoriteButton', () => {
  const history = createMemoryHistory();

  it('should render correctly', () => {

    render(
      <Provider store={mockStore({User: {authorizationStatus: AuthorizationStatus.NoAuth}})}>
        <HistoryRouter history={history}>
          <FavoriteButton isFavorite={false} id={mockId} renderPlace={mockRenderPlace} />
        </HistoryRouter>
      </Provider>,
    );

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('should redirect to SignIn url when user clicked to link, if authorizationStatus = NoAuth', () => {

    render(
      <Provider store={mockStore({User: {authorizationStatus: AuthorizationStatus.NoAuth}})}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path="/"
              element={<FavoriteButton isFavorite={false} id={mockId} renderPlace={mockRenderPlace} />}
            />
            <Route
              path={AppRoute.Login}
              element={<h1>This is login page</h1>}
            />
          </Routes>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.queryByText(/This is login page/i)).not.toBeInTheDocument();
    userEvent.click(screen.getByRole('button'));
    expect(screen.getByText(/This is login page/i)).toBeInTheDocument();
  });

  it('should change class when isFavorite===true && authorizationStatus===Auth', () => {

    render(
      <Provider store={mockStore({User: {authorizationStatus: AuthorizationStatus.Auth}})}>
        <HistoryRouter history={history}>
          <FavoriteButton isFavorite id={mockId} renderPlace={mockRenderPlace} />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByRole('button')).toHaveClass('place-card__bookmark-button--active');
  });

  it('should dispatch data, when user clicked to link, if authorizationStatus===Auth', () => {

    const dispatch = jest.fn();

    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);

    render(
      <Provider store={mockStore({User: {authorizationStatus: AuthorizationStatus.Auth}})}>
        <HistoryRouter history={history}>
          <FavoriteButton isFavorite={false} id={mockId} renderPlace={mockRenderPlace} />
        </HistoryRouter>
      </Provider>,
    );

    userEvent.click(screen.getByRole('button'));
    expect(useDispatch).toBeCalledTimes(1);
  });
});
