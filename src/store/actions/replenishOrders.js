import api from '../../utils/api';
import { lastDate } from '../../utils/dateHelper';
import { alertError } from './alert';
import { 
    REPLENISH_ORDERS_LOADING, 
    REPLENISH_ORDERS_FILTERS,
    REPLENISH_ORDERS_FILTER_DATA,
    REPLENISH_ORDERS_COUNT,
    REPLENISH_ORDERS_OFFSET,
    REPLENISH_ORDERS_SEARCH,
    REPLENISH_ORDERS_SORT,
    REPLENISH_ORDERS_STATUS_COUNT,
    REPLENISH_ORDERS_REPORT,
    REPLENISH_ORDERS_REPORT_CLOSE, 
} from '../constants/replenishOrdersTypes';

export const setReplenishOrdersLoading = value => ({ type: REPLENISH_ORDERS_LOADING, payload: value });
export const setReplenishOrdersFilters = filters => ({ type: REPLENISH_ORDERS_FILTERS, payload: filters });

const filterData = (data, title) => ({ 
    type: REPLENISH_ORDERS_FILTER_DATA, 
    payload: {
        data: data,
        title: title,
    },
});

const setReplenishOrdersCount = count => ({ type: REPLENISH_ORDERS_COUNT, payload: { all: count } });

export const setReplenishOrdersOffset = offset => (dispatch) => {
    dispatch({ type: REPLENISH_ORDERS_OFFSET, payload: offset });
    dispatch(getReplenishOrders());
};

export const setReplenishOrdersSearchById = search => (dispatch) => {
    dispatch({ type: REPLENISH_ORDERS_SEARCH, payload: search });
    dispatch(getReplenishOrders());
};

export const setReplenishOrdersSort = field => (dispatch) => {
    dispatch({ type: REPLENISH_ORDERS_SORT, payload: field });
    dispatch(getReplenishOrders());
};

export const getReplenishOrders = title => async (dispatch, getState) => {
    try {
        const state = getState();
        const { last, from, to } = state.pageFilters.replenishOrders;
        const { activeCount, offset, perPage, search, sort, field } = state.replenishOrders;
        const { retailerId } = state.role;
    
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
    
        filter = {
            ...filter,
            type: 'replenish',
        };
    
        const response = await orders(retailerId,  JSON.stringify(filter), perPage, offset, search, sort, field);
        const newCount = response.headers['x-total-count'];
        dispatch(filterData(response.data, title ? title : activeCount));
        dispatch({ type: REPLENISH_ORDERS_STATUS_COUNT, payload: newCount });
        dispatch(setReplenishOrdersLoading(false));
    } catch (error) {
        dispatch(setReplenishOrdersLoading(false));
        dispatch(alertError('Error'));
    }
};

export const getReplenishOrdersFilters = () => async (dispatch, getState) => {
    try {
        const state = getState();
        const { retailerId } = state.role;
        const { last, from, to } = state.pageFilters.replenishOrders;
        const created_atFilter = lastDate(last, from, to);

        let filter = { 
            'created_at': { '$between': [created_atFilter.start, created_atFilter.end] }, 
        };

        filter = {
            ...filter,
            type: 'replenish',
        };
    
        const response = await api.get(`/retailers/${retailerId}/order-filters?filter=${JSON.stringify(filter)}`);

        const data = response.data;
        dispatch(setReplenishOrdersFilters(data));
        let sum = 0;
        for(let key in data) {
            sum += data[key];
        }
        dispatch(setReplenishOrdersCount(sum));
    } catch (error) {
        dispatch(alertError('Error'));
    }
};

export const replenishOrdersReport = () => async (dispatch, getState) => {
    const state = getState();
    try {
        const { retailerId } = state.role;
        const { from, to } = state.pageFilters.replenishOrders;
    
        const data = {
            'type': 'orders',
            'start_date': from,
            'end_date': to,
          };
    
        const response =  await downloadReports(retailerId, data);

        if(response.data.success) {
            dispatch({ type: REPLENISH_ORDERS_REPORT });
        }
    } catch (error) {
        console.log(error);
        dispatch(alertError('Error'));
    }
};

export const replenishOrdersReportClose = () => ({ type: REPLENISH_ORDERS_REPORT_CLOSE });

let cancelOrders;
const orders = (retailerId, filter, perPage, offset, search, sort, field) => {
    if(cancelOrders) cancelOrders();

    return api.get(`/retailers/${retailerId}/orders?filter=${filter}` +
        `&limit=${perPage}&offset=${offset}&q=${search}&order=${sort}&sort=${field}`,
    {
        cancelToken: new  api.CancelToken(function executor(c) {
            cancelOrders = c;
        }),
    });
};

let cancelReports;
const downloadReports = (retailerId, data) => {
    if(cancelReports) cancelReports();
    return api.post(`/retailers/${retailerId}/reports`, data, {
        cancelToken: new  api.CancelToken(function executor(c) {
            cancelReports = c;
        }),
    });
};