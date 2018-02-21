const offline = (state = { isOnline: true }, action) => {
  switch (action.type) {
    case 'NAVIGATION_ONLINE_STATUS':
      return Object.assign({}, state, { isOnline: action.payload });
    default:
      return state;
  }
};

export default offline;
