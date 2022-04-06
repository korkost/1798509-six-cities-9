import { Navigate } from 'react-router-dom';
import { AuthorizationStatus } from '../../consts';
import { useAppSelector } from '../../hooks';

type PrivateRouteProps = {
  children: JSX.Element;
};

function PrivateRoute({children}: PrivateRouteProps): JSX.Element {
  const {authorizationStatus} = useAppSelector(({USER}) => USER);

  return authorizationStatus === AuthorizationStatus.Auth ? children : <Navigate to={'/login'} />;
}

export default PrivateRoute;
