import { 
    REPLENISH_ORDERS_OFFSET, 
    REPLENISH_ORDERS_COUNT,
    REPLENISH_ORDERS_STATUS_COUNT,
    REPLENISH_ORDERS_FILTERS,
    REPLENISH_ORDERS_SEARCH,
    REPLENISH_ORDERS_FILTER_DATA,
    REPLENISH_ORDERS_REPORT,
    REPLENISH_ORDERS_REPORT_CLOSE,
    REPLENISH_ORDERS_LOADING,
    REPLENISH_ORDERS_SORT, 
} from '../constants/replenishOrdersTypes';

const initialState = {
      data: [],
      offset: 0,
      perPage: 5,
      search: '',
      count: 0,
      statusCount: 0,
      pendingCount: 0,
      completedCount: 0,
      canceledCount: 0,
      isReport: false,
      activeCount: 'ALL',
      field: 'created_at',
      sort: 'asc',
      isLoading: false,
};

const replenishOrders = (state = initialState, action) => {
    switch (action.type) {
        case REPLENISH_ORDERS_OFFSET:
            return {
                ...state,
                offset: action.payload,
            };
        case REPLENISH_ORDERS_COUNT:
            return {
                ...state,
                count: +action.payload.all,
            };
        case REPLENISH_ORDERS_STATUS_COUNT:
            return {
                ...state,
                statusCount: +action.payload,
            };
        case REPLENISH_ORDERS_FILTERS:
            return {
                ...state,
                completedCount: action.payload.completed,
                canceledCount: action.payload.canceled,
                pendingCount: action.payload.pending,
            };
        case REPLENISH_ORDERS_SEARCH: 
            return {
                ...state,
                search: action.payload,
            };
        case REPLENISH_ORDERS_FILTER_DATA:
            return {
                ...state,
                data: action.payload.data,
                activeCount: action.payload.title,
            };
        case REPLENISH_ORDERS_REPORT:
            return {
                ...state,
                isReport: true,
            };
        case REPLENISH_ORDERS_REPORT_CLOSE:
            return {
                ...state,
                isReport: false,
            };
        case REPLENISH_ORDERS_LOADING:
            return {
                ...state,
                isLoading: action.payload,
            };
        case REPLENISH_ORDERS_SORT: 
            return {
                ...state,
                sort: action.payload,
            };
        default:
            break;
    }

    return state;
};

export default replenishOrders;