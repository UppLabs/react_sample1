import api from '../../utils/api';
import { 
    PRODUCTS, 
    PRODUCTS_COUNT, 
    PRODUCTS_FILTERS,
    PRODUCTS_OFFSET, 
    PRODUCTS_CURRENT_FILTER,
    PRODUCTS_RETAILERS,
    PRODUCTS_SEARCH,
    PRODUCTS_CHECK,
    PRODUCTS_UNCHECK,
    PRODUCTS_CHECK_ALL,
    PRODUCTS_UNCHECK_ALL,
    PRODUCTS_ORDER,
    PRODUCTS_ORDER_FIELD,
    RETAILERS_SEARCH_PRODUCTS,
    PRODUCTS_CHECK_RETAILER,
    PRODUCTS_UNCHECK_RETAILER,
    PRODUCTS_ALL,
    PRODUCTS_CHECK_ALL_RETAILERS,
    PRODUCTS_UNCHECK_ALL_RETAILERS,
    PRODUCTS_PAGE,
    PRODUCTS_CHECK_ALL_ON_PAGE,
} from '../constants/productsTypes';
import { exportCSV } from '../../utils/exportHelper';
import { postPermissions } from './permissions';
import { alertSuccess, alertError } from './alert';
import { formatMany } from '../../utils/formatHelper';

const setProducts = data => ({ type: PRODUCTS, payload: data });
const setProductsAll = data => ({ type: PRODUCTS_ALL, payload: data });
const setProductsCount = count => ({ type: PRODUCTS_COUNT, payload: count });
const setProductsFilters = filters => ({ type: PRODUCTS_FILTERS, payload: filters });

export const setProductsPage = page => ({ type: PRODUCTS_PAGE, payload: page });

export const productsCheckRetailer = id => async (dispatch) => {
    dispatch({ type: PRODUCTS_CHECK_RETAILER, payload: id });
};

export const productsUncheckRetailer = id => async (dispatch) => {
    dispatch({ type: PRODUCTS_UNCHECK_RETAILER, payload: id });
};

export const productsCheckAllRetailers = () => async (dispatch, getState) => {
    const { retailers } = getState().products;

    let checked = [];
    for(let i of retailers) {
        checked.push(i.retailer.name);
    }

    dispatch({ type: PRODUCTS_CHECK_ALL_RETAILERS, payload: checked });
};

export const productsUncheckAllRetailers = () => async (dispatch) => {
    dispatch({ type: PRODUCTS_UNCHECK_ALL_RETAILERS, payload: [] });
};

export const productsSubmit = value => async (dispatch, getState) => {
    if(value) {
        try {
            const state = getState();
            const { 
                checked, checkedRetailers, 
                data: products, retailers, 
            } = state.products;
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
    
            const response = await postPermissions(supplierId, data);
     
            if(response && response.data.success) {
                if(value.dropship || value.replenishment) {
                    dispatch(
                        alertSuccess(
                            `${checked.length} ${formatMany(checked.length, 'product')} approved to 
                            ${retailerIds.length} ${formatMany(retailerIds.length, 'retailer')}`,
                        ),
                    );
                } else {
                    dispatch(
                        alertSuccess(
                            `${checked.length} ${formatMany(checked.length, 'product')} revoked from 
                            ${retailerIds.length} ${formatMany(retailerIds.length, 'retailer')}`,
                        ),
                    );
                }
            }
        } catch (error) {
            dispatch(alertError('Error'));
        }
    }
};

export const productsCheckAllOnPage = ids =>  ({ type: PRODUCTS_CHECK_ALL_ON_PAGE, payload: ids });

export const productsCheckAll = () =>  async (dispatch, getState) => {
    const { currentFilter, search } = getState().products;
    const properties_filter = JSON.stringify(currentFilter);
    const { supplierId } = getState().role;

    try {
        const responseAll = await productsAll(supplierId, properties_filter, search);
        dispatch(setProductsAll(responseAll.data));
        dispatch({ type: PRODUCTS_CHECK_ALL });
    } catch(error) {
        console.log(error);
    }
};
export const productsUncheckAll = { type: PRODUCTS_UNCHECK_ALL };

export const productsCheck = id => async (dispatch) => {
    dispatch({ type: PRODUCTS_CHECK, payload: id });
};

export const productsUncheck = id => async (dispatch) => {
     dispatch({ type: PRODUCTS_UNCHECK, payload: id });
};

export const retailerSearchProducts = search => (dispatch) => {
    dispatch({ type: RETAILERS_SEARCH_PRODUCTS, payload: search });
    dispatch(getProducts());
};

export const getProducts = () => async (dispatch, getState) => {
    const { perPage, offset, count, currentFilter, search  } = getState().products;
    const { order, field } = getState().products;
    const { supplierId } = getState().role;

    const properties_filter = JSON.stringify(currentFilter);

    try {
        const response = await products(supplierId, properties_filter, offset, perPage, search, order, field);
        // const responseAll = await productsAll(supplierId, properties_filter, search);

        const newCount = response.headers['x-total-count'];
        if(count != newCount) {
            dispatch(setProductsCount(newCount));
        }
        dispatch(setProducts(response.data));
        // dispatch(setProductsAll(responseAll.data));
    } catch (error) {
        console.log(error);
    }
};

export const setProductsSearch = search => (dispatch) => {
    dispatch({ type: PRODUCTS_SEARCH, payload: search });
    dispatch(getProducts());
};

export const setProductsOffset = offset => (dispatch) => {
    dispatch({ type: PRODUCTS_OFFSET, payload: offset });
    dispatch(getProducts());
};

export const setProductsOrderField = orderField => (dispatch, getState) => {
    const { field } = getState().products;

    if(field != orderField) {
        dispatch({ type: PRODUCTS_ORDER_FIELD, payload: orderField });
    }

    dispatch(getProducts());
};

export const setProductsOrder = order => (dispatch) => {
    dispatch({ type: PRODUCTS_ORDER, payload: order });
    dispatch(getProducts());
};

export const getProductsFilters = () => (dispatch, getState) => {
    const { filters } = getState().products;
    const { supplierId } = getState().role;

    if(Object.keys(filters).length !== 0) return;

    api.get(`/suppliers/${supplierId}/product-filters`).then((response) => {
        dispatch(setProductsFilters(response.data));
    });
};

export const setProductsCurrentFilter = filter => (dispatch) => {
    dispatch({ type: PRODUCTS_CURRENT_FILTER, payload: filter });
    dispatch(getProducts());
};

export const getProductsRetailers = () => async (dispatch, getState) => {
    try {
        const { supplierId } = getState().role;
        const { search_retailers } = getState().products;
        const filter = '';
        JSON.stringify({ '$or':[ 
            { 'approved_for_ecommerce': true }, 
            { 'approved_for_replenishment': true }], 
        });
        const response = await retailers(supplierId, filter, search_retailers);
        
        dispatch({ type: PRODUCTS_RETAILERS, payload: response.data });
    } catch (error) {
        console.log(error);
    }
};

let cancelExport;
export const exportProducts = () => async (dispatch, getState) => {
    try {
        if(cancelExport) {
            cancelExport('Cancel export');
        }
        const { supplierId } = getState().role;
    
        const response = await api.get(`/suppliers/${supplierId}/variants?csv=true`, {
            cancelToken: new api.CancelToken(function executor(c) {
                cancelExport = c;
            }),
        });
    
        exportCSV(response.data, 'products');
    } catch (error) {
        console.log(error);
    }

};

let cancelProducts;
const products = (supplierId, properties_filter, offset, perPage, search, order, field) => {
    if(cancelProducts) cancelProducts('Cancel');

    return api.get(`/suppliers/${supplierId}/products` +
        `?properties_filter=${properties_filter}&offset=${offset}&limit=${perPage}` +
        `&q=${search}&order=${order}&sort=${field}`,
    {
        cancelToken: new api.CancelToken(function executor(c) {
            cancelProducts = c;
        }),
    });
};

let cancelProductsAll;
const productsAll = (supplierId, properties_filter, search) => {
    if(cancelProductsAll) cancelProducts('Cancel products all');

    return api.get(`/suppliers/${supplierId}/products-all` +
        `?properties_filter=${properties_filter}&q=${search}`,
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
