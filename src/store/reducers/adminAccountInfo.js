import { 
   ADMIN_ACCOUNT_INFO_LOADING, 
   ADMIN_ACCOUNT_INFO, 
} from '../constants/adminAccountInfoTypes';

const initialState = {
     data: {
      admin_contact: {},
      billing_contact: {},
     },
     isLoading: false,
};

const adminAccountInfo = (state = initialState, action) => {
   switch (action.type) {
       case ADMIN_ACCOUNT_INFO: 
           return {
               ...state,
               data: action.payload,
           };
      case ADMIN_ACCOUNT_INFO_LOADING:
           return {
              ...state,
              isLoading: action.payload,
           };
       default:
           break;
   }

   return state;
};

export default adminAccountInfo;