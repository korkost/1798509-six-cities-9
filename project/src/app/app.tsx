import { Route, Routes } from 'react-router-dom';
import Main from '../pages/main/main';
import Favorites from '../pages/favorites/favorites';
import SignIn from '../pages/sign-in/sign-in';
import Error from '../pages/error/error';
import PrivateRoute from '../components/private-route/private-route';
import { AppRoute, AuthorizationStatus } from '../consts';
import { useAppSelector } from '../hooks';
import LoadingScreen from '../components/loading-screen/loading-screen';
import { getAuthorizationStatus } from '../store/user-process/selectors';
import { getDataLoaded } from '../store/offers-data/selectors';
import Room from '../pages/room/room';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { store } from '../store';
import { checkAuthAction, fetchOfferAction } from '../store/api-actions';

const isCheckedAuth = (authorizationStatus: AuthorizationStatus): boolean =>
  authorizationStatus === AuthorizationStatus.Unknown;

function App(): JSX.Element {
  useEffect(() => {
    store.dispatch(fetchOfferAction());
    store.dispatch(checkAuthAction());
  }, []);

  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const isDataLoaded = useAppSelector(getDataLoaded);

  if (isCheckedAuth(authorizationStatus) || !isDataLoaded) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <>
      <ToastContainer />
      <Routes>
        <Route index element={<Main />} />
        <Route path={AppRoute.Favorites}
          element={<PrivateRoute><Favorites /></PrivateRoute>}
        />
        <Route path={AppRoute.Login} element={<SignIn />} />
        <Route path={AppRoute.Hotel} element={<Room />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
}

export default App;
