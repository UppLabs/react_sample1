import api from '../../utils/api';
import { alertError, alertSuccess } from './alert';
import { ADMIN_USERS, ADMIN_USERS_LOADING } from '../constants/adminUsersTypes';

const setAdminUsers = data => ({ type: ADMIN_USERS, payload: data });
const setAdminUsersLoading = value => ({ type: ADMIN_USERS_LOADING, payload: value });

export const getAdminUsers = () => async (dispatch, getState) => {
   try {
      dispatch(setAdminUsersLoading(true));
      const state = getState();
      const { retailerId } = state.role;

      const response = await users(retailerId);

      dispatch(setAdminUsers(response.data));
      dispatch(setAdminUsersLoading(false));
   } catch (error) {
      dispatch(alertError('Error'));
      dispatch(setAdminUsersLoading(false));
   }
};

export const deleteAdminUsers = id => async (dispatch, getState) => {
   try {
      const state = getState();
      const { retailerId } = state.role;

      const response = await deleteUser(retailerId, id);

      if(response.data.success) {
         dispatch(alertSuccess('Success'));
         getAdminUsers();
      } else {
         dispatch(alertError('Error'));
      }
   } catch (error) {
      dispatch(alertError('Error'));  
   }
};

export const putAdminUsers = (userId, data) => async (dispatch, getState) => {
   try {
      const state = getState();

      const { retailerId } = state.role;

      const response = await updateUser(retailerId, userId, data);

      if(response.data.success) {
         dispatch(alertSuccess('Success'));
         getAdminUsers();
      } else {
         dispatch(alertError('Error'));
      }
   } catch (error) {
      dispatch(alertError('Error'));
   }
};

let cancelUpdateUser;
const updateUser = (retailerId, id, data) => {
   if(cancelUpdateUser) cancelUpdateUser('Cancel delete user');
   
   return api.put(`/retailers/${retailerId}/users/${id}`, data,
   {
      cancelToken: new  api.CancelToken(function executor(c) {
         cancelUpdateUser = c;
      }),
   });
};

let cancelDeleteUser;
const deleteUser = (retailerId, id) => {
   if(cancelDeleteUser) cancelDeleteUser('Cancel delete user');
   
   return api.delete(`/retailers/${retailerId}/users/${id}`,
   {
      cancelToken: new  api.CancelToken(function executor(c) {
         cancelDeleteUser = c;
      }),
   });
};

let cancelUsers;
const users = (retailerId) => {
   if(cancelUsers) cancelUsers('Cancel get users');
   
   return api.get(`/retailers/${retailerId}/users`,
   {
      cancelToken: new  api.CancelToken(function executor(c) {
         cancelUsers = c;
      }),
   });
};