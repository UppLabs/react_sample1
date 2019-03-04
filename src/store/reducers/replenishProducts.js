import uniq from 'lodash/uniq';
import { 
    REPLENISH_PRODUCTS, 
    REPLENISH_PRODUCTS_OFFSET, 
    REPLENISH_PRODUCTS_COUNT, 
    REPLENISH_PRODUCTS_FILTERS,
    REPLENISH_PRODUCTS_CURRENT_FILTER,
    REPLENISH_PRODUCTS_SEARCH,
    REPLENISH_PRODUCTS_CHECK,
    REPLENISH_PRODUCTS_UNCHECK,
    REPLENISH_PRODUCTS_CHECK_ALL,
    REPLENISH_PRODUCTS_UNCHECK_ALL,
    REPLENISH_PRODUCTS_ORDER_FIELD,
    REPLENISH_PRODUCTS_ORDER,
    REPLENISH_BUY_PRODUCT,
    RESET_MODAL_DATA,
    REPLENISH_PRODUCTS_LOADING,
    REPLENISH_PRODUCTS_SUPPLIER_ID,
    REPLENISH_PRODUCTS_BRANDS,
} from '../constants/replenishProducts';

const initialState = {
    data: [],
    modalProduct: {
        product: {},
    },
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
    isLoading: false,
    supplierId: 0,
    brands: [],
};

const replenishProducts = (state = initialState, action) => {
    switch (action.type) {
        case REPLENISH_PRODUCTS: 
            return {
                ...state,
                data: action.payload,
            };
        case REPLENISH_PRODUCTS_OFFSET:
            return {
                ...state,
                offset: action.payload,
            };
        case REPLENISH_BUY_PRODUCT:
            return {
                ...state,
                modalProduct: {
                    ...state.modalProduct,
                    product: action.payload,
                },
            };
        case REPLENISH_PRODUCTS_COUNT:
            return {
                ...state,
                count: +action.payload,
            };
        case REPLENISH_PRODUCTS_FILTERS:
            return {
                ...state,
                filters: action.payload,
            };
        case REPLENISH_PRODUCTS_CURRENT_FILTER:
            return {
                ...state,
                currentFilter: action.payload,
            };
        case REPLENISH_PRODUCTS_SEARCH: 
            return {
                ...state,
                search: action.payload,
            };
        case REPLENISH_PRODUCTS_CHECK: 
            return {
                ...state,
                checked: [
                    ...state.checked,
                    action.payload,
                ],
            };
        case RESET_MODAL_DATA:
            return {
                ...state,
                modalProduct: action.payload,
            };
        case REPLENISH_PRODUCTS_UNCHECK: 
            return {
                ...state,
                checked: state.checked.filter((item => item !== action.payload)),
            };
        case REPLENISH_PRODUCTS_CHECK_ALL:
            return {
                ...state,
                checked: uniq([...state.checked, ...action.payload]),
            };
        case REPLENISH_PRODUCTS_UNCHECK_ALL:
            return {
                ...state,
                checked: [],
            };  
        case REPLENISH_PRODUCTS_ORDER_FIELD:
            return {
                ...state,
                field: action.payload,
            };
        case REPLENISH_PRODUCTS_ORDER: 
            return {
                ...state,
                order: action.payload,
            };
        case REPLENISH_PRODUCTS_LOADING:
            return {
                ...state,
                isLoading: action.payload,
            };
        case REPLENISH_PRODUCTS_SUPPLIER_ID:
            return {
                ...state,
                supplierId: action.payload,
            };
        case REPLENISH_PRODUCTS_BRANDS: 
            return {
                ...state,
                brands: action.payload.map((item) => {
                    return {
                        value: item.supplier.id,
                        label: item.supplier.small_logo_path,
                    };
                }),
                supplierId: action.payload.length > 0 ? action.payload[0].supplier.id : 0,
            };
    }

    return state;
};

export default replenishProducts;