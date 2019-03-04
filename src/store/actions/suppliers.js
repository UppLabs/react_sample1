import api from '../../utils/api';
import { 
    SET_CURRENT_SUPPLIER,
} from '../constants/suppliersTypes';

export const getSupplier = supplierId => (dispatch) => { 
    api
    .get('/suppliers/' + supplierId)
    .then((response) => {
        console.log(response);
        dispatch({ type: SET_CURRENT_SUPPLIER, payload: {} });
    });
};