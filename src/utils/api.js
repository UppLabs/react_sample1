import axios from 'axios';
import token from './token';
import * as config from '../utils/config.json';

let isRefreshing = false;
let refreshSubscribers = [];

const api = axios.create({
  baseURL: config.base_url,
});

api.interceptors.request.use(
  (config) => {
    const newConfig = config;
    const localToken = token.getToken();

    if(localToken) {
      newConfig.headers.authorization = 'Bearer ' + localToken.accessToken;
      return newConfig;
    }

    return config;
  },
  (error) => {
    Promise.reject(error);
  },
);

api.interceptors.response.use((response) => {
  return response;
}, (error) => {
  const { config: requestConfig } = error;
  const status = !error.response || error.response.status;
  const originalRequest = requestConfig;
  const localToken = token.getToken();

  if (status === 401 && localToken) {
    if (!isRefreshing) {
      isRefreshing = true;

      const params = new URLSearchParams();
      params.append('refresh_token', localToken.refreshToken);
      params.append('client_id', '1234');
      params.append('client_secret', '1234');
      params.append('grant_type', 'refresh_token');

      axios.post(config.token_url, params)
      .then((response) => {
        isRefreshing = false;
        const data = response.data;
        if (data) {
          const newToken = JSON.stringify(data);
          token.setToken(newToken);
          onRefreshed(newToken.accessToken);
        }
      });
    }

    const retryOrigReq = new Promise((resolve, reject) => {
      subscribeTokenRefresh((token) => {
        originalRequest.headers.authorization = 'Bearer ' + token;
        originalRequest.baseURL = '';
        resolve(api(originalRequest));
      });
    });
    return retryOrigReq;
  } else {
    return Promise.reject(error);
  }
});

function subscribeTokenRefresh(cb) {
  refreshSubscribers.push(cb);
}

function onRefreshed(token) {
  refreshSubscribers.map(cb => cb(token));
}

api.CancelToken = axios.CancelToken;

export default api;
