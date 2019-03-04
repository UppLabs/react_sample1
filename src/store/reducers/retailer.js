import { 
    CURRENT_RETAILER, 
    CURRENT_RETAILER_LOADING,
} from '../constants/retailerTypes';

const initialState = {
    current: {
        retailer: {},
    },
    retailerFilters: {},
    retailerProducts: [],
    isLoading: false,
};

const retailer = (state = initialState, action) => {
  switch (action.type) {
    case CURRENT_RETAILER:
        return {
            ...state,
            current: action.payload,
        };
    case CURRENT_RETAILER_LOADING:
        return {
            ...state,
            isLoading: action.payload,
        };
    default:
      break;
  }
  return state;
};

export default retailer;
