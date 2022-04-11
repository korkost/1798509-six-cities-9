import { AuthorizationStatus } from '../../consts';
import { makeUserData } from '../../utils/mocks';
import {
  userProcess,
  requireAuthorization,
  setUser
} from './user-process';

describe('Reducer: userProcess', () => {
  it('without additional parameters should return initial state', () => {
    expect(userProcess.reducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual({authorizationStatus: AuthorizationStatus.Unknown, user: {}});
  });
  it('should update authorizationStatus to "Auth"', () => {
    const state = {authorizationStatus: AuthorizationStatus.Unknown, user: {}};
    const authorizationStatus = AuthorizationStatus.Auth;
    expect(userProcess.reducer(state, requireAuthorization(authorizationStatus)))
      .toEqual({authorizationStatus, user: {}});
  });
  it('should update authorizationStatus to "NoAuth"', () => {
    const state = {authorizationStatus: AuthorizationStatus.Auth, user: {}};
    const authorizationStatus = AuthorizationStatus.NoAuth;
    expect(userProcess.reducer(state, requireAuthorization(authorizationStatus)))
      .toEqual({authorizationStatus, user: {}});
  });
  it('should set user', () => {
    const state = {authorizationStatus: AuthorizationStatus.Auth, user: {}};
    const user = makeUserData();
    expect(userProcess.reducer(state, setUser(user)))
      .toEqual({authorizationStatus: AuthorizationStatus.Auth, user});
  });
});
