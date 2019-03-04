import api from '../../utils/api';
import { 
    MANAGE_RETURNS, 
    MANAGE_RETURNS_COUNT,
    MANAGE_RETURNS_SEARCH,
    MANAGE_RETURNS_SORT,
    SET_MANAGE_ORDER,
    MANAGE_RETURNS_OFFSET,
    MANAGE_POST_RETURNS,
    MANAGE_RETURNS_LOADING,
} from '../constants/manageReturnsTypes';

export const setManageReturns = data => ({ type: MANAGE_RETURNS, payload: data });
export const setManageReturnsCount = count => ({ type: MANAGE_RETURNS_COUNT, payload: count });
export const setManageReturnsLoading = value => ({ type: MANAGE_RETURNS_LOADING, payload: value });

export const setManageReturnsSearchById = search => (dispatch, getState) => {
    dispatch({ type: MANAGE_RETURNS_SEARCH, payload: search });
    dispatch(getManageReturns());
};

export const setSortAscOrDesc = field => (dispatch) => {
    dispatch({ type: MANAGE_RETURNS_SORT, payload: field });
    dispatch(getManageReturns());
};

export const postManageReturnsReturns = (data, retailer_order_id, id) => async (dispatch, getState) => {
    try {
        dispatch({ type: MANAGE_POST_RETURNS });
        const { supplierId } = getState().role;
        const response = await postReturns(supplierId, retailer_order_id, id, data);
       
    } catch (error) {
        console.log(error);
    }
};

export const setManageReturnsOffset = offset => (dispatch) => {
    dispatch({ type: MANAGE_RETURNS_OFFSET, payload: offset });
    // dispatch(getBrandOrders()); Nick - check it
};

export const getManageOrder = id => async (dispatch, getState) => {
    try {
        const state = getState();
        const { supplierId } = state.role;

        const response = await order(supplierId, id);
        dispatch({ type: SET_MANAGE_ORDER, payload: response.data });
    } catch(e) {
        console.log(e);
    }
};

export const getManageReturns = () => async (dispatch, getState) => {
    try {
        dispatch(setManageReturnsLoading(true));
        const { count } = getState().assignNewProducts;
        const { perPage, offset, field, sort, search } = getState().manageReturns;
        const { supplierId } = getState().role;
    
        const filter = JSON.stringify(
            { 
                'requested_return': true, 
                'retailer_order_id': { '$like': `%25${search}%25` }, 
            },
        );
    
        const response = orders(supplierId, filter, perPage, offset, field, sort);
        const newCount = response.headers['x-total-count'];
        if(count != newCount) {
            dispatch(setManageReturnsCount(newCount));
        }
        dispatch(setManageReturns(response.data));
        dispatch(setManageReturnsLoading(false));
    } catch (error) {
        dispatch(setManageReturnsLoading(false));
    }
};

let cancelOrdersReturns;
const postReturns = (supplierId, orderId, fulfillmentId, data) => {
    if(cancelOrdersReturns) cancelOrdersReturns();
    
    return api.post(`/suppliers/${supplierId}/orders/${orderId}/fulfillments/${fulfillmentId}/returns`, data,
    {
        cancelToken: new  api.CancelToken(function executor(c) {
            cancelOrdersReturns = c;
        }),
    });
};

let cancelOrder;
const order = (supplier_id, id) => {
    if(cancelOrder) cancelOrder();

    return api.get(`/suppliers/${supplier_id}/orders/${id}`,
    {
        cancelToken: new  api.CancelToken(function executor(c) {
            cancelOrder = c;
        }),
    });
};

const orders = (supplierId, filter, perPage, offset,  field, sort) => {
    return api.get(`/suppliers/${supplierId}/orders` +
        `?filter=${filter}&limit=${perPage}&offset=${offset}&order=${sort}&sort=${field}`,
    );
};

// api.get(`/suppliers/${supplierId}/orders?filter=${filter}` +
//         `&limit=${perPage}&offset=${offset}&q=${search}&order=${sort}&sort=${field}`