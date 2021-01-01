// export const SERVER_ROOT = 'https://localhost:8000';
export const SERVER_ROOT = '';

const API_ROOT = `${SERVER_ROOT}/api/v1`;

export const APIurls = {
  // user
  createSession: () => `${API_ROOT}/auth/create-session`,
  createUser: () => `${API_ROOT}/auth/create-user`,
  fetchUser: () => `${API_ROOT}/auth/profile`,
  updateUser: () => `${API_ROOT}/auth/`,
  changePassword: () => `${API_ROOT}/auth/change-password`,
};
