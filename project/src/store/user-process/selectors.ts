import {NameSpace} from '../../consts';
import {AuthorizationStatus} from '../../consts';
import {State} from '../../types/state';

const getAuthorizationStatus = (state: State): AuthorizationStatus => state[NameSpace.User].authorizationStatus;
const getUser = (state: State): Record<string, never> => state[NameSpace.User].user;


export {getAuthorizationStatus, getUser};
