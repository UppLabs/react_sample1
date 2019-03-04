import api from '../../utils/api';
import { alertError, alertSuccess } from './alert';

let cancelPostNewRetailer;
export const postNewRetailer = data => async (dispatch, getState) => {
   if(cancelPostNewRetailer) cancelPostNewRetailer();

   try {
      console.log(data);
      const response = await api.post('/retailers', data, {
         cancelToken: new api.CancelToken(function executor(c) {
            cancelPostNewRetailer = c;
         }),
      });
      console.log(response);

      dispatch(alertSuccess('Success'));
   } catch (error) {
      dispatch(alertError('Error'));
   }

};


