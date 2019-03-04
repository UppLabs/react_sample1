import { 
   DROPSHIP_REVENU, 
   REPLENISH_DISCOUNT_REVENU, 
   PERMISSIONS_POST, 
   DROPSHIP_BILLING, 
   REPLENISH_BILLING,
   DROPSHIP_ALLOWED,
   REPLENISH_ALLOWED,
   PERMISSIONS_TAB,
   PERMISSIONS_MINIMUM_ORDER,
   PERMISSIONS_FIXED_PER_UNIT,
   PERMISSIONS_PERCENTAGE, 
} from '../constants/permissionsTypes';
import api from '../../utils/api';

export const setDropshipRevenu = value => ({ type: DROPSHIP_REVENU, payload: value });
export const setDropshipBilling = value => ({ type: DROPSHIP_BILLING, payload: value });
export const setReplenishBilling = value => ({ type: REPLENISH_BILLING, payload: value });
export const setReplenishDiscountRevenu = value => ({ type: REPLENISH_DISCOUNT_REVENU, payload: value });
export const setDropshipAllowed = value => ({ type: DROPSHIP_ALLOWED, payload: value == 'true' ? true : false });
export const setReplenishAllowed = value => ({ type: REPLENISH_ALLOWED, payload: value == 'true' ? true : false });
export const setPermissionsTab = value => ({ type: PERMISSIONS_TAB, payload: value });
export const setPermissionsMinimumOrder = value => ({ type: PERMISSIONS_MINIMUM_ORDER, payload: value });
export const setPermissionsFixedPerUnit = value => ({ type: PERMISSIONS_FIXED_PER_UNIT, payload: value });
export const setPermissionsPercentage = value => ({ type: PERMISSIONS_PERCENTAGE, payload: value });

let cancelPostPermissions;
export const postPermissions = (supplierId, data) => {
    if(cancelPostPermissions) cancelPostPermissions();

    return api.post(`/suppliers/${supplierId}/permissions`, data, {
       cancelToken: new api.CancelToken(function executor(c) {
           cancelPutPermissions = c;
       }),
    });
};

let cancelPutPermissions;
export const putPermissions = (id, data) => async (dispatch, getState) => {
   try {
      if(cancelPutPermissions) cancelPutPermissions();

      const { supplierId } = getState().role;

      await api.put(`/suppliers/${supplierId}/retailers/${id}`, data,
      {
          cancelToken: new api.CancelToken(function executor(c) {
              cancelPutPermissions = c;
          }),
      });
   } catch (error) {
      console.log(error);
   }
};