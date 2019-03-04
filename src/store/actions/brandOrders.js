import api from '../../utils/api';
import { 
    BRAND_ORDERS_COUNT,
    BRAND_ORDERS_OFFSET,
    SET_BRAND_ORDER,
    BRAND_ORDERS_FILTERS,
    BRAND_ORDERS_POST_RETURNS,
    BRAND_ORDERS_REPORT,
    BRAND_ORDERS_REPORT_CLOSE,
    BRAND_ORDERS_FILTER_DATA,
    BRAND_ORDERS_LOADING,
    BRAND_ORDERS_SEARCH,
    SET_BRAND_ORDERS_SORT,
    SET_STATUS_COUNT,
} from '../constants/brandOrdersTypes';
import { lastDate } from '../../utils/dateHelper';
import { alertError, alertSuccess } from './alert';

export const setBrandOrdersLoading = value => ({ type: BRAND_ORDERS_LOADING, payload: value });
export const setOrdersFilters = filters => ({ type: BRAND_ORDERS_FILTERS, payload: filters });

export const filterData = (data, title) => ({ 
    type: BRAND_ORDERS_FILTER_DATA, 
    payload: {
        data: data,
        title: title,
    }, 
});

export const setBrandOrdersCount = count => ({ type: BRAND_ORDERS_COUNT, payload: { all: count } });

export const postBrandOrdersReturns = (data, retailer_order_id, id) => async (dispatch, getState) => {
    try {
        dispatch({ type: BRAND_ORDERS_POST_RETURNS });
        const { supplierId } = getState().role;

        const response = await postReturns(supplierId, retailer_order_id, id, data);
        if(response.data.success) {
            dispatch(alertSuccess(response.data.message));
            dispatch(getBrandOrders());
        } else {
            dispatch(alertError('Error'));
        }
    } catch (error) {
        if(error.response.data) {
            dispatch(alertError(error.response.data.message));
        } else {
            dispatch(alertError('Error'));
        }
    }
};

export const setBrandOrdersOffset = offset => (dispatch) => {
    dispatch({ type: BRAND_ORDERS_OFFSET, payload: offset });
    dispatch(getBrandOrders());
};

export const setBrandOrdersSearchById = search => (dispatch, getState) => {
    dispatch({ type: BRAND_ORDERS_SEARCH, payload: search });
    dispatch(getBrandOrders());
};

export const setSortAscOrDesc = field => (dispatch) => {
    dispatch({ type: SET_BRAND_ORDERS_SORT, payload: field });
    dispatch(getBrandOrders());
};

export const getBrandOrders = title => async (dispatch, getState) => {
    const state = getState();
    const { last, from, to, retailer } = state.pageFilters.orders;
    const { activeCount, offset, perPage, search, sort, field } = state.brandOrders;
    const { supplierId } = state.role;

    const created_atFilter = lastDate(last, from, to);
    const title_lower = title ? title.toLowerCase() : activeCount.toLowerCase();

    const pending_check = ['completed', 'canceled'];
    const processing = title_lower === 'completed' ? 'completed' : 
                        title_lower === 'canceled' ? 'canceled' :
                        title_lower === 'processing' ? pending_check :
                        title_lower === 'all' ? 'all' : '';

    let filter = processing !== 'all' ? { 
        'created_at': { '$between': [created_atFilter.start, created_atFilter.end] }, 
        'processing_state': Array.isArray(processing) ? { '$notIn': processing } : processing, 
        'retailer_order_id': { '$like': `%25${search}%25` },
    } : { 
        'created_at': { '$between': [created_atFilter.start, created_atFilter.end] }, 
        'retailer_order_id': { '$like': `%25${search}%25` },
    };

    if(retailer && retailer !== 'all') {
        filter = {
            ...filter,
            'retailer_id': retailer,
        };
    }

    const response = await orders(supplierId,  JSON.stringify(filter), perPage, offset, search, sort, field);
    const newCount = response.headers['x-total-count'];
    dispatch(filterData(response.data, title ? title : activeCount));
    dispatch({ type: SET_STATUS_COUNT, payload: newCount });
    // dispatch(setBrandOrdersCount(newCount));
    dispatch(setBrandOrdersLoading(false));
};

export const getBrandOrder = id => async (dispatch, getState) => {
    try {
        dispatch({ type: SET_BRAND_ORDER, payload: {} });
        const state = getState();
        const { supplierId } = state.role;

        const response = await order(supplierId, id);
        dispatch({ type: SET_BRAND_ORDER, payload: response.data });
    } catch(e) {
        console.log(e);
    }
};

export const getBrandOrdersFilters = () => async (dispatch, getState) => {
    try {
        const state = getState();
        const { supplierId } = state.role;
        const { last, from, to, retailer } = state.pageFilters.orders;
        const created_atFilter = lastDate(last, from, to);
    
        let filter = { 
            'created_at': { '$between': [created_atFilter.start, created_atFilter.end] }, 
        };
    
        if(retailer && retailer !== 'all') {
            filter = {
                ...filter,
                'retailer_id': retailer,
            };
        }
    
        const response = await api.get(`/suppliers/${supplierId}/order-filters?filter=${JSON.stringify(filter)}`);

        const data = response.data;
        dispatch(setOrdersFilters(data));
        let sum = 0;
        for(let key in data.orders_per_status) {
            sum += data.orders_per_status[key];
        }
        dispatch(setBrandOrdersCount(sum));
    } catch (error) {
        console.log(error);
    }
};

export const ordersReport = () => async (dispatch, getState) => {
    const state = getState();
    try {
        const { supplierId } = state.role;
        const { from, to } = state.pageFilters.orders;
    
        const data = {
            'type': 'orders',
            'start_date': from,
            'end_date': to,
          };
    
        const response =  await downloadReports(supplierId, data);

        if(response.data.success) {
            dispatch({ type: BRAND_ORDERS_REPORT });
        }
    } catch (error) {
        console.log(error);
    }
};

export const brandOrdersReportClose = () => ({ type: BRAND_ORDERS_REPORT_CLOSE });

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


let cancelOrders;
const orders = (supplierId, filter, perPage, offset, search, sort, field) => {
    if(cancelOrders) cancelOrders();

    return api.get(`/suppliers/${supplierId}/orders?filter=${filter}` +
        `&limit=${perPage}&offset=${offset}&q=${search}&order=${sort}&sort=${field}`,
    {
        cancelToken: new  api.CancelToken(function executor(c) {
            cancelOrders = c;
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

let cancelReports;
const downloadReports = (supplier_id, data) => {
    if(cancelReports) cancelReports();
    return api.post(`/suppliers/${supplier_id}/reports`, data, {
        cancelToken: new  api.CancelToken(function executor(c) {
            cancelReports = c;
        }),
    });
};