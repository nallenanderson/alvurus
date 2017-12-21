import {
  OWNER_LOGIN_SUCCESS,
  OWNER_FB_LOGIN_SUCCESS,
  OWNER_LOGIN_FAILURE,
  OWNER_FB_LOGIN_FAILURE,
  LOGOUT_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case OWNER_LOGIN_SUCCESS:
      return { auth_token: action.payload };
    case OWNER_FB_LOGIN_SUCCESS:
      return { auth_token: action.payload };
    case OWNER_LOGIN_FAILURE:
      return { auth_token: null };
    case OWNER_FB_LOGIN_FAILURE:
      return { auth_token: null };
    case LOGOUT_SUCCESS:
      console.log('You logged out');
      return { auth_token: null };
    default:
      return state;
  }
}
