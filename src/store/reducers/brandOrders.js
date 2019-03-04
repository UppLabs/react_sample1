import { 
    BRAND_ORDERS_OFFSET,
    BRAND_ORDERS_COUNT, 
    SET_BRAND_ORDER,
    BRAND_ORDERS_FILTERS,
    BRAND_ORDERS_REPORT,
    BRAND_ORDERS_REPORT_CLOSE,
    BRAND_ORDERS_FILTER_DATA,
    BRAND_ORDERS_LOADING,
    BRAND_ORDERS_SEARCH,
    SET_BRAND_ORDERS_SORT,
    SET_STATUS_COUNT,
} from '../constants/brandOrdersTypes';
import { retailers } from '../../constants/filters';

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
      order: {},
      isReport: false,
      activeCount: 'ALL',
      field: 'created_at',
      sort: 'asc',
      isLoading: false,
      retailers: retailers,
};

const brandOrders = (state = initialState, action) => {
    switch (action.type) {
        case BRAND_ORDERS_OFFSET:
            return {
                ...state,
                offset: action.payload,
            };
        case BRAND_ORDERS_COUNT:
            return {
                ...state,
                count: +action.payload.all,
            };
        case SET_STATUS_COUNT:
            return {
                ...state,
                statusCount: +action.payload,
            };
        case BRAND_ORDERS_FILTERS:
            return {
                ...state,
                completedCount: action.payload.orders_per_status.completed,
                canceledCount: action.payload.orders_per_status.canceled,
                pendingCount: action.payload.orders_per_status.pending,
                retailers: [
                    ...retailers,
                    ...action.payload.orders_per_retailer.map((item) => {
                        return {
                            label: item.retailer_name,
                            value: item.retailer_id,
                        };
                    }),
                ],
            };
        case BRAND_ORDERS_SEARCH: 
            return {
                ...state,
                search: action.payload,
            };
        case BRAND_ORDERS_FILTER_DATA:
            return {
                ...state,
                data: action.payload.data,
                activeCount: action.payload.title,
            };
        case SET_BRAND_ORDER:
            return {
                ...state,
                order: action.payload,
            };
        case BRAND_ORDERS_REPORT:
            return {
                ...state,
                isReport: true,
            };
        case BRAND_ORDERS_REPORT_CLOSE:
            return {
                ...state,
                isReport: false,
            };
        case BRAND_ORDERS_LOADING:
            return {
                ...state,
                isLoading: action.payload,
            };
        case SET_BRAND_ORDERS_SORT: 
            return {
                ...state,
                sort: action.payload,
            };
        default:
            break;
    }

    return state;
};

export default brandOrders;