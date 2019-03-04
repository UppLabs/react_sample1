import { 
   ALERT_SUCCESS, 
   ALERT_ERROR,
   ALERT_CLOSE, 
} from '../constants/alertTypes';

export const alertSuccess = message => ({ type: ALERT_SUCCESS, payload: message });
// export const alertError = (message) => { debugger; return ({ type: ALERT_ERROR, payload: message }); };
export const alertError = message => ({ type: ALERT_ERROR, payload: message });
export const alertClose = index => ({ type: ALERT_CLOSE, payload: index });