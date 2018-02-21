const auth = (state = { isActive: false }, action) => {
  switch (action.type) {
    case 'NAV_TOGGLE_ACTIVE':
      return Object.assign({}, state, { isActive: !state.isActive });
    default:
      return state;
  }
};

export default auth;
