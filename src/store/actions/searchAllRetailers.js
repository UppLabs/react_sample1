import { 
    SEARCH_ALL_RETAILERS,
} from '../constants/searchAllRetailers';

import {
	getAcceptedInvitationRetailers,
} from './acceptedInvitationRetailers.js';

import {
	getApprovedRetailers,
} from './approvedRetailers.js';

export const searchAllRetailers = search => (dispatch) => {
    dispatch({ type: SEARCH_ALL_RETAILERS, payload: search });
    dispatch(getAcceptedInvitationRetailers());
    dispatch(getApprovedRetailers());
};