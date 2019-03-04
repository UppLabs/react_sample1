import { 
    STATS_TOTALS, 
    STATS_BRANDS, 
    STATS_REPLENISH, 
    STATS_BRANDS_LOADING, 
} from '../constants/statsTypes';

const initialState = {
    brands: [],
    replenish: [],
    totalIncome: 0,
    totalItems: 0,
    totalOrders: 0,
    isLoading: false,
};

const stats = (state = initialState, action) => {
  switch (action.type) {
    case STATS_BRANDS:
        return {
        ...state,
        brands: action.payload,
    };
    case STATS_REPLENISH:
        return {
        ...state,
        replenish: action.payload,
    };
    case STATS_TOTALS:
        return {
        ...state,
        totalIncome: action.payload.totalIncome,
        totalItems: action.payload.totalItems,
        totalOrders: action.payload.totalOrders,
    };
    case STATS_BRANDS_LOADING:
        return {
            ...state,
            isLoading: action.payload,
        };
    default:
      break;
  }
  return state;
};

export default stats;
