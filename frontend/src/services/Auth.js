const USER_KEY = '_favmovies_user';

const Auth = {
  getStoredUser() {
    return JSON.parse(localStorage.getItem(USER_KEY));
  },

  addStoredUser(user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },

  deleteStoredUser() {
    localStorage.removeItem(USER_KEY);
  },
};

export default Auth;
