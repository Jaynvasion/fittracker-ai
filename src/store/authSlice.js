const initialState = {
    user: null,
    token: null,
  };
  
  export const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_USER':
        return { ...state, user: action.payload };
      case 'SET_TOKEN':
        return { ...state, token: action.payload };
      case 'LOGOUT':
        return { user: null, token: null };
      default:
        return state;
    }
  };
  