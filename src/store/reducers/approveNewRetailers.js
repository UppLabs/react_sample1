import { 
    APPROVE_NEW_RETAILERS, 
    APPROVE_NEW_RETAILERS_OFFSET, 
    APPROVE_NEW_RETAILERS_COUNT, 
    APPROVE_NEW_RETAILERS_ORDER, 
    APPROVE_NEW_RETAILERS_ORDER_FIELD,
    APPROVE_NEW_RETAILERS_LOADING, 
} from '../constants/approveNewRetailersTypes';

const initialState = {
      data: [],
      offset: 0,
      order: 'asc',
      count: 0,
      perPage: 10,
      field: 'retailer.name',
      isLoading: false,
};

const approveNewRetailers = (state = initialState, action) => {
    switch (action.type) {
        case APPROVE_NEW_RETAILERS: 
            return {
                ...state,
                data: action.payload,
            };
        case APPROVE_NEW_RETAILERS_OFFSET:
            return {
                ...state,
                offset: action.payload,
            };
        case APPROVE_NEW_RETAILERS_ORDER_FIELD:
            return {
                ...state,
                field: action.payload,
            };
        case APPROVE_NEW_RETAILERS_ORDER: 
            return {
                ...state,
                order: action.payload,
            };
        case APPROVE_NEW_RETAILERS_COUNT:
            return {
                ...state,
                count: +action.payload,
            };
        case APPROVE_NEW_RETAILERS_LOADING:
            return {
                ...state,
                isLoading: action.payload,
            };
        default:
            break;
    }

    return state;
};

export default approveNewRetailers;