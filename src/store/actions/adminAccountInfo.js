import { 
   ADMIN_ACCOUNT_INFO, 
   ADMIN_ACCOUNT_INFO_LOADING, 
} from '../constants/adminAccountInfoTypes';
import { alertError, alertSuccess } from './alert';
import api from '../../utils/api';

const setAdminAccountInfo = data => ({ type: ADMIN_ACCOUNT_INFO, payload: data });
const setAdminAccountInfoLoading = value => ({ type: ADMIN_ACCOUNT_INFO_LOADING, payload: value });

export const getAdminAccountInfo = () => async (dispatch, getState) => {
   try {
      dispatch(setAdminAccountInfoLoading(true));
      const { retailerId } = getState().role;

      const response = await info(retailerId);
   
      dispatch(setAdminAccountInfo(response.data));
      dispatch(setAdminAccountInfoLoading(false));
   } catch (error) {
      dispatch(setAdminAccountInfoLoading(false));
      dispatch(alertError('Error'));
      console.log(error);
   }
};

export const postAdminAccountInfo = data => async (dispatch, getState) => {
   try {
      const state = getState();
      const { retailerId } = state.role;

      const response = await putInfo(retailerId, data);
      dispatch(alertSuccess('Success save'));
      dispatch(setAdminAccountInfo(response.data));
   } catch (error) {
      dispatch(alertError('Error'));
      console.log(error);
   }
};

let cancelInfo;
const info = (retailerId) => {
   if(cancelInfo) cancelInfo('Cancel admin suppliers');
   
   return api.get(`/retailers/${retailerId}`,
   {
      cancelToken: new  api.CancelToken(function executor(c) {
      cancelInfo = c;
      }),
   });
};

let cancelPutInfo; 
const putInfo = (retailerId, data) => {
   if(cancelPutInfo) cancelPutInfo('Cancel admin suppliers');
   
   return api.put(`/retailers/${retailerId}`, data, {
      cancelToken: new api.CancelToken(function executor(c) {
         cancelPutInfo = c;
      }),
   });
};


