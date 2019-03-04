import api from '../../utils/api';
import { 
   ADMIN_STORES, 
   ADMIN_STORES_LOADING,
   ADMIN_STORES_USERS, 
} from '../constants/adminStoresTypes';
import { alertError, alertSuccess } from './alert';

const setAdminStores = data => ({ type: ADMIN_STORES, payload: data });
const setAdminStoresLoading = value => ({ type: ADMIN_STORES_LOADING, payload: value });
const setAdminStoresUsers = value => ({ type: ADMIN_STORES_USERS, payload: value });

export const getAdminStores = () => async (dispatch, getState) => {
   try {
      dispatch(setAdminStoresLoading(true));
      const state = getState();
      const { retailerId } = state.role;

      const response = await stores(retailerId);
      dispatch(setAdminStores(response.data));
      dispatch(setAdminStoresLoading(false));
   } catch (error) {
      console.log(error);
      dispatch(alertError('Error'));
      dispatch(setAdminStoresLoading(false));
   }
};

export const getAdminUserStores = () => async (dispatch, getState) => {
   try {
      const state = getState();
      const { retailerId } = state.role;

      const response = await userStores(retailerId);
      dispatch(setAdminStoresUsers(response.data));
   } catch (error) {
      console.log(error);
      dispatch(alertError('Error'));
   }
};

export const postAdminUserStores = (storeId, data) => async (dispatch, getState) => {
   try {
      const state = getState();
      const { retailerId } = state.role;

      const response = await postUserStores(retailerId, storeId, data);

      if(response.data.id) {
         dispatch(alertSuccess('Success'));
      } else {
         dispatch(alertError('Error'));
      }
      dispatch(setAdminStoresUsers([]));
      dispatch(getAdminStores());
   } catch (error) {
      console.log(error);
      dispatch(alertError('Error'));
   }
};

export const deleteAdminUserStores = (storeId, userId) => async (dispatch, getState) => {
   try {
      const state = getState();
      const { retailerId } = state.role;

      const response = await deleteUserStores(retailerId, storeId, userId);

      if(response.data.success) {
         dispatch(alertSuccess('Success'));
      } else {
         dispatch(alertError('Error'));
      }
      dispatch(setAdminStoresUsers([]));
      dispatch(getAdminStores());
   } catch (error) {
      console.log(error);
      dispatch(alertError('Error'));
   }
};



let cancelStores;
const stores = (retailerId) => {
   if(cancelStores) cancelStores('Cancel stores');
   
   return api.get(`/retailers/${retailerId}/stores`,
   {
      cancelToken: new  api.CancelToken(function executor(c) {
         cancelStores = c;
      }),
   });
};


let cancelUserStores;
const userStores = (retailerId) => {
   if(cancelUserStores) cancelUserStores('Cancel user stores');
   
   return api.get(`/retailers/${retailerId}/users`,
   {
      cancelToken: new  api.CancelToken(function executor(c) {
         cancelStores = c;
      }),
   });
};

let cancelPostUserStores;
const postUserStores = (retailerId, storeId, data) => {
   if(cancelPostUserStores) cancelPostUserStores('Cancel post user stores');
   
   return api.post(`/retailers/${retailerId}/stores/${storeId}/users`, data,
   {
      cancelToken: new  api.CancelToken(function executor(c) {
         cancelPostUserStores = c;
      }),
   });
};

let cancelDeleteUserStores;
const deleteUserStores = (retailerId, storeId, userId) => {
   if(cancelDeleteUserStores) cancelDeleteUserStores('Cancel delete user stores');
   
   return api.delete(`/retailers/${retailerId}/stores/${storeId}/users/${userId}`,
   {
      cancelToken: new  api.CancelToken(function executor(c) {
         cancelDeleteUserStores = c;
      }),
   });
};
