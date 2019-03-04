import { 
    DROPSHIP_ORDERS_OFFSET,
    DROPSHIP_ORDERS_COUNT,
    DROPSHIP_ORDERS_STATUS_COUNT,
    DROPSHIP_ORDERS_FILTERS,
    DROPSHIP_ORDERS_SEARCH,
    DROPSHIP_ORDERS_FILTER_DATA,
    DROPSHIP_ORDERS_REPORT,
    DROPSHIP_ORDERS_REPORT_CLOSE,
    DROPSHIP_ORDERS_LOADING,
    DROPSHIP_ORDERS_SORT,
} from '../constants/dropshipOrdersTypes';

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

const dropshipOrders = (state = initialState, action) => {
    switch (action.type) {
        case DROPSHIP_ORDERS_OFFSET:
            return {
                ...state,
                offset: action.payload,
            };
        case DROPSHIP_ORDERS_COUNT:
            return {
                ...state,
                count: +action.payload.all,
            };
        case DROPSHIP_ORDERS_STATUS_COUNT:
            return {
                ...state,
                statusCount: +action.payload,
            };
        case DROPSHIP_ORDERS_FILTERS:
            return {
                ...state,
                completedCount: action.payload.completed,
                canceledCount: action.payload.canceled,
                pendingCount: action.payload.pending,
            };
        case DROPSHIP_ORDERS_SEARCH: 
            return {
                ...state,
                search: action.payload,
            };
        case DROPSHIP_ORDERS_FILTER_DATA:
            return {
                ...state,
                data: action.payload.data,
                activeCount: action.payload.title,
            };
        case DROPSHIP_ORDERS_REPORT:
            return {
                ...state,
                isReport: true,
            };
        case DROPSHIP_ORDERS_REPORT_CLOSE:
            return {
                ...state,
                isReport: false,
            };
        case DROPSHIP_ORDERS_LOADING:
            return {
                ...state,
                isLoading: action.payload,
            };
        case DROPSHIP_ORDERS_SORT: 
            return {
                ...state,
                sort: action.payload,
            };
        default:
            break;
    }

    return state;
};

export default dropshipOrders;