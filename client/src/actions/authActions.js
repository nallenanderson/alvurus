import { makeRequest } from '../helpers';

import {
  OWNER_LOGIN_SUCCESS,
  OWNER_FB_LOGIN_SUCCESS,
  OWNER_LOGIN_FAILURE,
  OWNER_FB_LOGIN_FAILURE,
  LOGOUT_SUCCESS
} from './types'

export const ownerLogin = () => async dispatch => {

  let auth_token = await localStorage.getItem('auth_token');

  if (auth_token) {
    dispatch({ type: OWNER_LOGIN_SUCCESS, payload: auth_token });
  } else {
    getOwnerLogin(dispatch);
  }
}

export const getOwnerLogin = (url, method, body) => async dispatch => {

  let { auth_token } = await makeRequest(url, method, null, body);

  if (!auth_token) {
    dispatch({ type: OWNER_LOGIN_FAILURE });
    return { message: 'Invalid username or password.' };
  }

  await localStorage.setItem('auth_token', auth_token);
  dispatch({ type: OWNER_LOGIN_SUCCESS, payload: auth_token });
  return { auth_token: 'success' };

}

export const loginFB = (fb_info) => async dispatch => {
  const { accessToken: access_token, id: user_id, expiresIn: expires_in } = fb_info;

  const body = { access_token, user_id, expires_in, user_scope: 'owner' };

  const { auth_token } = await makeRequest('/api/user/login/facebook', 'POST', null, body);

  if (auth_token) {
    await localStorage.setItem('auth_token', auth_token);
    dispatch({ type: OWNER_FB_LOGIN_SUCCESS, payload: auth_token });
  } else {
    dispatch({ type: OWNER_FB_LOGIN_FAILURE });
    return { message: 'There was an error. Please try again.' };
  }
}

export const userLogout = () => async dispatch => {
  await localStorage.removeItem('auth_token');
  dispatch({ type: LOGOUT_SUCCESS });
}

export const createCompany = (url, method, body) => async dispatch => {
  const user = await makeRequest(url, method, null, body);

  return ({ user });
}
