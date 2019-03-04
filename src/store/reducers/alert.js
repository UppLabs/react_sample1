import { 
   ALERT_SUCCESS, 
   ALERT_ERROR, 
   ALERT_CLOSE, 
} from '../constants/alertTypes';

const initialState = [];
 
const notify = (state = initialState, action) => {
    switch (action.type) {
        case ALERT_SUCCESS: 
            return [
                ...state,
                {
                    id: +new Date(),
                    success: true,
                    text: action.payload,
                },
            ];
        case ALERT_ERROR: 
            return [
                ...state,
                {
                    id: +new Date(),
                    error: true,
                    text: action.payload,
                },
            ];
        case ALERT_CLOSE: 
            return state.filter(x=>x.id !== action.payload);
        default:
            break;
    }
 
    return state;
 };

export default notify;