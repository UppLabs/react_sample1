import { 
    APPROVED_RETAILERS, 
    APPROVED_RETAILERS_OFFSET, 
    APPROVED_RETAILERS_ORDER, 
    APPROVED_RETAILERS_COUNT,
    APPROVED_RETAILERS_LOADING, 
} from '../constants/approvedRetailers';

const initialState = {
      data: [],
      offset: 0,
      order: 'asc',
      count: 0,
      perPage: 20,
      isLoading: false,
};

const approvedRetailers = (state = initialState, action) => {
    switch (action.type) {
        case APPROVED_RETAILERS: 
            return {
                ...state,
                data: action.payload,
            };
        case APPROVED_RETAILERS_OFFSET:
            return {
                ...state,
                offset: action.payload,
            };
        case APPROVED_RETAILERS_ORDER: 
            return {
                ...state,
                order: action.payload,
            };
        case APPROVED_RETAILERS_COUNT:
            return {
                ...state,
                count: +action.payload,
            };
        case APPROVED_RETAILERS_LOADING:
            return {
                ...state,
                isLoading: action.payload,
            };
        default:
            break;
    }

    return state;
};

export default approvedRetailers;