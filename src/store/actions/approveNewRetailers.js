import { 
    APPROVE_NEW_RETAILERS, 
    APPROVE_NEW_RETAILERS_COUNT,
    APPROVE_NEW_RETAILERS_OFFSET,
    APPROVE_NEW_RETAILERS_ORDER,
    APPROVE_NEW_RETAILERS_ORDER_FIELD,
    APPROVE_NEW_RETAILERS_LOADING,
} from '../constants/approveNewRetailersTypes';
import api from '../../utils/api';

const setApproveNewRetailersLoading = value => ({ type: APPROVE_NEW_RETAILERS_LOADING, payload: value });
const setApproveNewRetailers = data => ({ type: APPROVE_NEW_RETAILERS, payload: data });
const setApproveNewRetailersCount = count => ({ type: APPROVE_NEW_RETAILERS_COUNT, payload: count });

export const getApproveNewRetailers = () => async (dispatch, getState) => { 
    const { perPage, offset, order, count, field } = getState().approveNewRetailers;
    const { supplierId } = getState().role;

    const filter = JSON.stringify({ 'approved_for_ecommerce': false, 'approved_for_replenishment': false });
    
    try {
        dispatch(setApproveNewRetailersLoading(true));
        const response = await retailers(supplierId, filter, perPage, offset, order, field);

        const newCount = response.headers['x-total-count'];
        if(count != newCount) {
            dispatch(setApproveNewRetailersCount(newCount));
        }
        dispatch(setApproveNewRetailers(response.data));
        dispatch(setApproveNewRetailersLoading(false));
    } catch(error) {
        console.log(error);
    }
};

export const setApproveNewRetailersOrder = order => (dispatch) => {
    dispatch({ type: APPROVE_NEW_RETAILERS_ORDER, payload: order });
    dispatch(getApproveNewRetailers());
};

export const setApproveNewRetailersOffset = offset => (dispatch) => {
    dispatch({ type: APPROVE_NEW_RETAILERS_OFFSET, payload: offset });
    dispatch(getApproveNewRetailers());
};

export const setApproveNewRetailersOrderField = orderField => (dispatch, getState) => {
    const { field } = getState().approveNewRetailers;

    if(field != orderField) {
        dispatch({ type: APPROVE_NEW_RETAILERS_ORDER_FIELD, payload: orderField });
    }

    dispatch(getApproveNewRetailers());
};

let cancelRetailers;
const retailers = (supplierId, filter, limit, offset, order, field) => {
    if(cancelRetailers) cancelRetailers('Cancel');
    
    return api.get(`/suppliers/${supplierId}/retailers` +
        `?filter=${filter}&limit=${limit}&offset=${offset}&order=${order}&sort=${field}`,
    {
        cancelToken: new  api.CancelToken(function executor(c) {
            cancelRetailers = c;
        }),
    });
};
