import { 
   ADMIN_BRANDS_SUPPLIERS, 
   ADMIN_BRANDS_INVITATIONS,
   ADMIN_BRANDS_LOADING, 
} from '../constants/adminBrandsTypes';

const initialState = {
     data: [],
     isLoading: false,
};

const acceptedInvitationRetailers = (state = initialState, action) => {
   switch (action.type) {
       case ADMIN_BRANDS_SUPPLIERS: 
           return {
               ...state,
               data: action.payload,
           };
      case ADMIN_BRANDS_INVITATIONS:
           return {
              ...state,
              data: action.payload,
           };
      case ADMIN_BRANDS_LOADING:
           return {
              ...state,
               isLoading: action.payload,
           };
       default:
           break;
   }

   return state;
};

export default acceptedInvitationRetailers;