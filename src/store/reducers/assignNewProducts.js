import { 
    ASSIGN_NEW_PRODUCTS, 
    ASSIGN_NEW_PRODUCTS_OFFSET, 
    ASSIGN_NEW_PRODUCTS_ORDER, 
    ASSIGN_NEW_PRODUCTS_COUNT, 
    ASSIGN_NEW_PRODUCTS_FILTERS,
    ASSIGN_NEW_PRODUCTS_CURRENT_FILTER,
    ASSIGN_NEW_PRODUCTS_RETAILERS,
    ASSIGN_NEW_PRODUCTS_SEARCH,
    SEARCH_RETAILERS,
    ASSIGN_NEW_PRODUCTS_ORDER_FIELD,
    ASSIGN_NEW_PRODUCTS_CHECK,
    ASSIGN_NEW_PRODUCTS_UNCHECK,
    ASSIGN_NEW_PRODUCTS_CHECK_ALL,
    ASSIGN_NEW_PRODUCTS_UNCHECK_ALL,
    ASSIGN_NEW_PRODUCTS_CHECK_RETAILER,
    ASSIGN_NEW_PRODUCTS_UNCHECK_RETAILER,
    ASSIGN_NEW_PRODUCTS_ALL,
    ASSIGN_NEW_PRODUCTS_CHECK_ALL_RETAILERS,
    ASSIGN_NEW_PRODUCTS_UNCHECK_ALL_RETAILERS,
    ASSIGN_NEW_PRODUCTS_LOADING,
    ASSIGN_NEW_PRODUCTS_CHECK_ALL_ON_PAGE, 
} from '../constants/assignNewProductsTypes';

const initialState = {
      data: [],
      offset: 0,
      order: 'asc',
      count: 0,
      perPage: 20,
      filters: {},
      currentFilter: {},
      retailers: [],
      search: '',
      search_retailers: '',
      field: 'title',
      checked: [],
      checkedRetailers: [],
      productsAll: [],
      isLoading: false,
};

const assignNewProducts = (state = initialState, action) => {
    switch (action.type) {
        case ASSIGN_NEW_PRODUCTS: 
            return {
                ...state,
                data: action.payload,
            };
        case ASSIGN_NEW_PRODUCTS_OFFSET:
            return {
                ...state,
                offset: action.payload,
            };
        case ASSIGN_NEW_PRODUCTS_ORDER_FIELD:
            return {
                ...state,
                field: action.payload,
            };
        case ASSIGN_NEW_PRODUCTS_ORDER: 
            return {
                ...state,
                order: action.payload,
            };
        case ASSIGN_NEW_PRODUCTS_COUNT:
            return {
                ...state,
                count: +action.payload,
            };
        case ASSIGN_NEW_PRODUCTS_FILTERS:
            return {
                ...state,
                filters: action.payload,
            };
        case ASSIGN_NEW_PRODUCTS_CURRENT_FILTER:
            return {
                ...state,
                currentFilter: action.payload,
            };
        case ASSIGN_NEW_PRODUCTS_RETAILERS: 
            return {
                ...state,
                retailers: action.payload,
            };
        case SEARCH_RETAILERS: 
            return {
                ...state,
                search_retailers: action.payload,
            };
        case ASSIGN_NEW_PRODUCTS_SEARCH: 
            return {
                ...state,
                search: action.payload,
            };
        case ASSIGN_NEW_PRODUCTS_CHECK: 
            return {
                ...state,
                checked: [
                    ...state.checked,
                    action.payload,
                ],
            };
        case ASSIGN_NEW_PRODUCTS_UNCHECK: 
            return {
                ...state,
                checked: state.checked.filter((item => item !== action.payload)),
            };
        case ASSIGN_NEW_PRODUCTS_CHECK_ALL:
            return {
                ...state,
                checked: state.productsAll.map(x => x.model),
            };
        case ASSIGN_NEW_PRODUCTS_CHECK_ALL_ON_PAGE:
            return {
                ...state,
                checked: [
                    ...state.checked,
                    ...action.payload.filter(x => !state.checked.includes(x)),
                ],
            };
        case ASSIGN_NEW_PRODUCTS_UNCHECK_ALL:
            return {
                ...state,
                checked: [],  
            };
        case ASSIGN_NEW_PRODUCTS_CHECK_RETAILER: 
            return {
                ...state,
                checkedRetailers: [
                    ...state.checkedRetailers,
                    action.payload,
                ],
            };
        case ASSIGN_NEW_PRODUCTS_UNCHECK_RETAILER: 
            return {
                ...state,
                checkedRetailers: state.checkedRetailers.filter((item => item !== action.payload)),
            };
        case ASSIGN_NEW_PRODUCTS_ALL:
            return {
                ...state,
                productsAll: action.payload,
            };
        case ASSIGN_NEW_PRODUCTS_CHECK_ALL_RETAILERS:
            return {
                ...state,
                checkedRetailers: action.payload,
            };
        case ASSIGN_NEW_PRODUCTS_UNCHECK_ALL_RETAILERS:
            return {
                ...state,
                checkedRetailers: action.payload,
            };
        case ASSIGN_NEW_PRODUCTS_LOADING:
            return {
                ...state,
                isLoading: action.payload,
            };
        default:
            break;
    }

    return state;
};

export default assignNewProducts;