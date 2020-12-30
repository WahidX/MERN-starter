import { CLEAR_SNACKBAR, SET_SNACKBAR } from './actionTypes';

export function setSnackBar(variant, message, duration) {
  return {
    type: SET_SNACKBAR,
    variant,
    message,
    duration,
  };
}

export function clearSnackBar() {
  return {
    type: CLEAR_SNACKBAR,
  };
}
