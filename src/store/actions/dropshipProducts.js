import api from '../../utils/api';
import { 
    DROPSHIP_PRODUCTS, 
    DROPSHIP_PRODUCTS_COUNT, 
    DROPSHIP_PRODUCTS_FILTERS,
    DROPSHIP_PRODUCTS_CHECK,
    DROPSHIP_PRODUCTS_UNCHECK,
    DROPSHIP_PRODUCTS_SEARCH,
    DROPSHIP_PRODUCTS_ORDER_FIELD,
    DROPSHIP_PRODUCTS_ORDER,
    DROPSHIP_PRODUCTS_OFFSET,
    DROPSHIP_BUY_PRODUCT,
    DROPSHIP_PRODUCTS_CURRENT_FILTER,
    DROPSHIP_PRODUCTS_LOADING, 
    DROPSHIP_PRODUCTS_SUPPLIER_ID,
    DROPSHIP_PRODUCTS_BRANDS,
    DROPSHIP_PRODUCTS_CHECK_ALL_ON_PAGE,
    DROPSHIP_PRODUCTS_CHECK_ALL,
    DROPSHIP_PRODUCTS_UNCHECK_ALL,
    DROPSHIP_PRODUCTS_ALL,
    DROPSHIP_PRODUCTS_PRODUCT,
    DROPSHIP_PRODUCTS_PRODUCT_LOADING,
} from '../constants/dropshipProductsTypes';
import { staticFilter } from '../../utils/filterHelper';
import { alertError, alertSuccess } from './alert';

const setDropshipProductsLoading = value => ({ type: DROPSHIP_PRODUCTS_LOADING, payload: value });
const setDropshipProducts = data => ({ type: DROPSHIP_PRODUCTS, payload: data });
const setDropshipProductsCount = count => ({ type: DROPSHIP_PRODUCTS_COUNT, payload: count });
const setDropshipProductsFilters = filters => ({ type: DROPSHIP_PRODUCTS_FILTERS, payload: filters });
const setDropshipProductsBrands = data => ({ type: DROPSHIP_PRODUCTS_BRANDS, payload: data });
const setDropshipProductsAll = data => ({ type: DROPSHIP_PRODUCTS_ALL, payload: data });
const setDropshipProductsProduct = data => ({ type: DROPSHIP_PRODUCTS_PRODUCT, payload: data });
const setDropshipProductsProductLoading = value => ({ type: DROPSHIP_PRODUCTS_PRODUCT_LOADING, payload: value });

export const dropshipProductsCheckAllOnPage = ids => ({ type: DROPSHIP_PRODUCTS_CHECK_ALL_ON_PAGE, payload: ids });

export const dropshipProductsCheckAll = () => async (dispatch, getState) => {
    const { currentFilter, search, supplierId  } = getState().dropshipProducts;
    const { retailerId } = getState().role;
    const filter = staticFilter(currentFilter);

    try {
        const responseAll = await productsAll(retailerId, supplierId, filter.filter, filter.propertiesFilter, search);
        dispatch(setDropshipProductsAll(responseAll.data));
        dispatch({ type: DROPSHIP_PRODUCTS_CHECK_ALL });
    } catch (error) {
        console.log(error);
    }
};
export const dropshipProductsUncheckAll = { type: DROPSHIP_PRODUCTS_UNCHECK_ALL };

export const setDropshipProductsSupplierId = id => (dispatch) => {
    dispatch({ type: DROPSHIP_PRODUCTS_SUPPLIER_ID, payload: id });
    dispatch(getDropshipProducts());
    dispatch(getDropshipProductsFilters());
};

export const dropshipProductsApproveChecked = () => async (dispatch, getState) => {
    try {
        const state = getState();
        const { 
            checked, 
            data: products, 
        } = state.dropshipProducts;
        const { retailerId } = state.role;
    
        let variants = [];
        for(let product of products) {
            if(checked.includes(product.model)) {
                for(let j of product.variants) {
                    variants.push(+j);
                }
            }
        }
    
        let data = {
            retailer_ids: [retailerId],
            variant_ids: variants,
            approved: true,
        };

        const response = await putDropshipPermissions(data, retailerId);

        if(response.data.success) {
            dispatch(alertSuccess('Success approve'));
            dispatch(getDropshipProducts());
        } else {
            dispatch(alertError('Error'));
        }
    } catch (error) {
        dispatch(alertError('Error'));
    }
};

export const dropshipProductsUnapproveChecked = () => async (dispatch, getState) => {
    try {
        const state = getState();
        const { 
            checked, 
            data: products, 
        } = state.dropshipProducts;
        const { retailerId } = state.role;

        let variants = [];
        for(let product of products) {
            if(checked.includes(product.model)) {
                for(let j of product.variants) {
                    variants.push(+j);
                }
            }
        }
    
        let data = {
            'retailer_ids': [retailerId],
            'variant_ids': variants,
            approved: false,
        };
    
        const response = await putDropshipPermissions(data, retailerId);

        if(response.data.success) {
            dispatch(alertSuccess('Success revoke'));
            dispatch(getDropshipProducts());
        } else {
            dispatch(alertError('Error'));
        }

    } catch (error) {
        dispatch(alertError('Error'));
    }
};

export const dropshipProductsCheck = id => async (dispatch) => {
    dispatch({ type: DROPSHIP_PRODUCTS_CHECK, payload: id });
};

export const dropshipProductsUncheck = id => async (dispatch) => {
     dispatch({ type: DROPSHIP_PRODUCTS_UNCHECK, payload: id });
};

export const getDropshipProductsBrands = () => (dispatch, getState) => {
    const state = getState();
    const { retailerId } = state.role;
  
    api.get(`/retailers/${retailerId}/suppliers`).then((response) => {
        dispatch(setDropshipProductsBrands(response.data));
        dispatch(getDropshipProducts());
        dispatch(getDropshipProductsFilters());
    });
};

export const putDropshipProductsProduct = (data, model) => async (dispatch, getState) => {
    try {
        const state = getState();
        const { retailerId, supplierId } = state.role;

        const response = await putProduct(data, retailerId, supplierId, model);

        if(response.data.success) {
            dispatch(alertSuccess('Success'));
        } else {
            dispatch(alertError('Error'));
        }
    } catch (error) {
        dispatch(alertError('Error'));
        console.log(error);
    }
};

export const getDropshipProductsProduct = model => async (dispatch, getState) => {
    try {
        dispatch(setDropshipProductsProductLoading(true));
        const state = getState();
        const { retailerId, supplierId } = state.role;
        
        const response = await product(retailerId, supplierId, model);
        dispatch(setDropshipProductsProduct(response.data));
        dispatch(setDropshipProductsProductLoading(false));
    } catch (error) {
        dispatch(setDropshipProductsProductLoading(false));
        dispatch(alertError('Error'));
        console.log(error);
    }  
};

export const getDropshipProducts = () => async (dispatch, getState) => {
    try {
        dispatch(setDropshipProductsLoading(true));
        const { 
            perPage, 
            offset, 
            order, 
            count, 
            currentFilter, 
            search, 
            field, 
            supplierId,  
        } = getState().dropshipProducts;
        const { retailerId } = getState().role;
        const filter = staticFilter(currentFilter);

        const response = await products(retailerId, 
            supplierId, 
            filter.filter,
            filter.propertiesFilter, 
            perPage, 
            offset, 
            order, 
            field, 
            search,
        );
       
       const newCount = response.headers['x-total-count'];
       if(count != newCount) {
           dispatch(setDropshipProductsCount(newCount));
       }
       dispatch(setDropshipProducts(response.data));
       dispatch(setDropshipProductsLoading(false));
   } catch (error) {
       console.log(error);
   }
};

export const setDropshipProductsSearch = search => (dispatch) => {
   dispatch({ type: DROPSHIP_PRODUCTS_SEARCH, payload: search });
   dispatch(getDropshipProducts());
};

export const setDropshipProductsOrderField = orderField => (dispatch, getState) => {
   const { field } = getState().dropshipProducts;

   if(field != orderField) {
       dispatch({ type: DROPSHIP_PRODUCTS_ORDER_FIELD, payload: orderField });
   }

   dispatch(getDropshipProducts());
};

export const setDropshipProductsOrder = order => (dispatch) => {
   dispatch({ type: DROPSHIP_PRODUCTS_ORDER, payload: order });
   dispatch(getDropshipProducts());
};

export const setDropshipProductsOffset = offset => (dispatch) => {
   dispatch({ type: DROPSHIP_PRODUCTS_OFFSET, payload: offset });
   dispatch(getDropshipProducts());
};

export const buyBroduct = model => (dispatch, getState) => {
  const state = getState();
  const { supplierId, retailerId } = state.role;

  api.get(`/retailers/${retailerId}/suppliers/${supplierId}` + 
  `/products/${model}?service_type=ecommerce`).then((response) => {
    dispatch({ type: DROPSHIP_BUY_PRODUCT, payload: response.data });
  });
};

export const getDropshipProductsFilters = () => (dispatch, getState) => {
    const { supplierId } = getState().dropshipProducts;
    const { retailerId } = getState().role;

    api.get(`retailers/${retailerId}/suppliers/${supplierId}/product-filters?service_type=ecommerce`)
    .then((response) => {
        dispatch(setDropshipProductsFilters(response.data));
    });
};

export const setDropshipProductsCurrentFilter = filter => (dispatch) => {
    dispatch({ type: DROPSHIP_PRODUCTS_CURRENT_FILTER, payload: filter });
    dispatch(setDropshipProductsOffset(0));
};

let cancelPutPermissions;
const putDropshipPermissions = (data, retailerId) => {
    if(cancelPutPermissions) cancelPutPermissions();

    return api.put(`/retailers/${retailerId}/permissions`, data, {
       cancelToken: new api.CancelToken(function executor(c) {
        cancelPutPermissions = c;
       }),
    });
};

let cancelProductsAll;
const productsAll = (retailerId, supplierId, filter, properties_filter, search) => {
    if(cancelProductsAll) cancelProductsAll('Cancel products all');

    return api.get(`/retailers/${retailerId}/suppliers/${supplierId}/products-all?service_type=ecommerce` +
        `&filter=${filter}&properties_filter=${properties_filter}&q=${search}`,
    {
        cancelToken: new api.CancelToken(function executor(c) {
            cancelProductsAll = c;
        }),
    });
};

let cancelProducts;
const products = (retailerId, supplierId, filter, properties_filter, limit, offset, order, field, search) => {
   if(cancelProducts) cancelProducts('Cancel');

    return api.get(`/retailers/${retailerId}/suppliers/${supplierId}/products?service_type=ecommerce` +
    `&filter=${filter}&properties_filter=${properties_filter}` +
    `&limit=${limit}&offset=${offset}&order=${order}&sort=${field}` +
    `&q=${search}`,
    {
        cancelToken: new api.CancelToken(function executor(c) {
            cancelProducts = c;
        }),
    });
};

let cancelProduct;
const product = (retailerId, supplierId, model) => {
    if(cancelProduct) cancelProduct('Cancel product');

    return api.get(`/retailers/${retailerId}/suppliers/${supplierId}/products/${model}` +
    '?service_type=ecommerce',
    {
        cancelToken: new api.CancelToken(function executor(c) {
            cancelProduct = c;
        }),
    });
};

let cancelPutProduct;
const putProduct = (data, retailerId, supplierId, model) => {
    if(cancelPutProduct) cancelPutProduct();

    return api.put(`/retailers/${retailerId}/suppliers/${supplierId}/products/${model}`, data, {
       cancelToken: new api.CancelToken(function executor(c) {
        cancelPutProduct = c;
       }),
    });
};