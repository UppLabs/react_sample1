import { 
  AUTHENTICATED, 
  REQUEST_AUTHENTICATED, 
  AUTHENTICATED_ERROR, 
  UNAUTHENTICATED, 
} from '../constants/authTypes';

const initialState = {
  auth: false,
  loading: false,
  isError: false,
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_AUTHENTICATED: 
      return {
        ...state,
        auth: false,
        loading: true,
      };
    case AUTHENTICATED:
      return {
        ...state,
        auth: true,
        loading: false,
        isError: action.payload,
      };
    case UNAUTHENTICATED: 
      return {
        ...state,
        auth: false,
        loading: false,
      };
    case AUTHENTICATED_ERROR:
      return {
        ...state,
        auth: true,
        loading: false,
        isError: action.payload,
      };
    default:
      break;
  }
  return state;
};

export default auth;
