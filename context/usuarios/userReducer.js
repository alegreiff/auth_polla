export const types = {
  userLogin: 'USER - LOGIN',
  userLogout: 'USER - LOGOUT',
};

export const initialStore = {
  user: { _id: '', email: '', name: '' },
};

export const userReducer = (state, action) => {
  switch (action.type) {
    case types.userLogout:
      return {
        ...state,
        user: null,
      };
    case types.userLogin:
      return {
        ...state,
        user: action.payload,
      };

    default:
      return state;
  }
};
