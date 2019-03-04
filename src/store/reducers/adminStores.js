import { 
   ADMIN_STORES, ADMIN_STORES_LOADING, ADMIN_STORES_USERS, 
} from '../constants/adminStoresTypes';

const initialState = {
     data: [],
     isLoading: false,
     users: [],
};

const adminStores = (state = initialState, action) => {
    switch (action.type) {
        case ADMIN_STORES: 
            return {
                ...state,
                data: action.payload,
            };
        case ADMIN_STORES_LOADING:
            return {
                ...state,
                isLoading: action.payload,
            };
        case ADMIN_STORES_USERS:
            return {
                ...state,
                users: action.payload,
            };
        default:
            break;
   }

   return state;
};

export default adminStores;