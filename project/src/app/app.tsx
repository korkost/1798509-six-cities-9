import {AppRoute, AuthorizationStatus} from '../consts';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Error from '../components/error';
import Favorites from '../pages/favorites/favorites';
import Main from '../pages/main/main';
import PrivateRoute from '../components/private-route';
import Room from '../pages/room/room';
import SignIn from '../pages/sign-in/sign-in';

type AppScreenProps = {
  placesCount: number;
}

function App({placesCount}: AppScreenProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Main placesCount={placesCount} />} />
        <Route path={AppRoute.Favorites}
          element={
            <PrivateRoute authorizationStatus={AuthorizationStatus.Auth}>
              <Favorites />
            </PrivateRoute>
          }
        />
        <Route path={AppRoute.Login} element={<SignIn />} />
        <Route path={AppRoute.Offer} element={<Room />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
