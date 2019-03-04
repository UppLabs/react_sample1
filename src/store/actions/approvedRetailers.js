import api from '../../utils/api';
import { 
    APPROVED_RETAILERS, 
    APPROVED_RETAILERS_COUNT, 
    APPROVED_RETAILERS_OFFSET,
    APPROVED_RETAILERS_LOADING, 
} from '../constants/approvedRetailers';

const setApprovedRetailersLoading = value => ({ type: APPROVED_RETAILERS_LOADING, payload: value });
const setApprovedRetailers = data => ({ type: APPROVED_RETAILERS, payload: data });
const setApprovedRetailersCount = count => ({ type: APPROVED_RETAILERS_COUNT, payload: count });

export const getApprovedRetailers = () => async (dispatch, getState) => { 
    const { perPage, offset, count } = getState().approvedRetailers;
    const { field, order } = getState().pageFilters.retailers;
    const { supplierId } = getState().role;
    const { search } = getState().searchAllRetailers;

    const filter = JSON.stringify(
        { 
            '$or':[
                { 'approved_for_ecommerce': true }, 
                { 'approved_for_replenishment': true },
            ],
            'retailer.name': { '$like': `%25${search}%25` },
        },
    );
    
    try {
        dispatch(setApprovedRetailersLoading(true));
        const response = await retailers(supplierId, filter, perPage, offset, order, field);

        const newCount = response.headers['x-total-count'];
        if(count != newCount) {
            dispatch(setApprovedRetailersCount(newCount));
        }
        dispatch(setApprovedRetailers(response.data));
        dispatch(setApprovedRetailersLoading(false));
    } catch(error) {
        console.log(error);
    }
};

export const setApprovedRetailersOffset = offset => (dispatch) => {
    dispatch({ type: APPROVED_RETAILERS_OFFSET, payload: offset });
    dispatch(getApprovedRetailers());
};

let cancelRetailers;

const retailers = (supplierId, filter, limit, offset, order ,field) => {
    if(cancelRetailers) cancelRetailers('Cancel');
    
    return api.get(`/suppliers/${supplierId}/retailers` +
        `?filter=${filter}&limit=${limit}&offset=${offset}&order=${order}&sort=${field}`,
    {
        cancelToken: new  api.CancelToken(function executor(c) {
            cancelRetailers = c;
        }),
    });
};


