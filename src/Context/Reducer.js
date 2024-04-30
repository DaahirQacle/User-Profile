import {
  FETCH_USERS,
  FETCH_USERS_LOADING,
  LOGOUT,
  SIGN_IN_BEGGING,
  SIGN_IN_END,
} from "./Actions";

const reducer = (state, action) => {
  const { type, payload } = action;

  if (type === SIGN_IN_BEGGING) {
    return {
      ...state,
      isLoading: true,
    };
  }

  if (type === SIGN_IN_END) {
    return {
      ...state,
      isLoading: false,
      User: payload.res,
    };
  }
  if (type === FETCH_USERS_LOADING) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (type === FETCH_USERS) {
    return {
      ...state,
      isLoading: false,
      UsersData: payload.data,
    };
  }
  if (type === LOGOUT) {
    return {
      ...state,

      User: null,
    };
  }

  return state;
};

export default reducer;
