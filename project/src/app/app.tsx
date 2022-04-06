import { Route, Routes } from 'react-router-dom';
import Main from '../pages/main/main';
import Favorites from '../pages/favorites/favorites';
import SignIn from '../pages/sign-in/sign-in';
import Error from '../pages/error/error';
import PrivateRoute from '../components/private-route/private-route';
import { AppRoute, AuthorizationStatus } from '../consts';
import { useAppSelector } from '../hooks';
import LoadingScreen from '../components/loading-screen/loading-screen';
import HistoryRouter from '../components/history-route/history-route';
import browserHistory from '../services/browser-history';
import Room from '../pages/room/room';
import { ToastContainer } from 'react-toastify';

const isCheckedAuth = (authorizationStatus: AuthorizationStatus): boolean =>
  authorizationStatus === AuthorizationStatus.Unknown;

function App(): JSX.Element {
  const {authorizationStatus} = useAppSelector(({USER}) => USER);
  const {isDataLoaded} = useAppSelector(({DATA}) => DATA);

  if (isCheckedAuth(authorizationStatus) || !isDataLoaded) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <HistoryRouter history={browserHistory}>
      <ToastContainer />
      <Routes>
        <Route index element={<Main />} />
        <Route path={AppRoute.Favorites}
          element={
            <PrivateRoute>
              <Favorites />
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
