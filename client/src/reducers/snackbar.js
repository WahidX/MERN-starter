import { SET_SNACKBAR, CLEAR_SNACKBAR } from '../actions/actionTypes';

const initialState = {
  variant: 'info',
  message: null,
  duration: '3000',
  open: 'false',
};

export default function snackbar(state = initialState, action) {
  switch (action.type) {
    case SET_SNACKBAR:
      return {
        ...state,
        variant: action.variant,
        message: action.message,
        duration: action.duration,
        open: 'true',
      };

    case CLEAR_SNACKBAR:
      return {
        initialState,
      };

    default:
      return {
        state,
      };
  }
}
