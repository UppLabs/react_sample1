import api from '../../utils/api';
import { 
   REPLENISH_PRODUCTS, 
   REPLENISH_PRODUCTS_COUNT, 
   REPLENISH_PRODUCTS_FILTERS,
   REPLENISH_PRODUCTS_SEARCH,
   REPLENISH_PRODUCTS_ORDER_FIELD,
   REPLENISH_PRODUCTS_ORDER,
   REPLENISH_PRODUCTS_OFFSET,
   REPLENISH_PRODUCTS_CURRENT_FILTER,
   REPLENISH_PRODUCTS_CHECK,
   REPLENISH_PRODUCTS_UNCHECK,
   REPLENISH_BUY_PRODUCT,
   RESET_MODAL_DATA,
   REPLENISH_PRODUCTS_LOADING,
   REPLENISH_PRODUCTS_SUPPLIER_ID,
   REPLENISH_PRODUCTS_BRANDS, 
} from '../constants/replenishProducts';

const setReplenishProductsLoading = value => ({ type: REPLENISH_PRODUCTS_LOADING, payload: value });
const setReplenishProducts = data => ({ type: REPLENISH_PRODUCTS, payload: data });
const setReplenishProductsCount = count => ({ type: REPLENISH_PRODUCTS_COUNT, payload: count });
const setReplenishProductsFilters = filters => ({ type: REPLENISH_PRODUCTS_FILTERS, payload: filters });
const setReplenishProductsBrands = data => ({ type: REPLENISH_PRODUCTS_BRANDS, payload: data });

export const setReplenishProductsSupplierId = id => (dispatch) => {
    dispatch({ type: REPLENISH_PRODUCTS_SUPPLIER_ID, payload: id });
    dispatch(getReplenishProducts());
    dispatch(getReplenishProductsFilters());
};
export const resetModalProduct = () => ({ type: RESET_MODAL_DATA, payload: { product: {}, count: 0, sum: 0 } });

export const replenishProductsCheck = id => async (dispatch) => {
    dispatch({ type: REPLENISH_PRODUCTS_CHECK, payload: id });
};

export const replenishProductsUncheck = id => async (dispatch) => {
     dispatch({ type: REPLENISH_PRODUCTS_UNCHECK, payload: id });
};

export const getReplenishProductsBrands = () => (dispatch, getState) => {
    const state = getState();
    const { retailerId } = state.role;
  
    api.get(`/retailers/${retailerId}/suppliers`).then((response) => {
        dispatch(setReplenishProductsBrands(response.data));
        dispatch(getReplenishProducts());
        dispatch(getReplenishProductsFilters());
    });
};

export const getReplenishProducts = () => async (dispatch, getState) => {
    try {
        dispatch(setReplenishProductsLoading(true));
        const state = getState();
        const { 
            perPage, 
            offset, 
            order, 
            count, 
            currentFilter, 
            search, 
            field, 
            supplierId,  
        } = state.replenishProducts;
        const { retailerId } = state.role;

        const properties_filter = JSON.stringify(currentFilter);

        const response = await products(retailerId, 
            supplierId, 
            properties_filter, 
            perPage, 
            offset, 
            order, 
            field, 
            search,
        );
       
        const newCount = response.headers['x-total-count'];
        if(count != newCount) {
            dispatch(setReplenishProductsCount(newCount));
        }
        dispatch(setReplenishProducts(response.data));
        dispatch(setReplenishProductsLoading(false));
    } catch (error) {
        console.log(error);
    }
};

export const setReplenishProductsSearch = search => (dispatch) => {
   dispatch({ type: REPLENISH_PRODUCTS_SEARCH, payload: search });
   dispatch(getReplenishProducts());
};

export const setReplenishProductsOrderField = orderField => (dispatch, getState) => {
   const { field } = getState().replenishProducts;

   if(field != orderField) {
       dispatch({ type: REPLENISH_PRODUCTS_ORDER_FIELD, payload: orderField });
   }

   dispatch(getReplenishProducts());
};

export const setReplenishProductsOrder = order => (dispatch) => {
   dispatch({ type: REPLENISH_PRODUCTS_ORDER, payload: order });
   dispatch(getReplenishProducts());
};

export const setReplenishProductsOffset = offset => (dispatch) => {
   dispatch({ type: REPLENISH_PRODUCTS_OFFSET, payload: offset });
   dispatch(getReplenishProducts());
};

export const buyProduct = model => (dispatch, getState) => {
  const state = getState();
  const { supplierId, retailerId } = state.role;

  api.get(`/retailers/${retailerId}/suppliers/${supplierId}` + 
  `/products/${model}?service_type=replenishment`).then((response) => {
    dispatch({ type: REPLENISH_BUY_PRODUCT, payload: response.data });
  });
};

export const getReplenishProductsFilters = () => (dispatch, getState) => {
   const { supplierId } = getState().replenishProducts;
   const { retailerId } = getState().role;

    api.get(`/retailers/${retailerId}/suppliers/${supplierId}/product-filters?service_type=replenishment`)
    .then((response) => {
        dispatch(setReplenishProductsFilters(response.data));
    });
};

export const setReplenishProductsCurrentFilter = filter => (dispatch) => {
    dispatch({ type: REPLENISH_PRODUCTS_CURRENT_FILTER, payload: filter });
    dispatch(setReplenishProductsOffset(0));
};

let cancelProducts;
const products = (retailerId, supplierId, properties_filter, limit, offset, order, field, search) => {
   if(cancelProducts) cancelProducts('Cancel');

    return api.get(`/retailers/${retailerId}/suppliers/${supplierId}/products?service_type=replenishment` +
    `&properties_filter=${properties_filter}` +  
    `&limit=${limit}&offset=${offset}&order=${order}&sort=${field}` +
    `&q=${search}`,
    {
        cancelToken: new api.CancelToken(function executor(c) {
            cancelProducts = c;
        }),
    });
};