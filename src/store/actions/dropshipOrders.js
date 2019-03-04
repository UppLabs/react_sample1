import api from '../../utils/api';
import { lastDate } from '../../utils/dateHelper';
import { 
    DROPSHIP_ORDERS_LOADING, 
    DROPSHIP_ORDERS_FILTERS,
    DROPSHIP_ORDERS_FILTER_DATA,
    DROPSHIP_ORDERS_COUNT,
    DROPSHIP_ORDERS_OFFSET,
    DROPSHIP_ORDERS_SEARCH,
    DROPSHIP_ORDERS_SORT,
    DROPSHIP_ORDERS_STATUS_COUNT,
    DROPSHIP_ORDERS_REPORT,
    DROPSHIP_ORDERS_REPORT_CLOSE, 
} from '../constants/dropshipOrdersTypes';
import { alertError } from './alert';

export const setDropshipOrdersLoading = value => ({ type: DROPSHIP_ORDERS_LOADING, payload: value });
const setDropshipOrdersFilters = filters => ({ type: DROPSHIP_ORDERS_FILTERS, payload: filters });

const filterData = (data, title) => ({ 
    type: DROPSHIP_ORDERS_FILTER_DATA, 
    payload: {
        data: data,
        title: title,
    },
});

const setDropshipOrdersCount = count => ({ type: DROPSHIP_ORDERS_COUNT, payload: { all: count } });

export const setDropshipOrdersOffset = offset => (dispatch) => {
    dispatch({ type: DROPSHIP_ORDERS_OFFSET, payload: offset });
    dispatch(getDropshipOrders());
};

export const setDropshipOrdersSearchById = search => (dispatch) => {
    dispatch({ type: DROPSHIP_ORDERS_SEARCH, payload: search });
    dispatch(getDropshipOrders());
};

export const setDropshipOrdersSort = field => (dispatch) => {
    dispatch({ type: DROPSHIP_ORDERS_SORT, payload: field });
    dispatch(getDropshipOrders());
};

export const getDropshipOrders = title => async (dispatch, getState) => {
    try {
        const state = getState();
        const { last, from, to } = state.pageFilters.dropshipOrders;
        const { activeCount, offset, perPage, search, sort, field } = state.dropshipOrders;
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
            type: 'dropship',
        };
    
        const response = await orders(retailerId,  JSON.stringify(filter), perPage, offset, search, sort, field);
        const newCount = response.headers['x-total-count'];
        dispatch(filterData(response.data, title ? title : activeCount));
        dispatch({ type: DROPSHIP_ORDERS_STATUS_COUNT, payload: newCount });
        dispatch(setDropshipOrdersLoading(false));
    } catch (error) {
        dispatch(setDropshipOrdersLoading(false));
        dispatch(alertError('Error'));
    }
};

export const getDropshipOrdersFilters = () => async (dispatch, getState) => {
    try {
        const state = getState();
        const { retailerId } = state.role;
        const { last, from, to } = state.pageFilters.dropshipOrders;
        const created_atFilter = lastDate(last, from, to);

        let filter = { 
            'created_at': { '$between': [created_atFilter.start, created_atFilter.end] }, 
        };

        filter = {
            ...filter,
            type: 'dropship',
        };
    
        const response = await api.get(`/retailers/${retailerId}/order-filters?filter=${JSON.stringify(filter)}`);

        const data = response.data;
        dispatch(setDropshipOrdersFilters(data));
        let sum = 0;
        for(let key in data) {
            sum += data[key];
        }
        dispatch(setDropshipOrdersCount(sum));
    } catch (error) {
        dispatch(alertError('Error'));
    }
};

export const dropshipOrdersReport = () => async (dispatch, getState) => {
    const state = getState();
    try {
        const { retailerId } = state.role;
        const { from, to } = state.pageFilters.dropshipOrders;
    
        const data = {
            'type': 'orders',
            'start_date': from,
            'end_date': to,
          };
    
        const response =  await downloadReports(retailerId, data);

        if(response.data.success) {
            dispatch({ type: DROPSHIP_ORDERS_REPORT });
        }
    } catch (error) {
        console.log(error);
        dispatch(alertError('Error'));
    }
};

export const dropshipOrdersReportClose = () => ({ type: DROPSHIP_ORDERS_REPORT_CLOSE });

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