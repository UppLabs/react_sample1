import { 
    ASSIGN_NEW_PRODUCTS, 
    ASSIGN_NEW_PRODUCTS_COUNT, 
    ASSIGN_NEW_PRODUCTS_OFFSET, 
    ASSIGN_NEW_PRODUCTS_ORDER, 
    ASSIGN_NEW_PRODUCTS_FILTERS,
    ASSIGN_NEW_PRODUCTS_CURRENT_FILTER,
    ASSIGN_NEW_PRODUCTS_RETAILERS,
    ASSIGN_NEW_PRODUCTS_SEARCH,
    ASSIGN_NEW_PRODUCTS_ORDER_FIELD,
    ASSIGN_NEW_PRODUCTS_CHECK,
    ASSIGN_NEW_PRODUCTS_UNCHECK,
    ASSIGN_NEW_PRODUCTS_CHECK_ALL,
    ASSIGN_NEW_PRODUCTS_UNCHECK_ALL,
    SEARCH_RETAILERS,
    ASSIGN_NEW_PRODUCTS_CHECK_RETAILER,
    ASSIGN_NEW_PRODUCTS_UNCHECK_RETAILER,
    ASSIGN_NEW_PRODUCTS_ALL,
    ASSIGN_NEW_PRODUCTS_CHECK_ALL_RETAILERS,
    ASSIGN_NEW_PRODUCTS_UNCHECK_ALL_RETAILERS,
    ASSIGN_NEW_PRODUCTS_LOADING,
    ASSIGN_NEW_PRODUCTS_CHECK_ALL_ON_PAGE,
} from '../constants/assignNewProductsTypes';
import api from '../../utils/api';
import { postPermissions } from './permissions';
import { alertError, alertSuccess } from './alert';

const setAssignNewProductsLoading = value => ({ type: ASSIGN_NEW_PRODUCTS_LOADING, payload: value });
const setAssignNewProducts = data => ({ type: ASSIGN_NEW_PRODUCTS, payload: data });
const setAssignNewProductsAll = data => ({ type: ASSIGN_NEW_PRODUCTS_ALL, payload: data });
const setAssignNewProductsCount = count => ({ type: ASSIGN_NEW_PRODUCTS_COUNT, payload: count });
const setAssignNewProductsFilters = filters => ({ type: ASSIGN_NEW_PRODUCTS_FILTERS, payload: filters });

export const assignNewProductsCheckAllOnPage = ids => ({ type: ASSIGN_NEW_PRODUCTS_CHECK_ALL_ON_PAGE, payload: ids });

export const assignNewProductsCheckAll = () => async (dispatch, getState) => {
    const { currentFilter, search  } = getState().assignNewProducts;
    const { supplierId } = getState().role;

    const filter = JSON.stringify({ 
        'available_inventory': { '$gt': 0 }, 
        'retailers_count': 0,
    });
    const properties_filter = JSON.stringify(currentFilter);

    try {
        const responseAll = await productsAll(supplierId, filter, properties_filter, search);
        dispatch(setAssignNewProductsAll(responseAll.data));
        dispatch({ type: ASSIGN_NEW_PRODUCTS_CHECK_ALL });
    } catch (error) {
        console.log(error);
    }
};
export const assignNewProductsUncheckAll = { type: ASSIGN_NEW_PRODUCTS_UNCHECK_ALL };

export const retailerSearch = search => (dispatch) => {
    dispatch({ type: SEARCH_RETAILERS, payload: search });
    dispatch(getAssignNewProductsRetailers());
};

export const assignNewProductsSubmit = value => async (dispatch, getState) => {
    if(value) {
        const state = getState();
        const { 
            checked, checkedRetailers, 
            data: products, retailers, 
        } = state.assignNewProducts;
        const { supplierId } = state.role;

        let variants = [];
        for(let product of products) {
            if(checked.includes(product.model)) {
                for(let j of product.variants) {
                    variants.push(+j);
                }
            }
        }

        let retailerIds = [];
        for(let retailer of retailers) {
            if(checkedRetailers.includes(retailer.retailer.name)) {
                retailerIds.push(+retailer.retailer_id);
            }
        }

        let data = {
            'retailer_ids': retailerIds,
            'variant_ids': variants,
            'ecommerce_approved_by_supplier': value.dropship,
            'replenish_approved': value.replenishment,
        };

        try {
            const response = await postPermissions(supplierId, data);

            if(response.data.success) {
                dispatch(alertSuccess('Permissions Granted'));
                dispatch(getAssignNewProducts());
                dispatch(assignNewProductsUncheckAll);
            }
        } catch (error) {
            dispatch(alertError('Error'));
        }
    }
};

export const assignNewProductsCheck = id => async (dispatch) => {
    dispatch({ type: ASSIGN_NEW_PRODUCTS_CHECK, payload: id });
};

export const assignNewProductsUncheck = id => async (dispatch) => {
    dispatch({ type: ASSIGN_NEW_PRODUCTS_UNCHECK, payload: id });
};

export const assignNewProductsCheckRetailer = id => async (dispatch) => {
    dispatch({ type: ASSIGN_NEW_PRODUCTS_CHECK_RETAILER, payload: id });
};

export const assignNewProductsUncheckRetailer = id => async (dispatch) => {
    dispatch({ type: ASSIGN_NEW_PRODUCTS_UNCHECK_RETAILER, payload: id });
};

export const assignNewProductsCheckAllRetailers = () => async (dispatch, getState) => {
    const { retailers } = getState().assignNewProducts;

    let checked = [];
    for(let i of retailers) {
        checked.push(i.retailer.name);
    }

    dispatch({ type: ASSIGN_NEW_PRODUCTS_CHECK_ALL_RETAILERS, payload: checked });
};

export const assignNewProductsUncheckAllRetailers = () => async (dispatch) => {
    dispatch({ type: ASSIGN_NEW_PRODUCTS_UNCHECK_ALL_RETAILERS, payload: [] });
};

export const getAssignNewProducts = () => async (dispatch, getState) => {
    const { perPage, offset, order, count, currentFilter, search, field  } = getState().assignNewProducts;
    const { supplierId } = getState().role;

    let currentDate = new Date();

    const filter = JSON.stringify({ 
        'available_inventory': { '$gt': 0 }, 
        'retailers_count': 0,
        'created_at': { '$gt': new Date(currentDate.setDate(currentDate.getDate() - 30)) },  
    });
    const properties_filter = JSON.stringify(currentFilter);

    try {
        dispatch(setAssignNewProductsLoading(true));
        const response = await products(supplierId, filter, properties_filter, perPage, offset, order, search, field);
        // const responseAll = await productsAll(supplierId, filter, properties_filter, search);

        const newCount = response.headers['x-total-count'];
        if(count != newCount) {
            dispatch(setAssignNewProductsCount(newCount));
        }
        dispatch(setAssignNewProducts(response.data));
        // dispatch(setAssignNewProductsAll(responseAll.data));
        dispatch(setAssignNewProductsLoading(false));
    } catch (error) {
        console.log(error);
    }
};

export const setAssignNewProductsSearch = search => (dispatch) => {
    dispatch({ type: ASSIGN_NEW_PRODUCTS_SEARCH, payload: search });
    dispatch(getAssignNewProducts());
};

export const setAssignNewProductsOrderField = orderField => (dispatch, getState) => {
    const { field } = getState().assignNewProducts;

    if(field != orderField) {
        dispatch({ type: ASSIGN_NEW_PRODUCTS_ORDER_FIELD, payload: orderField });
    }

    dispatch(getAssignNewProducts());
};

export const setAssignNewProductsOrder = order => (dispatch) => {
    dispatch({ type: ASSIGN_NEW_PRODUCTS_ORDER, payload: order });
    dispatch(getAssignNewProducts());
};

export const setAssignNewProductsOffset = offset => (dispatch) => {
    dispatch({ type: ASSIGN_NEW_PRODUCTS_OFFSET, payload: offset });
    dispatch(getAssignNewProducts());
};

export const getAssignNewProductsFilters = () => (dispatch, getState) => {
    const { filters } = getState().assignNewProducts;
    const { supplierId } = getState().role;

    if(Object.keys(filters).length !== 0) return;


    let currentDate = new Date();

    const filter = JSON.stringify({ 
        'created_at': { '$gt': new Date(currentDate.setDate(currentDate.getDate() - 30)) },  
    });

    api.get(`/suppliers/${supplierId}/product-filters?filter=${filter}`).then((response) => {
        dispatch(setAssignNewProductsFilters(response.data));
    });
};

export const setAssignNewProductsCurrentFilter = filter => (dispatch) => {
    dispatch({ type: ASSIGN_NEW_PRODUCTS_CURRENT_FILTER, payload: filter });
    dispatch(setAssignNewProductsOffset(0));
};

export const getAssignNewProductsRetailers = () => async (dispatch, getState) => {
    try {
        const { supplierId } = getState().role;
        const { search_retailers } = getState().assignNewProducts;

        const filter = '';
        JSON.stringify({ '$or':[ 
            { 'approved_for_ecommerce': true }, 
            { 'approved_for_replenishment': true }], 
        });
        const response = await retailers(supplierId, filter, search_retailers);
        
        dispatch({ type: ASSIGN_NEW_PRODUCTS_RETAILERS, payload: response.data });
    } catch (error) {
        console.log(error);
    }
};

let cancelProducts;
const products = (supplierId, filter, properties_filter, limit, offset, order, search, field) => {
    if(cancelProducts) cancelProducts('Cancel products');

    return api.get(`/suppliers/${supplierId}/products` +
        `?filter=${filter}&properties_filter=${properties_filter}` +
        `&limit=${limit}&offset=${offset}&order=${order}&sort=${field}` +
        `&q=${search}`,
    {
        cancelToken: new api.CancelToken(function executor(c) {
            cancelProducts = c;
        }),
    });
};

let cancelProductsAll;
const productsAll = (supplierId, filter, properties_filter, search) => {
    if(cancelProductsAll) cancelProductsAll('Cancel products all');

    return api.get(`/suppliers/${supplierId}/products-all` +
        `?filter=${filter}&properties_filter=${properties_filter}&q=${search}`,
    {
        cancelToken: new api.CancelToken(function executor(c) {
            cancelProductsAll = c;
        }),
    });
};

let cancelRetailers;
const retailers = (supplierId, filter, search_retailers) => {
    if(cancelRetailers) cancelRetailers('Cancel');

    return api.get(`/suppliers/${supplierId}/retailers?filter=${filter}&q=${search_retailers}`,
    {
        cancelToken: new  api.CancelToken(function executor(c) {
            cancelRetailers = c;
        }),
    });
};