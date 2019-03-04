import {
	CREATE_ACCOUNT,
	ERROR_MESSAGE,
} from '../constants/signUpTypes';
import api from '../../utils/api';

export const createNewAccount = data => (dispatch, getState) => {
  api.post('/users', data).then((response) => {
    dispatch({ type: ERROR_MESSAGE, payload: '' });
  }).catch((error) => {
    dispatch({ type: ERROR_MESSAGE, payload: 'User with this email already exists' });
  });
};