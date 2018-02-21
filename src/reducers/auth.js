const defaultState = {
  email: '',
  password: '',
  loginError: '',
  ajaxLoading: false,
  jwt_token: typeof (Storage) !== 'undefined' && sessionStorage.jwt_token ? sessionStorage.jwt_token : '',
  isAuthenticated: !!(typeof (Storage) !== 'undefined' && sessionStorage.jwt_token),
  userName: typeof (Storage) !== 'undefined' && localStorage.userName ? localStorage.userName : ''
};

const auth = (state = defaultState, action) => {
  switch (action.type) {
    case 'LOGIN_FORM_EMAIL':
      return Object.assign({}, state, { email: action.payload });
    case 'LOGIN_FORM_PASSWORD':
      return Object.assign({}, state, { password: action.payload });
    case 'LOGIN_START_REQUEST':
      return Object.assign({}, state, { ajaxLoading: true });
    case 'LOGIN_FINISH_REQUEST':
      return Object.assign({}, state, { ajaxLoading: false });
    case 'LOGIN_SUCCESS':
      return Object.assign(
        {},
        state,
        {
          isAuthenticated: true,
          jwt_token: action.payload.token,
          userName: action.payload.userName,
          email: '',
          password: ''
        }
      );
    case 'AUTH_LOGOUT':
      return Object.assign({}, state, { isAuthenticated: false, userName: '' });
    case 'LOGIN_ERROR':
      return Object.assign({}, state, { loginError: action.payload });
    case 'LOGIN_ERROR_CLEAR':
      return Object.assign({}, state, { loginError: '' });
    default:
      return state;
  }
};

export default auth;
