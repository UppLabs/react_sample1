import { SUPPLIER } from '../../constants/roles';
import {
  ROLES,
  ROLES_CURRENT_ROLE,
  ROLES_SUPPLIER_ID,
  ROLES_RETAILER_ID,
  ROLES_SUPPLIER_NAME,
  ROLES_RETAILER_NAME,
} from '../constants/rolesTypes';
 
 const initialState = {
   roles: undefined,
   supplierId: 1,
   retailerId: 1,
   supplierName: '',
   retailerName: '',
   currentRole: SUPPLIER,
 };
 
 const roles = (state = initialState, action) => {
   switch (action.type) {
     case ROLES: 
       return {
         ...state,
         roles: action.payload,
       };
     case ROLES_CURRENT_ROLE: 
       return {
         ...state,
         currentRole: action.payload,
       };
     case ROLES_SUPPLIER_ID:
       return {
         ...state,
         supplierId: action.payload,
       };
     case ROLES_SUPPLIER_NAME:
       return {
         ...state,
         supplierName: action.payload,
       };
     case ROLES_RETAILER_ID: 
       return {
         ...state,
         retailerId: action.payload,
       };
     case ROLES_RETAILER_NAME:
       return {
         ...state,
         retailerName: action.payload,
       };
     default:
       break;
   }
   return state;
 };
 
 export default roles;
 