import {AppRoute, AuthorizationStatus} from '../consts';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Error from '../pages/error/error';
import Favorites from '../pages/favorites/favorites';
import {Offer} from '../types/offer';
import Main from '../pages/main/main';
import PrivateRoute from '../components/private-route/private-route';
import Room from '../pages/room/room';
import {Review} from '../types/review';
import SignIn from '../pages/sign-in/sign-in';

type AppScreenProps = {
  placesCount: number;
  offers: Offer[];
  reviews: Review[];
}

function App({placesCount, offers, reviews}: AppScreenProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Main offers={offers} placesCount={placesCount} />} />
        <Route path={AppRoute.Favorites}
          element={
            <PrivateRoute authorizationStatus={AuthorizationStatus.Auth}>
              <Favorites offers={offers}/>
            </PrivateRoute>
          }
        />
        <Route path={AppRoute.Login} element={<SignIn />} />
        <Route path={AppRoute.Offer} element={<Room reviews={reviews} offers={offers} />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
