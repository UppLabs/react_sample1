import { 
    DROPSHIP_PRODUCTS, 
    DROPSHIP_PRODUCTS_OFFSET, 
    DROPSHIP_PRODUCTS_COUNT, 
    DROPSHIP_PRODUCTS_FILTERS, 
    DROPSHIP_PRODUCTS_CURRENT_FILTER,
    DROPSHIP_PRODUCTS_SEARCH,
    DROPSHIP_PRODUCTS_CHECK,
    DROPSHIP_PRODUCTS_UNCHECK,
    DROPSHIP_PRODUCTS_CHECK_ALL,
    DROPSHIP_PRODUCTS_UNCHECK_ALL,
    DROPSHIP_PRODUCTS_ORDER,
    DROPSHIP_PRODUCTS_ORDER_FIELD,
    DROPSHIP_PRODUCTS_LOADING,
    DROPSHIP_PRODUCTS_SUPPLIER_ID,
    DROPSHIP_PRODUCTS_BRANDS,
    DROPSHIP_PRODUCTS_CHECK_ALL_ON_PAGE,
    DROPSHIP_PRODUCTS_ALL,
    DROPSHIP_PRODUCTS_PRODUCT,
    DROPSHIP_PRODUCTS_PRODUCT_LOADING, 
} from '../constants/dropshipProductsTypes';

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
    isLoading: false,
    supplierId: 0,
    brands: [],
    productsAll: [],
    product: {
        variants: [],
        description_extra: '',
        images: [],
    },
    productIsLoading: false,
};

const dropshipProducts = (state = initialState, action) => {
    switch (action.type) {
        case DROPSHIP_PRODUCTS: 
            return {
                ...state,
                data: action.payload,
            };
        case DROPSHIP_PRODUCTS_ALL:
            return {
                ...state,
                productsAll: action.payload,
            };
        case DROPSHIP_PRODUCTS_OFFSET:
            return {
                ...state,
                offset: action.payload,
            };
        case DROPSHIP_PRODUCTS_COUNT:
            return {
                ...state,
                count: +action.payload,
            };
        case DROPSHIP_PRODUCTS_FILTERS:
            return {
                ...state,
                filters: action.payload,
            };
        case DROPSHIP_PRODUCTS_CURRENT_FILTER:
            return {
                ...state,
                currentFilter: action.payload,
            };
        case DROPSHIP_PRODUCTS_SEARCH: 
            return {
                ...state,
                search: action.payload,
            };
        case DROPSHIP_PRODUCTS_CHECK: 
            return {
                ...state,
                checked: [
                    ...state.checked,
                    action.payload,
                ],
            };
        case DROPSHIP_PRODUCTS_UNCHECK: 
            return {
                ...state,
                checked: state.checked.filter((item => item !== action.payload)),
            };
        case DROPSHIP_PRODUCTS_ORDER_FIELD:
            return {
                ...state,
                field: action.payload,
            };
        case DROPSHIP_PRODUCTS_ORDER: 
            return {
                ...state,
                order: action.payload,
            };
        case DROPSHIP_PRODUCTS_LOADING:
            return {
                ...state,
                isLoading: action.payload,
            };
        case DROPSHIP_PRODUCTS_SUPPLIER_ID:
            return {
                ...state,
                supplierId: action.payload,
            };
        case DROPSHIP_PRODUCTS_BRANDS: 
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
        case DROPSHIP_PRODUCTS_CHECK_ALL:
            return {
                ...state,
                checked: state.productsAll.map(x => x.model),
            };
        case DROPSHIP_PRODUCTS_CHECK_ALL_ON_PAGE:
            return {
                ...state,
                checked: [
                    ...state.checked,
                    ...action.payload.filter(x => !state.checked.includes(x)),
                ],
            };
        case DROPSHIP_PRODUCTS_UNCHECK_ALL:
            return {
                ...state,
                checked: [],  
            };
        case DROPSHIP_PRODUCTS_PRODUCT:
            return {
                ...state,
                product: action.payload,
            };
        case DROPSHIP_PRODUCTS_PRODUCT_LOADING:
            return {
                ...state,
                productIsLoading: action.payload,
            };
        default:
            break;
    }

    return state;
};

export default dropshipProducts;