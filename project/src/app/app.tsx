import {
  BrowserRouter,
  Route,
  Routes
} from 'react-router-dom';
import Main from '../pages/main/main';
import Favorites from '../pages/favorites/favorites';
import SignIn from '../pages/sign-in/sign-in';
import Room from '../pages/room/room';
import Error from '../pages/error/error';
import PrivateRoute from '../components/private-route/private-route';

import { AppRoute, AuthorizationStatus } from '../consts';
import { Review } from '../types/review';
import { Offer } from '../types/offer';
import { useAppSelector } from '../hooks';
import { sortOffers } from '../common';

type AppScreenProps = {
  offers: Offer[];
  reviews: Review[];
}

function App({ offers, reviews }: AppScreenProps): JSX.Element {
  const currentCity = useAppSelector((state) => state.city);
  const currentType = useAppSelector((state) => state.sortingType);
  const sortedOffers = sortOffers(offers, currentCity, currentType);
  const selectedPoint = useAppSelector((state) => state.offerId);

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Main offers={sortedOffers} currentCity={currentCity} selectedPoint={selectedPoint} />} />
        <Route path={AppRoute.Favorites}
          element={
            <PrivateRoute authorizationStatus={AuthorizationStatus.Auth}>
              <Favorites offers={offers} />
            </PrivateRoute>
          }
        />
        <Route path={AppRoute.Login} element={<SignIn />} />
        <Route path={AppRoute.Offer} element={<Room reviews={reviews} offers={sortedOffers} selectedPoint={selectedPoint} />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
