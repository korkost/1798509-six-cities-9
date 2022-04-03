import {Route, Routes} from 'react-router-dom';

import Main from '../pages/main/main';
import Favorites from '../pages/favorites/favorites';
import SignIn from '../pages/sign-in/sign-in';

import Error from '../pages/error/error';
import PrivateRoute from '../components/private-route/private-route';

import {AppRoute, AuthorizationStatus} from '../consts';
import { useAppSelector } from '../hooks';
import { sortOffers } from '../common';
import LoadingScreen from '../components/loading-screen/loading-screen';
import HistoryRouter from '../components/history-route/history-route';
import browserHistory from '../browser-history';
import Room from '../pages/room/room';

const isCheckedAuth = (authorizationStatus: AuthorizationStatus): boolean =>
  authorizationStatus === AuthorizationStatus.Unknown;

function App(): JSX.Element {
  const currentCity = useAppSelector((state) => state.city);
  const currentType = useAppSelector((state) => state.sortingType);
  const offers = useAppSelector((state) => state.offers);
  const sortedOffers = sortOffers(offers, currentCity, currentType);

  const {authorizationStatus, isDataLoaded} = useAppSelector((state) => state);

  if (isCheckedAuth(authorizationStatus) || !isDataLoaded) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <HistoryRouter history={browserHistory}>
      <Routes>
        <Route index element={<Main offers={sortedOffers} />} />
        <Route path={AppRoute.Favorites}
          element={
            <PrivateRoute authorizationStatus={authorizationStatus}>
              <Favorites offers={offers}/>
            </PrivateRoute>
          }
        />
        <Route path={AppRoute.Login} element={<SignIn />} />
        <Route path={AppRoute.Offer} element={<Room />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </HistoryRouter>
  );
}

export default App;
