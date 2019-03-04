import { ADMIN_USERS, ADMIN_USERS_LOADING } from '../constants/adminUsersTypes';


const initialState = {
     data: [],
     isLoading: false,
};

const adminUsers = (state = initialState, action) => {
    switch (action.type) {
        case ADMIN_USERS: 
            return {
                ...state,
                data: action.payload,
            };
         case ADMIN_USERS_LOADING:
            return {
               ...state,
               isLoading: action.payload,
            };
        default:
            break;
   }

   return state;
};

export default adminUsers;