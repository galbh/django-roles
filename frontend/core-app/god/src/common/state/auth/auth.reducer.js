import authState from './auth.state';
import { FETCH_LOGGED_IN_USER, LOGOUT, FETCH_USER_TYPES, FETCH_USERS } from './auth.actions';
import { SUCCESS_SUFFIX } from '../../constants';

function authReducer (state = authState, action) {
  switch (action.type) {
    case `${FETCH_LOGGED_IN_USER}${SUCCESS_SUFFIX}`:
      return { ...state, loggedInUser: action.payload };

    case `${LOGOUT}${SUCCESS_SUFFIX}`:
      window.location.href = '';
      return { ...state };

    case `${FETCH_USER_TYPES}${SUCCESS_SUFFIX}`:
      return { ...state, userTypes: action.payload }
      
    case `${FETCH_USERS}${SUCCESS_SUFFIX}`:
      return { ...state, users: action.payload }

    default:
      return state;
  }
}

export default authReducer;
