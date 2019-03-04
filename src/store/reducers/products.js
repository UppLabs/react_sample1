import { 
    PRODUCTS, 
    PRODUCTS_OFFSET,
    PRODUCTS_COUNT,
    PRODUCTS_FILTERS,
    PRODUCTS_CURRENT_FILTER,
    PRODUCTS_RETAILERS,
    PRODUCTS_SEARCH,
    PRODUCTS_CHECK,
    PRODUCTS_UNCHECK,
    PRODUCTS_CHECK_ALL,
    PRODUCTS_UNCHECK_ALL,
    PRODUCTS_ORDER,
    PRODUCTS_ORDER_FIELD,
    PRODUCTS_CHECK_RETAILER,
    PRODUCTS_UNCHECK_RETAILER,
    PRODUCTS_ALL,
    PRODUCTS_CHECK_ALL_RETAILERS,
    PRODUCTS_UNCHECK_ALL_RETAILERS,
    PRODUCTS_PAGE,
    PRODUCTS_CHECK_ALL_ON_PAGE,
} from '../constants/productsTypes';

const initialState = {
    data: [],
    offset: 0,
    count: 0,
    filters: {},
    currentFilter: {},
    retailers: [],
    perPage: 50,
    search: '',
    checked: [],
    productsAll: [],
    field: 'title',
    order: 'asc',
    checkedRetailers: [],
    page: '',
};

const products = (state = initialState, action) => {
    switch (action.type) {
        case PRODUCTS: 
            return {
                ...state,
                data: action.payload,
            };
        case PRODUCTS_OFFSET:
            return {
                ...state,
                offset: action.payload,
            };
        case PRODUCTS_COUNT:
            return {
                ...state,
                count: +action.payload,
            };
        case PRODUCTS_FILTERS:
            return {
                ...state,
                filters: action.payload,
            };
        case PRODUCTS_CURRENT_FILTER:
            return {
                ...state,
                currentFilter: action.payload,
            };
        case PRODUCTS_RETAILERS: 
            return {
                ...state,
                retailers: action.payload,
            };
        case PRODUCTS_SEARCH: 
            return {
                ...state,
                search: action.payload,
            };
        case PRODUCTS_CHECK: 
            return {
                ...state,
                checked: [
                    ...state.checked,
                    action.payload,
                ],
            };
        case PRODUCTS_UNCHECK: 
            return {
                ...state,
                checked: state.checked.filter((item => item !== action.payload)),
            };
        case PRODUCTS_CHECK_ALL:
            return {
                ...state,
                checked: state.productsAll.map(x => x.model),
            };
        case PRODUCTS_CHECK_ALL_ON_PAGE:
            return {
                ...state,
                checked: [
                    ...state.checked,
                    ...action.payload.filter(x => !state.checked.includes(x)),
                ],
            };
        case PRODUCTS_UNCHECK_ALL:
            return {
                ...state,
                checked: [],  
            };
        case PRODUCTS_ORDER:
            return {
                ...state,
                order: action.payload,
            };
        case PRODUCTS_ORDER_FIELD:
            return {
                ...state,
                field: action.payload,
            };
        case PRODUCTS_CHECK_RETAILER:
            return {
                ...state,
                checkedRetailers: [
                    ...state.checkedRetailers,
                    action.payload,
                ],
            };
        case PRODUCTS_UNCHECK_RETAILER:
            return {
                ...state,
                checkedRetailers: state.checkedRetailers.filter((item => item !== action.payload)),
            };
        case PRODUCTS_ALL:
            return {
                ...state,
                productsAll: action.payload,
            };
        case PRODUCTS_CHECK_ALL_RETAILERS:
            return {
                ...state,
                checkedRetailers: action.payload,
            };
        case PRODUCTS_UNCHECK_ALL_RETAILERS:
            return {
                ...state,
                checkedRetailers: action.payload,
            };
        case PRODUCTS_PAGE:
            return {
                ...state,
                page: action.payload,
            };
        default:
            break;
    }

    return state;
};

export default products;