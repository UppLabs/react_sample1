import api from '../../utils/api';
import { 
    ACCEPTED_INVITATION_RETAILERS, 
    ACCEPTED_INVITATION_RETAILERS_COUNT,
    ACCEPTED_INVITATION_RETAILERS_OFFSET,
    ACCEPTED_INVITATION_RETAILERS_LOADING, 
} from '../constants/acceptedInvitationRetailers';

const setAcceptedInvitationRetailersLoading = value => ({ 
    type: ACCEPTED_INVITATION_RETAILERS_LOADING, payload: value, 
});

const setAcceptedInvitationRetailers = data => ({ type: ACCEPTED_INVITATION_RETAILERS, payload: data });
const setAcceptedInvitationRetailersCount = count => ({ type: ACCEPTED_INVITATION_RETAILERS_COUNT, payload: count });

export const getAcceptedInvitationRetailers = () => async (dispatch, getState) => { 
    const { perPage, offset, count } = getState().acceptedInvitationRetailers;
    const { field, order } = getState().pageFilters.retailers;
    const { search } = getState().searchAllRetailers;
    const { supplierId } = getState().role;

    const filter = JSON.stringify(
        { 
            'approved_for_ecommerce': false, 
            'approved_for_replenishment': false, 
            'retailer.name': { '$like': `%25${search}%25` }, 
        },
    );
    
    try {
        dispatch(setAcceptedInvitationRetailersLoading(true));
        const response = await retailers(supplierId, filter, perPage, offset, order, field);

        const newCount = response.headers['x-total-count'];
        if(count != newCount) {
            dispatch(setAcceptedInvitationRetailersCount(newCount));
        }
        dispatch(setAcceptedInvitationRetailers(response.data));
        dispatch(setAcceptedInvitationRetailersLoading(false));
    } catch(error) {
        console.log(error);
    }
};

export const setAcceptedInvitationRetailersOffset = offset => (dispatch) => {
    dispatch({ type: ACCEPTED_INVITATION_RETAILERS_OFFSET, payload: offset });
    dispatch(getAcceptedInvitationRetailers());
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


