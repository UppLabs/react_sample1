import api from '../../utils/api';
import {
	GET_STORES,
} from '../constants/cartTypes';

export const getStores = () => async (dispatch, getState) => {
	const { retailerId } = getState().role;
	try {
		const store = await getStoresCart(retailerId);
		dispatch({ type: GET_STORES, payload: store.data });
	} catch (e) {
		console.log(e);
	}
};

export const sendOrder = (data, store_id) => (dispatch, getState) => {
	const { retailerId } = getState().role;
	api(`/retailers/${retailerId}/stores/${store_id}/orders`, data).then((response) => {
		console.log(response);
	});
};

let cancelGetStore;
const getStoresCart = (retailer_id) => {
	if(cancelGetStore) cancelGetStore();
	return api(`/retailers/${retailer_id}/stores`,
	{
		cancelToken: new  api.CancelToken(function executor(c) {
		cancelGetStore = c;
	}),
	});
};