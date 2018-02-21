export const toggleNav = () => {
  return {
    type: 'NAV_TOGGLE_ACTIVE'
  };
};

export const onLogoutClick = () => {
  if (typeof (Storage) !== 'undefined') {
    sessionStorage.removeItem('jwt_token');
    sessionStorage.removeItem('items_synced');
  }
  return {
    type: 'AUTH_LOGOUT'
  };
};
