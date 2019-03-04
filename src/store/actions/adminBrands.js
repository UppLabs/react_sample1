import { 
   ADMIN_BRANDS_SUPPLIERS, 
   ADMIN_BRANDS_INVITATIONS, 
   ADMIN_BRANDS_LOADING,
} from '../constants/adminBrandsTypes';
import api from '../../utils/api';

const setAdminBrandsLoading = value => ({ type: ADMIN_BRANDS_LOADING, payload: value });
const setAdminBrandsSuppliers = data => ({ type: ADMIN_BRANDS_SUPPLIERS, payload: data });
const setAdminBrandsInvitation = data => ({ type: ADMIN_BRANDS_INVITATIONS, payload: data });

export const getAdminBrandsSuppliers = () => async (dispatch, getState) => {
   try {
      dispatch(setAdminBrandsLoading(true));
      const { supplierId } = getState().role;

      const response = await suppliers(supplierId);
   
      dispatch(setAdminBrandsSuppliers(response.data));
      dispatch(setAdminBrandsLoading(false));
   } catch (error) {
      dispatch(setAdminBrandsLoading(false));
      console.log(error);
   }
};


export const getAdminBrandsInvitation = () => async (dispatch) => {
   try {
      // dispatch(setAdminBrandsLoading(true));
      const response = await invitations();

      // dispatch(setAdminBrandsInvitation(response.data));
      // dispatch(setAdminBrandsLoading(false));
   } catch (error) {
      console.log(error);
   }
};

export const adminBrandsAcceptInvitation = data => async (dispatch, getState) => {
    const { retailerId } = getState().role;

    const response = await postAcceptInvitation(data, retailerId);

    console.log(response);
};


let cancelSuppliers;

const suppliers = (supplierId) => {
    if(cancelSuppliers) cancelSuppliers('Cancel admin suppliers');
    
    return api.get(`/retailers/${supplierId}/suppliers`,
    {
        cancelToken: new  api.CancelToken(function executor(c) {
         cancelSuppliers = c;
        }),
    });
};

let cancelInvitations;

const invitations = () => {
    if(cancelInvitations) cancelInvitations('Cancel admin invitations');
    
    return api.get('/users/invitations',
    {
        cancelToken: new  api.CancelToken(function executor(c) {
         cancelInvitations = c;
        }),
    });
};

let cancelAcceptInvitation;
export const postAcceptInvitation = (data, retailerId) => {
    if(cancelAcceptInvitation) cancelAcceptInvitation();

    return api.post(`/retailers/${retailerId}/suppliers`, data, {
        cancelToken: new api.CancelToken(function executor(c) {
            cancelAcceptInvitation = c;
        }),
    });
};