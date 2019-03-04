import { combineReducers } from 'redux';
import auth from './auth';
import approveNewRetailers from './approveNewRetailers';
import assignNewProducts from './assignNewProducts';
import manageReturns from './manageReturns';
import retailer from './retailer';
import products from './products';
import acceptedInvitationRetailers from './acceptedInvitationRetailers';
import pageFilters from './pageFilters';
import brandOrders from './brandOrders';
import approvedRetailers from './approvedRetailers';
import replenishBrands from './replenishBrands';
import stats from './stats';
import role from './roles';
import permissions from './permissions';
import replenishProducts from './replenishProducts';
import retailerProducts from './retailerProducts';
import replenishOrders from './replenishOrders';
import dropshipProducts from './dropshipProducts';
import searchAllRetailers from './searchAllRetailers';
import alert from './alert';
import adminBrands from './adminBrands';
import adminAccountInfo from './adminAccountInfo';
import adminStores from './adminStores';
import dropshipOrders from './dropshipOrders';
import signup from './signup';
import cart from './cart';
import adminUsers from './adminUsers';

const rootReducer = combineReducers({
  auth,
  approveNewRetailers,
  assignNewProducts,
  manageReturns,
  retailer,
  products,
  acceptedInvitationRetailers,
  pageFilters,
  brandOrders,
  approvedRetailers,
  replenishBrands,
  stats,
  role,
  permissions,
  replenishProducts,
  retailerProducts,
  replenishOrders,
  dropshipProducts,
  searchAllRetailers,
  alert,
  adminBrands,
  adminAccountInfo,
  adminStores,
  dropshipOrders,
  signup,
  cart,
  adminUsers,
});

export default rootReducer;
