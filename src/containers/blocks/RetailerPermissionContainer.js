import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import RetailerPermissions from '../../components/blocks/RetailerPermissions';
import { 
  setDropshipRevenu, 
  setReplenishDiscountRevenu, 
  putPermissions,
  setDropshipBilling,
  setReplenishBilling,
  setDropshipAllowed,
  setReplenishAllowed,
  setPermissionsTab,
  setPermissionsMinimumOrder,
  setPermissionsFixedPerUnit,
  setPermissionsPercentage, 
} from '../../store/actions/permissions';
import Spinner from '../../components/common/Spinner/Spinner';

class RetailerPermissionContainer extends PureComponent {
  render() {
    return this.props.isLoading ? <Spinner /> : ( 
      <RetailerPermissions
        toolbarTitle={`${this.props.tab} Terms`}
        {...this.props}
      />
    );
  }
}

const mapStateToProps = ({ retailer, permissions }) => {
  const { isLoading } = retailer;

  const { 
    ecommerce_billing_method, 
    replenish_billing_method, 
    ecommerce_commission_percentage, 
    replenishment_discount_percentage, 
    approved_for_ecommerce,
    approved_for_replenishment,
    changed,
    minimum_products_for_replenishment_order,
    replenishment_order_shipping_cost,
    tab,
  } = permissions;

  return {
    ecommerce_billing_method, 
    replenish_billing_method, 
    ecommerce_commission_percentage, 
    replenishment_discount_percentage,
    approved_for_ecommerce,
    approved_for_replenishment,
    changed,
    minimum_products_for_replenishment_order,
    replenishment_order_shipping_cost,
    isLoading,
    tab,
  };
};

const mapDispatchToProps = dispatch => ({
  changeDropshipAllowed: value => dispatch(setDropshipAllowed(value)),
  changeReplenishAllowed: value => dispatch(setReplenishAllowed(value)),
  changeDropshipRevenu: value => dispatch(setDropshipRevenu(value)),
  changeDropshipBilling: value => dispatch(setDropshipBilling(value)),
  changeReplenishDiscountRevenu: value => dispatch(setReplenishDiscountRevenu(value)),
  changeReplenishBilling: value => dispatch(setReplenishBilling(value)),
  putPermissions: (id, data) => dispatch(putPermissions(id, data)),
  setTab: value => dispatch(setPermissionsTab(value)),
  setPermissionsMinimumOrder: value => dispatch(setPermissionsMinimumOrder(value)),
  setPermissionsFixedPerUnit: value => dispatch(setPermissionsFixedPerUnit(value)),
  setPermissionsPercentage: value => dispatch(setPermissionsPercentage(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(
  RetailerPermissionContainer,
);

RetailerPermissionContainer.propTypes = {
  id: PropTypes.number.isRequired,
  isLoading: PropTypes.bool.isRequired,
  tab: PropTypes.string.isRequired,
};
