import { 
    RETAILERS_SET_ORDER,
    RETAILERS_SET_ORDER_FIELD,
    SET_RETAILER_STATS_FILTER,
    SET_STATS_FILTER,
    BRAND_ORDERS_RETAILER_FILTER,
} from '../constants/pageFiltersTypes';
import { BRAND_ORDERS_LAST_DAY_FILTER } from '../constants/brandOrdersTypes';
import { getBrandOrders, getBrandOrdersFilters } from './brandOrders';
import { getApprovedRetailers } from './approvedRetailers';
import { getAcceptedInvitationRetailers } from './acceptedInvitationRetailers';
import { getStats } from './stats';
import api from '../../utils/api';
import { alertSuccess, alertError } from './alert';
import { getDropshipOrders, getDropshipOrdersFilters } from './dropshipOrders';
import { DROPSHIP_ORDERS_LAST_DAY_FILTER } from '../constants/dropshipOrdersTypes';
import { getReplenishOrders, getReplenishOrdersFilters } from './replenishOrders';
import { REPLENISH_ORDERS_LAST_DAY_FILTER } from '../constants/replenishOrdersTypes';

export const setBrandOrdersRetailerFilter = value => (dispatch) => {
    dispatch({ type: BRAND_ORDERS_RETAILER_FILTER, payload: value });
    dispatch(getBrandOrders());
    dispatch(getBrandOrdersFilters());
};

export const setOrderLastDayFilter = (last, from, to) => (dispatch) => {
    dispatch({ type: BRAND_ORDERS_LAST_DAY_FILTER, payload: {
        last,
        from,
        to,
    } });
    dispatch(getBrandOrders());
    dispatch(getBrandOrdersFilters());
};

export const setDropshipOrdersLastDayFilter = (last, from, to) => (dispatch) => {
    dispatch({ type: DROPSHIP_ORDERS_LAST_DAY_FILTER, payload: {
        last,
        from,
        to,
    } });
    dispatch(getDropshipOrders());
    dispatch(getDropshipOrdersFilters());
};

export const setReplenishOrdersLastDayFilter = (last, from, to) => (dispatch) => {
    dispatch({ type: REPLENISH_ORDERS_LAST_DAY_FILTER, payload: {
        last,
        from,
        to,
    } });
    dispatch(getReplenishOrders());
    dispatch(getReplenishOrdersFilters());
};

export const setStatsDateFilter = (last, from, to) => (dispatch) => {
    dispatch({ type: SET_STATS_FILTER, payload: { 
        last, 
        from, 
        to, 
    } });
    dispatch(getStats());
};

export const setRetailerStatsDateFilter = (retailerId, last, from, to) => (dispatch) => {
    dispatch({ type: SET_RETAILER_STATS_FILTER, payload: {
        last,
        from,
        to,
    } });
    dispatch(getStats(retailerId));
};

export const setRetailersOrderField = orderField => (dispatch, getState) => {
    const { field } = getState().pageFilters.retailers;

    if(field != orderField) {
        dispatch({ type: RETAILERS_SET_ORDER_FIELD, payload: orderField });
    }

    dispatch(getApprovedRetailers());
    dispatch(getAcceptedInvitationRetailers());
};

export const setRetailersOrder = order => (dispatch) => {
    dispatch({ type: RETAILERS_SET_ORDER, payload: order });

    dispatch(getApprovedRetailers());
    dispatch(getAcceptedInvitationRetailers());
};

let cancelRetailersInvitation;
export const sendRetailersInvitation= emails => async (dispatch, getState) => {
    try {
        if(cancelRetailersInvitation) cancelRetailersInvitation();
        const { supplierId } = getState().role;
    
        const data = {
            emails,
        };
        
        const response = await api.post(`/suppliers/${supplierId}/inviteRetailers`, data, {
            cancelToken: new api.CancelToken(function executor(c) {
                cancelRetailersInvitation = c;
            }),
        });

        if(response.data.success) {
            dispatch(alertSuccess('Invitations are on their way.'));
        } else {
            dispatch(
                alertError(
                    'Oops, something went wrong and we were unable to send your emails. Please try again later.',
                ),
            );
        }
    } catch (error) {
        dispatch(
            alertError('Oops, something went wrong and we were unable to send your emails. Please try again later.'),
        );
    }

};
