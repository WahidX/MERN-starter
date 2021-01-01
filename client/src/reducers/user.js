import {
  LOGIN_FAILED,
  LOGIN_START,
  LOGIN_SUCCESS,
  SIGNUP_START,
  SIGNUP_SUCCESS,
  SIGNUP_FAILED,
  AUTHENTICATE_USER,
  CLEAR_AUTH_STATE,
  LOGOUT,
  UPDATE_START,
  UPDATE_FAILED,
  UPDATE_SUCCESS,
  CHANGE_PASSWORD_START,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAILED,
} from '../actions/actionTypes';

const initialAuthState = {
  user: {},
  error: null,
  isLoggedin: false,
  inProgress: false,
};

export default function user(state = initialAuthState, action) {
  switch (action.type) {
    case UPDATE_START:
    case SIGNUP_START:
    case LOGIN_START:
    case CHANGE_PASSWORD_START:
      return {
        ...state,
        inProgress: true,
      };

    case UPDATE_SUCCESS:
    case SIGNUP_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.user,
        inProgress: false,
        isLoggedin: true,
        error: null,
      };

    case UPDATE_FAILED:
    case SIGNUP_FAILED:
    case CHANGE_PASSWORD_FAILED:
    case LOGIN_FAILED:
      return {
        ...state,
        error: action.error,
        inProgress: false,
      };

    case AUTHENTICATE_USER:
      return {
        ...state,
        user: action.user,
        isLoggedin: true,
      };
    case LOGOUT:
      return {
        ...state,
        user: {},
        isLoggedin: false,
      };
    case CHANGE_PASSWORD_SUCCESS:
    case CLEAR_AUTH_STATE:
      return {
        ...state,
        inProgress: false,
        error: null,
      };
    default:
      return state;
  }
}
