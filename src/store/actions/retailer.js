import api from '../../utils/api';
import { 
    CURRENT_RETAILER, 
    CURRENT_RETAILER_LOADING,
} from '../constants/retailerTypes';

import { CURRENT_RETAILER_TERMS } from '../constants/permissionsTypes';
import { alertError, alertSuccess } from './alert';

const setRetailerLoading = value => ({ type: CURRENT_RETAILER_LOADING, payload: value });

export const setRetailer = value => ({ type: CURRENT_RETAILER, payload: value });

export const setRetailerTerms = ({
    ecommerce_billing_method,
    replenish_billing_method,
    ecommerce_commission_percentage,
    replenishment_discount_percentage,
    approved_for_ecommerce,
    approved_for_replenishment,
    minimum_products_for_replenishment_order,
    replenishment_order_shipping_cost,
}) => ({ type: CURRENT_RETAILER_TERMS, payload: {
    ecommerce_billing_method,
    replenish_billing_method,
    ecommerce_commission_percentage,
    replenishment_discount_percentage,
    approved_for_ecommerce,
    approved_for_replenishment,
    minimum_products_for_replenishment_order,
    replenishment_order_shipping_cost,
} });

export const getRetailer = id => async (dispatch, getState) => {
    try {
        dispatch(setRetailerLoading(true));
        const state = getState();
        const { supplierId } = state.role;
        const response = await api.get(`/suppliers/${supplierId}/retailers/${id}`);

        dispatch(setRetailer(response.data));
        dispatch(setRetailerTerms(response.data));
        dispatch(setRetailerLoading(false));
    } catch (error){
        console.log(error);
    }
};

export const postRetailerErpId = (data, retailerId, storeId) => async (dispatch) => {
    try {
        const response = await putErpId(data, retailerId, storeId);
        if(response.data.success) {
            dispatch(alertSuccess('Success'));
        }
    } catch (error) {
        console.log(error);   
        dispatch(alertError('Error'));   
    }
};

let cancelPutErpId;
const putErpId = (data, retailerId, storeId) => {
    if(cancelPutErpId) cancelPutErpId();

    return api.put(`/suppliers/${retailerId}/stores/${storeId}`, data, {
        cancelToken: new api.CancelToken(function executor(c) {
            cancelPutErpId = c;
        }),
    });
};