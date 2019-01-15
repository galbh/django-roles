export default {
  fetchLoggedInUser: {
    url: '/accounts/logged-in-user'
  },

  logout: {
    url: '/accounts/logout'
  },

  fetchUserTypes: {
    url: '/accounts/user-types'
  },

  registration: {
    url: '/accounts/registration',
    method: 'POST',
    contentType: 'application/json'
  },

  fetchUsers: {
    url: 'accounts/users'
  },

  deleteUser: {
    url: userId => `accounts/users/${userId}`,
    method: 'DELETE',
    contentType: 'application/json'
  }
};
