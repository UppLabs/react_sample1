import axios from 'axios';
import 'url-search-params-polyfill';
import api from '../../utils/api';
import token from '../../utils/token';
import { 
  AUTHENTICATED, 
  UNAUTHENTICATED, 
  REQUEST_AUTHENTICATED, 
  AUTHENTICATED_ERROR, 
} from '../constants/authTypes';

export const requestAuthenticated = { type: REQUEST_AUTHENTICATED };
export const authenticated = { type: AUTHENTICATED, payload: false };
export const unauthenticated = { type: UNAUTHENTICATED };
export const authenticatedError = { type: AUTHENTICATED_ERROR, payload: true };

export const signIn = values => (dispatch) => {
  dispatch(requestAuthenticated);
  const params = new URLSearchParams();
  params.append('client_id', values.client_id);
  params.append('client_secret', values.client_secret);
  params.append('grant_type', values.grant_type);
  params.append('username', values.username);
  params.append('password', values.password);
  params.append('scope', values.scope);

  axios
    .post('/oauth/token', params)
    .then((response) => {
      const data = response.data;
      console.log(this.props);
      if(data) {
        const newToken = JSON.stringify(data);
        token.setToken(newToken);
        dispatch(authenticated);
        // window.location.replace('/welcome');
      }
  }, (error) => {
    console.log(error);
    dispatch(authenticatedError);
  });
};

export const signOut = () => (dispatch) => {
  localStorage.removeItem('token');
  dispatch(unauthenticated);
};
