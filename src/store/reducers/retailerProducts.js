import uniq from 'lodash/uniq';

import { 
    RETAILER_PRODUCTS, 
    RETAILER_PRODUCTS_FILTERS, 
    RETAILER_PRODUCTS_CURRENT_FILTER,
    RETAILER_PRODUCTS_SEARCH,
    RETAILER_PRODUCTS_OFFSET,
    RETAILER_PRODUCTS_COUNT,
    RETAILER_PRODUCTS_CHECK,
    RETAILER_PRODUCTS_UNCHECK,
    RETAILER_PRODUCTS_CHECK_ALL,
    RETAILER_PRODUCTS_UNCHECK_ALL,
    RETAILER_PRODUCTS_APPROVE,
    RETAILER_PRODUCTS_UNAPPROVE,
    RETAILER_PRODUCTS_DETAILS,
    RETAILER_PRODUCTS_LOADING,
    RETAILER_PRODUCTS_CHECK_ALL_ON_PAGE,
    RETAILER_PRODUCTS_ALL,
    RETAILER_PRODUCTS_APPROVED,
    RETAILER_PRODUCTS_MODAL_OPEN,
    RETAILER_PRODUCTS_MODAL_CLOSE,
    RETAILER_PRODUCTS_PRODUCT, 
} from '../constants/retailerProductsTypes';

const initialState = {
   data: [],
   offset: 0,
   order: 'asc',
   count: 0,
   perPage: 20,
   filters: {},
   currentFilter: {},
   search: '',
   field: 'title',
   checked: [],
   variants: [],
   approved: [],
   unapproved: [],
   productDetails: {},
   isLoading: false,
   productsAll: [],
   modal: false,
   product: {},
};

const retailerProducts = (state = initialState, action) => {
   switch (action.type) {
       case RETAILER_PRODUCTS: 
           return {
               ...state,
               data: action.payload,
           };
        case RETAILER_PRODUCTS_OFFSET:
            return {
                ...state,
                offset: action.payload,
            };
       case RETAILER_PRODUCTS_COUNT:
           return {
               ...state,
               count: +action.payload,
           };
        case RETAILER_PRODUCTS_FILTERS:
            return {
                ...state,
                filters: action.payload,
            };
         case RETAILER_PRODUCTS_CURRENT_FILTER:
            return {
                ...state,
                currentFilter: action.payload,
            };
        case RETAILER_PRODUCTS_SEARCH: 
            return {
                ...state,
                search: action.payload,
            };
        case RETAILER_PRODUCTS_CHECK: 
            return {
                ...state,
                checked: [
                    ...state.checked,
                    action.payload,
                ],
            };
        case RETAILER_PRODUCTS_UNCHECK: 
            return {
                ...state,
                checked: state.checked.filter((item => item !== action.payload)),
            };
        case RETAILER_PRODUCTS_CHECK_ALL:
            return {
                ...state,
                checked: state.productsAll.map(x => x.model),
            };
        case RETAILER_PRODUCTS_CHECK_ALL_ON_PAGE:
            return {
                ...state,
                checked: [
                    ...state.checked, 
                    ...action.payload.filter(x => !state.checked.includes(x)),
                ],
            };
        case RETAILER_PRODUCTS_UNCHECK_ALL:
            return {
                ...state,
                checked: [],
            };
        case RETAILER_PRODUCTS_APPROVE:
            return {
                ...state,
                approved: uniq([...state.approved, ...action.payload]),
                unapproved: state.unapproved.filter(x => !action.payload.includes(x)),
            };
        case RETAILER_PRODUCTS_UNAPPROVE:
            return {
                ...state,
                approved: state.approved.filter(x => !action.payload.includes(x)),
                unapproved: uniq([...state.unapproved, ...action.payload]),
            };
        case RETAILER_PRODUCTS_DETAILS:
            return {
                ...state,
                productDetails: action.payload,
            };
        case RETAILER_PRODUCTS_LOADING:
            return {
                ...state,
                isLoading: action.payload,
            };
        case RETAILER_PRODUCTS_ALL:
            return {
                ...state,
                productsAll: action.payload,
            };
        case RETAILER_PRODUCTS_APPROVED:
            return {
                ...state,
                approved: action.payload,
                unapproved: [],
            };
        case RETAILER_PRODUCTS_MODAL_OPEN:
            return {
                ...state,
                modal: true,
            };
        case RETAILER_PRODUCTS_MODAL_CLOSE:
            return {
                ...state,
                modal: false,
            };
        case RETAILER_PRODUCTS_PRODUCT:
            return {
                ...state,
                product: action.payload,
            };
        default:
            break;
   }

   return state;
};

export default retailerProducts;