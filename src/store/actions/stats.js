import { 
  STATS_TOTALS, 
  STATS_BRANDS, 
  STATS_REPLENISH, 
  STATS_BRANDS_LOADING, 
} from '../constants/statsTypes';
import api from '../../utils/api';
import { lastDate } from '../../utils/dateHelper';

export const setStatsBrandsLoading = value => ({ type: STATS_BRANDS_LOADING, payload: value });
export const setStatsBrands = data => ({ type: STATS_BRANDS, payload: data });
export const setStatsReplenish = data => ({ type: STATS_REPLENISH, payload: data });

export const setStatsTotals = (totalIncome, totalItems, totalOrders) => ({
  type: STATS_TOTALS,
  payload: { totalIncome, totalItems, totalOrders },
});

export const getStats = retailerId => async (dispatch, getState) => {
  try {
    dispatch(setStatsBrandsLoading(true));
    const state = getState();
    const { supplierId } = state.role;
    const { last, from, to } = retailerId ? state.pageFilters.retailerStats : state.pageFilters.stats;
    const created_atFilter = lastDate(last, from, to);
    let filter = {
      created_at: { $between: [created_atFilter.start, created_atFilter.end] },
    };

    if (retailerId) {
      filter = {
        ...filter,
        retailer_id: { $eq: retailerId },
      };
    }

    const brands = await stats(supplierId, JSON.stringify({
      ...filter,
      type: 'ecommerce',
    }));
    const replenish = await stats(supplierId, JSON.stringify({
      ...filter,
      type: 'replenish',
    }));

    dispatch(setStatsBrands(brands.data));
    dispatch(setStatsReplenish(replenish.data));
    let totalIncome = 0;
    let totalItems = 0;
    let totalOrders = 0;

    brands.data.map((value) => {
        totalIncome += +value.total_income;
        totalItems += +value.total_items;
        totalOrders += +value.total_orders;
    });

    replenish.data.map((value) => {
      totalIncome += +value.total_income;
      totalItems += +value.total_items;
      totalOrders += +value.total_orders;
  });

    dispatch(setStatsTotals(totalIncome/100, totalItems, totalOrders));
    dispatch(setStatsBrandsLoading(false));
  } catch (error) {
    console.log(error);
  }
};

const stats = (supplierId, filter) => {
  return api.get(`/suppliers/${supplierId}/order-stats` + `?filter=${filter}`);
};
