const getTokenExpiration = () => {
  const token = localStorage.getItem('token');

  if (token) {
    const accessTokenExpiresAt = JSON.parse(token).accessTokenExpiresAt;

    return new Date(accessTokenExpiresAt);
  }

  return null;
};

const getRefreshTokenExpiration = () => {
  const token = localStorage.getItem('token');

  if (token) {
    const refreshTokenExpiresAt = JSON.parse(token).refreshTokenExpiresAt;

    return new Date(refreshTokenExpiresAt);
  }

  return null;
};

const getToken = () => {
  const locaToken = localStorage.getItem('token');

  if (locaToken) {
    const token = JSON.parse(locaToken);
    
    return token;
  }

  return null;
};

const removeToken = () => {
  const locaToken = localStorage.getItem('token');

  if (locaToken) {
    localStorage.removeItem('token');
  }

  return null;
};

const setToken = (value) => {
  localStorage.setItem('token', value);
};

export default {
  getToken,
  setToken,
  getTokenExpiration,
  getRefreshTokenExpiration,
  removeToken,
};
