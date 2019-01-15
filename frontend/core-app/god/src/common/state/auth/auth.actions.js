import createAsyncAction from '../../../utils/createAsyncAction';
import HttpService from '../../services/http.service';
import ApiService from '../../services/api.service';

export const FETCH_LOGGED_IN_USER = 'FETCH_LOGGED_IN_USER';
export const LOGOUT = 'LOGOUT';
export const FETCH_USER_TYPES = 'FETCH_USER_TYPES';
export const REGISTRATION = 'REGISTRATION';
export const FETCH_USERS = 'FETCH_USERS';
export const DELETE_USER = 'DELETE_USER';

export const FetchLoggedInUserAction = createAsyncAction(FETCH_LOGGED_IN_USER, () => {
  const options = ApiService.getOptions('fetchLoggedInUser');
  return HttpService.fetch(options);
});

export const FetchUserTypesAction = createAsyncAction(FETCH_USER_TYPES, () => {
  const options = ApiService.getOptions('fetchUserTypes');
  return HttpService.fetch(options);
});

export const LogoutAction = createAsyncAction(LOGOUT, () => {
  const options = ApiService.getOptions('logout');
  return HttpService.fetch(options);
});

export const RegistrationAction = createAsyncAction(REGISTRATION, data => {
  const options = ApiService.getOptions('registration');
  return HttpService.fetch({...options, body: JSON.stringify({ ...data })});
});

export const FetchUsersAction = createAsyncAction(FETCH_USERS, () => {
  const options = ApiService.getOptions('fetchUsers');
  return HttpService.fetch(options);
});

export const DeleteUserAction = createAsyncAction(DELETE_USER, (userId) => {
  const options = ApiService.getOptions('deleteUser');
  return HttpService.fetch({...options, url: options.url(userId)});
});