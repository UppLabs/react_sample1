import { 
   CREATE_ACCOUNT,
   ERROR_MESSAGE,
} from '../constants/signUpTypes';

const initialState = {
    error: '',
};
 
const signup = (state = initialState, action) => {
    switch (action.type) {
        case ERROR_MESSAGE:
          return {
            ...state,
            error: action.payload,
          };
        case CREATE_ACCOUNT:
          return {
            ...state,
          };
        default:
            break;
    }
 
    return state;
 };

export default signup;