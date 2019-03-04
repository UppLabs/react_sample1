import { 
    DROPSHIP_REVENU, 
    REPLENISH_DISCOUNT_REVENU, 
    DROPSHIP_ALLOWED, 
    REPLENISH_ALLOWED,
    DROPSHIP_BILLING,
    REPLENISH_BILLING,
    PERMISSIONS_TAB,
    PERMISSIONS_MINIMUM_ORDER,
    PERMISSIONS_FIXED_PER_UNIT,
    PERMISSIONS_PERCENTAGE,
    CURRENT_RETAILER_TERMS, 
} from '../constants/permissionsTypes';

const initialState = {
    ecommerce_billing_method: 'none',
    replenish_billing_method: 'none',
    ecommerce_commission_percentage: 0,
    replenishment_discount_percentage: 0,
    approved_for_ecommerce: false,
    approved_for_replenishment: false,
    minimum_products_for_replenishment_order: 0,
    replenishment_order_shipping_cost: [{
        percentage: 0, 
        fixed_per_unit: 0,
    }],
    changed: false,
    tab: 'Dropship',
};

const permissions = (state = initialState, action) => {
    switch (action.type) {
        case DROPSHIP_REVENU: 
            return {
                ...state,
                ecommerce_commission_percentage: action.payload,
                changed: true,
            };
        case REPLENISH_DISCOUNT_REVENU:
            return {
                ...state,
                replenishment_discount_percentage: action.payload,
                changed: true,
            };
        case DROPSHIP_ALLOWED:
            return {
                ...state,
                approved_for_ecommerce: action.payload,
                changed: true,
            };
        case REPLENISH_ALLOWED:
            return {
                ...state,
                approved_for_replenishment: action.payload,
                changed: true,
            };
        case DROPSHIP_BILLING:
            return {
                ...state,
                ecommerce_billing_method: action.payload,
                changed: true,
            };
        case REPLENISH_BILLING:
            return {
                ...state,
                replenish_billing_method: action.payload,
                changed: true,
            };
        case PERMISSIONS_TAB: 
            return {
                ...state,
                tab: action.payload,
            };
        case PERMISSIONS_MINIMUM_ORDER:
            return {
                ...state,
                minimum_products_for_replenishment_order: action.payload,
                changed: true,
            };
        case PERMISSIONS_FIXED_PER_UNIT:
            return {
                ...state,
                replenishment_order_shipping_cost: [{
                    percentage: 0,
                    fixed_per_unit: action.payload,
                }],
                changed: true,
            };
        case PERMISSIONS_PERCENTAGE:
            return {
                ...state,
                replenishment_order_shipping_cost: [{
                    fixed_per_unit: 0,
                    percentage: action.payload,
                }],
                changed: true,
            };
        case CURRENT_RETAILER_TERMS:
            return {
                ...state,
                ...action.payload,
                changed: false,
            };
        default:
            break;
    }

   return state;
};

export default permissions;